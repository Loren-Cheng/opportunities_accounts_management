
// const API_BASE_URL = "http://139.162.104.93/api/";
const API_BASE_URL = "http://localhost:8080/api/";

class ApiBaseUrl {

  /**
   * 
   * @param 
   * @returns {string} API_BASE_URL/ ex.http://localhost:8080/api/
   */
  get(){
    return API_BASE_URL;
  }
}
export default new ApiBaseUrl();
