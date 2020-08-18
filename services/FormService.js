import Request from '../middlewares/request';

export default class FormService {
  static list = (page = 0, pageSize = 20, search = '') => Request.get(`/form?page=${page}&pageSize=${pageSize}&search=${search}`);
  
  static listAll = (search = '') => Request.get(`/form?search=${search}`);
  
  static get = (id) => Request.get(`/form/${id}`);
}