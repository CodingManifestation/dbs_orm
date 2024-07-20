window.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form'); // Only have 1 form in this HTML
    form.onsubmit = function (e) {
        e.preventDefault(); // prevent using the default submit behavior

        const staffNumber = document.querySelector('#staffNumber').value;
        const departmentCode = document.querySelector('#departmentCode').value;
        
        // Create student object
        const staff = {
            staffNumber: staffNumber,
            departmentCode: departmentCode
        };

        const token = localStorage.getItem('token');

        // Send POST request to "/enrol" endpoint
        fetch('/staff/transferStaff', {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(staff)
        }).then(function (response) {
            if (response.ok) {
                alert(`Staff with staff number ${staffNumber} transferred!`);
            } else {
                // If fail, show the error message
                response.json().then(function (data) {
                    alert(data.error);
                });
            }
        })
        .catch(function (error) {
            alert(`Error transferring staff`);
        });       
    };
});
