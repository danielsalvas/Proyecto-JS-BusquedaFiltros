///////VARIABLES

const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

//Contenedor para los resultados
const resultado = document.querySelector("#resultado");


const max = new Date().getFullYear();
const min = max-10;  //La agencia no quiere vender autmoviles de más de 10 años

//Generar un objeto con la búesqueda

const datosBusqueda = {
    marca: "",
    year: "",
    minimo: "",
    maximo: "",
    puertas: "",
    transmision: "",
    color: "",
}


//////EVENTOS


document.addEventListener("DOMContentLoaded", () => {
    mostrarAutos(autos);  //Muestra los autos al cargar

    llenarSelect(); //Llena las opciones de años
})

// Event listener para los select de búsqueda

marca.addEventListener("change", (e) => {
    datosBusqueda.marca = e.target.value;

    filtrarAuto();
})

year.addEventListener("change", (e) => {
    datosBusqueda.year = parseInt(e.target.value);

    filtrarAuto();
})

minimo.addEventListener("change", (e) => {
    datosBusqueda.minimo = parseInt(e.target.value);

    filtrarAuto();
})

maximo.addEventListener("change", (e) => {
    datosBusqueda.maximo = parseInt(e.target.value);

    filtrarAuto();
})

puertas.addEventListener("change", (e) => {
    datosBusqueda.puertas = parseInt(e.target.value);

    filtrarAuto();
})

transmision.addEventListener("change", (e) => {
    datosBusqueda.transmision = e.target.value;

    filtrarAuto();
})

color.addEventListener("change", (e) => {
    datosBusqueda.color = e.target.value;

    filtrarAuto();

})


//////// FUNCIONES

function mostrarAutos(autos) { //Muestra todos los datos de autos del arreglo autos en el HTML

    limpiarHTML(); //Elimina el HTML Previo

    autos.forEach( auto => {

        const { marca, modelo, year, puertas, transmision, precio, color} = auto;
        const autoHTML = document.createElement("p");

        autoHTML.textContent = `
        ${marca}  ${modelo} - ${year} - ${puertas} Puertas - Transmisión ${transmision} - Precio: ${precio} - Color: ${color}
        `;

        //Insertar en el HTML

        resultado.appendChild(autoHTML)
    });
}

//Limpiar HTML

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

function llenarSelect() {  //Llena de datos de años el select YEAR en el HTML
    
    for( let i= max; i > min; i--){
        const opcion = document.createElement("option");
        opcion.value = i;
        opcion.innerText = i;
        year.appendChild(opcion); //Agrega las opciones de año al select
    }
    
}

//Función que filtra en base a la búsqueda

function filtrarAuto() {
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarMinimo ).filter( filtrarMaximo ).filter( filtrarPuertas ).filter( filtrarTransmision ).filter( filtrarColor );

   // console.log(resultado);

   if (resultado.length) {    //Muestra Automoviles si hay resultados,si no,  muestra mensaje de no hay resultados. 
    mostrarAutos(resultado);
   } else {
       noResultado();
   }
}

function noResultado() {

    limpiarHTML();
    const noResultado = document.createElement("div");
    noResultado.classList.add("alerta", "error")
    noResultado.textContent = "No hay resultados, intenta con otros términos de búsqueda";
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
    if ( datosBusqueda.marca ) {
        return auto.marca === datosBusqueda.marca;
    }
    return auto;
}

function filtrarYear(auto) {

    if ( datosBusqueda.year ) {
        return auto.year === datosBusqueda.year;
    }
    return auto;
}

function filtrarMinimo(auto) {
    if ( datosBusqueda.minimo ) {
        return auto.precio >= datosBusqueda.minimo;
    }
    return auto;
}

function filtrarMaximo(auto) {
    if ( datosBusqueda.maximo ) {
        return auto.precio <= datosBusqueda.maximo;
    }
    return auto;
}

function filtrarPuertas(auto) {
    if ( datosBusqueda.puertas ) {
        return auto.puertas === datosBusqueda.puertas;
    }
    return auto;
}

function filtrarTransmision(auto) {

    if ( datosBusqueda.transmision ) {
        return auto.transmision === datosBusqueda.transmision;
    }
    return auto;
}

function filtrarColor(auto) {

    if ( datosBusqueda.color ) {
        return auto.color === datosBusqueda.color;
    }
    return auto;
}

