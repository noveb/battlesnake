#!/usr/bin/env node --experimental-modules "$0" "$@"

const http = require('http');

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

const healthy = () => {
  process.exit(0);
};

const unhealthy = () => {
  process.exit(1);
};

check()
  .then(healthy)
  .catch(unhealthy);
