
window.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form'); // Only have 1 form in this HTML
    form.onsubmit = function (e) {
        e.preventDefault(); // prevent using the default submit behavior        
        // Get form inputs
        const adminNumber = document.querySelector('#adminNumber').value;
        const studentName = document.querySelector('#studentName').value;
        const gender = document.querySelector('#gender').value;
        const address = document.querySelector('#address').value;
        const dob = document.querySelector('#dob').value;
        const nationality = document.querySelector('#nationality').value;
        const courseCode = document.querySelector('#courseCode').value;
        
        // Create student object
        const student = {
            adminNumber: 'A' + adminNumber,
            studentName: studentName,
            gender: gender,
            address: address,
            dob: dob,
            nationality: nationality,
            courseCode: courseCode
        };
        
        const token = localStorage.getItem('token');

        // Send POST request to "/enrol" endpoint
        fetch('/students/enrolNewStudent', {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        }).then(function (response) {
            if (response.ok) {
                alert(`Student with admin no ${adminNumber} enrolled!`);
            } else {
                // If fail, show the error message
                response.json().then(function (data) {
                    alert(data.error);
                });
            }
        })
        .catch(function (error) {
            alert(`Error enroling student`);
        });  
    };
})