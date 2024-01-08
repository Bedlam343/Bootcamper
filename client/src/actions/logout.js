import axios from "axios";
import { redirect } from "react-router-dom";

import { BACKEND_URL } from "constants";

const logout = async () => {
  try {
    const token = localStorage.getItem("token");
    await axios.get(`${BACKEND_URL}/api/v1/auth/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
  localStorage.removeItem("token");
  return true;
};

export default logout;
