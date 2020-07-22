import { API_URL } from 'react-native-dotenv';
import { AsyncStorage } from 'react-native';

import NavigationService from '../../navigation/NavigationService';

class Request {
  constructor() {
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  get = async (path) => this.request('GET', path);
  
  post = async (path, body) => this.request('POST', path, body);
  
  put = async (path, body) => this.request('PUT', path, body);

  setToken = (jwtToken) => {
    if (jwtToken) {
      this.headers.Authorization = `Bearer ${jwtToken}`;
    } else {
      delete this.headers.Authorization;
    }
  }

  request = async (method, path, body) => {
    try {
      const resp = await fetch(`${API_URL}${path}`, {
        method,
        body: JSON.stringify(body),
        headers: this.headers,
      });

      if (resp.ok) {
        let response = await resp.json();
        return response;
      }

      if (resp.status === 401) {
        console.log({
          error401: {
            Authorization: this.headers.Authorization,
            body,
            path,
            resp,
          }
        })
        await AsyncStorage.clear();
        this.setToken(null);
        NavigationService.reset('LoginNavigator');
        return { success: false };
      }

      return { success: false };
    } catch (e) {
      return { success: false, exception: e };
    }
  }
}

const RequestInstance = new Request();
export default RequestInstance;