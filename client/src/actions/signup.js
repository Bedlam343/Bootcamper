import axios from "axios";
import { redirect } from "react-router-dom";

const signup = async ({ request }) => {
  const formData = await request.formData();
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  };

  try {
    const response = await axios.post(`/api/v1/auth/register`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const token = response.data.token;

    localStorage.setItem("token", token);

    return redirect("/");
  } catch (error) {
    console.log(error);

    // Invalid credentials
    if (error.response.status === 400) {
      return error.response.data?.error;
    }

    return "Sign up failed. Try again later.";
  }
};

export default signup;
