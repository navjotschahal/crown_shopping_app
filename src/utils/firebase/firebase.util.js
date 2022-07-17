// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Authentication libraries import from firebase
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword, getRedirectResult, signInWithEmailAndPassword
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5blgoESy_LmrPZoafGHQLeq2j27JmFrk",
  authDomain: "crown-clothing-db-6b1f3.firebaseapp.com",
  projectId: "crown-clothing-db-6b1f3",
  storageBucket: "crown-clothing-db-6b1f3.appspot.com",
  messagingSenderId: "839300667876",
  appId: "1:839300667876:web:bb603ab492d5ead99b0ff1"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// provider flow
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

// Auth instance
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// Data-Base DB
export const db = getFirestore();

export const createUserDocumentFromAuth = async (authenticatedUser, additionalInformation={}) => {
    const userDocRef = doc(db, 'users', authenticatedUser.uid);

    console.log(userDocRef);

    const userDocSnapshot = await getDoc(userDocRef);

    console.log(userDocSnapshot, userDocSnapshot.exists());

    if(!userDocSnapshot.exists()) {
        const { displayName, email } = authenticatedUser;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log('Error in creating the user : ', error.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
        return;
    }
    return await createUserWithEmailAndPassword(auth, email, password);
}

/**
 * a wrapper around firebase @see getRedirectResult from firebase/auth
 * @param auth_ : Auth from firebase/auth
 * @returns 
 */
export const getRedirectResult_ = async (auth_) => {
    return await getRedirectResult(auth_);
}

/**
 * 
 * @param auth_ : Auth from firebase/auth
 * @returns 
 */
export const signInAuthUserWithEmailAndPassword = async (auth_, email, password) => {
    if (!email || !password) {
        return;
    }
    return await signInWithEmailAndPassword(auth_, email, password);
}
