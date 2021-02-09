let username = localStorage.getItem('username');
window.onload = function () {
    fetch('http://localhost:5500/users/' + username)
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
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text"> ${element.note}</p>
                        <button data-id="${element.id}" class="btn btn-primary" onclick="editNote(this)">Edit Note</button>
                        <button data-id="${element.id}" class="btn btn-primary" onclick="deleteNote(this)">Delete Note</button>
                    </div>
                </div>`;
        });
    }
    notes.innerHTML = html;
}

document.getElementById('addBtn').addEventListener('click', () => {
    let title = document.getElementById('addTitle').value;
    let note = document.getElementById('addTxt').value;
    if (title.trim() == "" && note.trim() == "") {
        document.getElementById('addTitle').style.border = "2px solid red";
        document.getElementById('addTxt').style.border = "2px solid red";
        document.getElementById('label').style.display = 'inline';
        return false;
    }
    if (title.trim() == "") {
        document.getElementById('addTitle').style.border = "2px solid red";
        document.getElementById('addTxt').style.border = "1px solid gray";
        document.getElementById('label').style.display = 'inline';
        return false;
    }
    if (note.trim() == "") {
        document.getElementById('addTxt').style.border = "2px solid red";
        document.getElementById('addTitle').style.border = "1px solid gray";
        document.getElementById('label').style.display = 'inline';
        return false;
    }
    fetch('http://localhost:5500/users/post/' + username,
        {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ title: title, note: note })
        })
        .then((response) => response.json())
        .then((data) => {
            location.reload();
        });
});

function editNote(element) {
    let title = document.getElementById('addTitle');
    let note = document.getElementById('addTxt');
    let id = parseInt(element.getAttribute('data-id'));
    fetch('http://localhost:5500/users/' + username + '/' + id)
        .then((response) => response.json())
        .then((data) => {
            title.value = data[0].title;
            note.value = data[0].note;
        });
    document.getElementById('addBtn').style.display = 'none';
    document.getElementById('editBtn').style.display = 'inline';
    document.getElementById('editBtn').addEventListener('click', () => {
        if (title.value.trim() == "" && note.value.trim() == "") {
            document.getElementById('addTitle').style.border = "2px solid red";
            document.getElementById('addTxt').style.border = "2px solid red";
            document.getElementById('label').style.display = 'inline';
            return false;
        }
        if (title.value.trim() == "") {
            document.getElementById('addTitle').style.border = "2px solid red";
            document.getElementById('addTxt').style.border = "1px solid gray";
            document.getElementById('label').style.display = 'inline';
            return false;
        }
        if (note.value.trim() == "") {
            document.getElementById('addTxt').style.border = "2px solid red";
            document.getElementById('addTitle').style.border = "1px solid gray";
            document.getElementById('label').style.display = 'inline';
            return false;
        }
        fetch('http://localhost:5500/users/edit/' + username + '/' + id, {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify({ title: title.value, note: note.value })
        })
            .then((response) => response.json())
            .then((data) => {
                document.getElementById('editBtn').style.display = 'none';
                document.getElementById('addBtn').style.display = 'inline';
                location.reload();
            });
    });
}

function deleteNote(element) {
    let id = parseInt(element.getAttribute('data-id'));
    fetch('http://localhost:5500/users/delete/' + username + '/' + id, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .then((data) => {
            location.reload();
        });
}