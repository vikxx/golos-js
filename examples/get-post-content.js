const golos = require('../lib');

const resultP = golos.api.getContentAsync('pav', '64yyya-test');
resultP.then(result => console.log(result));
