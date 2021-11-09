/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const userLogin = (un, pw) => {
  axios
    .post('https://macro-cs98.herokuapp.com/api/user/login', {
      username: un,
      password: pw,
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      alert(error);
    });
};
