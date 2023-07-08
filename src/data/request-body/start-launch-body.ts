export const startLaunchBody = {
  attributes: [
    {
      key: 'demoKey',
      system: true,
      value: 'demo',
    },
  ],
  description: 'Demo launch',
  mode: 'DEFAULT',
  name: 'Demo Api Tests',
  rerun: false,
  rerunOf: 'string',
  startTime: '2023-05-17T21:03:20.188Z',
};

export const invalidStartLaunchBody = {
  attributes: [
    {
      key: 'demoKey',
      system: true,
      value: 'demo',
    },
  ],
  description: 'Demo launch',
  mode: 'DEFAULT',
  name: '',
  rerun: false,
  rerunOf: 'string',
  startTime: '',
};
