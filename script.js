const scheduleData = [
    {
        day: 1,
        date: "20.07.26",
        title: "Fundamentos y Sistemas Numéricos",
        teoria: ["Unidad 1: Representación de Datos", "Números Signados", "Punto Flotante"],
        practica: ["Práctica 1: Sistemas Numéricos"],
        completed: false
    },
    {
        day: 2,
        date: "21.07.26",
        title: "Repaso de Unidades de Medida",
        teoria: [],
        practica: ["Práctica 2", "Práctica 2.1", "Práctica 2.2", "Práctica 2.3"],
        completed: false
    },
    {
        day: 3,
        date: "22.07.26",
        title: "Lógica y Álgebra",
        teoria: ["Unidad 2: Circuitos Lógicos", "Propiedades del Álgebra de Boole", "Mapas de Karnaugh"],
        practica: [],
        completed: false
    },
    {
        day: 4,
        date: "23.07.26",
        title: "Práctica Lógica",
        teoria: [],
        practica: ["Práctica 3: Boole", "Práctica 4: Karnaugh"],
        completed: false
    },
    {
        day: 5,
        date: "24.07.26",
        title: "Circuitos Combinacionales",
        teoria: ["Unidad 3: Circuitos Digitales Combinacionales", "Circuito Sumador", "Multiplexor"],
        practica: [],
        completed: false
    },
    {
        day: 6,
        date: "25.07.26",
        title: "Circuitos Secuenciales y Memoria",
        teoria: ["Unidad 3: Circuitos Secuenciales (Flip Flop)", "Registros y Contadores", "Memorias ROM y RAM"],
        practica: [],
        completed: false
    },
    {
        day: 7,
        date: "26.07.26",
        title: "Práctica de Circuitos",
        teoria: [],
        practica: ["Práctica 5: Circuitos", "Práctica 6: Memorias"],
        completed: false
    },
    {
        day: 8,
        date: "27.07.26",
        title: "Arquitectura Interna",
        teoria: ["Unidad 4: Estructura del Computador", "Dispositivos de Almacenamiento", "Registros Internos e Instrucciones"],
        practica: [],
        completed: false
    },
    {
        day: 9,
        date: "28.07.26",
        title: "El Procesador y Ensamblador",
        teoria: ["Unidad 5: Estructura del Procesador", "Lenguaje Ensamblador"],
        practica: ["Práctica 7: Assembler"],
        completed: false
    },
    {
        day: 10,
        date: "29.07.26",
        title: "Interrupciones y Microcódigo",
        teoria: ["Unidad 5: Interrupciones", "Microcódigo"],
        practica: ["Práctica 8: Interrupciones"],
        completed: false
    },
    {
        day: 11,
        date: "30.07.26",
        title: "Interfaces y Arquitecturas",
        teoria: ["Unidad 6: Interfaz de Entrada/Salida", "Unidad 7: Traductores de Lenguaje", "Arquitectura CISC y RISC"],
        practica: [],
        completed: false
    },
    {
        day: 12,
        date: "31.07.26",
        title: "Sistemas Operativos",
        teoria: ["Conceptos de SO"],
        practica: ["Revisión de Parciales Anteriores"],
        completed: false
    },
    {
        day: 13,
        date: "01.08.26",
        title: "Simulacro Final",
        teoria: ["Repaso General de Conceptos Clave"],
        practica: ["Simulacro de Examen / Dudas"],
        completed: false
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('schedule-container');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');

    const savedProgress = JSON.parse(localStorage.getItem('arqCompData')) || {};
    
    scheduleData.forEach((dayData) => {
        if (savedProgress[dayData.day] !== undefined) {
            dayData.completed = savedProgress[dayData.day];
        }

        const node = document.createElement('div');
        node.className = `node ${dayData.completed ? 'status-active' : ''}`;
        
        let tagsHtml = '';
        if (dayData.teoria.length > 0) tagsHtml += '<span class="tag-t">Teoría</span>';
        if (dayData.practica.length > 0) tagsHtml += '<span class="tag-p">Práctica</span>';

        let listHtml = '';
        dayData.teoria.forEach(item => listHtml += `<li>${item}</li>`);
        dayData.practica.forEach(item => listHtml += `<li>${item}</li>`);

        node.innerHTML = `
            <div class="node-content">
                <div class="node-meta">
                    <span class="node-date">SEC.${String(dayData.day).padStart(2, '0')} // ${dayData.date}</span>
                    <div class="node-tags">${tagsHtml}</div>
                </div>
                <h3 class="node-title">${dayData.title}</h3>
                <ul class="payload-list">
                    ${listHtml}
                </ul>
                <div class="control-switch">
                    <input type="checkbox" class="toggle-input" id="switch-${dayData.day}" ${dayData.completed ? 'checked' : ''}>
                    <label for="switch-${dayData.day}" class="toggle-label">
                        ${dayData.completed ? 'SECTOR COMPLETADO' : 'INICIAR SECTOR'}
                    </label>
                </div>
            </div>
        `;

        const checkbox = node.querySelector(`#switch-${dayData.day}`);
        const label = node.querySelector(`.toggle-label`);

        checkbox.addEventListener('change', (e) => {
            dayData.completed = e.target.checked;
            if(dayData.completed) {
                node.classList.add('status-active');
                label.textContent = 'SECTOR COMPLETADO';
            } else {
                node.classList.remove('status-active');
                label.textContent = 'INICIAR SECTOR';
            }
            saveProgress();
            updateProgress();
        });

        container.appendChild(node);
    });

    function saveProgress() {
        const progressObj = {};
        scheduleData.forEach(d => {
            progressObj[d.day] = d.completed;
        });
        localStorage.setItem('arqCompData', JSON.stringify(progressObj));
    }

    function updateProgress() {
        const completedDays = scheduleData.filter(d => d.completed).length;
        const totalDays = scheduleData.length;
        const percentage = (completedDays / totalDays * 100).toFixed(1);
        
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${percentage}%`;
    }

    updateProgress();
});
