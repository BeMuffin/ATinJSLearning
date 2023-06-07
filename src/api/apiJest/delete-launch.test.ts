import type { AxiosResponse } from 'axios';
import launchController from '../../services/launchers/launches-controller';
import { startLaunchBody } from '../../data/request-body/start-launch-body';
import { finishLaunchBody } from '../../data/request-body/finish-launch-body';
import { TEST_DATA } from '../../data/test-data-constants';

describe('Delete Launchers', function () {
  let response: AxiosResponse;
  let launchUuid: number, launchId: number;

  it('Delete specified launches by ids', async function () {
    response = await launchController.startLaunch(startLaunchBody);
    launchUuid = response.data.id;
    launchId = response.data.number;
    response = await launchController.finishLaunch(
      launchUuid,
      finishLaunchBody
    );
    response = await launchController.deleteLaunch(launchId);
    expect(response.status).toBe(200);
    expect(response.data.successfullyDeleted).toContain(launchId);
  });

  it('Delete specified non-existent launch', async function () {
    response = await launchController.deleteLaunch(
      TEST_DATA.TEST_NON_EXISTENT_UUID
    );
    expect(response.status).toBe(200);
    expect(response.data.successfullyDeleted).toEqual([]);
    expect(response.data.notFound).toEqual([TEST_DATA.TEST_NON_EXISTENT_UUID]);
    expect(response.data.errors).toEqual([]);
  });
});
