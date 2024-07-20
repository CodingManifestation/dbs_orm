function fetchModule(code) {

    const token = localStorage.getItem('token');

    return fetch(`/modules/${code}`,{
        headers: {  'Authorization': `Bearer ${token}`} 
    }).then(function (response) {
        return response.json();
    });
}

window.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form'); // Only have 1 form in this HTML

    // Adding module to table
    form.onsubmit = function (e) {
        e.preventDefault(); // prevent using the default submit behavior
        const code = form.querySelector('input[name=code]').value;
        addToTable(code, '???', '???');
    };

    // Retrieving Module information
    document.querySelector('#retrieve').onclick = function () {
        const rows = document.querySelectorAll('tbody tr');

        // Here we used row.length number of queries.
        // A better approach is to use 1 query to retrieve all the modules
        for (let i = 0; i < rows.length; i += 1) {
            const row = rows[i];
            const code = row.querySelector('td:first-child').textContent;
            const nameCell = row.querySelector('td:nth-child(2)');
            const creditCell = row.querySelector('td:nth-child(3)');

            nameCell.textContent = 'Loading...';
            creditCell.textContent = 'Loading...';
            fetchModule(code)
                .then(function (body) {
                    if (body.error) throw new Error(body.error);
                    nameCell.textContent = body.module.modName;
                    creditCell.textContent = body.module.creditUnit;
                })
                .catch(function (error) {
                    nameCell.textContent = 'XXXXXXXX';
                    creditCell.textContent = error.message;
                });
        }
    };

});
