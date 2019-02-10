import Response                    from './Response';
import RequestError                from '../Errors/RequestError';
import axios, {AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';

export default class Request {
    config: AxiosRequestConfig;

    constructor(config: AxiosRequestConfig) {
        this.config = config;
    }

    /**
     * @returns {Promise}
     */
    send(): Promise<Response> {
        return axios.request(this.config).then((response: AxiosResponse) => {
            return new Response(response);
        }).catch((error: AxiosError) => {
            throw new RequestError(error, new Response(error.response));
        });
    }
}
