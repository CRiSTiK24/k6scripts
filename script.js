import http from 'k6/http';
import { SharedArray } from 'k6/data';
import { check, group, sleep } from 'k6';
const data = new SharedArray('some data name', function () {
  return JSON.parse(open('./ipfile.json')).ips;
});
const ipClass = data[__ENV.K6_CLOUD];
export const options = {
  stages: [
    { duration: '1m', target: __ENV.K6_PRIMER },
    { duration: '1m', target: __ENV.K6_MIG },
    { duration: '1m', target: 0 }, 
  ],
 thresholds: {
    http_req_duration: ['p(90)<500'],
  },
};
export default () => {  
  const resGetInicial = http.get(`http://${ipClass.ip}:8085`, {});
  const resCreateGame = http.post(`http://${ipClass.ip}:8085/games`, {});
  const parsedCreateGame = resCreateGame.json();
  const gameId= parsedCreateGame.id;
  const resGetGameIdInfo =   http.get(`http://${ipClass.ip}:8085/games/${gameId}`, {});
  const playerPayload = JSON.stringify({
    player_name: 'cristik',
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const resJoinGame = http.post(`http://${ipClass.ip}:8085/games/${gameId}/join`,  playerPayload, params);

  check(resGetInicial, {
    'Initial info retrieved': (r) => r.status === 200,
  });

  check(resCreateGame, {
    'Game created successfully': (r) => r.status === 200,
  });
  
  check(resGetGameIdInfo, {
    'Game info retrieved': (r) => r.status === 200,
  });

  check(resJoinGame, {
    'Joining the game as cristik successfully': (r) => r.status === 200,
  });

  sleep(5);
};
