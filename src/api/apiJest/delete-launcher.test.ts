import type { AxiosResponse } from 'axios';
import launchersController from '../../services/launchers/launchers-controller';
import { startLauncherBody } from '../../data/request-body/start-launcher-body';
import { finishLaunchBody } from '../../data/request-body/finish-launch-body';

let response: AxiosResponse;
let launcherUuid,launchId: string;

describe('Delete Launchers', function () {
    beforeEach(async function () {
        response = await launchersController.startLauncher(startLauncherBody);
        launcherUuid = response.data.id;
        launchId = response.data.number;
        response = await launchersController.finishLaunch(launcherUuid, finishLaunchBody);
    });
    it('Delete specified launches by ids', async function() {
        response = await launchersController.deleteLauncher(launchId);
        expect(response.status).toBe(200);
        expect(response.data.successfullyDeleted).toContain(launchId);
    });

});
