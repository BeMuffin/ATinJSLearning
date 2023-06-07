import type { AxiosResponse } from 'axios';
import launchersController from '../../services/launchers/launchers-controller';
import { startLauncherBody } from '../../data/request-body/start-launcher-body';
import { finishLaunchBody } from '../../data/request-body/finish-launch-body';

let response: AxiosResponse;
let launcherUuid: string;

describe('Update Launches', function () {
    beforeEach(async function () {
        response = await launchersController.startLauncher(startLauncherBody);
        launcherUuid = response.data.id;
    });

    it('Finish (update) specified launch by id', async function() {
        response = await launchersController.finishLaunch(launcherUuid, finishLaunchBody);
        expect(response.status).toBe(200);
        expect(response.data.id).toBe(launcherUuid);
    });
});
