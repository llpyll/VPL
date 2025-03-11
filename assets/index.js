document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch('https://script.google.com/macros/s/AKfycbyCxmxfgvx1AA3YymyfiU_nn7Ya6_lCK8eEgi33QbdSkGqs1R_DbGq9d3VHi97BB_Jl/exec', {
        method: 'POST',
        mode: 'cors', // Permite solicitudes cruzadas
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(result => {
        console.log("Respuesta del servidor:", result);
        if (result.status === "success") {
            alert('Datos enviados correctamente');
            event.target.reset();
        } else {
            alert('Error en el servidor: ' + result.message);
        }
    })
    .catch(error => {
        alert('Error al conectar con el servidor');
        console.error('Error al enviar datos:', error);
    });
});
