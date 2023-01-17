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
  skillsConfig: {
    name: 'get',
    http: 'profile/skills/',
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
    http: 'profile/status/',
  },
  updateSkillsConfig: {
    name: 'put',
    http: 'profile/skills/',
  },
  followConfig: {
    name: 'post',
    http: 'follow/',
  },
  registerConfig: {
    name: 'post',
    http: '/register',
  },
  loginConfig: {
    name: 'post',
    http: 'auth/login',
  },
  logOutConfig: {
    name: 'delete',
    http: 'auth/login',
  },
  unfollowConfig: {
    name: 'delete',
    http: 'follow/',
  },
  getPostsConfig: {
    name: 'get',
    http: 'profile/posts/',
    elements: [''],
  },
  createPostConfig: {
    name: 'post',
    http: 'profile/posts/',
  },
  updatePostConfig: {
    name: 'put',
    http: 'profile/posts/',
  },
  deletePostConfig: {
    name: 'delete',
    http: 'profile/posts/',
  },
  getDialogsConfig: {
    name: 'get',
    http: 'chats/',
    elements: [''],
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
  baseURL: 'http://localhost:3003/',
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:3000/',
  },
});

const getRequests = (config, params) => {
  return axiosRequest[config.name](creatingFullHttp(config, params)).then(
    (response) => {
      return response.data;
    }
  );
};

const deleteAndPostRequests = (config, id, data = {}) => {
  return axiosRequest[config.name](config.http + id, data);
};

const putRequests = (config, id, data) => {
  return axiosRequest[config.name](config.http + id, { status: data, id }).then(
    (response) => {
      return response.data;
    }
  );
};
export { deleteAndPostRequests, getRequests, putRequests, configForRequests };
