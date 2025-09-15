document.addEventListener('DOMContentLoaded', function() {

    let currentStep = 0;

    function showStep(step) {
        const steps = document.querySelectorAll('.step');
        steps.forEach((stepDiv, index) => {
            stepDiv.classList.toggle('active', index === step);
        });
        updatePageIndicator();
        updatePageSubIndicator();
        
    }

    function nextStep() {
    const steps = document.querySelectorAll('.step');
    // Validar solo los campos visibles en la sección actual
    const currentFields = steps[currentStep].querySelectorAll('input, select, textarea');
    let valid = true;
    currentFields.forEach(field => {
        if (field.hasAttribute('required') && !field.value.trim()) {
            field.classList.add('input-error');
            valid = false;
        } else {
            field.classList.remove('input-error');
        }
    });
    if (!valid) {
        // Opcional: enfocar el primer campo con error
        const firstError = steps[currentStep].querySelector('.input-error');
        if (firstError) firstError.focus();
        return;
    }
    if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
        
        updatePageIndicator();
        updatePageSubIndicator();

    }
}

    function prevStep() {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
            updatePageIndicator();
            updatePageSubIndicator();
            
        }
    }

    function updatePageIndicator() {
    const steps = document.querySelectorAll('.step');
    const indicator = document.getElementById('formPageIndicator');
    indicator.textContent = `Página ${currentStep + 1} de ${steps.length}`;
    }

    function updatePageSubIndicator() {
    const steps = document.querySelectorAll('.step');
    const indicator = document.getElementById('formPageSubIndicator');

    let msg = [
        "datos de solicitud",
        "datos del estudiante",
        "condición académica",
        "datos del representante",
        "datos del representante",
        "datos de trabajo del representante",
        "datos del padre",
        "datos de trabajo del padre",
        "datos de la madre",
        "datos de trabajo de la madre",
    ];

    indicator.textContent = msg[currentStep] || '';
    }

    // Hacer globales para el HTML
    window.nextStep = nextStep;
    window.prevStep = prevStep;

    // Inicializa mostrando la primera página
    showStep(currentStep);

    // --- País de nacimiento: mostrar/ocultar campos según selección ---
    const paisNacimientoSelect = document.getElementById('paisNacEstudiante');
    const estadosVenezuelaContainer = document.getElementById('estadosVenezuelaContainer');
    const paisesMundoContainer = document.getElementById('paisesMundoContainer');

    function manejarCambioPais() {
        if (paisNacimientoSelect.value === 'VE') {
            estadosVenezuelaContainer.style.display = 'block';
            paisesMundoContainer.style.display = 'none';
        } else if (paisNacimientoSelect.value === 'OTRO') {
            estadosVenezuelaContainer.style.display = 'none';
            paisesMundoContainer.style.display = 'block';
        } else {
            estadosVenezuelaContainer.style.display = 'none';
            paisesMundoContainer.style.display = 'none';
        }
    }

    if (paisNacimientoSelect) {
        paisNacimientoSelect.addEventListener('change', manejarCambioPais);
        manejarCambioPais();
    }

    // --- Impresión PDF ---
    const printPdfBtn = document.getElementById('printPdfBtn');
    if (printPdfBtn) {
        printPdfBtn.addEventListener('click', function() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            doc.setFontSize(40);
            doc.setFont("helvetica", "bold");
            doc.text("FORMULARIO DE INSCRIPCIÓN", 105, 20, null, null, "center");
            doc.setLineWidth(0.5);
            doc.line(20, 25, 190, 25);

            let y = 35;

            // Sección 1: Datos del Estudiante
            doc.setFontSize(20);
            doc.setFont("helvetica", "bold");
            doc.text("DATOS DEL ESTUDIANTE", 20, y); y += 10;
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            doc.text(`Año Escolar: ${document.getElementById('anioEscolar').value || 'No aplica'}`, 20, y); y += 7;
            doc.text(`Curso: ${document.getElementById('curso').value || 'No aplica'}`, 20, y); y += 7;
            doc.text(`Nombre Completo: ${document.getElementById('nombreEstudiante').value || ''} ${document.getElementById('apellidoEstudiante').value || ''}`, 20, y); y += 7;
            doc.text(`Fecha de Nacimiento: ${document.getElementById('fechaNacEstudiante').value || 'No aplica'}`, 20, y); y += 7;
            doc.text(`Lugar de Nacimiento: ${document.getElementById('lugarNacEstudiante').value || 'No aplica'}`, 20, y); y += 10;

            // Sección 2: Datos de los Representantes
            doc.setFontSize(16);
            doc.text("DATOS DEL REPRESENTANTE LEGAL", 20, y); y += 10;
            doc.setFontSize(12);
            doc.text(`Nombre del Padre: ${document.getElementById('nombrePadre').value || ''} ${document.getElementById('apellidoPadre').value || ''}`, 20, y); y += 7;
            doc.text(`Nombre de la Madre: ${document.getElementById('nombreMadre').value || ''} ${document.getElementById('apellidoMadre').value || ''}`, 20, y); y += 10;

            // Sección 3: Datos de trabajo del Representante
            doc.setFontSize(16);
            doc.text("DATOS DE TRABAJO DEL REPRESENTANTE", 20, y); y += 10;
            doc.setFontSize(12);
            doc.text(`Ocupación: ${document.getElementById('ocupacionRepresentante').value || 'No aplica'}`, 20, y); y += 7;
            doc.text(`Empresa: ${document.getElementById('empresaRepresentante').value || 'No aplica'}`, 20, y); y += 7;
            doc.text(`Puesto: ${document.getElementById('puestoRepresentante').value || 'No aplica'}`, 20, y); y += 7;
            doc.text(`Ingresos: ${document.getElementById('ingresosRepresentante').value || 'No aplica'}`, 20, y); y += 7;
            doc.text(`Teléfono del trabajo: ${document.getElementById('telefonoTrabajoRepresentante').value || 'No aplica'}`, 20, y); y += 7;
            doc.text(`Dirección del trabajo: ${document.getElementById('direccionTrabajoRepresentante').value || 'No aplica'}`, 20, y); y += 10;

            // Sección 4: Datos de los padres
            doc.setFontSize(16);
            doc.text("DATOS DEL REPRESENTANTE LEGAL", 20, y); y += 10;
            doc.setFontSize(12);
            doc.text(`Nombre del Padre: ${document.getElementById('nombrePadre').value || ''} ${document.getElementById('apellidoPadre').value || ''}`, 20, y); y += 7;
            doc.text(`Nombre de la Madre: ${document.getElementById('nombreMadre').value || ''} ${document.getElementById('apellidoMadre').value || ''}`, 20, y); y += 10;

            doc.save('formulario-inscripcion.pdf');
        });
    }

    // --- Autorrelleno de datos de padre/madre según parentesco ---
    const parentescoSelect = document.getElementById('parentescoRepresentante');
    const repCampos = {
        nombre: document.getElementById('nombreRepresentante'),
        segundoNombre: document.getElementById('segundoNombreRepresentante'),
        apellido: document.getElementById('apellidoRepresentante'),
        segundoApellido: document.getElementById('segundoApellidoRepresentante'),
        fechaNac: document.getElementById('fechaNacRepresentante'),
        paisNac: document.getElementById('paisNacRepresentante'),
        estadoNac: document.getElementById('estadoNacRepresentante'),
        ciudadNac: document.getElementById('ciudadNacRepresentante'),
        estadoCivil: document.getElementById('estadoCivilRepresentante'),
        correo: document.getElementById('correoRepresentante'),
        telefonoFijo: document.getElementById('telefonoFijoRepresentante'),
        telefonoMovil: document.getElementById('telefonoMovilRepresentante'),
        direccion: document.getElementById('direccionRepresentante'),
        observacion: document.getElementById('observacionRepresentante'),
        tipoDoc: document.getElementById('tipoDocRepresentante'),
        doc: document.getElementById('docRepresentante'),
        exAlumno: document.getElementById('exAlumnoRepresentante'),
        periodo: document.getElementById('periodoRepresentante')
    };

    const repTrabajoCampos = {
        ocupacion: document.getElementById('ocupacionRepresentante'),
        empresa: document.getElementById('empresaRepresentante'),
        puesto: document.getElementById('puestoRepresentante'),
        ingresos: document.getElementById('ingresosRepresentante'),
        telefonoTrabajo: document.getElementById('telefonoTrabajoRepresentante'),
        direccionTrabajo: document.getElementById('direccionTrabajoRepresentante')
    };

    const padreCampos = {
        nombre: document.getElementById('nombrePadre'),
        segundoNombre: document.getElementById('segundoNombrePadre'),
        apellido: document.getElementById('apellidoPadre'),
        segundoApellido: document.getElementById('segundoApellidoPadre'),
        fechaNac: document.getElementById('fechaNacPadre'),
        paisNac: document.getElementById('paisNacPadre'),
        estadoNac: document.getElementById('estadoNacPadre'),
        ciudadNac: document.getElementById('ciudadNacPadre'),
        estadoCivil: document.getElementById('estadoCivilPadre'),
        correo: document.getElementById('correoPadre'),
        telefonoFijo: document.getElementById('telefonoFijoPadre'),
        telefonoMovil: document.getElementById('telefonoMovilPadre'),
        direccion: document.getElementById('direccionPadre'),
        observacion: document.getElementById('observacionPadre'),
        tipoDoc: document.getElementById('tipoDocPadre'),
        doc: document.getElementById('docPadre'),
        exAlumno: document.getElementById('exAlumnoPadre'),
        periodo: document.getElementById('periodoPadre')
    };

    const padreTrabajoCampos = {
        ocupacion: document.getElementById('ocupacionPadre'),
        empresa: document.getElementById('empresaPadre'),
        puesto: document.getElementById('puestoPadre'),
        ingresos: document.getElementById('ingresosPadre'),
        telefonoTrabajo: document.getElementById('telefonoTrabajoPadre'),
        direccionTrabajo: document.getElementById('direccionTrabajoPadre')
    };

    const madreCampos = {
        nombre: document.getElementById('nombreMadre'),
        segundoNombre: document.getElementById('segundoNombreMadre'),
        apellido: document.getElementById('apellidoMadre'),
        segundoApellido: document.getElementById('segundoApellidoMadre'),
        fechaNac: document.getElementById('fechaNacMadre'),
        paisNac: document.getElementById('paisNacMadre'),
        estadoNac: document.getElementById('estadoNacMadre'),
        ciudadNac: document.getElementById('ciudadNacMadre'),
        estadoCivil: document.getElementById('estadoCivilMadre'),
        correo: document.getElementById('correoMadre'),
        telefonoFijo: document.getElementById('telefonoFijoMadre'),
        telefonoMovil: document.getElementById('telefonoMovilMadre'),
        direccion: document.getElementById('direccionMadre'),
        observacion: document.getElementById('observacionMadre'),
        tipoDoc: document.getElementById('tipoDocMadre'),
        doc: document.getElementById('docMadre'),
        exAlumno: document.getElementById('exAlumnaMadre'),
        periodo: document.getElementById('periodoMadre')
    };

    const madreTrabajoCampos = {
        ocupacion: document.getElementById('ocupacionMadre'),
        empresa: document.getElementById('empresaMadre'),
        puesto: document.getElementById('puestoMadre'),
        ingresos: document.getElementById('ingresosMadre'),
        telefonoTrabajo: document.getElementById('telefonoTrabajoMadre'),
        direccionTrabajo: document.getElementById('direccionTrabajoMadre')
    };

    function copiarDatos(origen, destino) {
        Object.keys(origen).forEach(key => {
            if (origen[key] && destino[key]) {
                destino[key].value = origen[key].value;
            }
        });
    }

    function limpiarDatos(destino) {
        Object.keys(destino).forEach(key => {
            if (destino[key]) {
                destino[key].value = '';
            }
        });
    }

    function actualizarDatosPadreMadre() {
        if (parentescoSelect.value === 'PADRE') {
            copiarDatos(repCampos, padreCampos);
            copiarDatos(repTrabajoCampos, padreTrabajoCampos);
            limpiarDatos(madreCampos);
            limpiarDatos(madreTrabajoCampos);
        } else if (parentescoSelect.value === 'MADRE') {
            copiarDatos(repCampos, madreCampos);
            copiarDatos(repTrabajoCampos, madreTrabajoCampos);
            limpiarDatos(padreCampos);
            limpiarDatos(padreTrabajoCampos);
        } else {
            limpiarDatos(padreCampos);
            limpiarDatos(madreCampos);
            limpiarDatos(padreTrabajoCampos);
            limpiarDatos(madreTrabajoCampos);
        }
    }

    if (parentescoSelect) {
        parentescoSelect.addEventListener('change', actualizarDatosPadreMadre);
    }

    [...Object.values(repCampos), ...Object.values(repTrabajoCampos)].forEach(input => {
        if (input) {
            input.addEventListener('input', function() {
                if (parentescoSelect.value === 'PADRE') {
                    copiarDatos(repCampos, padreCampos);
                    copiarDatos(repTrabajoCampos, padreTrabajoCampos);
                } else if (parentescoSelect.value === 'MADRE') {
                    copiarDatos(repCampos, madreCampos);
                    copiarDatos(repTrabajoCampos, madreTrabajoCampos);
                }
            });
        }
    });
});