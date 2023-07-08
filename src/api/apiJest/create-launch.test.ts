import type { AxiosResponse } from 'axios';
import launchController from '../../services/launchers/launches-controller';
import {
  invalidStartLaunchBody,
  startLaunchBody,
} from '../../data/request-body/start-launch-body';
import { analysisLaunchBody } from '../../data/request-body/analysis-launch-body';
import _ from 'lodash';

describe('Start Launchers', function () {
  let response: AxiosResponse;
  let launchId: number;

  it('Launch for specified project', async function () {
    response = await launchController.startLaunch(startLaunchBody);
    expect(response.status).toBe(201);
    launchId = response.data.number;
    expect(response.data.id).toBeDefined();
    expect(response.data.number).toBeDefined();
    await launchController.deleteLaunch(launchId);
  });

  it('Analysis for launch', async function () {
    const analysisBody = _.cloneDeep(analysisLaunchBody);
    response = await launchController.startLaunch(startLaunchBody);
    expect(response.status).toBe(201);
    expect(response.data.id).toBeDefined();
    expect(response.data.number).toBeDefined();
    launchId = response.data.number;
    analysisBody.launchId = launchId;
    response = await launchController.analyseLaunch(analysisBody);
    expect(response.status).toBe(200);
    expect(response.data.message).toBe(
      `autoAnalyzer analysis for launch with ID='${launchId}' started.`
    );
    await launchController.deleteLaunch(launchId);
  });

  it('Launch for specified project with empty body', async function () {
    response = await launchController.startLaunch();
    expect(response.status).toBe(400);
    expect(response.data.errorCode).toBe(4001);
    expect(response.data.message).toContain(
      `[Field 'startTime' should not be null.]`
    );
    expect(response.data.message).toContain(
      `[Field 'name' should not be null.]`
    );
  });

  it('Launch for specified project with invalid body', async function () {
    response = await launchController.startLaunch(invalidStartLaunchBody);
    expect(response.status).toBe(400);
    expect(response.data.errorCode).toBe(4001);
    expect(response.data.message).toContain(
      `[Field 'startTime' should not be null.]`
    );
    expect(response.data.message).toContain(
      `[Field 'name' should not contain only white spaces and shouldn't be empty. Field 'name' should have size from '1' to '256'.]`
    );
  });
});
