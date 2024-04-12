//Opción 1 - Importamos con cualquier nombre
const sumFunction = require('./sum')

//Opción 2 - Importamos obligatoriamente haciendo una desestructuración del objeto
const { sum } = require('./sum')

console.log(sumFunction(4, 9)) // 13
console.log(sum(4, 9)) // 13