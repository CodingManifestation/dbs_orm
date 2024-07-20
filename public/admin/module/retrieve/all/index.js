function fetchModule() {
  // Get token from localStorage
  const token = localStorage.getItem('token');

  return fetch(`/modules`,{
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  }).then(function (response) {
    return response.json();
  });
}

window.addEventListener('DOMContentLoaded', function () {
  // Fetch all modules in the database from the Backend
  // Add each row returned onto the HTML table using the addToTable function found in ../helper.js

  fetchModule()
    .then(function (body) {
      if (body.error) throw new Error(body.error);
      console.log(body.modules);
      // Render the body modules into the table with table body id="module-tbody
      const tbody = document.querySelector("#module-tbody");
      const modules = body.modules;
      for (let i = 0; i < modules.length; i += 1) {
        const module = modules[i];
        const row = document.createElement("tr");
        const codeCell = document.createElement("td");
        const nameCell = document.createElement("td");
        const creditCell = document.createElement("td");
        codeCell.textContent = module.modCode;
        nameCell.textContent = module.modName;
        creditCell.textContent = module.creditUnit;
        row.appendChild(codeCell);
        row.appendChild(nameCell);
        row.appendChild(creditCell);
        tbody.appendChild(row);
      }
    })
    .catch(function (error) {
      nameCell.textContent = "XXXXXXXX";
      creditCell.textContent = error.message;
    });

});
