window.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form'); // Only have 1 form in this HTML
    form.onsubmit = function (e) {
        e.preventDefault(); // prevent using the default submit behavior

        const code = form.querySelector('input[name=code]').value;
        const credit = form.querySelector('input[name=credit]').value;

        const token = localStorage.getItem('token');
        // update Module credit by Code using fetch API with method PUT
        fetch(`/modules/${code}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                credit: credit,
            }),
        })
            .then(function (response) {
                if (response.ok) {
                    alert(`Module ${code} updated!`);
                    // Clear the input field
                    form.querySelector("input[name=code]").value = "";
                    form.querySelector("input[name=credit]").value = "";
                } else {
                    // If fail, show the error message
                    response.json().then(function (data) {
                        alert(`Error updating module ${code} - ${data.error}`);
                    });
                }
            })
            .catch(function (error) {
                alert(`Error updating module ${code}`);
            });
    };
});
