//Variables y constantes globales
const users =document.getElementById('users');
const templateUser = document.getElementById('template-user').content;
const fragment = document.createDocumentFragment();
const btnSave = document.getElementById('btnSave');
let idUpdate = null;


//Eventos de mi página
document.addEventListener('DOMContentLoaded', () => {
    loadData();
});
btnSave.addEventListener('click', (e) => {
    e.preventDefault();
    sendData();
});


//Funciones
const sendData = () => {
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    if(firstname.trim().length !== 0 && lastname.trim().length !== 0) {
        const obj = {
            firstname,
            lastname,
            address,
            phone
        }
        fetch('http://localhost:9000/create', {

            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(async(res) => {
            const resultado = await res.json();
            if(resultado.msg === 'success'){
                loadData()
            }
        }).catch((error) => {
            console.log(error);
        });
    }
}

const loadData = async() => {
    const data = await fetch('http://localhost:9000/');
    const usuarios = await data.json();
    if(usuarios.msg === 'success') {
        drawUsers(usuarios.data);
    } 
}

const drawUsers = (items) => {
    users.innerHTML = '';
    items.forEach((user) => {
        const clone = templateUser.cloneNode(true);
        clone.querySelectorAll('td')[0].textContent = user.firstname;
        clone.querySelectorAll('td')[1].textContent = user.lastname;
        clone.querySelectorAll('td')[2].textContent = user.address;
        clone.querySelectorAll('td')[3].textContent = user.phone;
        clone.querySelector('.btn-danger').dataset.id = user.id;
        clone.querySelector('.btn-warning').dataset.id = user.id;

        //Evento para borrar 
        const btnDelete = clone.querySelector('.btn-danger');
            btnDelete.addEventListener('click', () => {
            console.log('Espera funcion', btnDelete.dataset.id);
            deleteUser(btnDelete.dataset.id);
        });
        
        //Evento para actualizar
        const btnUpdate = clone.querySelector('.btn-warning');
            btnUpdate.addEventListener('click', () => {
            idUpdate = btnUpdate.dataset.id;
            window.location.replace(`/update-user.html?id=${idUpdate}`);
        })
       
        fragment.appendChild(clone);
    });
    users.appendChild(fragment);
}

//Funciones 
const deleteUser = async (id) => {
    //console.log('id =>', id);
    const res = await fetch(`http://localhost:9000/delete/${id}`);
    const result = await res.json();
    if(result.msg === 'user delete'){
        loadData(); //Cuando se haya borrado un usuario correctamente
    }
}