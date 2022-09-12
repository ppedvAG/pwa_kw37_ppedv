giveTable();

function giveTable(arr) {
    tableId.innerHTML = `
    <thead>
            <tr>
                <th>id</th>
                <th>userId</th>
                <th>title</th>
                <th>completed</th>
            </tr>
        </thead>
        <tbody id="tbodyId"></tbody>
        <tfoot>
            <tr>
                <th>id</th>
                <th>userId</th>
                <th>title</th>
                <th>completed</th>
            </tr>
        </tfoot>
    `;
    for (const item of arr) {
        let newRow = tbodyId.insertRow();
        newRow.insertCell().innerText = item.id;
        newRow.insertCell().innerText = item.userId;
        newRow.insertCell().innerText = item.title;
        newRow.insertCell().innerText = item.completed;
    }
}