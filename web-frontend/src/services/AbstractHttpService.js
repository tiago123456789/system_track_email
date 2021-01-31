import axios from "axios";
import Constants from "../constants/App"

export default class AbstractHttpService {

    getHttpClient() {
        return axios;
    }

    get(path, accessToken) {
        return axios.get(
            `${process.env.VUE_APP_API_URL}${path}`, 
            { 
                headers: {
                    [Constants.HEADERS.AUTHORIZATION]: accessToken
                }
            }
            ).then(this._extractDatas)
    }

    post(path, datas, accessToken) {
        return axios.post(`${process.env.VUE_APP_API_URL}${path}`,  datas,  { 
            headers: {
                [Constants.HEADERS.AUTHORIZATION]: accessToken
            }
        }).then(this._extractDatas);
    }

    _extractDatas(response) {
        if (response.data) {
            return response.data;
        }
        return response;
    }
}