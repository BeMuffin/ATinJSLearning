import DemoDataController from '../../services/demo-data/demo-data-controller';
import type { AxiosResponse } from 'axios';

let response: AxiosResponse;

describe('Generating demo data', function () {
    it('should generate demo data', async function() {
        response = await DemoDataController.createDemoData();
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('launchIds');
    });
});
