
// document.addEventListener: el codigo se ejecuta una vez que se le carga todo el contenido al dom.

document.addEventListener('DOMContentLoaded', () => {
    const destinos = [
        { nombre: 'París', precio: 120000 },
        { nombre: 'Londres', precio: 150000 },
        { nombre: 'Roma', precio: 180000 },
        { nombre: 'Praga', precio: 550000 },
        { nombre: 'Tokio', precio: 2800000 }
    ];
// array destinos: contiene objetos con precio y nombre de cada destino.

    const formulario = document.getElementById('viajeForm');
    const resultadoDiv = document.getElementById('resultado');
    const listaHistorial = document.getElementById('listaHistorial');

    // Cargar y mostrar historial del localStorage. Tambien cualquier resultado previo.

    mostrarHistorial();

    formulario.addEventListener('submit', (event) => {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const edad = document.getElementById('edad').value;
        const email = document.getElementById('email').value;
        const destinoSeleccionado = document.getElementById('destino').value;
        const cuotasSeleccionadas = parseInt(document.getElementById('cuotas').value);

        const destino = destinos.find(d => normalizeString(d.nombre).toLowerCase() === normalizeString(destinoSeleccionado).toLowerCase());

        if (destino) {
            const precio = destino.precio;
            const cuotaMensual = calcularCuotaMensual(precio, cuotasSeleccionadas);

            const resultado = {
                nombre,
                apellido,
                edad,
                email,
                destino: destino.nombre,
                precio,
                cuotas: cuotasSeleccionadas,
                cuotaMensual
            };
// guardar datos me los almacena y agrega al array que ya existe. Como la clase con el precio del azucar.

            mostrarResultado(resultado);
            guardarDatos(resultado);
            mostrarHistorial();
        } else {
            resultadoDiv.innerHTML = `<p style="color: red;">Destino no encontrado.</p>`;
        }
    });

    function calcularCuotaMensual(precio, numCuotas) {
        return (precio / numCuotas).toFixed(2);
    }
// normalizeString(str): sirve para los caracteres especiales como las Ñ y las tildes.
    function normalizeString(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function guardarDatos(data) {
        let historial = JSON.parse(localStorage.getItem('historialViajes')) || [];
        historial.push(data);
        localStorage.setItem('historialViajes', JSON.stringify(historial));
    }

    function mostrarResultado(data) {
        resultadoDiv.innerHTML = `
            <p>Nombre: ${data.nombre} ${data.apellido}</p>
            <p>Edad: ${data.edad}</p>
            <p>Email: ${data.email}</p>
            <p>Destino: ${data.destino}</p>
            <p>Precio Total: $${data.precio}</p>
            <p>${data.cuotas} cuotas de: $${data.cuotaMensual} cada una</p>
        `;
    }
//  let historial = JSON.parse: clase json-local storage. intenta "traer" el item almacenado en local storage, que es un objeto, con clave historial viajes
// devuelve una cadena de strign con los datos almacenados. 

    function mostrarHistorial() {
        let historial = JSON.parse(localStorage.getItem('historialViajes')) || [];
        listaHistorial.innerHTML = '';
        historial.forEach((data, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${index + 1}. ${data.nombre} ${data.apellido} - ${data.destino} - ${data.cuotas} cuotas de $${data.cuotaMensual}
            `;
            listaHistorial.appendChild(li);
        });
    }
});
