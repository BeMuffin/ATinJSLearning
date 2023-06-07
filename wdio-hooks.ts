import ReportPortalReporter from 'wdio-reportportal-reporter'
import RpService  from 'wdio-reportportal-service'
import fs from 'fs-extra'
import path from 'path'
import log4js from 'log4js';
const logger = log4js.getLogger();

export const hooks = {
    afterStep: async function (result) {
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
    onComplete: async function (config) {
        const link = await RpService.getLaunchUrl(config);
        const log = await browser.execute(() => {
            return {
                message: `Report Portal Link: ${link}`,
                level: log4js.levels,
                startTime: new Date().getTime(),
            };
        });
        logger.info(log);
        logger.info(`Report Portal Link: ${link}`);
    },

}
