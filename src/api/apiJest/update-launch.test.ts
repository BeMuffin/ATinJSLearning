import type { AxiosResponse } from 'axios';
import launchController from '../../services/launchers/launches-controller';
import { startLaunchBody } from '../../data/request-body/start-launch-body';
import { finishLaunchBody } from '../../data/request-body/finish-launch-body';
import { TEST_DATA } from '../../data/test-data-constants';

describe('Update Launches', function () {
  let response: AxiosResponse;
  let launcherUuid: number, launchId: number;

  it('Finish (update) specified launch by id', async function () {
    response = await launchController.startLaunch(startLaunchBody);
    launcherUuid = response.data.id;
    launchId = response.data.number;

    response = await launchController.finishLaunch(
      launcherUuid,
      finishLaunchBody
    );
    expect(response.status).toBe(200);
    expect(response.data.id).toBe(launcherUuid);
    await launchController.deleteLaunch(launchId);
  });

  it('Finish (update) launch with empty request body', async function () {
    response = await launchController.startLaunch(startLaunchBody);
    launcherUuid = response.data.id;
    launchId = response.data.number;

    response = await launchController.finishLaunch(launcherUuid, {});
    expect(response.status).toBe(400);
    expect(response.data.message).toBe(
      `Incorrect Request. [Field 'endTime' should not be null.] `
    );
    expect(response.data.errorCode).toBe(4001);
    await launchController.deleteLaunch(launchId);
  });

  it('Finish (update) launch with invalid launchId', async function () {
    response = await launchController.finishLaunch(
      TEST_DATA.TEST_INVALID_UUID,
      finishLaunchBody
    );
    expect(response.status).toBe(404);
    expect(response.data.message).toBe(
      `Launch '${TEST_DATA.TEST_INVALID_UUID}' not found. Did you use correct Launch ID?`
    );
    expect(response.data.errorCode).toBe(4041);
  });
});
