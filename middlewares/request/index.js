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

  patch = async (path, body) => this.request('PATCH', path, body);

  delete = async (path) => this.request('DELETE', path);

  setToken = (token) => {
    if (token) {
      this.headers.Authorization = `Bearer ${token}`;
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
      })
      if (resp && resp.ok) {
        const response = await resp.json();
        return response;
      }

      if (resp && resp.status === 401) {
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

      const response = await resp.json();
      return response;
    } catch (e) {
      return { success: false, exception: e };
    }
  }
}

const RequestInstance = new Request();
export default RequestInstance;
