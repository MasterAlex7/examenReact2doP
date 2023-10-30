const http = require('http');
const server = http.createServer((req, res)=>{
    res.end('Se responde tu solicitud desde el servidor v3');

});

const puerto = 3000;

server.listen(puerto,()=>{
    console.log('escuchando solicitudes en el servidor v2');
});

/* se instala nodemon para que actulice automaticamente los cambios realizados
en el archivo conexion.js */