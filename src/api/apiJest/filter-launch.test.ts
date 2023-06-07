import type { AxiosResponse } from 'axios';
import launchController from '../../services/launchers/launches-controller';
import { startLaunchBody } from '../../data/request-body/start-launch-body';

let testData = [
  { filter: 'user', value: 'hanna.bicheuskaya' },
  { filter: 'name', value: 'Demo Api Tests' },
  { filter: 'status', value: 'PASSED' },
  { filter: 'hasRetries', value: 'false' },
  { filter: 'attributeValue', value: 'demo' },
];

describe.each(testData)('Filter Launches', function ({ filter, value }) {
  let response: AxiosResponse;
  let launchId: number;

  beforeEach(async function () {
    response = await launchController.startLaunch(startLaunchBody);
    launchId = response.data.number;
  });

  it.concurrent(`Get list of launches by ${filter} filter`, async () => {
    response = await launchController.getLaunchByFilter(filter, value);
    expect(response.status).toBe(200);
    expect(response.data.content[0]).toBeDefined();
  });

  afterEach(async function () {
    await launchController.deleteLaunch(launchId);
  });
});
