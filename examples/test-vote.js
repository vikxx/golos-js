const golos = require('../lib');

const username = process.env.STEEM_USERNAME;
const password = process.env.STEEM_PASSWORD;
const wif = golos.auth.toWif(username, password, 'posting');

golos
  .broadcast
  .upvote(
    wif,
    username,
    'yamadapc',
    'test-post-bop-1-2-3-4-5-6',
    null,
    function(err, result) {
      console.log(err, result);
    }
  );
