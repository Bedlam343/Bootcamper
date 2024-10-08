import axios from 'axios';
import { redirect } from 'react-router-dom';

const login = async ({ request }) => {
  const data = await request.formData();

  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  try {
    const response = await axios.post(`/api/v1/auth/login`, authData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const token = response.data.token;

    localStorage.setItem('token', token);

    return redirect('/programs');
  } catch ({ response }) {
    console.log({ response });

    // Invalid credentials
    if (response?.status === 401) {
      return response.data;
    }

    return 'Could not authenticate user. Try again later.';
  }
};

export default login;
