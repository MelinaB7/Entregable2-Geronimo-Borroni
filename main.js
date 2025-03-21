function Propiedad(nombre, precio, ubicacion, imagen) {
  this.nombre = nombre;
  this.precio = precio;
  this.ubicacion = ubicacion;
  this.imagen = imagen;
}

let propiedades = [];

fetch("propiedades.json")
  .then((response) => response.json())
  .then((data) => {
    propiedades = data.map(
      (prop) => new Propiedad(prop.nombre, prop.precio, prop.ubicacion, prop.imagen)
    );
    mostrarPropiedades();
  })
  .catch((error) => console.error("Error cargando las propiedades:", error));

const listaPropiedades = document.getElementById("lista-propiedades");
const buscarInput = document.getElementById("buscar");

function mostrarPropiedades(filtro = "") {
  listaPropiedades.innerHTML =
    propiedades
      .filter(
        (prop) =>
          prop.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
          prop.ubicacion.toLowerCase().includes(filtro.toLowerCase())
      )
      .map(
        (prop) => `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${prop.imagen}" class="card-img-top" alt="${prop.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${prop.nombre}</h5>
                        <p class="card-text">Precio: $${prop.precio}</p>
                        <p class="card-text">Ubicación: ${prop.ubicacion}</p>
                    </div>
                </div>
            </div>
        `
      )
      .join("") ||
    `<p class="text-center">No se encontró ninguna propiedad, pruebe con otras palabras</p>`;
}

function agregarPropiedad(nombre, precio, ubicacion, imagen = "imagenes/default.avif") {
  const nuevaPropiedad = new Propiedad(nombre, precio, ubicacion, imagen);
  propiedades.push(nuevaPropiedad);
  localStorage.setItem("propiedades", JSON.stringify(propiedades));
  mostrarPropiedades();
}

document
  .getElementById("form-agregar")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    
    const nombre = document.getElementById("nombre").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const ubicacion = document.getElementById("ubicacion").value;
    const imagen = document.getElementById("imagen").value || "imagenes/default.jpg";

    agregarPropiedad(nombre, precio, ubicacion, imagen);

    this.reset();
  });
  

buscarInput.addEventListener("input", () => mostrarPropiedades(buscarInput.value));


//Convertidor de pesos a dolar blue
async function obtenerCotizacion() {
  try {
      const respuesta = await fetch("https://dolarapi.com/v1/dolares/blue");
      const datos = await respuesta.json();
      return datos.venta; 
  } catch (error) {
      console.error("Error obteniendo la cotización:", error);
      return null;
  }
}

async function convertirPesosADolares() {
  const montoPesos = parseFloat(document.getElementById("monto").value);
  if (isNaN(montoPesos) || montoPesos <= 0) {
      Swal.fire({
        title: 'Error',
        text: 'Ingrese un monto valido en pesos',
        icon: 'warning'
      });
      return;
  }

  const cotizacion = await obtenerCotizacion();
  if (!cotizacion) {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo obtener la cotización del dólar',
        icon: 'error'
      });
      return;
  }

  const montoDolares = montoPesos / cotizacion;
  document.getElementById("resultado").textContent = `Equivale a: $${montoDolares.toFixed(2)} USD`;
}
