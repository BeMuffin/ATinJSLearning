import { startLaunchBody } from '../../data/request-body/start-launch-body';
import { finishLaunchBody } from '../../data/request-body/finish-launch-body';
import { TEST_DATA } from '../../data/test-data-constants';
import fetchLaunchesController from '../../services/launchers/fetch-launches-controller';

describe('Update Launches', function () {
  let response: Response;
  let launchUuid: number, responseData, launchId: number;

  beforeEach(async function () {
    response = await fetchLaunchesController.startLaunch(startLaunchBody);
    responseData = await response.json();
    launchUuid = responseData.id;
    launchId = responseData.number;
  });

  it('Finish (update) specified launch by id', async function () {
    response = await fetchLaunchesController.finishLaunch(
      launchUuid,
      finishLaunchBody
    );
    responseData = await response.json();
    expect(response.status).toBe(200);
    expect(responseData.id).toBe(launchUuid);
  });

  it('Finish (update) launch with empty request body', async function () {
    response = await fetchLaunchesController.finishLaunch(launchUuid, {});
    responseData = await response.json();
    expect(response.status).toBe(400);
    expect(responseData.message).toBe(
      `Incorrect Request. [Field 'endTime' should not be null.] `
    );
    expect(responseData.errorCode).toBe(4001);
  });

  it('Finish (update) launch with invalid launchId', async function () {
    response = await fetchLaunchesController.finishLaunch(
      TEST_DATA.TEST_INVALID_UUID,
      finishLaunchBody
    );
    responseData = await response.json();
    expect(response.status).toBe(404);
    expect(responseData.message).toBe(
      `Launch '${TEST_DATA.TEST_INVALID_UUID}' not found. Did you use correct Launch ID?`
    );
    expect(responseData.errorCode).toBe(4041);
  });

  afterEach(async function () {
    await fetchLaunchesController.deleteLaunch(launchId);
  });
});
