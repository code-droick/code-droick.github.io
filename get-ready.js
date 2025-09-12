document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Función para manejar las pestañas
    function switchTab(targetTab) {
        // Desactivar todos los botones y contenidos
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Activar el botón y el contenido correctos
        const buttonToActivate = document.querySelector(`.tab-button[data-tab="${targetTab}"]`);
        const contentToActivate = document.getElementById(targetTab);

        if (buttonToActivate && contentToActivate) {
            buttonToActivate.classList.add('active');
            contentToActivate.classList.add('active');
        }
    }

    // Agregar event listeners a los botones de las pestañas
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });

    // Asegurarse de que la pestaña inicial sea la activa al cargar
    switchTab('historia');

    // --- Cronología dinámica ---
const eventosPorAño = {
    1998: [
        { titulo: "Fundación del Colegio", descripcion: "En 1998 se funda el Colegio Parroquial Católico 'Cristo del Buen Viaje'." }
    ],
    2005: [
        { titulo: "Primer Campeonato Deportivo", descripcion: "El colegio gana su primer campeonato de fútbol escolar." }
    ],
    2010: [
        { titulo: "Ampliación de Instalaciones", descripcion: "Se inaugura el nuevo edificio de aulas y laboratorios." }
    ],
    2018: [
        { titulo: "Reconocimiento Académico", descripcion: "El colegio recibe un premio nacional por excelencia educativa." }
    ],
    2025: [
        { titulo: "Modernización Digital", descripcion: "Se implementa la plataforma digital para todos los estudiantes." }
    ]
};

function renderEventos(year) {
    const container = document.querySelector('.timeline-events');
    container.innerHTML = '';
    if (eventosPorAño[year]) {
        eventosPorAño[year].forEach(ev => {
            const div = document.createElement('div');
            div.className = 'timeline-event';
            div.innerHTML = `<h4>${ev.titulo}</h4><p>${ev.descripcion}</p>`;
            container.appendChild(div);
        });
    } else {
        container.innerHTML = '<p>No hay eventos registrados para este año.</p>';
    }
}

document.querySelectorAll('.timeline-year').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.timeline-year').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        renderEventos(this.dataset.year);
    });
});

// Inicializa con el año activo
const activeYearBtn = document.querySelector('.timeline-year.active');
if (activeYearBtn) renderEventos(activeYearBtn.dataset.year);

// --- Grilla dinámica de profesores ---
const profesores = [
    {
        nombre: "José Luna",
        materia: "Deporte",
        imagen: "img/profesores/profesor1.jpg",
        descripcion: "Apasionada por los números y la enseñanza divertida.",
        estadisticas: {
            Paciencia: 92,
            Creatividad: 85,
            Carisma: 88,
            Claridad: 90,
            Humor: 80
        }
    },
    {
        nombre: "Jacklis Caraballo",
        materia: "Danza",
        imagen: "img/profesores/profesor2.jpg",
        descripcion: "Hace que la gramática sea fácil y entretenida.",
        estadisticas: {
            Paciencia: 80,
            Creatividad: 90,
            Carisma: 95,
            Claridad: 85,
            Humor: 88
        }
    },
    {
        nombre: "Gilberto Jiménez",
        materia: "Inglés",
        imagen: "img/profesores/profesor1.jpg",
        descripcion: "Apasionada por los números y la enseñanza divertida.",
        estadisticas: {
            Paciencia: 92,
            Creatividad: 85,
            Carisma: 88,
            Claridad: 90,
            Humor: 80
        }
    },
    {
        nombre: "Rafael Moreno",
        materia: "Lengua",
        imagen: "img/profesores/profesor2.jpg",
        descripcion: "Hace que la gramática sea fácil y entretenida.",
        estadisticas: {
            Paciencia: 80,
            Creatividad: 90,
            Carisma: 95,
            Claridad: 85,
            Humor: 88
        }
    },
    {
        nombre: "Zulma Landaeta",
        materia: "Matemáticas",
        imagen: "img/profesores/profesor1.jpg",
        descripcion: "Apasionada por los números y la enseñanza divertida.",
        estadisticas: {
            Paciencia: 92,
            Creatividad: 85,
            Carisma: 88,
            Claridad: 90,
            Humor: 80
        }
    },
    {
        nombre: "Patricia Luna",
        materia: "Química",
        imagen: "img/profesores/profesor2.jpg",
        descripcion: "Hace que la gramática sea fácil y entretenida.",
        estadisticas: {
            Paciencia: 80,
            Creatividad: 90,
            Carisma: 95,
            Claridad: 85,
            Humor: 88
        }
    },
    {
        nombre: "Eduardo Ramírez",
        materia: "Educación Física",
        imagen: "img/profesores/profesor1.jpg",
        descripcion: "Apasionada por los números y la enseñanza divertida.",
        estadisticas: {
            Paciencia: 92,
            Creatividad: 85,
            Carisma: 88,
            Claridad: 90,
            Humor: 80
        }
    },
    {
        nombre: "Mariela Bello",
        materia: "Formación a la Soberanía Nacional",
        imagen: "img/profesores/profesor2.jpg",
        descripcion: "Hace que la gramática sea fácil y entretenida.",
        estadisticas: {
            Paciencia: 80,
            Creatividad: 90,
            Carisma: 95,
            Claridad: 85,
            Humor: 88
        }
    },
    // ...agrega más profesores aquí...
];

function renderProfesores() {
    const grid = document.querySelector('.profesores-grid');
    grid.innerHTML = '';
    profesores.forEach((prof, idx) => {
        const card = document.createElement('div');
        card.className = 'profesor-card';
        card.dataset.profesor = idx;
        card.innerHTML = `
            <img src="${prof.imagen}" alt="${prof.nombre}">
            <div class="profesor-nombre">${prof.nombre}</div>
            <div class="profesor-materia">${prof.materia}</div>
        `;
        grid.appendChild(card);
    });
}

function renderDetalleProfesor(idx) {
    const detalle = document.querySelector('.profesor-detalle-container');
    const prof = profesores[idx];
    if (!prof) return;
    detalle.innerHTML = `
        <div class="profesor-detalle">
            <h4>${prof.nombre}</h4>
            <p>Materia: ${prof.materia}</p>
            <ul class="profesor-estadisticas">
                ${Object.entries(prof.estadisticas).map(([key, val]) => `<li>${key}: ${val}</li>`).join('')}
            </ul>
            <p>${prof.descripcion}</p>
        </div>
    `;
}

document.addEventListener('click', function(e) {
    if (e.target.closest('.profesor-card')) {
        const idx = e.target.closest('.profesor-card').dataset.profesor;
        renderDetalleProfesor(idx);
    }
});

// Inicializa la grilla
renderProfesores();

// --- Instalaciones dinámicas ---
const instalaciones = [
    { nombre: "Oficina Principal", icono: "fa-door-open" },
    { nombre: "Salón de Clases 1", icono: "fa-chalkboard" },
    { nombre: "Salón de Clases 2", icono: "fa-chalkboard" },
    { nombre: "Patio Central", icono: "fa-tree" },
    { nombre: "Baños", icono: "fa-restroom" },
    { nombre: "Cancha Deportiva", icono: "fa-basketball-ball" },
    // ...agrega más puntos según tu colegio...
];

function renderInstalaciones() {
    const lista = document.querySelector('.instalaciones-lista');
    if (!lista) return;
    lista.innerHTML = '';
    instalaciones.forEach(inst => {
        const li = document.createElement('li');
        li.className = 'instalacion-item';
        li.innerHTML = `<span class="instalacion-icon"><i class="fas ${inst.icono}"></i></span> <span class="instalacion-nombre">${inst.nombre}</span>`;
        lista.appendChild(li);
    });
}

// Inicializa la lista de instalaciones
renderInstalaciones();

});