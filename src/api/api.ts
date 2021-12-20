import axios from "axios";

export const url = 'https://api.github.com';

interface IApi {
  method: 'get' | 'post' | 'delete';
  url: string;
  data?: any;
}

const handleSuccess = (response: any) => {
  return response.data
};

const Api = axios.create({
  baseURL: url,
  responseType: 'json',
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
  },
});

export const ApiCall = ({ method, url, data }: IApi) => Api[method](url, data).then(handleSuccess);