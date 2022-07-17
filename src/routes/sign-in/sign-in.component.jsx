import { getRedirectResult } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth, createUserDocumentFromAuth, signInWithGooglePopup, signInWithGoogleRedirect } from '../../utils/firebase/firebase.util';
import SignUpComponent from '../sign-up/sign-up.component';
import Button from '../../components/button/button.component';
import FormInputComponent from '../../components/form-input/form-input.component';

const defaultLoginFormFields = {
    email: '',
    password: ''
}

const SignIn = () => {
    const [loginFormFields, setLoginFormFields] = useState(defaultLoginFormFields);

    const { email, password } = loginFormFields;

    const resetSigninForm = () => {
        setLoginFormFields(defaultLoginFormFields);
    }

    const handleLoginFormChange = (event) => {
        const {name, value} = event.target;
        setLoginFormFields({...loginFormFields, [name]: value});
    }

    // work in progress !
    const handleLoginFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const result = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(result.user, {displayName});
            console.log(result);
            resetSigninForm();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('User sign-up failed! as email already in use.');
            } else {
                console.log('user login via e&p encountered an error ', error.message);
            }
        }

    }


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
            <h2>I already have an account</h2>
            <span>Sign-In with your email and password</span>
            <form onSubmit={handleLoginFormSubmit}>
                <FormInputComponent label='Email' type="email" required onChange={handleLoginFormChange} name='email' value={email}/>
                <FormInputComponent label='Password' type="password" required onChange={handleLoginFormChange} name='password' value={password}/>
            </form>
            
            <Button onClick={logGooglePopupUser}>
                Sign-In with Google Popup
            </Button>
            <Button onClick={signInWithGoogleRedirect}>
                Sign-In with Google Redirect
            </Button>
            <SignUpComponent></SignUpComponent>
        </div>
    );
};

export default SignIn;