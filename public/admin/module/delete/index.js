window.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form'); // Only have 1 form in this HTML
    form.onsubmit = function (e) {
        e.preventDefault(); // prevent using the default submit behavior

        const code = form.querySelector('input[name=code]').value;

        const token = localStorage.getItem('token');
        // Make a request to delete the module
        fetch(`/modules/${code}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            if (response.ok) {
                // If successful, redirect to /modules
                alert(`Module ${code} deleted!`);
                // Clear the input field
                form.querySelector("input[name=code]").value = "";
            } else {
                // If fail, show the error message
                response.json().then(function (data) {
                    alert(`Error deleting module ${code} - ${data.error}`);
                });
            }
        })
            .catch(function (error) {
                alert(`Error updating module ${code}`);
            });
    };
});
