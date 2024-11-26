import React, { useState } from 'react';
import { Form, Input, Segment, Header } from 'semantic-ui-react';
import { auth, googleProvider } from './utils/firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import './SignUp.css'; // Import CSS file

const SignUp = ({ onSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onSignUp();
    } catch (error) {
      alert(`Signup failed: ${error.message}`);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onSignUp();
    } catch (error) {
      alert(`Google signup failed: ${error.message}`);
    }
  };

  return (
    <Segment>
      <Header as="h2">Signup</Header>
      <Form>
        <Form.Field>
          <label>Email</label>
          <Input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Field>
        <button className="signup-button" onClick={handleEmailSignUp}>
          Signup
        </button>
        <button className="google-signup-button" onClick={handleGoogleSignUp}>
          Signup with Google
        </button>
      </Form>
    </Segment>
  );
};

export default SignUp;
