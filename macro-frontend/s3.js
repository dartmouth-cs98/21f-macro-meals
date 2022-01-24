import axios from 'axios';

async function getSignedRequest(file) {
  // hit our own server to get a signed s3 url
  // const result = await axios.get(`https://macro-cs98.herokuapp.com/api/sign-s3?file-name=${fileName}&file-type=${file.type}`);
  let filename = '';
  if (file.name) {
    filename = file.name;
  } else {
    const today = new Date();
    const date = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;
    const time = `${today.getHours()}${today.getMinutes()}${today.getSeconds()}`;
    filename = `${date}T${time}`;
  }
  const result = await axios.get(`https://macro-cs98.herokuapp.com/api/sign-s3?file-name=${filename}&file-type=image/jpeg`);
  console.log('PINGING API');
  console.log(result);
  return result;
}

// return a promise that uploads file directly to S3
// note how we return the passed in url here rather than any return value
// since we already know what the url will be - just not that it has been uploaded
function uploadFileToS3(signedRequest, file, url) {
  console.log(signedRequest);
  console.log(file);
  console.log(url);
  return new Promise((fulfill, reject) => {
    axios.put(signedRequest, file, { headers: { 'Content-Type': 'image/jpeg', 'Access-Control-Allow-Origin': 'http://localhost:19006/' } }).then((response) => {
      console.log(response);
      fulfill(url);
    }).catch((error) => {
      reject(error);
    });
  });
}

// eslint-disable-next-line import/prefer-default-export
export function uploadImage(file) {
  // returns a promise so you can handle error and completion in your component
  let photo = file;
  if (file._data) {
    photo = file._data;
  }
  return getSignedRequest(photo).then((response) => {
    return uploadFileToS3(response.data.signedRequest, photo, response.data.url);
  });
}
