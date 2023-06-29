import { initializeApp } from 'firebase/app';
import {config} from './config'
import { collection, getFirestore, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getMessaging } from "firebase/messaging";
import { getDatabase } from "firebase/database";
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";
export const app = initializeApp(config);
export const firestoreDb = getFirestore(app);
export const auth = getAuth(app)
export const db = getDatabase(app);
export const messaging = getMessaging(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
export const database = {
    users: collection(firestoreDb,"users"),
    docs: collection(firestoreDb,"docs"),
    files: collection(firestoreDb,"files"),
    date: serverTimestamp()
  };