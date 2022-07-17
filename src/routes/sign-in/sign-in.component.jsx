import React, { useState, useEffect } from "react";
import {
  auth,
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  getRedirectResult_,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.util";
import FormInputComponent from "../../components/form-input/form-input.component";
import "./sign-in.styles.scss";
import Button from "../../components/button/button.component";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInComponent = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { email, password } = formFields;

  console.log(formFields);

  const resetSignInForm = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await signInAuthUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(result);
      alert("Sign-in succesfull.");
      resetSignInForm();
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("Sign-in FAILED. " + error.message);
          break;

        case "auth/wrong-password":
          alert("Sign-in FAILED. " + error.message);
          break;

        default:
          console.log(
            "user sign-in via e&p encountered an error ",
            error.message
          );
          break;
      }
    }
  };

  const signInUsingGooglePopup = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
    const userDocRef = await createUserDocumentFromAuth(response.user);
  };

  const signInUsingGoogleRedirect = async () => {
    const response = await getRedirectResult_(auth);
    if (response != null) {
      const userDocRef = await createUserDocumentFromAuth(response.user);
    }
    console.log(response);
  };

  useEffect(() => {
    signInUsingGoogleRedirect();
  }, []);

  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <span>Sign-In with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInputComponent
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInputComponent
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <Button type="submit">Sign-In</Button>
      </form>
      <Button onClick={signInUsingGooglePopup}>
        Sign-In with Google Popup
      </Button>
      <Button onClick={signInWithGoogleRedirect}>
        Sign-In with Google Redirect
      </Button>
    </div>
  );
};

export default SignInComponent;
