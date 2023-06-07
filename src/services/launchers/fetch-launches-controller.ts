import * as dotenv from 'dotenv';
import 'isomorphic-fetch';

dotenv.config();

class FetchLaunchesController {
  public async startLaunch(data?): Promise<Response> {
    const url = 'http://localhost:8080/api/v1/atinjs/launch';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
      body: JSON.stringify(data),
    };
    return fetch(url, options);
  }
  public async deleteLaunch(launchId): Promise<Response> {
    const url = 'http://localhost:8080/api/v1/atinjs/launch';
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
      body: JSON.stringify({ ids: [launchId] }),
    };
    return fetch(url, options);
  }

  public async analyseLaunch(data): Promise<Response> {
    const url = 'http://localhost:8080/api/v1/atinjs/launch/analyze';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
      body: JSON.stringify(data),
    };

    return fetch(url, options);
  }

  public async createLaunchCluster(data) {
    const url = 'http://localhost:8080/api/v1/atinjs/launch/cluster';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
      body: JSON.stringify(data),
    };
    return fetch(url, options);
  }

  public async getLaunchByUuId(launchId: number): Promise<Response> {
    const url = `http://localhost:8080/api/v1/atinjs/launch/uuid/${launchId}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
    };

    return fetch(url, options);
  }
  public async getLaunchByFilter(
    filter: string,
    value: string
  ): Promise<Response> {
    const url = `http://localhost:8080/api/v1/atinjs/launch?filter.eq.${filter}=${value}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
    };

    return fetch(url, options);
  }

  public async finishLaunch(launchId: number, data?): Promise<Response> {
    const url = `http://localhost:8080/api/v1/atinjs/launch/${launchId}/finish`;
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
      body: JSON.stringify(data),
    };

    return fetch(url, options);
  }
}

export default new FetchLaunchesController();
