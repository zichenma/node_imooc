const { add, mul } = require('./a');
const sum = add (10, 20);
const res = mul (100, 200);
const _ = require('lodash')
console.log(sum); // 30
console.log(res); // 20000

const arr = _.concat([1, 2], 3);
console.log('arr...', arr);