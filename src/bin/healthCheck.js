#!/usr/bin/env node --experimental-modules "$0" "$@"

const http = require('http');

const exit = ({ healthy = true } = {}) => (healthy ? process.exit(0) : process.exit(1));

const checkAPI = () => new Promise((resolve, reject) => {
  http.get('http://localhost:5000/health', (res) => {
    const { statusCode } = res;
    if (statusCode !== 200) {
      reject(new Error('api does not answer with status 200'));
    }
    res.resume();
    return resolve();
  });
});

const check = () => Promise.all([
  checkAPI(),
]);

const handleSuccessfulConnection = (healthCheck) => () => {
  healthCheck({ healthy: true });
};

const handleUnsuccessfulConnection = (healthCheck) => () => {
  healthCheck({ healthy: false });
};

check()
  .then(handleSuccessfulConnection(exit))
  .catch(handleUnsuccessfulConnection(exit));
