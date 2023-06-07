import axios, {AxiosResponse} from 'axios'
import * as dotenv from 'dotenv';

dotenv.config();

class LaunchController {
  public async startLaunch(data?): Promise<AxiosResponse> {
    const options = {
      method: 'POST',
      url: 'http://localhost:8080/api/v1/atinjs/launch',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
      data: data,
    };

    return axios.request(options);
  }

  public async deleteLaunch(launchId: number): Promise<AxiosResponse> {
    const options = {
      method: 'DELETE',
      url: 'http://localhost:8080/api/v1/atinjs/launch',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
      data: { ids: [launchId] },
    };
    return axios.request(options);
  }

  public async analyseLaunch(data): Promise<AxiosResponse> {
    const options = {
      method: 'POST',
      url: 'http://localhost:8080/api/v1/atinjs/launch/analyze',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
      data: data,
    };

    return axios.request(options);
  }

  public async getLaunchByUuId(launchId: number): Promise<AxiosResponse> {
    const options = {
      method: 'GET',
      url: `http://localhost:8080/api/v1/atinjs/launch/uuid/${launchId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
    };

    return axios.request(options);
  }
  public async getLaunchByFilter(
    filter: string,
    value: string
  ): Promise<AxiosResponse> {
    const options = {
      method: 'GET',
      url: `http://localhost:8080/api/v1/atinjs/launch?filter.eq.${filter}=${value}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
    };

    return axios.request(options);
  }

  public async finishLaunch(launchId: number, data?): Promise<AxiosResponse> {
    const options = {
      method: 'PUT',
      url: `http://localhost:8080/api/v1/atinjs/launch/${launchId}/finish`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
      data: data,
    };

    return axios.request(options);
  }
}

export default new LaunchController();
