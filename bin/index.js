const {
    getProcessInfo,
    showProcess,
    showProcessState,
    killProcess,
} = require("../lib/process");
const {
    os,
    cpu,
    mem,
    disks,
    red,
    connection,
    battery,
    users,
} = require("../lib/system");

// Obtener argumentos de la línea de comandos
const args = process.argv.slice(2);
const command = args[0];
const param = args[1];

// Función por defecto para comandos no reconocidos
function defaultCommand() {
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
}

// Definimos los comandos en un objeto para poder ejecutarlos
const commands = {
    "--getProcessInfo": getProcessInfo,
    "--showProcess": showProcess,
    "--showProcessState": param
        ? () => showProcessState(param)
        : () => console.log("Falta el parámetro <state>."),
    "--killProcess": param
        ? () => killProcess(param)
        : () => console.log("Falta el parámetro <pid>."),
    "--os": os,
    "--cpu": cpu,
    "--mem": mem,
    "--disks": disks,
    "--red": red,
    "--connection": connection,
    "--battery": battery,
    "--users": users,
    default: defaultCommand,
};

// Ejecutar el comando correspondiente
(async () => {
    const executeCommand = commands[command] || defaultCommand;
    await executeCommand();
})();
