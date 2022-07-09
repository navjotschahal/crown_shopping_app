import React, { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.util';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpComponent = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);

    const { displayName, email, password, confirmPassword } = formFields;

    console.log(formFields);

    const resetSignUpForm = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Your password does not match !');
            return;
        }

        try {
            const result = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(result.user, {displayName});
            console.log(result);
            resetSignUpForm();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('User sign-up failed! as email already in use.')
            } else {
                
            }
            console.log('user creation via e&p encountered an error ', error.message)
        }

    }

    return (
        <div>
            <h1>Sign-Up with your email and password :</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input type="text" required onChange={handleChange} name='displayName' value={displayName}/>
                <label>Email</label>
                <input type="email" required onChange={handleChange} name='email' value={email}/>
                <label>Password</label>
                <input type="password" required onChange={handleChange} name='password' value={password}/>
                <label>Confirm Password</label>
                <input type="password" required onChange={handleChange} name='confirmPassword' value={confirmPassword}/>
                <button type="submit">Sign-Up</button>
            </form>
        </div>
    );
};

export default SignUpComponent;