import axios from "axios";

const logout = async () => {
  try {
    const token = localStorage.getItem("token");
    await axios.get(`/api/v1/auth/logout`, {
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
