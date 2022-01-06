import { initializeApp, getApps, getApp } from "firebase/app";

import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDH9MPSMbPOoQRN6C3tNRETjgf8lmq-o_U",
	authDomain: "next-mastify.firebaseapp.com",
	projectId: "next-mastify",
	storageBucket: "next-mastify.appspot.com",
	messagingSenderId: "437340436858",
	appId: "1:437340436858:web:9fe51eae5df0ad434dbec3",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const storage = getStorage();

const deletePos = async (id) => {
	await deleteDoc(doc(db, "posts", id));
};

export { app, db, storage, deletePos };
