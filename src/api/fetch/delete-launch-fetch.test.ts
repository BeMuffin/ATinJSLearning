import { startLaunchBody } from '../../data/request-body/start-launch-body';
import { finishLaunchBody } from '../../data/request-body/finish-launch-body';
import { TEST_DATA } from '../../data/test-data-constants';
import fetchLaunchesController from '../../services/launchers/fetch-launches-controller';

describe('Delete Launches', function () {
  let response: Response;
  let launcherUuid: number, launchId: number, responseData;

  it('Delete specified launch by id', async function () {
    response = await fetchLaunchesController.startLaunch(startLaunchBody);
    responseData = await response.json();
    launcherUuid = responseData.id;
    launchId = responseData.number;
    response = await fetchLaunchesController.finishLaunch(
      launcherUuid,
      finishLaunchBody
    );
    response = await fetchLaunchesController.deleteLaunch(launchId);
    responseData = await response.json();
    expect(response.status).toBe(200);
    expect(responseData.successfullyDeleted).toContain(launchId);
  });

  it('Delete specified non-existent launch', async function () {
    response = await fetchLaunchesController.deleteLaunch(
      TEST_DATA.TEST_NON_EXISTENT_UUID
    );
    responseData = await response.json();
    expect(response.status).toBe(200);
    expect(responseData.successfullyDeleted).toEqual([]);
    expect(responseData.notFound).toEqual([TEST_DATA.TEST_NON_EXISTENT_UUID]);
    expect(responseData.errors).toEqual([]);
  });
});
