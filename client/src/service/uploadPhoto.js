import axios from 'axios';

const uploadPhoto = (photo, signedUrl) => {
  return axios.put(signedUrl, photo, {
    headers: {
      'Content-Type': photo.type,
    },
  });
};

export default uploadPhoto;
