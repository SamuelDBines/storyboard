import { createContext } from 'react';

export interface IUser {
  name: string;
  email: string;
  token: string;
  setUserData?: (name: string, email: string, token: string) => void;
}

export const initUser: IUser = {
  name: '',
  email: '',
  token: '',
  setUserData: (name: string, email: string, token: string) => {
    initUser.name = name;
    initUser.email = email;
    initUser.token = token;
  }
};

const UserContext = createContext(initUser);

export default UserContext;