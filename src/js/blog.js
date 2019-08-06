import db from '../../src/js/fb'

const wrapper = document.querySelector('#wrapper');

const form = document.querySelector('#form');

const titleField = document.querySelector('#title');

const dscrField = document.querySelector('#dscr');

let _update_data_firebase = null;

let _title_data_firebase = null;

// offline data 

db.enablePersistence()
    .catch(err => {
        if (err.code == 'failed-precondition') {
            console.log('failed-precondition')
        } else if (err.code == 'unimplemented') {
            console.log('unimplemented')
        }
    });

// real-time data

db.collection('posts').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
            const html = `
                <div class="col s12 z-depth-1 post" data-id="${change.doc.id}">
                    <h5 class="title" data-id="${change.doc.id}">${change.doc.data().title}</h5>
                    <input type="text" value="${change.doc.data().title}" class="field hide" data-id="${change.doc.id}" autofocus>
                    <p>${change.doc.data().dscr}</p>
                    <a class="delete"><i class="material-icons delete-icon" data-id="${change.doc.id}">delete</i></a>
                    <a class="edit"><i class="material-icons edit-icon" data-id="${change.doc.id}">edit</i></a>
                </div>
            `;
            wrapper.innerHTML += html;
            _update_data_firebase = document.querySelector(`.field[data-id="${change.doc.id}"]`);
            _title_data_firebase = document.querySelector(`.title[data-id="${change.doc.id}"]`);
        } else if (change.type === 'removed') {
            const post = document.querySelector(`.post[data-id="${change.doc.id}"]`);
            post.remove()
        } else if (change.type === 'modified') {
            _title_data_firebase.textContent = change.doc.data().title
        }
    })
});

// update

wrapper.addEventListener('click', evt => {
    if (evt.target.classList.contains('edit-icon')) {
        _update_data_firebase.classList.remove('hide');
        _title_data_firebase.classList.add('hide');
        _update_data_firebase.addEventListener('keyup', evt => {
            if (evt.key === 'Enter') {
                db.collection('posts').doc(evt.target.dataset.id).update({
                    title: _update_data_firebase.value
                });
                _update_data_firebase.classList.add('hide');
                _title_data_firebase.classList.remove('hide')
            } else if (evt.key === 'Escape') {
                _update_data_firebase.classList.add('hide');
                _title_data_firebase.classList.remove('hide')
            }
        })
    }
});

// remove

wrapper.addEventListener('click', evt => {
    if (evt.target.classList.contains('delete-icon')) {
        db.collection('posts').doc(evt.target.dataset.id).delete()
    }
});

// add

form.addEventListener('submit', evt => {
    evt.preventDefault();
    db.collection('posts').add({
        title: titleField.value,
        dscr: dscrField.value
    });
    titleField.value = '';
    dscrField.value = ''
})