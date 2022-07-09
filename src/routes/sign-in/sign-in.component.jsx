import { getRedirectResult } from 'firebase/auth';
import React, { useEffect } from 'react';
import { auth, createUserDocumentFromAuth, signInWithGooglePopup, signInWithGoogleRedirect } from '../../utils/firebase/firebase.util';
import SignUpComponent from '../sign-up/sign-up.component';

const SignIn = () => {
    const logGooglePopupUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
        const userDocRef = await createUserDocumentFromAuth(response.user);
    }

    const logGoogleRedirectUser = async () => {
        const response = await getRedirectResult(auth);
        if (response != null) {
            const userDocRef = await createUserDocumentFromAuth(response.user);
        }
        console.log(response);
    }

    useEffect(() => {
        logGoogleRedirectUser();
    }, [])

    return (
        <div className='sign-in-container'>
            <h1>Sign-In Page</h1>
            <button onClick={logGooglePopupUser}>
                Sign-In with Google Popup
            </button>
            <button onClick={signInWithGoogleRedirect}>
                Sign-In with Google Redirect
            </button>
            <SignUpComponent></SignUpComponent>
        </div>
    );
};

export default SignIn;