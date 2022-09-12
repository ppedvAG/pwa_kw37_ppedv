if ('serviceWorker' in navigator) { // über Objekt navigator kann man den Browser ansprechen
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            // returns: Promise<ServiceWorkerRegistration>
            .then(reg => {
                console.log('Service worker registered: ', reg);
            });
    });
}

fetch('https://jsonplaceholder.typicode.com/todos')
.then(r => r.json()) // um json-Array in ein JS-Array zu formatieren (deserialisieren)
.then(arr => giveTable(arr));

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