import React from "react";
import "./login.css";
import { post } from "../../utils/fetch";
import TextField from "../../components/TextField/TextField";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const login = () => {
    post('/token', {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response);
      // navigate('/');
    }).catch((error) => {
      console.log(error);
    });
  };
  return (
    <div className="login-card">
      <h1>Login</h1>
      <TextField label="Username" value={username} setValue={setUsername} />
      <TextField type="password" label="Password" value={password} setValue={setPassword} />
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;