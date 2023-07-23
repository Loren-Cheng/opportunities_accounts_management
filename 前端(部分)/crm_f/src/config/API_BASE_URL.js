
// const API_BASE_URL = "http://139.162.104.93/api/";
const API_BASE_URL = "http://localhost:8080/api/";

class ApiBaseUrl {

  /**
   * 
   * @param {string} entity ex.opportunity, account
   * @returns {string} API_BASE_URL/'${entity}' ex.http://localhost:8080/api/opportunity
   */
  get(){
    return API_BASE_URL;
  }
}
export default new ApiBaseUrl();
