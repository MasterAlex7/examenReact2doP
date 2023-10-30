const {frutas,dinero} = require('./frutas');
const cowsay = require('cowsay');
frutas.forEach(item => {
    /* console.log(item); */
    console.count(item);

});
console.log(dinero);
console.log(cowsay.say({
    text: "Hola a todos estamos haciendo pruebas",
    e:"0.0",
    T:"U"
}));
