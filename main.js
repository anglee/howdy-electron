const _ = require('lodash');
console.log('_.VERSION', _.VERSION);

/*
(async () => {
  const page = 1;
  const query = 'cat';
  const opts = {
    method: 'GET',
    headers: {
      Authorization: 'Client-ID 2032c1feddefa31'
    },
  };
  const response = await fetch(
    `https://api.imgur.com/3/gallery/search/top/all/${page}?q=${query}`,
    //`http://ec2-107-21-76-203.compute-1.amazonaws.com/imgur-proxy/${page}?q=${query}`,
    opts
  ).then(res => res.json());
  console.log('response', response);
})();
*/
