import axios from 'axios';
import { BACKEND_URL } from 'constants';

const getSignedUrl = ({ action, fileName, fileType, token }) => {
  return axios.get(`${BACKEND_URL}/signedUrl`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      action,
      fileName,
      fileType,
      token,
    },
  });
};

export default getSignedUrl;
