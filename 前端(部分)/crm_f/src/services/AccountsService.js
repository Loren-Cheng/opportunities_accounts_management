import axios from "axios";
import ApiBaseUrl from "../config/ApiBaseUrl";

const ACCOUNTS_API_BASE_URL = ApiBaseUrl.get() + "account";

class AccountsService {
  getAccounts() {
    return axios.get(ACCOUNTS_API_BASE_URL);
  }

  createAccount(account) {
    return axios.post(ACCOUNTS_API_BASE_URL, account);
  }

  deleAccount(theId) {
    return axios.delete(ACCOUNTS_API_BASE_URL + `/${theId}`)
  }
}

export default new AccountsService()
