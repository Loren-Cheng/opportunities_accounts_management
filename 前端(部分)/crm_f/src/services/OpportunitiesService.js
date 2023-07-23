import axios from "axios";
import ApiBaseUrl from "../config/ApiBaseUrl";

const OPPORTUNITIES_API_BASE_URL = ApiBaseUrl.get() + "opportunity";

class OpportunitiesService {
  getOpportunities() {
    return axios.get(OPPORTUNITIES_API_BASE_URL);
  }

  createOpportunity(opportunity) {
    return axios.post(OPPORTUNITIES_API_BASE_URL, opportunity);
  }

  updateOpportunity(id, opportunity) {
    return axios.put(OPPORTUNITIES_API_BASE_URL + `/${id}`, opportunity);
  }

  deleOpportunity(id){
    return axios.delete((OPPORTUNITIES_API_BASE_URL+`/${id}`))
  }
}

export default new OpportunitiesService()