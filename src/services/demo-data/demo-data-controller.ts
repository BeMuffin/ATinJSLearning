import { AxiosResponse } from 'axios';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

class DemoDataController {
  public async createDemoData(data?): Promise<AxiosResponse> {
    const options = {
      method: 'POST',
      url: 'http://localhost:8080/api/v1/demo/atinjs',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
      data: data || { createDashboard: true },
    };

    return axios.request(options);
  }
}

export default new DemoDataController();
