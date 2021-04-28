import firebaseApp from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBoi5thJf-V2TLSSZurzkmNGc7dP_CnKL4",
    authDomain: "consexual-dev.firebaseapp.com",
    projectId: "consexual-dev",
    storageBucket: "consexual-dev.appspot.com",
    messagingSenderId: "308478924855",
    appId: "1:308478924855:web:ec7a2888fc2959b3ec07b2"
  };

let fApp: firebaseApp.app.App
export function initialize(){
    fApp = firebaseApp.initializeApp(firebaseConfig)
}

export const db = (): firebaseApp.firestore.Firestore=>{
    return firebaseApp.firestore(fApp)
}

export default {
    initialize,
    db
}