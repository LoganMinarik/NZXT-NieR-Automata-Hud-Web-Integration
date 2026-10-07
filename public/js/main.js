import {get_cookie } from './util.js'

const VIEWSTATE = parseInt(get_cookie('viewstate')) || 640
const zeroPad = (num, places) => String(num).padStart(places, '0')


// Set dimensions
/*document.documentElement.style.width = VIEWSTATE + 'px'
document.documentElement.style.height = VIEWSTATE + 'px'*/
document.body.style.width = VIEWSTATE + 'px'
document.body.style.height = VIEWSTATE + 'px'

// Temps update
window.nzxt = {
    v1: {
        onMonitoringDataUpdate: (data) => {
            const { cpus, gpus, ram } = data // https://github.com/NZXTCorp/web-integrations-types/blob/main/v1/index.d.ts
            update_cpu_gpu(cpus[0].load, gpus[0].load)
            update_ram(ram.totalSize, ram.inUse)
        }
    }
}

const cpu_temp = document.getElementById('cpu-gpu')
function update_cpu_gpu (cpu_load, gpu_load) {
    cpu_temp.innerHTML = `CPU:[${zeroPad((cpu_load * 100).toFixed(1), 4)}%] </br> GPU:[${zeroPad((gpu_load * 100).toFixed(1), 4)}%]`
}

const gpu_temp = document.getElementById('ram')
const fmtGB = (mb) => (mb / 1024).toFixed(2).replace(/(\.\d)0$/, '$1')
function update_ram (total, use) {
    gpu_temp.innerHTML = `[${fmtGB(use)}/${fmtGB(total)}GB]`
}