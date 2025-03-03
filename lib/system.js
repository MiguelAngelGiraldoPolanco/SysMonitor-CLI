const { Connection } = require("puppeteer");
const si = require("systeminformation");
const { logError } = require('./logger');
const gb =  1024 * 1024 * 1024;    // 1 GB en bytes
// Función para mostrar la información del sistema
async function showSystemInfo() {
    await os(); 
    await cpu();
    await mem();
    await disks();
    await red();
    await connection();
    await battery();
    await users();
}
// Funciones para obtener la información del sistema
async function os() {
    try {
        const name = (await si.osInfo()).platform;
        const version = (await si.osInfo()).distro;
        const arquitectura = (await si.osInfo()).arch;
        const serie = (await si.osInfo()).serial;

        console.log('Sistema Operativo: '+ name);        
        console.log('Versión: '+ version);
        console.log('Arquitectura: '+ arquitectura);
        console.log('Numero de Serie: '+ serie);
        console.log('---------------------------------');
    } catch (error) {
        console.error(error);
        logError('os', error);
    }
}
// Función para obtener la información de la CPU
async function cpu() {
    try {
        const name = (await si.cpu()).brand;
        const model = (await si.cpu()).model;
        const core = (await si.cpu()).cores;
        const thread = (await si.cpu()).processors;
        const frecuency = (await si.cpuCurrentSpeed()).avg;
        const use = (await si.currentLoad()).currentLoad;

        console.log('Nombre del Procesador: '+ name);
        console.log('modelo del Procesador: '+ model);        
        console.log('Numero nucleos: '+ core);
        console.log('Numero de hilos: '+ thread);
        console.log('Frecuencia de la CPU: '+ frecuency + ' GHz');
        console.log('Uso de la CPU: '+ use.toFixed(2) + ' %');
        console.log('---------------------------------');
    } catch (error) {
        console.error(error);
        logError('cpu', error);
    }
}    
// Función para obtener la información de la memoria
async function mem() {
    try {
        const total = (await si.mem()).total;
        const used = (await si.mem()).used || 0;
        const free = (await si.mem()).free;

        const percentaje = (used * 100) / total;

        console.log('Cantidad Total de RAM: '+ (total/gb).toFixed(2) + ' GB');
        console.log('Memoria en uso: '+ (used/gb).toFixed(2) + ' GB');        
        console.log('Memoria libre: '+ (free/gb).toFixed(2) + ' GB');
        console.log('Porcentaje en uso: '+ percentaje.toFixed(2) + ' %');
        console.log('---------------------------------');
    } catch (error) {
        console.error(error);
        logError('mem', error);
    }
}    
// Función para obtener la información de los discos
async function disks() {
    try {
        // Obtener la información de los dispositivos de bloque
        const names = await si.blockDevices();
        const types = await si.diskLayout();
        const space = await si.fsSize();

        // Asegurarse de que el número de elementos sea el mismo
        if (names.length === types.length && types.length === space.length) {
            for (let i = 0; i < names.length; i++) {
                const name = names[i];
                const type = types[i];
                const use = space[i];

                // Mostrar información de cada disco
                console.log("Disco Local: " + name.name);
                console.log("Tipo: " + type.type);
                console.log("Espacio total: " + (use.size / gb).toFixed(2) + ' GB');
                console.log("Espacio disponible en Disco: " + (use.available / (1024 * 1024 * 1024)).toFixed(2) + ' GB');
                console.log('---------------------------------');
            }
        } else {
            console.log('Error: Los arrays de nombres, tipos y espacio no tienen el mismo tamaño');
        }
    } catch (error) {
        console.error(error);
        logError('disks', error);
    }
}
// Función para obtener la información de la red
async function red() {
    try {
        const interfaces = await si.networkInterfaces();
        for (let i = 0; i < interfaces.length; i++) {
            const interfaz = interfaces[i];
            console.log("Nombre de la interfaz: " + interfaz.iface);
            console.log("IP local (IPv4): " + interfaz.ip4);
            console.log("IP local (IPv6): " + interfaz.ip6);
            console.log("Velocidad: " + interfaz.speed + ' Mbps');
            console.log("Estado de la conexión: " + interfaz.operstate);
            console.log("Tipo de conexión: " + interfaz.type);
            console.log('---------------------------------');
        }
    } catch (error) {
        console.error(error);
        logError('red', error);
    }
    
}
// Función para obtener la información de las conexiones de red
async function connection(){
    try {
        const connections = await si.networkConnections();
        const puertos = await si.services();

        console.log("Conexiones de red: " + connections.length);
        console.log("Conexiones TCP: " + connections.filter(conn => conn.protocol === "tcp").length);
        console.log("Conexiones UDP: " + connections.filter(conn => conn.protocol === "udp").length);
        console.log("---------------------------------");   
    } catch (error) {
        console.error(error);
        logError('connection', error);        
    }
}
// Función para obtener la información de la batería
async function battery(){
    try {
        const battery = await si.battery();

        if (battery.hasBattery){
            console.log("Porcentaje de batería: " + battery.percent + " %");
            console.log(battery.isCharging ? "Esta cargando: Sí" : "Esta cargando:  No");   
            console.log('---------------------------------');        
        } else {
            console.log("No se encontró una batería");
            console.log('---------------------------------');
        } 
    } catch (error) {
        console.error(error);
        logError('battery', error);           
    }    
}
// Función para obtener la información de los usuarios
async function users(){
    try {
        const users = await si.users();

        users.forEach(user => {
            console.log("Usuario: " + user.user);
            console.log("Hora Ultimo Login: " + user.time);
            console.log("Fecha Ultimo Login: " + user.date);
            console.log('---------------------------------');
        });
    } catch (error) {
        console.error(error);
        logError('users', error);        
    }
}
// Exportar las funciones
module.exports = {
    showSystemInfo,
    os,
    cpu,
    mem,
    disks,
    red,
    connection,
    battery,
    users
};