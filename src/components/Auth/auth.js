import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import './auth.scss';

const loginButton = () => {
  const domString = `
    <button id ="google-auth" class="btn btn-light">Login</button>
  `;
  $('#auth').html(domString);
  $('#google-auth').on('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
    // console.log('you clicked');
  });
};

export default loginButton;
