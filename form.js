document.addEventListener('DOMContentLoaded', function() {
    const printPdfBtn = document.getElementById('printPdfBtn');

        // Obtener los elementos del DOM
    const paisNacimientoSelect = document.getElementById('paisNacEstudiante');
    const estadosVenezuelaContainer = document.getElementById('estadosVenezuelaContainer');
    const paisesMundoContainer = document.getElementById('paisesMundoContainer');

    // Función que se ejecuta cada vez que el valor del select cambia
    function manejarCambioPais() {
        if (paisNacimientoSelect.value === 'VE') {
            estadosVenezuelaContainer.style.display = 'block';
            paisesMundoContainer.style.display = 'none';
        } else if (paisNacimientoSelect.value === 'OTRO') {
            estadosVenezuelaContainer.style.display = 'none';
            paisesMundoContainer.style.display = 'block';
        } else {
            // Si se selecciona la opción por defecto, ocultamos ambos
            estadosVenezuelaContainer.style.display = 'none';
            paisesMundoContainer.style.display = 'none';
        }
    }

    // Agregar un "escuchador" de eventos al select de países
    if (paisNacimientoSelect) {
        paisNacimientoSelect.addEventListener('change', manejarCambioPais);
        // Llamar a la función una vez al inicio para establecer el estado correcto
        manejarCambioPais();
    }
    
    if (printPdfBtn) {
        printPdfBtn.addEventListener('click', function() {
            // Creamos una nueva instancia de jsPDF
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // Título del documento
            doc.setFontSize(22);
            doc.text("FORMULARIO DE INSCRIPCIÓN", 105, 20, null, null, "center");
            
            // Línea de separación
            doc.setLineWidth(0.5);
            doc.line(20, 25, 190, 25);

            // Obtenemos los valores de los campos
            const anioEscolar = document.getElementById('anioEscolar').value || 'No aplica';
            const curso = document.getElementById('curso').value || 'No aplica';
            const nombreEstudiante = document.getElementById('nombreEstudiante').value || 'No aplica';
            const apellidoEstudiante = document.getElementById('apellidoEstudiante').value || 'No aplica';

            let y = 35; // Posición vertical inicial

            // Sección 1: Datos del Estudiante
            doc.setFontSize(16);
            doc.text("Datos del Estudiante", 20, y);
            y += 10;
            doc.setFontSize(12);
            doc.text(`Año Escolar: ${anioEscolar}`, 20, y);
            y += 7;
            doc.text(`Curso: ${curso}`, 20, y);
            y += 7;
            doc.text(`Nombre Completo: ${nombreEstudiante} ${apellidoEstudiante}`, 20, y);
            y += 10;
            
            // Aquí puedes seguir añadiendo más campos del formulario...
            // Por ejemplo:
            const fechaNacEstudiante = document.getElementById('fechaNacEstudiante').value || 'No aplica';
            const lugarNacEstudiante = document.getElementById('lugarNacEstudiante').value || 'No aplica';
            doc.text(`Fecha de Nacimiento: ${fechaNacEstudiante}`, 20, y);
            y += 7;
            doc.text(`Lugar de Nacimiento: ${lugarNacEstudiante}`, 20, y);
            y += 10;

            // Sección 2: Datos de los Representantes
            doc.setFontSize(16);
            doc.text("Datos de los Representantes", 20, y);
            y += 10;
            doc.setFontSize(12);
            const nombrePadre = document.getElementById('nombrePadre').value || 'No aplica';
            const apellidoPadre = document.getElementById('apellidoPadre').value || 'No aplica';
            doc.text(`Nombre del Padre: ${nombrePadre} ${apellidoPadre}`, 20, y);
            y += 7;
            const nombreMadre = document.getElementById('nombreMadre').value || 'No aplica';
            const apellidoMadre = document.getElementById('apellidoMadre').value || 'No aplica';
            doc.text(`Nombre de la Madre: ${nombreMadre} ${apellidoMadre}`, 20, y);

            // Guardamos el documento
            doc.save('formulario-inscripcion-personalizado.pdf');
        });
    }
});