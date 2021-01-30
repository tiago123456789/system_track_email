import axios from "axios";
import Constants from "../constants/App"

export default class AbstractHttpService {

    getHttpClient() {
        return axios;
    }

    get(path, accessToken) {
        return axios.get(
            `${process.env.VUE_API_URL}${path}`, 
            { 
                headers: {
                    [Constants.HEADERS.AUTHORIZATION]: accessToken
                }
            }
            ).then(this._extractDatas)
    }

    post(path, datas, accessToken) {
        return axios.post(path, datas,  { 
            headers: {
                [Constants.HEADERS.AUTHORIZATION]: accessToken
            }
        });
    }

    _extractDatas(response) {
        if (response.datas) {
            return response.datas;
        }
        return response;
    }
}