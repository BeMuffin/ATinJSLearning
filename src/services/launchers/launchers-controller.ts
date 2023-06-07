import { AxiosResponse } from 'axios';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

class LaunchController {
  public async startLauncher(data?): Promise<AxiosResponse> {
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

  public async deleteLauncher(launcherId): Promise<AxiosResponse> {
    const options = {
        method: 'DELETE',
        url: 'http://localhost:8080/api/v1/atinjs/launch',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
        },
        data: {'ids': [launcherId]},
      };
      return axios.request(options);
  }

  public async analyseLauncher(data): Promise<AxiosResponse> {
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

  public async getLauncherByUuId(launcherId:string): Promise<AxiosResponse> {
    const options = {
        method: 'GET',
        url: `http://localhost:8080/api/v1/atinjs/launch/uuid/${launcherId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
        },
      };

      return axios.request(options);
  }
  public async getLauncherByFilter(filter:string, value:string): Promise<AxiosResponse> {
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

  public async finishLaunch(launchId:string, data): Promise<AxiosResponse> {
    const options = {
        method: 'PUT',
        url: `http://localhost:8080/api/v1/atinjs/launch/${launchId}/finish`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
        },
        data:data

      };

      return axios.request(options);
  }
}

export default new LaunchController();
