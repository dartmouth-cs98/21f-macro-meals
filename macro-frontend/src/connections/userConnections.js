/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const userLogin = (un, pw) => {
  axios
    .post('https://macro-cs98.herokuapp.com/api/user/login', {
      username: un,
      password: pw,
    })
    .then((result) => {
      if (result.status === 'success') {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      alert(error);
    });
};

export const userRegister = (un, pw) => {
  axios
    .post('https://macro-cs98.herokuapp.com/api/user/register', {
      username: un,
      password: pw,
    })
    .then((result) => {
      if (result.status === 'success') {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      alert(error);
    });
};
