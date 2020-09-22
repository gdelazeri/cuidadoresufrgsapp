import Request from '../middlewares/request';

export default class FormService {
  static list = (userId = '', page = 0, pageSize = 20, search = '') => Request.get(`/form?userId=${userId}&page=${page}&pageSize=${pageSize}${typeof search === 'string' && search.length > 0 ? `&search=${search}` : ''}`);
  
  static listAll = (search = '') => Request.get(`/form?search=${search}`);
  
  static get = (id) => Request.get(`/form/${id}`);

  static result = (id, userId) => Request.get(`/form/result/${id}?userId=${userId}`);
}