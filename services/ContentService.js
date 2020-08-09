import Request from '../middlewares/request';

export default class ContentService {
  static list = (page = 0, pageSize = 20, search = '', home = undefined) => Request.get(`/content?page=${page}&pageSize=${pageSize}&search=${search}${home !== undefined ? `&home=${home}` : ''}`);
}