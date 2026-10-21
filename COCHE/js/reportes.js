const COLOR_COCHE = '#4a332d';

document.addEventListener('DOMContentLoaded', () => {
    initChart();
    // Limpiar saldo al iniciar si es necesario o recuperar el anterior
    const saldoGuardado = localStorage.getItem('saldoInicialCoche');
    if (saldoGuardado) {
        const input = document.getElementById('saldoInicial');
        input.value = saldoGuardado;
    }
});

// 1. GESTIÓN DE SALDO INICIAL (CONEXIÓN CON CIERRE)
function fijarSaldo() {
    const saldoInput = document.getElementById('saldoInicial');
    const btnFijar = document.getElementById('btnFijar');
    const btnEditar = document.getElementById('btnEditarSaldo');
    const monto = saldoInput.value;

    if (monto === "" || monto < 0) {
        Swal.fire({
            title: '¡Atención!',
            text: 'Debes ingresar un monto válido para abrir la caja.',
            icon: 'warning',
            confirmButtonColor: COLOR_COCHE
        });
        return;
    }

    Swal.fire({
        title: '¿Confirmar Saldo Inicial?',
        text: `Se registrará una apertura de caja con $${monto}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: COLOR_COCHE,
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, abrir caja'
    }).then((result) => {
        if (result.isConfirmed) {
            // GUARDAR PARA EL MÓDULO DE CIERRE
            localStorage.setItem('saldoInicialCoche', monto);
            
            saldoInput.disabled = true;
            btnFijar.style.display = 'none';
            btnEditar.style.display = 'inline-block';
            
            Swal.fire({
                title: 'Caja Abierta',
                text: 'El saldo inicial ha sido registrado.',
                icon: 'success',
                confirmButtonColor: COLOR_COCHE
            });
        }
    });
}

function editarSaldo() {
    const input = document.getElementById('saldoInicial');
    const btnFijar = document.getElementById('btnFijar');
    const btnEditar = document.getElementById('btnEditarSaldo');

    input.disabled = false;
    btnFijar.style.display = 'inline-block';
    btnEditar.style.display = 'none';
    input.focus();
}

// 2. REGISTRO DE MOVIMIENTOS
function confirmarRegistro() {
    const desc = document.getElementById('desc').value;
    const monto = document.getElementById('monto').value;
    const tipo = document.getElementById('tipo').value;

    if (!desc || !monto) {
        Swal.fire({ 
            title: 'Campos vacíos', 
            text: 'Por favor registra una descripción y el monto.', 
            icon: 'error',
            confirmButtonColor: COLOR_COCHE 
        });
        return;
    }

    Swal.fire({
        title: '¿Confirmar Registro?',
        text: `${tipo.toUpperCase()}: $${monto}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: COLOR_COCHE
    }).then((result) => {
        if (result.isConfirmed) {
            const tabla = document.getElementById('tabla-movimientos');
            const clase = tipo === 'salida' ? 'monto-salida' : 'monto-propina';
            
            const fila = `<tr>
                <td>${desc}</td>
                <td class="${clase}">${tipo.toUpperCase()}</td>
                <td class="${clase}">$${monto}</td>
            </tr>`;
            
            tabla.insertAdjacentHTML('afterbegin', fila);
            document.getElementById('form-finanzas').reset();
            Swal.fire({ title: 'Registrado', icon: 'success', timer: 1000, showConfirmButton: false });
        }
    });
}

// 3. GRÁFICA Y REPORTES
function initChart() {
    const ctx = document.getElementById('graficaVentas').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Tinto', 'Capuchino', 'Muffin', 'Espresso'],
            datasets: [{
                label: 'Unidades Vendidas',
                data: [95, 82, 45, 60],
                backgroundColor: COLOR_COCHE
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

function actualizarReporte() {
    const desde = document.getElementById('fechaDesde').value;
    const hasta = document.getElementById('fechaHasta').value;
    const visor = document.getElementById('totalIngresos');
    
    if (desde && hasta) {
        if (new Date(desde) > new Date(hasta)) {
            Swal.fire({ title: 'Rango Inválido', icon: 'error', confirmButtonColor: COLOR_COCHE });
            return;
        }

        Swal.fire({ title: 'Calculando...', didOpen: () => Swal.showLoading() });
        
        setTimeout(() => {
            // 1. Generamos el número (Asegúrate de que sea un Number, no un String)
            const totalAleatorio = (Math.random() * (300000 - 50000) + 50000); 

            // 2. Aplicamos el formato de moneda local (Colombia)
            const totalFormateado = totalAleatorio.toLocaleString('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0, // Cambia a 2 si quieres ver centavos
                maximumFractionDigits: 0
            });

            // 3. Lo mostramos en el visor
            visor.innerText = totalFormateado;
            
            Swal.close();
        }, 800);
    }
}