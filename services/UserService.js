import Request from '../middlewares/request';
import { AsyncStorage } from 'react-native';

export default class UserService {
  static login = (email, password) => Request.post('/user/login', { email, password });

  static refreshToken = () => Request.post('/user/login/refresh');
  
  static post = (payload) => Request.post('/user', payload);

  static setToken = (token) => AsyncStorage.setItem('token', token);
  
  static getToken = (token) => AsyncStorage.getItem('token');
}