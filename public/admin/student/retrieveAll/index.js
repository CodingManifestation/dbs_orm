function fetchStudents() {

    const token = localStorage.getItem("token");

    return fetch(`/students`,{
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(function (response) {
      return response.json();
    });
  }

window.addEventListener('DOMContentLoaded', function () {
    // Fetch all students in the database from the Backend
    // Add each row returned onto the HTML table

    fetchStudents()
    .then(function (body) {
      if (body.error) throw new Error(body.error);
      console.log(body.students);
      // Render the body modules into the table with table body id="module-tbody
      const tbody = document.querySelector("#student-tbody");
      const students = body.students;
      for (let i = 0; i < students.length; i += 1) {
        const student = students[i];
        const row = document.createElement("tr");
        const adminNo = document.createElement("td");
        const studentName = document.createElement("td");
        const gender = document.createElement("td");
        const courseCode = document.createElement("td");
        const gpa = document.createElement("td");
        const gpaLastUpdated = document.createElement("td");
        adminNo.textContent = student.admNo;
        studentName.textContent = student.studName;
        gender.textContent = student.gender;
        courseCode.textContent = student.crseCode;
        gpa.textContent = student.gpa;
        gpaLastUpdated.textContent = student.gpaLastUpdated ? student.gpaLastUpdated.slice(0, 10):"";
        row.appendChild(adminNo);
        row.appendChild(studentName);
        row.appendChild(gender);
        row.appendChild(courseCode);
        row.appendChild(gpa);
        row.appendChild(gpaLastUpdated);
        tbody.appendChild(row);
      }
    })
    .catch(function (error) {
      // studentName.textContent = "XXXXXXXX";
      // creditCell.textContent = error.message;
    });

});
