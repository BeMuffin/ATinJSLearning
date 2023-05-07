import ReportPortalReporter from 'wdio-reportportal-reporter'
import RpService  from 'wdio-reportportal-service'
import fs from 'fs-extra'
import path from 'path'

export const hooks = {
    afterStep: async function (step, scenario, context, result) {
        const screenshotDir = './reports/rp-results/screenshots/';
        if (result.error) {
            const timestamp = new Date().toISOString().replace(/[:]/g, '-');
            const screenshotPath = path.join(screenshotDir, `${timestamp}.png`);
            const screenshot = await browser.takeScreenshot();
            fs.outputFileSync(screenshotPath, screenshot, { encoding: 'base64' });
            ReportPortalReporter.sendLog('ERROR', {
            level: 'error',
            file: {
                name: `${timestamp}.png`,
                data: screenshot,
                type: 'image/png',
            },
            });
        }
    },
    onComplete: async function (_, config) {
        const link = await RpService.getLaunchUrl(config);
        console.log(`Report portal link ${link}`)
    },

}
