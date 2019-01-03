const config = {
  apiURL: window.location.hostname === 'localhost' ? 'http://localhost:8081/api' : window.location.origin + '/api',
};
export default (config);
