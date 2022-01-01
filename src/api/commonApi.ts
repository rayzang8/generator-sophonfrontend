import axios, { AxiosInstance } from 'axios';

class CommonApi {
    protected apiInstance: AxiosInstance;
    constructor() {
        this.apiInstance = axios.create({
            baseURL: '/gateway',
        });
        this.apiInstance.interceptors.response.use(undefined, (error: any) => {
            if (error.response?.status === 401) {
              location.replace(`/gateway/user/api/users/login?redirect=${encodeURIComponent(location.href)}`);
            }
            return Promise.reject(error);
        });
    }

    public async getUserProfile (): Promise<Record<string, any>> {
        const result = await this.apiInstance.get(`/user/api/users/profile`);
        return result.data as Record<string, any>;
    }

}

export const commonApi = new CommonApi();

