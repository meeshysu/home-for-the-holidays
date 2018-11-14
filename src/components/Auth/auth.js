import $ from 'jquery';
import './auth.scss';

const loginButton = () => {
  const domString = `
    <button id ="google-auth" class="btn btn-light">Login</button>
  `;
  $('#auth').html(domString);
  $('#google-auth').on('click', () => {
    console.log('you clicked');
  });
};

export default loginButton;
