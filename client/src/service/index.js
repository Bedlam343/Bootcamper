import axios from "axios";
import { BACKEND_URL } from "constants";

// BOOTCAMPS

export const getBootcamp = (bootcampId) => {
  return axios.get(`${BACKEND_URL}/api/v1/bootcamps/${bootcampId}`);
};

export const getBootcamps = async () => {
  let bootcamps = [];
  try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/bootcamps`);
    bootcamps = response.data.data;
  } catch (error) {
    console.log(error);
  }
  return bootcamps;
};

export const getMyBootcamps = (userId, token) => {
  return axios.get(`${BACKEND_URL}/api/v1/users/${userId}/bootcamps`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createBootcamp = (bootcamp, token) => {
  return axios.post(`${BACKEND_URL}/api/v1/bootcamps`, bootcamp, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateBootcamp = (bootcamp, bootcampId, token) => {
  return axios.put(`${BACKEND_URL}/api/v1/bootcamps/${bootcampId}`, bootcamp, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteBootcamp = (bootcampId, token) => {
  return axios.delete(`${BACKEND_URL}/api/v1/bootcamps/${bootcampId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// COURSES

export const getCoursesForBootcamp = (bootcampId) => {
  return axios.get(`${BACKEND_URL}/api/v1/bootcamps/${bootcampId}/courses`);
};

export const createCourse = (course, bootcampId, token) => {
  return axios.post(
    `${BACKEND_URL}/api/v1/bootcamps/${bootcampId}/courses`,
    course,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// AUTH
export const getMe = (token) => {
  return axios.get(`${BACKEND_URL}/api/v1/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
