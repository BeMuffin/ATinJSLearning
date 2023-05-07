import { waitForFullPageLoad } from '../../utils/browser/pageLoadWaiter';

export default abstract class Page {
  url = 'https://rp.epam.com/ui';
  fullUrl = '/';

  async open(url?: string) {
    return url ? await browser.url(url) : await browser.url(this.fullUrl);
  }

  openNewTab() {
    return browser.newWindow(this.fullUrl);
  }

  async waitForFullLoad(timeout?: number) {
    await waitForFullPageLoad(timeout);
  }

  async waitForUrlToContain(text: string ) {
    return !!(await browser.waitUntil(
      async () =>
          (await browser.getUrl()).indexOf(text) !== -1,
      {
        timeout: 30000,
        timeoutMsg: `Actual URL: ${await browser.getUrl()}. \nExpected URL: ${text}`,
      }
    ));
  }

}
