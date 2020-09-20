import Request from '../middlewares/request';
import { AsyncStorage } from 'react-native';

export default class UserService {
  static login = (email, password) => Request.post('/user/login', { email, password });

  static refreshToken = () => Request.post('/user/login/refresh');
  
  static get = (_id) => Request.get(`/user/${_id}`);

  static post = (payload) => Request.post('/user', payload);
  
  static acceptConsentTerm = (_id) => Request.patch(`/user/acceptConsentTerm/${_id}`);

  static setToken = (token) => AsyncStorage.setItem('token', token);
  
  static getToken = () => AsyncStorage.getItem('token');
}