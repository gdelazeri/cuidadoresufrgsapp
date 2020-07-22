import Request from '../middlewares/request';

export default class AuthenticationService {
  static login = (email, password) => Request.post('/Users/Authenticate', { email, password });

  static refreshToken = () => Request.post('/Users/Authenticate/Refresh');
  
  static post = (payload) => Request.post('/Users', payload);
}