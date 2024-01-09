import { json, redirect } from "react-router-dom";
import SignupForm from "../components/User/SignupForm";
import { useContext } from "react";
import AuthContext from "../store/auth-context";

let authContext;

const SignupPage = () => {
  authContext = useContext(AuthContext);
  return <SignupForm />;
};

// create new user
export async function action({ request }) {
  const formData = await request.formData();

  const user = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  };

  let response = await fetch(`/api/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (response.status === 400) {
    return response;
  }

  if (!response.ok) {
    throw json(
      { message: "Sign up failed due to an error..." },
      { status: 500 }
    );
  }

  let responseData = await response.json();
  const token = responseData.token;
  localStorage.setItem("token", token);
  if (responseData.options && responseData.options.expires) {
    localStorage.setItem("expiration", responseData.options.expires);
  }

  const authorization = `Bearer ${token}`;
  // get user id
  response = await fetch(`/api/v1/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: authorization,
    },
  });

  responseData = await response.json();

  if (!response.ok) {
    throw json({ message: "Error fetching logged-in user" }, { status: 500 });
  }

  const newUser = {
    _id: responseData.data._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  localStorage.setItem("_id", newUser._id);
  localStorage.setItem("name", newUser.name);
  localStorage.setItem("email", newUser.email);
  localStorage.setItem("role", newUser.role);

  authContext.login(newUser);

  return redirect("/");
}

export default SignupPage;
