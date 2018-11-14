// import $ from 'jquery';
import firebase from 'firebase/app';
import 'bootstrap';
import './index.scss';

import apiKeys from '../db/apiKeys.json';

import createNavbar from './components/Navbar/navbar';
import loginButton from './components/Auth/auth';

const initlializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  createNavbar();
  loginButton();
};

initlializeApp();

