// importamos los modulos necesarios 
const { getProcessInfo, showProcess, showProcessState, killProcess } = require('../lib/process');
const { os, cpu, mem, disks, red, connection, battery, users } = require('../lib/system');

// Obtener argumentos de la línea de comandos
const args = process.argv.slice(2);
const command = args[0];
const param = args[1];

// Ejecutar el comando correspondiente 
(async () => {
    switch (command) {
        case '--getProcessInfo':
            await getProcessInfo();
            break;
        case '--showProcess':
            await showProcess();
            break;
        case '--showProcessState':
            if (param) {
                await showProcessState(param);
            } else {
                console.log("Falta el parámetro <state>.");
            }
            break;
        case '--killProcess':
            if (param) {
                await killProcess(param);
            } else {
                console.log("Falta el parámetro <pid>.");
            }
            break;
        case '--os':
            await os();
            break;
        case '--cpu':
            await cpu();
            break;
        case '--mem':
            await mem();
            break;
        case '--disks':
            await disks();
            break;
        case '--red':
            await red();
            break;
        case '--connection':
            await connection();
            break;
        case '--battery':
            await battery();
            break;
        case '--users':
            await users();
            break;
        default:
            console.log("Comando no reconocido.");
            console.log("Uso:");
            console.log("  npm run process");
            console.log("  npm run showProcess");
            console.log("  npm run showProcessState -- <state>");
            console.log("  npm run killProcess -- <pid>");
            console.log("  npm run os");
            console.log("  npm run cpu");
            console.log("  npm run mem");
            console.log("  npm run disks");
            console.log("  npm run red");
            console.log("  npm run connection");
            console.log("  npm run battery");
            console.log("  npm run users");
            break;
    }
})();