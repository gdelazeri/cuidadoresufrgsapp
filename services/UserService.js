import Request from '../middlewares/request';
import { AsyncStorage } from 'react-native';

export default class UserService {
  static login = (email, password) => Request.post('/user/login', { email, password });

  static refreshToken = () => Request.post('/user/login/refresh');
  
  static post = (payload) => Request.post('/user', payload);
  
  static acceptConsentTerm = (_id) => Request.patch(`/user/consentTerm/accept/${_id}`);

  static setToken = (token) => AsyncStorage.setItem('token', token);
  
  static getToken = () => AsyncStorage.getItem('token');

  static passwordRecoverToken = (email) => Request.get(`/user/password/recoverToken/${email}`);
  
  static passwordRecoverTokenCheck = (email, token) => Request.post(`/user/password/recoverToken/check/${email}`, { token });

  static updatePassword = (email, token, password, passwordConfirm) => Request.patch(`/user/password/update/${email}`, { token, password, passwordConfirm });
}