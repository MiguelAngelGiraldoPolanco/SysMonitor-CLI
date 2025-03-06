# SysMonitor CLI

**SysMonitor CLI** is a lightweight command-line interface (CLI) tool designed to help users monitor their system's performance. It provides real-time data about the CPU, memory, disk usage, processes, network connections, and more. This project aims to give developers a simple way to monitor the health and performance of their machines.

## Features

- Monitor CPU usage and performance.
- Track memory usage (RAM and swap).
- Get detailed information about disk space and usage.
- List running processes with their CPU and memory consumption.
- Show active network connections and open ports.
- Log errors for debugging.

### Installation

To use **SysMonitor CLI**, follow the steps below:

### Clone the repository

```bash
git clone https://github.com/MiguelAngelGiraldoPolanco/SysMonitor-CLI.git
cd SysMonitor-CLI
 ```

### Install dependencies

```bash
npm install
 ```

### Run the application

```bash
npm run getProcessInfo
 ```

## Usage

You can use the CLI tool by running the following commands:

```bash
npm run getProcessInfo
npm run showProcess
npm run showProcessState -- <state>
npm run killProcess -- <pid>
npm run os
npm run cpu
npm run mem
npm run disks
npm run red
npm run connection
npm run battery
npm run users
 ```

It will display system information based on the available modules (CPU, memory, disk, etc.).

## Contributing

Feel free to fork this repository, submit issues, or create pull requests if you have improvements, bug fixes, or new features!

## License

This project is open-source and available under the MIT License.

# README en Español

# SysMonitor CLI

**SysMonitor CLI** es una herramienta ligera de interfaz de línea de comandos (CLI) diseñada para ayudar a los usuarios a monitorear el rendimiento de su sistema. Proporciona datos en tiempo real sobre el uso del CPU, la memoria, el espacio en disco, los procesos, las conexiones de red y más. Este proyecto tiene como objetivo proporcionar a los desarrolladores una manera sencilla de monitorear la salud y el rendimiento de sus máquinas.

## Características

- Monitoreo del uso y rendimiento de la CPU.
- Seguimiento del uso de la memoria (RAM y swap).
- Información detallada sobre el espacio y el uso del disco.
- Listado de los procesos en ejecución con su consumo de CPU y memoria.
- Mostrar las conexiones de red activas y los puertos abiertos.
- Registro de errores para depuración.

### Instalación

Para usar **SysMonitor CLI**, sigue los pasos a continuación:

### Clona el repositorio

```bash
git clone https://github.com/MiguelAngelGiraldoPolanco/SysMonitor-CLI.git
cd SysMonitor-CLI
 ```

### Instala las dependencias

```bash
npm install
 ```

### Ejecuta la aplicación

```bash
npm run getProcessInfo
 ```

## Uso

### Puedes usar la herramienta CLI ejecutando los siguientes comandos

```bash
npm run getProcessInfo
npm run showProcess
npm run showProcessState -- <state>
npm run killProcess -- <pid>
npm run os
npm run cpu
npm run mem
npm run disks
npm run red
npm run connection
npm run battery
npm run users
 ```

Esto mostrará información sobre el sistema según los módulos disponibles (CPU, memoria, disco, etc.).

## Contribuciones

¡Siéntete libre de hacer un fork de este repositorio, reportar problemas o crear pull requests si tienes mejoras, correcciones de errores o nuevas funcionalidades!

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
