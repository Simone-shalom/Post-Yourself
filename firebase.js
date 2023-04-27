// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-fR1ZlhaQbYZVuhGE_xc0tBDVarUEkJs",
  authDomain: "sonny-fb.firebaseapp.com",
  projectId: "sonny-fb",
  storageBucket: "sonny-fb.appspot.com",
  messagingSenderId: "250197244726",
  appId: "1:250197244726:web:8e6d1fff41557b65341197",
  measurementId: "G-2XGKP11MFP"
};

// Initialize Firebase
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore()
export const storage = getStorage() 