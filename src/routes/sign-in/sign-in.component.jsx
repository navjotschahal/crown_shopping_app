import React from 'react';
import { createUserDocumentFromAuth, signInWithGooglePopup } from '../../utils/firebase/firebase.util';

const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
        const userDocRef = await createUserDocumentFromAuth(response.user);
    }
    return (
        <div className='sign-in-container'>
            <h1>Sign-In Page</h1>
            <button onClick={logGoogleUser}>
                Sign-In with Google Popup
            </button>
        </div>
    );
};

export default SignIn;