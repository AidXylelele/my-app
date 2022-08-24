import axios from 'axios';

const configForRequests = {
  authConfig: {
    name: 'get',
    http: 'auth/me',
    elements: [],
  },
  usersConfig: {
    name: 'get',
    http: 'users?',
    elements: ['page=', '&count='],
  },
  followConfig: {
    name: 'post',
    http: 'follow/',
    elements: [],
  },
  unfollowConfig: {
    name: 'delete',
    http: 'follow/',
    elements: [],
  },
};

const creatingFullHttp = (config, data) => {
  const { elements, http } = config;
  let result = http;
  if (data.length !== 0) {
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

const followRequests = (config, func, id) => {
  axiosRequest[config.name](config.http + id).then((response) => {
    if (response.data.resultCode === 0) {
      func(id);
    }
  });
};

const usersRequests = (config, params) => {
  return axiosRequest[config.name](creatingFullHttp(config, params)).then(
    (response) => {
      return response.data;
    }
  );
};

export { followRequests, usersRequests, configForRequests };
