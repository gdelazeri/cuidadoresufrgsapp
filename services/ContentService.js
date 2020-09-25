import Request from '../middlewares/request';

export default class ContentService {
  static list = (page = 0, pageSize = 20, search = '', home = undefined) => Request.get(`/content?page=${page}&pageSize=${pageSize}${typeof search === 'string' && search.length > 0 ? `&search=${search}` : ''}${home !== undefined ? `&home=${home}` : ''}`);
  
  static get = (id) => Request.get(`/content/${id}`);
}