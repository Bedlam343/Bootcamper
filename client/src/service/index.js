import axios from 'axios';
import getSignedUrl from 'service/getSignedUrl';
import uploadPhotoToGS from 'service/uploadPhoto';

// BOOTCAMPS

export const getBootcamp = (bootcampId) => {
  return axios.get(`/api/v1/bootcamps/${bootcampId}`);
};

export const getBootcamps = async (params = {}) => {
  console.log('getBootcamps');
  let bootcamps = [];
  let pagination = {};
  try {
    const response = await axios.get(`/api/v1/bootcamps`, {
      params: {
        ...params,
      },
    });
    bootcamps = response.data.data;
    pagination = response.data.pagination;
  } catch (error) {
    console.log(error);
  }
  return { bootcamps, pagination };
};

export const getMyBootcamps = (userId, token) => {
  return axios.get(`/api/v1/users/${userId}/bootcamps`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createBootcamp = (bootcamp, token) => {
  return axios.post('/api/v1/bootcamps', bootcamp, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateBootcamp = (bootcamp, bootcampId, token) => {
  return axios.put(`/api/v1/bootcamps/${bootcampId}`, bootcamp, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteBootcamp = (bootcampId, token) => {
  return axios.delete(`/api/v1/bootcamps/${bootcampId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// COURSES

export const getCoursesForBootcamp = (bootcampId) => {
  return axios.get(`/api/v1/bootcamps/${bootcampId}/courses`);
};

export const createCourse = (course, bootcampId, token) => {
  return axios.post(`/api/v1/bootcamps/${bootcampId}/courses`, course, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCourse = (course, token) => {
  return axios.put(`/api/v1/courses/${course._id}`, course, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCourse = (courseId, token) => {
  return axios.delete(`/api/v1/courses/${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// AUTH
export const getMe = (token) => {
  return axios.get(`/api/v1/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { getSignedUrl, uploadPhotoToGS };
