import { startLaunchBody } from '../../data/request-body/start-launch-body';
import { TEST_DATA } from '../../data/test-data-constants';
import fetchLaunchesController from '../../services/launchers/fetch-launches-controller';

describe('Get Launchers', function () {
  let response: Response;
  let launcherUuId: number, launchId: number, responseData;

  it('Get specified launch by uuid', async function () {
    response = await fetchLaunchesController.startLaunch(startLaunchBody);
    responseData = await response.json();
    launchId = responseData.number;
    launcherUuId = responseData.id;

    response = await fetchLaunchesController.getLaunchByUuId(launcherUuId);
    responseData = await response.json();
    expect(response.status).toBe(200);
    expect(responseData.uuid).toBe(launcherUuId);
    await fetchLaunchesController.deleteLaunch(launchId);
  });

  it('Get launch with invalid uuid', async function () {
    response = await fetchLaunchesController.getLaunchByUuId(
      TEST_DATA.TEST_INVALID_UUID
    );
    responseData = await response.json();
    expect(response.status).toBe(404);
    expect(responseData.errorCode).toBe(4041);
    expect(responseData.message).toBe(
      `Launch '${TEST_DATA.TEST_INVALID_UUID}' not found. Did you use correct Launch ID?`
    );
  });
});
