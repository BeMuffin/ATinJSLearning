import type { AxiosResponse } from 'axios';
import launchersController from '../../services/launchers/launchers-controller';
import { startLauncherBody } from '../../data/request-body/start-launcher-body';

let response: AxiosResponse;

let testData=[
    {filter: 'user', value: 'hanna.bicheuskaya'},
    {filter: 'name', value: 'Demo Api Tests' },
    {filter: 'status', value: 'PASSED' },
    {filter: 'hasRetries', value: 'false' },
    {filter: 'attributeValue', value: 'demo'}

];

describe.each(testData)('Filter Launches', function ({filter, value}) {
    beforeEach(async function () {
        response = await launchersController.startLauncher(startLauncherBody);
    });

    it.concurrent(`Get list of launches by ${filter} filter`, async ()=>{
        response = await launchersController.getLauncherByFilter(filter, value);
        expect(response.status).toBe(200);
        expect(response.data.content[0]).toBeDefined();
    });
});
