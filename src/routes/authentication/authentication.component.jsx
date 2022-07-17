import React from 'react';
import SignUpComponent from '../sign-up/sign-up.component';
import SignInComponent from '../sign-in/sign-in.component';

const Authentication = () => {
    return (
        <div>
            <SignInComponent></SignInComponent>
            <SignUpComponent></SignUpComponent>
        </div>
    );
};

export default Authentication;