import Request from '../middlewares/request';

export default class AuthenticationService {
  static login = async (email, password) => Request.post('/Users/Authenticate', { email, password });

  static refreshToken = async() => Request.post('/Users/Authenticate/Refresh');
}