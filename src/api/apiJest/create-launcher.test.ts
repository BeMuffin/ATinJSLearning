import type { AxiosResponse } from 'axios';
import launchersController from '../../services/launchers/launchers-controller';
import { startLauncherBody } from '../../data/request-body/start-launcher-body';
import { analysisLauncherBody } from '../../data/request-body/analysis-launcher-body';
import _ from 'lodash';

let response: AxiosResponse;
let launcherId: string;

describe('Start Launchers', function () {
    it('Launch for specified project', async function() {
        response = await launchersController.startLauncher(startLauncherBody);
        expect(response.status).toBe(201);
        launcherId = response.data.number;
        expect(response.data.id).toBeDefined();
        expect(response.data.number).toBeDefined();
    });

    it('Analysis for launch', async function () {
        const analysisBody = _.cloneDeep(analysisLauncherBody)
        response = await launchersController.startLauncher(startLauncherBody);
        expect(response.status).toBe(201);
        launcherId = response.data.number;
        analysisBody.launchId = launcherId;
        expect(response.data.id).toBeDefined();
        expect(response.data.number).toBeDefined();
        response = await launchersController.analyseLauncher(analysisBody);
        expect(response.status).toBe(200);
        expect(response.data.message).toBe(`autoAnalyzer analysis for launch with ID='${launcherId}' started.`)
    })

    afterEach(async function () {
        await launchersController.deleteLauncher(launcherId);
    });
});
