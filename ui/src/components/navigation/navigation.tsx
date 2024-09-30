import React from 'react';
import './navigation.css';
import { Link } from 'react-router-dom';

interface INavigationLink {
  name: string;
  url: string;
}

const links: INavigationLink[] = [
  {
    name: 'Home',
    url: '/'
  },
  {
    name: 'Projects',
    url: '/projects'
  }];

const Navigation = () => {
  return (
    <div className='navigation'>
      <div>
        {links.map((link, index) => <Link className='link-spacing' key={index} to={link.url}>{link.name}</Link>)}
      </div>
      <div>
        <Link className='link-spacing' to='/login'>Login</Link>
        <Link className='link-spacing' to='/register'>Register</Link>
      </div>
    </div>
  );
};

export default Navigation;