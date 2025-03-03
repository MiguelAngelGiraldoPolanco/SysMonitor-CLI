const si = require("systeminformation");
const { exec } = require("child_process");
const { logError } = require('./logger');

// Función para obtener información de los procesos
async function getProcessInfo(){
    try {
        const processInfo = await si.processes();
        
        console.log("Procesos total: " + processInfo.all);
        console.log("Procesos corriendo: " + processInfo.running);
        console.log("Procesos durmiendo: " + processInfo.sleeping);
        console.log("Procesos bloqueados: " + processInfo.blocked);
        console.log("Procesos zombie: " + processInfo.unknown);
        console.log("---------------------------------");
    } catch (error) {
        console.error(error);
        logError('process', error);
    }
}
// Función para mostrar los procesos
async function showProcess() {
    try {
        const processInfo = await si.processes();

        processInfo.list.forEach(proc => {
            console.log("Name: " + proc.name + ' PID: ' + proc.pid + ' state: ' + proc.state);
            console.log("---------------------------------");
        }); 
    } catch (error) {
        console.error(error);    
        logError('showProcess', error);    
    }
}
// Función para eliminar un proceso
async function killProcess(pid) {
    try {
        exec(`taskkill /PID ${pid} /F`, (error, stdout, stderr) => {
            if (error) {
                console.error("Error al eliminar el proceso: " + error.message);
                logError('killProcess', error);
                return;
            }
            if (stderr) {
                console.error("Error: " + stderr);
                logError('killProcess', stderr);
                return;
            }
            console.log("Proceso eliminado: " + pid);
        });
    } catch (error) {
        console.error(error);
        logError('killProcess', error);
    }
}
// Función para mostrar los procesos por estado
async function showProcessState(state) {
    try {
        state = state.toLowerCase();
        const processInfo = await si.processes();
        let contador = false;
        if (state === 'running'|| state === 'sleeping' || state === 'blocked' || state === 'unknown') {
            processInfo.list.forEach(proc => {
                if (proc.state.includes(state)) {
                    console.log("Name: " + proc.name);
                    console.log("PID: " + proc.pid);
                    console.log("cpu: " + proc.cpu + " bytes");
                    console.log("memoria: " + proc.mem + " bytes");
                    console.log("usuario: " + proc.user);
                    console.log("prioridad: " + proc.priority);
                    console.log("---------------------------------");
                }else{
                    contador = true;
                }
            }); 
            if (contador) {
                console.log("No se encontraron procesos con el estado: " + state);
            }
        } else {
            console.log("El estado no es válido");
        }
    } catch (error) {
        console.error(error); 
        logError('showProcessState', error);       
    }
}
// Exportar funciones
module.exports = {
    getProcessInfo,
    showProcess,
    showProcessState,
    killProcess
};
