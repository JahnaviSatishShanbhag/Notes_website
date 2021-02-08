window.onload = function () {
    let username=localStorage.getItem('username');
    console.log(username);
    fetch('http://localhost:5500/users/'+username)
        .then((response) => response.json())
        .then((data) => {
            loadNotes(data);
        });
}

function loadNotes(data) {
    let notes = document.querySelector('#notes');
    let html = "";
    if (data.length == 0) {
        html = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
    else {
        data.forEach((element) => {
            html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Note</h5>
                        <p class="card-text"> ${element.note}</p>
                        <button class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
        });
    }
    notes.innerHTML = html;
}