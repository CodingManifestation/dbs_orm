

function generateAttendance() {
    const token = localStorage.getItem('token');
    const url = '/reports/modulesAttendance';
    return fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
    }).then(function (response) {
        return response.json();
    });
}

function generateModulesPerformance(code) {
    const token = localStorage.getItem('token');
    let url = '/reports/modulesPerformance';
    if (code) {
        url += `?code=${code}`;
    }
    return fetch(url,
        {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(function (response) {
        return response.json();
    });
}

function computeStudentsGPA() {
    const token = localStorage.getItem('token');
    const url = '/reports/calculateStudentsGPA';
    return fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
    }).then(function (response) {
        return response.json();
    });
}

window.addEventListener('DOMContentLoaded', function () {

    const heading = document.querySelector("#heading");
    const errorType = document.querySelector("#error-type");
    const errorDetails = document.querySelector("#error-details");

    function clearDisplay() {

        heading.textContent = "";
        const allTableElements = document.querySelectorAll("table");
        for (let i = 0; i < allTableElements.length; i += 1) {
            const tableElement = allTableElements[i];
            tableElement.style.display = "none";
        }

        errorType.textContent = "";
        errorDetails.textContent = "";
    }

    clearDisplay()

    document.querySelector('#stud-gpa').onclick = function () {

        clearDisplay();

        computeStudentsGPA()
            .then(function (body) {
                if (body.error) throw new Error(body.error);
                console.log(body.attendance);
                alert("Started Batch Job");
            })
            .catch(function (error) {
                errorType.textContent = "XXXXXXXX";
                errorDetails.textContent = error.message;
            });
    }

    document.querySelector('#mod-attendance').onclick = function () {

        clearDisplay()

        generateAttendance()
            .then(function (body) {
                if (body.error) throw new Error(body.error);
                console.log(body.attendance);
                heading.textContent = "Module Attendance";
                const table = document.querySelector("#module-attendance-table");
                table.style.display = "table";                
                // Render the body modules into the table with table body id="module-tbody
                const tbody = document.querySelector("#module-tbody");
                const attendances = body.attendance;
                for (let i = 0; i < attendances.length; i += 1) {
                    const attendance = attendances[i];
                    const row = document.createElement("tr");
                    const codeCell = document.createElement("td");
                    const nameCell = document.createElement("td");
                    const totalAttendanceCell = document.createElement("td");
                    const attendedCell = document.createElement("td");
                    const lateCell = document.createElement("td");
                    const absentCell = document.createElement("td");
                    codeCell.textContent = attendance.mod_code;
                    nameCell.textContent = attendance.session_date;
                    totalAttendanceCell.textContent = attendance.total_attendance;
                    attendedCell.textContent = attendance.attended;
                    lateCell.textContent = attendance.late;
                    absentCell.textContent = attendance.absent;
                    row.appendChild(codeCell);
                    row.appendChild(nameCell);
                    row.appendChild(totalAttendanceCell);
                    row.appendChild(attendedCell);
                    row.appendChild(lateCell);
                    row.appendChild(absentCell);
                    tbody.appendChild(row);
                }
            })
            .catch(function (error) {
                errorType.textContent = "XXXXXXXX";
                errorDetails.textContent = error.message;
            });
    }


    document.querySelector('#mod-performance').onclick = function () {

        clearDisplay()

        generateModulesPerformance()
            .then(function (body) {
                if (body.error) throw new Error(body.error);
                console.log(body.performance);
                heading.textContent = "Module Performance";
                const table = document.querySelector("#module-performance-table");
                table.style.display = "table";
                // Render the body modules into the table with table body id="module-tbody
                const tbody = document.querySelector("#module-performance-tbody");
                const performances = body.performance;
                for (let i = 0; i < performances.length; i += 1) {
                    const performance = performances[i];
                    const row = document.createElement("tr");
                    const moduleCell = document.createElement("td");
                    const gradeCell = document.createElement("td");
                    const gradeCountCell = document.createElement("td");

                    moduleCell.textContent = performance.modRegistered;
                    gradeCell.textContent = performance.grade;
                    gradeCountCell.textContent = performance.gradeCount;
                    row.appendChild(moduleCell);
                    row.appendChild(gradeCell);
                    row.appendChild(gradeCountCell);
      
                    tbody.appendChild(row);
                }
            })
            .catch(function (error) {
                errorType.textContent = "XXXXXXXX";
                errorDetails.textContent = error.message;
            });
    }


});
