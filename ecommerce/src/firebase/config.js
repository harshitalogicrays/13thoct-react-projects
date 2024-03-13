import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyA4pLP0nXUy4d5oKNTiL68VEu_8-uknR8U",
  authDomain: "thoct-ecommerce.firebaseapp.com",
  projectId: "thoct-ecommerce",
  storageBucket: "thoct-ecommerce.appspot.com",
  messagingSenderId: "315004811338",
  appId: "1:315004811338:web:da00e653e132563cf2ceb3"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage=getStorage(app)
export default app