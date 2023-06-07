import fetchLaunchesController from '../../services/launchers/fetch-launches-controller';
import {
  invalidStartLaunchBody,
  startLaunchBody,
} from '../../data/request-body/start-launch-body';
import _ from 'lodash';
import { analysisLaunchBody } from '../../data/request-body/analysis-launch-body';

describe('Start Launches', function () {
  let response, responseData;
  let launchId: number;

  it('Launch for specified project', async function () {
    response = await fetchLaunchesController.startLaunch(startLaunchBody);
    expect(response.status).toBe(201);
    responseData = await response.json();
    expect(responseData.number).toBeDefined();
    launchId = responseData.number;
    expect(responseData.id).toBeDefined();
    await fetchLaunchesController.deleteLaunch(launchId);
  });

  it('Analysis for launch', async function () {
    const analysisBody = _.cloneDeep(analysisLaunchBody);
    response = await fetchLaunchesController.startLaunch(startLaunchBody);
    responseData = await response.json();
    expect(response.status).toBe(201);
    expect(responseData.id).toBeDefined();
    expect(responseData.number).toBeDefined();
    launchId = responseData.number;
    analysisBody.launchId = launchId;
    response = await fetchLaunchesController.analyseLaunch(analysisBody);
    responseData = await response.json();
    expect(response.status).toBe(200);
    expect(responseData.message).toBe(
      `autoAnalyzer analysis for launch with ID='${launchId}' started.`
    );
    await fetchLaunchesController.deleteLaunch(launchId);
  });

  it('Launch for specified project with empty body', async function () {
    response = await fetchLaunchesController.startLaunch({});
    responseData = await response.json();
    expect(response.status).toBe(400);
    expect(responseData.errorCode).toBe(4001);
    expect(responseData.message).toContain(`Field 'name' should not be null.]`);
    expect(responseData.message).toContain(
      `[Field 'startTime' should not be null.]`
    );
  });

  it('Launch for specified project with invalid body', async function () {
    response = await fetchLaunchesController.startLaunch(
      invalidStartLaunchBody
    );
    responseData = await response.json();
    expect(response.status).toBe(400);
    expect(responseData.errorCode).toBe(4001);
    expect(responseData.message).toContain(
      `[Field 'startTime' should not be null.]`
    );
    expect(responseData.message).toContain(
      `[Field 'name' should not contain only white spaces and shouldn't be empty. Field 'name' should have size from '1' to '256'.]`
    );
  });
});
