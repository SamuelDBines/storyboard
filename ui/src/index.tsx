import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import UserContext, { IUser, initUser } from './context/user-context';

import ViewProjects from './pages/view-projects/view-projects';
import CreateStoryBoard from './pages/create-storyboards/create-storyboards';
import Register from './pages/register/register';
import Login from './pages/login/login';

import App from './App';
import { get } from './utils/fetch';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <CreateStoryBoard />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "projects",
        element: <ViewProjects />,
      }
    ]
  },

]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const Index = () => {
  const [user, setUser] = React.useState<IUser>(initUser);
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ ...user, token });
    }
    get('/users/me').then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  }, []);
  return (<React.StrictMode>
    <UserContext.Provider value={{
      ...user,
      setUserData: (name: string, email: string, token: string) => setUser({ name, email, token })
    }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  </React.StrictMode>);
};
root.render(
  <Index />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
