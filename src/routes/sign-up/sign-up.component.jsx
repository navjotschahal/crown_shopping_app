import React, { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.util";
import FormInputComponent from "../../components/form-input/form-input.component";
import "./sign-up.styles.scss";
import Button from "../../components/button/button.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpComponent = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { displayName, email, password, confirmPassword } = formFields;

  console.log(formFields);

  const resetSignUpForm = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Your password does not match !");
      return;
    }

    try {
      const result = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(result.user, { displayName });
      alert(
        "Your sign-up is succesfull ! Proceed to log in using your email and password used for sign-up!"
      );
      console.log(result);
      resetSignUpForm();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("User sign-up failed! as email already in use.");
      } else {
        console.log(
          "user creation via e&p encountered an error ",
          error.message
        );
      }
    }
  };

  return (
    <div className="sign-up-container">
      {/* """ ' """ is escaped using &apos;  */}
      <h2>Don&apos;t have an account ?</h2>{" "}
      <span>Sign-Up with your email and password :</span>
      <form onSubmit={handleSubmit}>
        <FormInputComponent
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
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
        <FormInputComponent
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign-Up</Button>
      </form>
    </div>
  );
};

export default SignUpComponent;
