import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Config Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC3V2a2bfr0zeGSWI9zlPZcCX6v2nv_L_c",
    authDomain: "mockproject-prn231.firebaseapp.com",
    projectId: "mockproject-prn231",
    storageBucket: "mockproject-prn231.appspot.com",
    messagingSenderId: "654170447147",
    appId: "1:654170447147:web:7e0e5f33c71ad110fdb96e"
};

// Firebase initial
const app = initializeApp(firebaseConfig);

// Initial Firebase Storage
const storage = getStorage(app);

export { storage };
