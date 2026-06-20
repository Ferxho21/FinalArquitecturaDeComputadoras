// =========================================================================
// DATOS DEL CRONOGRAMA
// =========================================================================
const scheduleData = [
    {
        day: 1, date: "20.07.26", title: "Sistemas Numéricos (Parte 1)",
        tasks: [
            { id: "1_t1", type: "t", text: "Unidad 1: Representación de Datos (Parte 1)" },
            { id: "1_p1", type: "p", text: "Práctica 1: Sistemas Numéricos" }
        ]
    },
    {
        day: 2, date: "21.07.26", title: "Sistemas Numéricos (Parte 2)",
        tasks: [
            { id: "2_t1", type: "t", text: "Unidad 1: Representación de Datos (Parte 2)" },
            { id: "2_t2", type: "t", text: "Números Signados y Punto Flotante" },
            { id: "2_p1", type: "p", text: "Práctica 2: Unidades (2 y 2.1)" }
        ]
    },
    {
        day: 3, date: "22.07.26", title: "Lógica: Circuitos y Boole",
        tasks: [
            { id: "3_t1", type: "t", text: "Unidad 2: Circuitos Lógicos" },
            { id: "3_t2", type: "t", text: "Propiedades del Álgebra de Boole" },
            { id: "3_p1", type: "p", text: "Práctica 2: Unidades (2.2 y 2.3)" }
        ]
    },
    {
        day: 4, date: "23.07.26", title: "Mapas de Karnaugh y Práctica",
        tasks: [
            { id: "4_t1", type: "t", text: "Mapas de Karnaugh (Teoría)" },
            { id: "4_p1", type: "p", text: "Práctica 3: Boole" },
            { id: "4_p2", type: "p", text: "Práctica 4: Karnaugh" }
        ]
    },
    {
        day: 5, date: "24.07.26", title: "Circuitos Combinacionales y Secuenciales",
        tasks: [
            { id: "5_t1", type: "t", text: "Unidad 3: Circuitos Combinacionales" },
            { id: "5_t2", type: "t", text: "Unidad 3: Circuitos Secuenciales - Flip Flop" }
        ]
    },
    {
        day: 6, date: "25.07.26", title: "Registros, Contadores y Memorias",
        tasks: [
            { id: "6_t1", type: "t", text: "Unidad 3: Registros y Contadores" },
            { id: "6_t2", type: "t", text: "Unidad 3: Memorias ROM y RAM" }
        ]
    },
    {
        day: 7, date: "26.07.26", title: "Práctica de Circuitos y Memorias",
        tasks: [
            { id: "7_p1", type: "p", text: "Práctica 5: Circuitos" },
            { id: "7_p2", type: "p", text: "Práctica 6: Memorias" }
        ]
    },
    {
        day: 8, date: "27.07.26", title: "Almacenamiento (Día Pesado 1)",
        tasks: [
            { id: "8_t1", type: "t", text: "Unidad 4: Dispositivos de Almacenamiento (Parte 1)" }
        ]
    },
    {
        day: 9, date: "28.07.26", title: "Almacenamiento (Día Pesado 2)",
        tasks: [
            { id: "9_t1", type: "t", text: "Unidad 4: Dispositivos de Almacenamiento (Parte 2)" },
            { id: "9_t2", type: "t", text: "Unidad 4: Instrucciones" }
        ]
    },
    {
        day: 10, date: "29.07.26", title: "Registros Internos del Procesador",
        tasks: [
            { id: "10_t1", type: "t", text: "Unidad 4: Registros Internos (Parte 1)" },
            { id: "10_t2", type: "t", text: "Unidad 4: Registros Internos (Parte 2)" }
        ]
    },
    {
        day: 11, date: "30.07.26", title: "Estructura del Procesador y Assembler",
        tasks: [
            { id: "11_t1", type: "t", text: "Unidad 5: Estructura del Procesador" },
            { id: "11_t2", type: "t", text: "Unidad 5: Lenguaje Ensamblador" },
            { id: "11_p1", type: "p", text: "Práctica 7: Assembler" }
        ]
    },
    {
        day: 12, date: "31.07.26", title: "Interrupciones, Microcódigo e I/O",
        tasks: [
            { id: "12_t1", type: "t", text: "Unidad 5: Interrupciones y Microcódigo" },
            { id: "12_t2", type: "t", text: "Unidad 6: Interfaz de Entrada/Salida" },
            { id: "12_p1", type: "p", text: "Práctica 8: Interrupciones" }
        ]
    },
    {
        day: 13, date: "01.08.26", title: "Arquitecturas, SO y Repaso Final",
        tasks: [
            { id: "13_t1", type: "t", text: "Unidad 7: Traductores y CISC/RISC" },
            { id: "13_t2", type: "t", text: "Sistemas Operativos" },
            { id: "13_p1", type: "p", text: "Simulacro de Examen / Dudas" }
        ]
    }
];

// Estado global de progreso
let userProgress = {};

// =========================================================================
// INICIALIZACIÓN
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Cargar del LocalStorage
    const savedProgress = localStorage.getItem('arqCompDataV2');
    if (savedProgress) {
        userProgress = JSON.parse(savedProgress);
    }

    renderSchedule();
    updateProgressUI();

    // Listeners Exportar/Importar
    document.getElementById('export-btn').addEventListener('click', exportProgress);
    document.getElementById('import-btn').addEventListener('click', () => {
        document.getElementById('import-file').click();
    });
    document.getElementById('import-file').addEventListener('change', importProgress);

    // Pomodoro Listeners
    document.getElementById('pomodoro-start').addEventListener('click', togglePomodoro);
    document.getElementById('pomodoro-reset').addEventListener('click', resetPomodoro);
});

// =========================================================================
// RENDERIZADO DE UI
// =========================================================================
function renderSchedule() {
    const container = document.getElementById('schedule-container');
    container.innerHTML = ''; // Limpiar
    
    scheduleData.forEach((dayData) => {
        const node = document.createElement('div');
        
        // Calcular progreso del día
        const totalTasks = dayData.tasks.length;
        const completedTasks = dayData.tasks.filter(t => userProgress[t.id]).length;
        const isDayCompleted = totalTasks > 0 && completedTasks === totalTasks;
        
        node.className = `node ${isDayCompleted ? 'status-active' : ''}`;
        
        const hasTeoria = dayData.tasks.some(t => t.type === 't');
        const hasPractica = dayData.tasks.some(t => t.type === 'p');
        
        let tagsHtml = '';
        if (hasTeoria) tagsHtml += '<span class="tag-t">Teoría</span>';
        if (hasPractica) tagsHtml += '<span class="tag-p">Práctica</span>';

        // Generar lista de sub-tareas
        let tasksHtml = dayData.tasks.map(task => `
            <label class="task-item">
                <input type="checkbox" class="task-checkbox" data-task-id="${task.id}" ${userProgress[task.id] ? 'checked' : ''}>
                <span class="task-text">${task.text}</span>
            </label>
        `).join('');

        node.innerHTML = `
            <div class="node-content">
                <div class="node-meta">
                    <span class="node-date">SEC.${String(dayData.day).padStart(2, '0')} // ${dayData.date}</span>
                    <div class="node-tags">${tagsHtml}</div>
                </div>
                <h3 class="node-title">${dayData.title}</h3>
                <div class="payload-list">
                    ${tasksHtml}
                </div>
            </div>
        `;

        // Event Listeners para cada checkbox
        const checkboxes = node.querySelectorAll('.task-checkbox');
        checkboxes.forEach(cb => {
            cb.addEventListener('change', (e) => {
                const taskId = e.target.getAttribute('data-task-id');
                const isChecked = e.target.checked;
                userProgress[taskId] = isChecked;
                
                updateProgressUI();
                saveProgressLocal();
            });
        });

        container.appendChild(node);
    });
}

function updateProgressUI() {
    const container = document.getElementById('schedule-container');
    
    let totalTasksGlobal = 0;
    let completedTasksGlobal = 0;

    scheduleData.forEach((dayData, index) => {
        const dayTotal = dayData.tasks.length;
        const dayCompleted = dayData.tasks.filter(t => userProgress[t.id]).length;
        
        totalTasksGlobal += dayTotal;
        completedTasksGlobal += dayCompleted;

        // Actualizar clase del nodo (Día completado)
        const nodeEl = container.children[index];
        if (nodeEl) {
            if (dayTotal > 0 && dayCompleted === dayTotal) {
                nodeEl.classList.add('status-active');
            } else {
                nodeEl.classList.remove('status-active');
            }
        }
    });

    const percentage = totalTasksGlobal === 0 ? 0 : (completedTasksGlobal / totalTasksGlobal * 100).toFixed(1);
    
    document.getElementById('progress-bar').style.width = `${percentage}%`;
    document.getElementById('progress-text').textContent = `${percentage}%`;
}

// =========================================================================
// ALMACENAMIENTO Y SINCRONIZACIÓN LOCAL
// =========================================================================
function saveProgressLocal() {
    localStorage.setItem('arqCompDataV2', JSON.stringify(userProgress));
}

// Exportar: Crea un archivo JSON descargable
function exportProgress() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(userProgress));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "progreso_arquitectura.json");
    document.body.appendChild(downloadAnchorNode); // requerimiento en firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

// Importar: Lee un archivo JSON seleccionado
function importProgress(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const importedData = JSON.parse(e.target.result);
            userProgress = importedData;
            saveProgressLocal();
            renderSchedule();
            updateProgressUI();
            alert("✅ Progreso importado correctamente.");
        } catch (error) {
            alert("❌ Archivo inválido o corrupto.");
        }
    };
    reader.readAsText(file);
    // Limpiar input para permitir importar el mismo archivo de nuevo si se necesita
    event.target.value = '';
}

// =========================================================================
// POMODORO TIMER
// =========================================================================
let pomodoroInterval;
let pomodoroTime = 25 * 60; // 25 minutes in seconds
let isPomodoroRunning = false;

function togglePomodoro() {
    const startBtn = document.getElementById('pomodoro-start');
    if (isPomodoroRunning) {
        clearInterval(pomodoroInterval);
        startBtn.textContent = '[ CONTINUAR ]';
    } else {
        pomodoroInterval = setInterval(updatePomodoro, 1000);
        startBtn.textContent = '[ PAUSAR ]';
    }
    isPomodoroRunning = !isPomodoroRunning;
}

function updatePomodoro() {
    if (pomodoroTime > 0) {
        pomodoroTime--;
        displayPomodoro();
    } else {
        clearInterval(pomodoroInterval);
        isPomodoroRunning = false;
        document.getElementById('pomodoro-start').textContent = '[ INICIAR POMODORO ]';
        alert("¡Pomodoro completado! Toma un descanso.");
        resetPomodoro();
    }
}

function resetPomodoro() {
    clearInterval(pomodoroInterval);
    isPomodoroRunning = false;
    pomodoroTime = 25 * 60;
    displayPomodoro();
    document.getElementById('pomodoro-start').textContent = '[ INICIAR POMODORO ]';
}

function displayPomodoro() {
    const minutes = Math.floor(pomodoroTime / 60);
    const seconds = pomodoroTime % 60;
    document.getElementById('pomodoro-time').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
