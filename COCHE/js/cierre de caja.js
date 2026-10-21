// Recuperamos el saldo inicial del localStorage
let saldoBase = parseFloat(localStorage.getItem('saldoInicialCoche')) || 0;

// Simulación de datos (Ventas del día)
const ventasHoy = {
    efectivo: 320000,
    nequi: 150000,
    tarjeta: 100000,
    gastos: 25000
};

// Formateador de moneda profesional (es-CO)
const formatoMoneda = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
});

document.addEventListener('DOMContentLoaded', () => {
    // Llenar datos visualmente con formato moneda
    document.getElementById('sys-base').innerText = formatoMoneda.format(saldoBase);
    document.getElementById('sys-efectivo').innerText = formatoMoneda.format(ventasHoy.efectivo);
    document.getElementById('sys-transf').innerText = formatoMoneda.format(ventasHoy.nequi);
    document.getElementById('sys-tarjeta').innerText = formatoMoneda.format(ventasHoy.tarjeta);
    document.getElementById('sys-gastos').innerText = formatoMoneda.format(ventasHoy.gastos);
    
    calcularArqueo();
});

function calcularArqueo() {
    let totalBilletes = 0;

    // Sumamos inputs de billetes con validación anti-negativos
    document.querySelectorAll('.cnt').forEach(input => {
        // Validamos que no sea negativo en tiempo real
        if (input.value < 0) input.value = 0;

        const cant = parseInt(input.value) || 0;
        const valor = parseInt(input.dataset.val);
        totalBilletes += (cant * valor);
    });

    // Validación para el campo "Otros"
    const inputOtros = document.getElementById('otros-efectivo');
    if (inputOtros.value < 0) inputOtros.value = 0;
    
    const otros = parseInt(inputOtros.value) || 0;
    const totalFisico = totalBilletes + otros;

    // Actualizar visor principal
    document.getElementById('total-fisico').innerText = formatoMoneda.format(totalFisico);

    // LÓGICA: Base + Efectivo - Gastos
    const esperado = saldoBase + ventasHoy.efectivo - ventasHoy.gastos;
    document.getElementById('efectivo-esperado').innerText = formatoMoneda.format(esperado);

    actualizarAlertaCuadre(totalFisico, esperado);
}

function actualizarAlertaCuadre(fisico, esperado) {
    const alerta = document.getElementById('alerta-cuadre');
    const dif = fisico - esperado;

    if (fisico === 0 && dif !== 0) {
        alerta.innerText = "Esperando conteo...";
        alerta.className = "cuadre-info";
        return;
    }

    if (dif === 0) {
        alerta.innerHTML = '✅ CAJA CUADRADA';
        alerta.className = "cuadre-info cuadre-exito";
    } else if (dif > 0) {
        alerta.innerHTML = `⚠️ SOBRANTE: ${formatoMoneda.format(dif)}`;
        alerta.className = "cuadre-info cuadre-sobrante";
    } else {
        // Usamos Math.abs para que el número del faltante no salga con el signo menos "-"
        alerta.innerHTML = `❌ FALTANTE: ${formatoMoneda.format(Math.abs(dif))}`;
        alerta.className = "cuadre-info cuadre-error";
    }
}

function finalizarCierre() {
    const checks = document.querySelectorAll('.check-val');
    let validados = Array.from(checks).every(c => c.checked);

    if(!validados) {
        Swal.fire('Atención', 'Por favor verifica los comprobantes de Nequi y Tarjeta.', 'warning');
        return;
    }

    Swal.fire({
        title: '¿Cerrar caja definitivamente?',
        text: "Se generará el reporte final.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#4b2c20',
        confirmButtonText: 'Sí, finalizar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('¡Cerrado!', 'Jornada finalizada con éxito.', 'success');
        }
    });
}