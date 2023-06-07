import log4js from 'log4js';

log4js.configure({
  appenders: {
    console: { type: 'console' },
    file: { type: 'file', filename: '../../reports/logs' } // Change the log file path and name as per your requirement
  },
  categories: {
    default: { appenders: ['console', 'file'], level: 'debug' }
  }
});

export default log4js;