import http from 'k6/http';
import { SharedArray } from 'k6/data';
import { check, group, sleep } from 'k6';
const data = new SharedArray('some data name', function () {
  return JSON.parse(open('./ipfile.json')).ips;
});
export const options = {
  stages: [
    { duration: '2m', target: 2000 },
    { duration: '2m', target: 4000 },
    { duration: '3m', target: 0 },
  ],
 thresholds: {
    http_req_duration: ['p(90)<1500'], // 90% of requests must complete below 1.5s
  },
};
export default () => {
  const ipClass = data[__ENV.CLOUD];
  const res = http.get(`http://${ipClass.ip}:8085`, {});

check(res, {
    'is status 200': (r) => r.status===200,
'response body contains start creating a game': (r)=>
 r.body.includes('start creating a game'),
  });
};
