import type { AxiosResponse } from 'axios';
import launchersController from '../../services/launchers/launchers-controller';
import { startLauncherBody } from '../../data/request-body/start-launcher-body';

let response: AxiosResponse;
let launcherUuId: string;

describe('Get Launchers', function () {
    beforeEach(async function () {
        response = await launchersController.startLauncher(startLauncherBody);
        launcherUuId = response.data.id;
    });

    it('Get specified launch by uuid', async function() {
        response = await launchersController.getLauncherByUuId(launcherUuId);
        expect(response.status).toBe(200);
        expect(response.data.uuid).toBe(launcherUuId);
    });

});
