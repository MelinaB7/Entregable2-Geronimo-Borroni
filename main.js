function Propiedad(nombre, precio, ubicacion, imagen) {
  this.nombre = nombre;
  this.precio = precio;
  this.ubicacion = ubicacion;
  this.imagen = imagen;
}

const propiedades = [
  new Propiedad(
    "Casa Barrio Los Perales",
    120000,
    "B. Los Perales",
    "imagenes/casa4.jpg"
  ),
  new Propiedad(
    "Departamento en San Pedrito",
    50000,
    "San Pedrito",
    "imagenes/depa.jpg"
  ),
  new Propiedad(
    "Casa Barrio Los Alisos",
    80000,
    "San Pedrito",
    "imagenes/casa2.jpg"
  ),
  new Propiedad(
    "Terreno en Valle Escondido",
    20000,
    "Loteo Valle Escondido",
    "imagenes/terreno.jpg"
  ),
  new Propiedad("Monoambiente", 50000, "Centro", "imagenes/monoa.jpg"),
  new Propiedad(
    "Departamento 1 habitacion",
    50000,
    "B. Moreno",
    "imagenes/mono.jpg"
  ),
];

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
function agregarPropiedad(nombre, precio, ubicacion) {
  const nuevaPropiedad = new Propiedad(
    nombre,
    precio,
    ubicacion,
    "imagenes/default.jpg"
  );

  propiedades.push(nuevaPropiedad);

  localStorage.setItem("propiedades", JSON.stringify(propiedades));
}

document
  .getElementById("form-agregar")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const ubicacion = document.getElementById("ubicacion").value;
    const imagen = document.getElementById("imagen").value;

    agregarPropiedad(nombre, precio, ubicacion, imagen);

    this.reset();
  });

buscarInput.addEventListener("input", () =>
  mostrarPropiedades(buscarInput.value)
);
mostrarPropiedades();
