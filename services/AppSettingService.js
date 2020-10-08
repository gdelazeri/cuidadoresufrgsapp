import Constants from 'expo-constants';
import Request from '../middlewares/request';

export default class AppSettingService {
  static needUpdate = () => Request.get(`/appSetting/needUpdate/${Constants.manifest.version}`);
}