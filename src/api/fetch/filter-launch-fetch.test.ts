import { startLaunchBody } from '../../data/request-body/start-launch-body';
import fetchLaunchesController from '../../services/launchers/fetch-launches-controller';

let testData = [
  { filter: 'user', value: 'hanna.bicheuskaya' },
  { filter: 'name', value: 'Demo Api Tests' },
  { filter: 'status', value: 'PASSED' },
  { filter: 'hasRetries', value: 'false' },
  { filter: 'attributeValue', value: 'demo' },
];

describe.each(testData)('Filter Launches', function ({ filter, value }) {
  let response: Response;
  let responseData, launchId: number;

  beforeEach(async function () {
    response = await fetchLaunchesController.startLaunch(startLaunchBody);
    responseData = await response.json();
    launchId = responseData.number;
  });

  it.concurrent(`Get list of launches by ${filter} filter`, async () => {
    response = await fetchLaunchesController.getLaunchByFilter(filter, value);
    responseData = await response.json();
    expect(response.status).toBe(200);
    expect(responseData.content[0]).toBeDefined();
  });

  afterEach(async function () {
    await fetchLaunchesController.deleteLaunch(launchId);
  });
});
