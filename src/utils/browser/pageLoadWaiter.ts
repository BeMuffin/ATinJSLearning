export async function waitForFullPageLoad(timeout?:number) {
    await browser.waitUntil(
      async function () {
        const state = await browser.execute(`return document.readyState;`);
        return state === 'complete';
      },
      {
        timeout: timeout * 1000 || 40000,
        timeoutMsg: 'Page is loading',
        interval: 1000,
      }
    );
  }
