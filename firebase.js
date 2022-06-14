import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs,addDoc,doc, orderBy,onSnapshot } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCna8jgJSr4FW4Onj9s48OaKUDEfEpkrIw",
  authDomain: "bccad-fyp.firebaseapp.com",
  projectId: "bccad-fyp",
  storageBucket: "bccad-fyp.appspot.com",
  messagingSenderId: "1093101215159",
  appId: "1:1093101215159:web:d25126b60ee7ee9c191c32"
};

// Initialize Firebase

let app = initializeApp(firebaseConfig);


const db = getFirestore(app);
const chat_collection = collection(db,'chats');


async function saveMessage(message){
    const docRef = await addDoc(chat_collection,message);
    console.log(docRef.id);
}

export {saveMessage,chat_collection};