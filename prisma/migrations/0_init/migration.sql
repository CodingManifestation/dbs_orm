-- CreateTable
CREATE TABLE "course" (
    "crse_code" VARCHAR(5) NOT NULL,
    "crse_name" VARCHAR(100) NOT NULL,
    "offered_by" VARCHAR(5) NOT NULL,
    "crse_fee" DECIMAL(7,2) NOT NULL,
    "lab_fee" DECIMAL(7,2),

    CONSTRAINT "course_pkey" PRIMARY KEY ("crse_code")
);

-- CreateTable
CREATE TABLE "department" (
    "dept_code" VARCHAR(5) NOT NULL,
    "dept_name" VARCHAR(100) NOT NULL,
    "hod" CHAR(4) NOT NULL,
    "no_of_staff" INTEGER,
    "max_staff_strength" INTEGER,
    "budget" DECIMAL(9,2),
    "expenditure" DECIMAL(9,2),
    "hod_appt_date" DATE,

    CONSTRAINT "department_pkey" PRIMARY KEY ("dept_code")
);

-- CreateTable
CREATE TABLE "staff" (
    "staff_no" CHAR(4) NOT NULL,
    "staff_name" VARCHAR(100) NOT NULL,
    "supervisor_staff_no" CHAR(4),
    "dob" DATE NOT NULL,
    "grade" VARCHAR(5) NOT NULL,
    "marital_status" VARCHAR(1) NOT NULL,
    "pay" DECIMAL(7,2),
    "allowance" DECIMAL(7,2),
    "hourly_rate" DECIMAL(7,2),
    "gender" CHAR(1) NOT NULL,
    "citizenship" VARCHAR(10) NOT NULL,
    "join_yr" INTEGER NOT NULL,
    "dept_code" VARCHAR(5) NOT NULL,
    "type_of_employment" VARCHAR(2) NOT NULL,
    "highest_qln" VARCHAR(10) NOT NULL,
    "designation" VARCHAR(20) NOT NULL,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("staff_no")
);

-- CreateTable
CREATE TABLE "staff_backup" (
    "staff_no" CHAR(4) NOT NULL,
    "staff_name" VARCHAR(100) NOT NULL,
    "supervisor" CHAR(4),
    "dob" DATE NOT NULL,
    "grade" VARCHAR(5) NOT NULL,
    "marital_status" VARCHAR(1) NOT NULL,
    "pay" DECIMAL(7,2),
    "allowance" DECIMAL(7,2),
    "hourly_rate" DECIMAL(7,2),
    "gender" CHAR(1) NOT NULL,
    "citizenship" VARCHAR(10) NOT NULL,
    "join_yr" INTEGER NOT NULL,
    "dept_code" VARCHAR(5) NOT NULL,
    "type_of_employment" VARCHAR(2) NOT NULL,
    "highest_qln" VARCHAR(10) NOT NULL,
    "designation" VARCHAR(20) NOT NULL,

    CONSTRAINT "staff_backup_pkey" PRIMARY KEY ("staff_no")
);

