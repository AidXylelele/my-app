import axios from 'axios';

const configForRequests = {
  profileConfig: {
    name: 'get',
    http: 'profile/',
    elements: [''],
  },
  statusConfig: {
    name: 'get',
    http: 'profile/status/',
    elements: [''],
  },
  usersConfig: {
    name: 'get',
    http: 'users?',
    elements: ['page=', '&count='],
  },
  authConfig: {
    name: 'get',
    http: 'auth/me',
    elements: [''],
  },
  updateStatusConfig: {
    name: 'put',
    http: 'profile/status',
  },
  followConfig: {
    name: 'post',
    http: 'follow/',
  },
  loginConfig: {
    name: 'post',
    http: '/auth/login',
  },
  logOutConfig: {
    name: 'delete',
    http: '/auth/login',
  },
  unfollowConfig: {
    name: 'delete',
    http: 'follow/',
  },
};

const creatingFullHttp = (config, data) => {
  const { elements, http } = config;
  let result = http;
  if (data.length) {
    for (let i = 0; i < elements.length; i++) {
      result += elements[i] + data[i];
    }
  }
  return result;
};

const axiosRequest = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '8723fb12-ffdb-46fc-a2bf-f6ce9b484d92',
  },
});

const getRequests = (config, params) => {
  return axiosRequest[config.name](creatingFullHttp(config, params)).then(
    (response) => {
      return response.data;
    }
  );
};

const deleteAndPostRequests = (config, id) => {
  return axiosRequest[config.name](config.http + id);
};

const putRequests = (config, data) => {
  return axiosRequest[config.name](config.http, { status: data }).then(
    (response) => {
      return response.data;
    }
  );
};
export { deleteAndPostRequests, getRequests, putRequests, configForRequests };
