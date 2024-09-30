import React from "react";
import "./register.css";
import { post } from "../../utils/fetch";
import TextField from "../../components/TextField/TextField";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState<string>('');
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');

  const register = () => {
    post('/users', {
      email: email,
      username: username,
      password: password,
      // confirmPassword: confirmPassword
    }).then((response) => {
      console.log(response);
      navigate('/login');
    }).catch((error) => {
      console.log(error);
    });
  };
  return (
    <div className="register-card">
      <h1>Register</h1>
      <TextField label="Username" value={username} setValue={setUsername} />
      <TextField type="email" label="Email" value={email} setValue={setEmail} />
      <TextField type="password" label="Password" value={password} setValue={setPassword} />
      <TextField type="password" label="Confirm Password" value={confirmPassword} setValue={setConfirmPassword} />
      <button onClick={register}>Register</button>
    </div>
  );
};

export default Register;