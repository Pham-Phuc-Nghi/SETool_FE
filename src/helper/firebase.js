import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCKtxmHWypgK348e6t1DHkBr0dgxI9IgN4",
    authDomain: "setool-storeimages.firebaseapp.com",
    projectId: "setool-storeimages",
    storageBucket: "setool-storeimages.appspot.com",
    messagingSenderId: "836460291972",
    appId: "1:836460291972:web:6baa1cfa6e00274b279fd1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);