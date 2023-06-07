import type { AxiosResponse } from 'axios';
import launchController from '../../services/launchers/launches-controller';
import { startLaunchBody } from '../../data/request-body/start-launch-body';
import { TEST_DATA } from '../../data/test-data-constants';

describe('Get Launchers', function () {
  let response: AxiosResponse;
  let launchUuId: number, launchId: number;

  it('Get specified launch by uuid', async function () {
    response = await launchController.startLaunch(startLaunchBody);
    launchUuId = response.data.id;
    launchId = response.data.number;
    response = await launchController.getLaunchByUuId(launchUuId);
    expect(response.status).toBe(200);
    expect(response.data.uuid).toBe(launchUuId);
    await launchController.deleteLaunch(launchId);
  });

  it('Get launch with invalid uuid', async function () {
    response = await launchController.getLaunchByUuId(
      TEST_DATA.TEST_INVALID_UUID
    );
    expect(response.status).toBe(404);
    expect(response.data.errorCode).toBe(4041);
    expect(response.data.message).toBe(
      `Launch '${TEST_DATA.TEST_INVALID_UUID}' not found. Did you use correct Launch ID?`
    );
  });
});
