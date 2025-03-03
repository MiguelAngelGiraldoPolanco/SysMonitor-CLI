const fs = require('fs').promises;
const path = require('path');
// Función para escribir en el archivo de log de errores
async function logError(funcion, error) {
    try {
        let date = new Date().toISOString();
        let log = `Fecha: ${date} Funcion: ${funcion} Error: ${error}\n`;
        await fs.appendFile(path.join(__dirname, '../logs/error.log'), log);
    } catch (err) {
        console.error('Error al escribir en el archivo de log:', err);
    }
}
// Exportar la función logError
module.exports = {
    logError
};