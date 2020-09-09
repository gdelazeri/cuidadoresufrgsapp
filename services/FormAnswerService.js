import Request from '../middlewares/request';

export default class FormAnswerService {
  static post = (body) => Request.post('/formAnswer', body);
  
  static put = (body) => Request.put(`/formAnswer/${body._id}`, body);

  static get = (userId, formId) => Request.get(`/formAnswer?userId=${userId}&formId=${formId}`);

  static finish = (id) => Request.put(`/formAnswer/finish/${id}`);
}