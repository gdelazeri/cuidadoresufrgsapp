import Request from '../middlewares/request';
import { AsyncStorage } from 'react-native';

export default class UserService {
  static login = (email, password) => Request.post('/user/login', { email, password });

  static refreshToken = () => Request.post('/user/login/refresh');
  
  static post = (payload) => Request.post('/user', payload);

  static put = (payload) => Request.put('/user', payload);
  
  static get = () => Request.get('/user');
  
  static delete = () => Request.delete('/user');
  
  static getConsentTerm = (_id) => Request.get(`/user/consentTerm/${_id}`);

  static acceptConsentTerm = (_id) => Request.patch(`/user/consentTerm/accept/${_id}`);

  static setToken = (token) => AsyncStorage.setItem('token', token);
  
  static getToken = () => AsyncStorage.getItem('token');

  static passwordRecoverToken = (email) => Request.get(`/user/password/recoverToken/${email}`);
  
  static passwordRecoverTokenCheck = (email, token) => Request.post(`/user/password/recoverToken/check/${email}`, { token });

  static passwordUpdate = (email, token, password, passwordConfirm) => Request.patch(`/user/password/update/${email}`, { token, password, passwordConfirm });
  
  static passwordRules = () => Request.get('/user/password/rules');
}