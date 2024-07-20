--== stored procedure for create module ==--
-- suggestion 1
CREATE OR REPLACE PROCEDURE create_module(IN p_code VARCHAR(10), IN p_name VARCHAR(100), IN p_credit INT)
AS $$
BEGIN
    -- Check if the module already exists
    IF EXISTS (SELECT * FROM module WHERE mod_code = p_code) THEN
        RAISE EXCEPTION 'Module % already exists', p_code;
    END IF;

    -- Insert the new module
    INSERT INTO module (mod_code, mod_name, credit_unit) VALUES (p_code, p_name, p_credit);
END;
$$ LANGUAGE plpgsql;

--suggestion 2
CREATE OR REPLACE PROCEDURE create_module(IN p_code VARCHAR(10), IN p_name VARCHAR(100), IN p_credit INT)
AS $$
DECLARE
	v_module_code VARCHAR(10);
BEGIN
	SELECT mod_code INTO v_module_code FROM module WHERE mod_code=p_code;
    -- Check if the module already exists
    IF FOUND THEN
        RAISE EXCEPTION 'Module % already exists', p_code;
    END IF;

    -- Insert the new module
    INSERT INTO module (mod_code, mod_name, credit_unit) VALUES (p_code, p_name, p_credit);
END;
$$ LANGUAGE plpgsql;

--== stored procedure for update module ==--
-- suggestion 1
CREATE OR REPLACE PROCEDURE update_module(IN p_code VARCHAR(10), IN p_credit INT)
AS $$
BEGIN

    -- Check if the module does not exist
    IF NOT EXISTS (SELECT * FROM module WHERE mod_code = p_code) THEN
        RAISE EXCEPTION 'Module % does not exist', p_code;
    END IF;

    -- Update the module
    UPDATE module SET credit_unit=p_credit WHERE mod_code=p_code;
END;
$$ LANGUAGE plpgsql;

-- suggestion 2
CREATE OR REPLACE PROCEDURE update_module(IN p_code VARCHAR(10), IN p_credit INT)
AS $$
DECLARE
	v_module_code VARCHAR(10);
BEGIN
	SELECT mod_code INTO v_module_code FROM module WHERE mod_code=p_code;
    -- Check if the module does not exist
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Module % does not exist', p_code;
    END IF;

    -- Update the module
    UPDATE module SET credit_unit=p_credit WHERE mod_code=p_code;
END;
$$ LANGUAGE plpgsql;

--== stored procedure for delete module ==--
-- suggestion 1
CREATE OR REPLACE PROCEDURE delete_module(IN p_code VARCHAR(10))
AS $$
BEGIN

    -- Check if the module does not exist
    IF NOT EXISTS (SELECT * FROM module WHERE mod_code = p_code) THEN
        RAISE EXCEPTION 'Module % does not exist', p_code;
    END IF;

    -- Delete the module
    DELETE FROM module WHERE mod_code=p_code;
END;
$$ LANGUAGE plpgsql;

-- suggestion 2
CREATE OR REPLACE PROCEDURE delete_module(IN p_code VARCHAR(10))
AS $$
DECLARE
	v_module_code VARCHAR(10);
BEGIN
	SELECT mod_code INTO v_module_code FROM module WHERE mod_code=p_code;
    -- Check if the module does not exist
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Module % does not exist', p_code;
    END IF;

    -- Delete the module
    DELETE FROM module WHERE mod_code=p_code;
END;
$$ LANGUAGE plpgsql;

--== Create a function to count the number of each grade, grouped by module ==--
CREATE OR REPLACE FUNCTION get_modules_performance()
RETURNS TABLE (
    mod_registered VARCHAR(10),
    grade CHAR(2),
    grade_count BIGINT
) AS
$$
BEGIN
    RETURN QUERY
    SELECT
        s.mod_registered,
        s.grade,
        COUNT(s.mark) AS grade_count
    FROM stud_mod_performance s
    GROUP BY s.mod_registered, s.grade
    ORDER BY s.mod_registered, s.grade;
END;
$$
LANGUAGE plpgsql;


--== alter student table to ADD gpa, gpa_last_updated columns ==--
ALTER TABLE student
ADD COLUMN gpa NUMERIC(4, 2),  
ADD COLUMN gpa_last_updated DATE; 


--== create a function to map grade to grade_point ==--
CREATE OR REPLACE FUNCTION get_grade_point(grade_input CHAR(2))
RETURNS NUMERIC
AS $$
DECLARE
    grade_point NUMERIC;
BEGIN
    CASE grade_input
        WHEN 'AD' THEN grade_point := 4.0;
        WHEN 'A'  THEN grade_point := 4.0;
        WHEN 'B+' THEN grade_point := 3.5;
        WHEN 'B'  THEN grade_point := 3.0;
        WHEN 'C+' THEN grade_point := 2.5;
        WHEN 'C'  THEN grade_point := 2.0;
        WHEN 'D+' THEN grade_point := 1.5;
        WHEN 'D'  THEN grade_point := 1.0;
		WHEN 'F'  THEN grade_point := 0.0;
			ELSE RAISE EXCEPTION 'Invalid Grade';
    END CASE;

    RETURN grade_point;
END;
$$ LANGUAGE plpgsql;


--== create a stored procedure to compute gpa: method 1 ==-- 
CREATE OR REPLACE PROCEDURE calculate_students_gpa()
AS $$
DECLARE
    v_admin_no CHAR(4);
	v_mod_performance RECORD;
    total_credit_units INT;
    total_weighted_grade_points NUMERIC;
    computed_gpa NUMERIC;
BEGIN
    FOR v_admin_no IN (SELECT DISTINCT adm_no FROM stud_mod_performance)
    LOOP
        total_credit_units := 0;
        total_weighted_grade_points := 0;

        FOR v_mod_performance IN
            SELECT mod_registered, mark, credit_unit, grade
            FROM stud_mod_performance
            JOIN module ON stud_mod_performance.mod_registered = module.mod_code
            WHERE adm_no = v_admin_no
            LOOP
                total_credit_units := total_credit_units + v_mod_performance.credit_unit;
                total_weighted_grade_points := total_weighted_grade_points + (v_mod_performance.credit_unit * get_grade_point(v_mod_performance.grade));
            END LOOP;

            IF total_credit_units > 0 THEN
                computed_gpa := total_weighted_grade_points / total_credit_units;
                
                UPDATE student SET gpa=computed_gpa, gpa_last_updated=CURRENT_DATE WHERE adm_no = v_admin_no;
                
            END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

--== create a stored procedure to compute gpa: method 2 ==--
CREATE OR REPLACE PROCEDURE calculate_students_gpa()
AS $$
DECLARE
    v_adm_no CHAR(4);
    computed_gpa NUMERIC;
BEGIN
    FOR v_adm_no IN (SELECT DISTINCT adm_no FROM stud_mod_performance)
    LOOP
        SELECT
            COALESCE(SUM(credit_unit * get_grade_point(grade)), 0) /
            NULLIF(SUM(credit_unit), 0) AS gpa
        INTO
            computed_gpa
        FROM
            stud_mod_performance
        JOIN module ON stud_mod_performance.mod_registered = module.mod_code
        WHERE
            stud_mod_performance.adm_no = v_adm_no;

		UPDATE student SET gpa=computed_gpa, gpa_last_updated=CURRENT_DATE WHERE adm_no = v_adm_no;
			
    END LOOP;
END;
$$ LANGUAGE plpgsql;
