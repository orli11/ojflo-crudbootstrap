import express from 'express';
import cors from 'cors';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCHd9IzUcANGbu_mcQy7a0Zgo8kB18eLmY",
    authDomain: "back-and-front.firebaseapp.com",
    projectId: "back-and-front",
    storageBucket: "back-and-front.appspot.com",
    messagingSenderId: "893589415820",
    appId: "1:893589415820:web:5fb12ac302de47e9a698a9"
};

const firebase = initializeApp(firebaseConfig);
const db = getFirestore();

//Settings de la aplicaión
const app = express();
app.use(express.json());
app.use(cors());

//Rutas
app.get('/', async(req, res) => {
    try {
        //Conexión a la colección de la base de datos
        const Users = await collection(db, 'Users');
        const ListUsers = await getDocs(Users);
        const aux = []
        ListUsers.forEach((doc) => {
            const obj = {
                id: doc.id,
                ...doc.data()
            }
            aux.push(obj)
        })
        res.send({
            'msg': 'success',
            'data': aux
        });
    } catch (error) {
        res.send({
            'msg': 'error',
            'data': error
        });
    }
});

//Ruta para crear un nuevo usuario
app.post('/create', async(req, res) => {
    try{
        const body = req.body;
        const Users = await collection(db, 'Users');
        await addDoc(Users, body)
        res.send({
            'msg': 'success',
        });
    } catch(error) {
        res.send({
            'msg': 'error',
            'data': error
        });
    } 
});

//Ruta para eliminar un usuario
app.get('/delete/:id', async( req, res ) => {
    const id = req.params.id;
    try {
        await deleteDoc(doc(db, 'Users', id));
        res.send({
            'msg': 'user delete'
        });
    } catch (error) {
        res.send({
            'msg': 'error',
            'data': error
        });
    }
   
});

//Ruta par actualizar usuario 
app.get('/get-update/:id', async (req, res) => {
    const id = req.params.id;
    const userRef = doc(db, 'Users', id);
    const user = await getDoc(userRef);

    if(user.exists()) {
        res.send({
            'msg': 'success',
            'data': user.data()
        });
    } else {
        res.send({
            'msg': 'user doesnt exist'
        });
    }
});
//update
app.post('/update', async(req, res) => {
   const {id, firstname, lastname, address, phone } = req.body;
   const newData = {
        firstname,
        lastname,
        address,
        phone
   }
   await updateDoc(doc(db, 'Users', id), newData);
   res.send({
    'msg': 'success'
   });
})





//Servidor
app.listen(9000, () => {
    console.log('Servidor trabajando');
});