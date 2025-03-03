const si = require("systeminformation");
const { exec } = require("child_process");


async function process(){
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
    }
}

async function showProcess() {
    try {
        const processInfo = await si.processes();

        processInfo.list.forEach(proc => {
            console.log("Name: " + proc.name + ' PID: ' + proc.pid + ' state: ' + proc.state);
            console.log("---------------------------------");
        }); 
    } catch (error) {
        console.error(error);        
    }
}

async function kill(pid) {
    try {
        exec(`taskkill /PID ${pid} /F`, (error, stdout, stderr) => {
            if (error) {
                console.error("Error al eliminar el proceso: " + error.message);
                return;
            }
            if (stderr) {
                console.error("Error: " + stderr);
                return;
            }
            console.log("Proceso eliminado: " + pid);
        });
    } catch (error) {
        console.error(error);
    }
}

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
    }
}

