const currentDateTime = new Date().toISOString();

export const finishLaunchBody = {
  attributes: [
    {
      key: 'demoKey',
      system: true,
      value: 'demo',
    },
  ],
  description: 'this is a demo launch',
  endTime: currentDateTime,
  status: 'PASSED',
};
