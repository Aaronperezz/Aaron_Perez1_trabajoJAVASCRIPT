// **************Seccion noticias *******************//

// Fetch de JSON y renderizado de noticias
document.addEventListener("DOMContentLoaded", () => {
  const newsContainer = document.getElementById("news-container");

  // Cargar las noticias desde el archivo JSON
  fetch("js/news.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((news) => {
        const newsItem = document.createElement("div");
        newsItem.classList.add("news-item");

        newsItem.innerHTML = `
        <img src="${news.image}" alt="${news.title}" class="news-image"/>
          <h3>${news.title}</h3>
          <p>${news.description}</p>
          <span>${news.date}</span>
          <a href="${news.link}" target="_blank">Leer más</a>
        `;

        newsContainer.appendChild(newsItem);
      });
    })
    .catch((error) => {
      console.error("Error al cargar las noticias:", error);
    });
});

// **********validacion de formularios ***********

// Validación de datos de contacto
const formulario = document.getElementById("presupuestoForm");

formulario.addEventListener("submit", function (event) {
  event.preventDefault(); // Evita el envío automático

  if (!validarFormulario()) {
    alert("Por favor, completa los campos correctamente.");
    return;
  }

  if (!document.getElementById("condiciones").checked) {
    alert(
      "Debes aceptar las condiciones de privacidad para enviar el formulario."
    );
    return;
  }

  alert("Formulario enviado con éxito.");
});

function validarFormulario() {
  const nombre = document.getElementById("nombre").value;
  const apellidos = document.getElementById("apellidos").value;
  const telefono = document.getElementById("telefono").value;

  // Validar nombre
  const regexNombre = /^[a-zA-Z\s]{1,15}$/;
  if (!regexNombre.test(nombre)) {
    return false;
  }

  // Validar apellidos
  const regexApellidos = /^[a-zA-Z\s]{1,40}$/;
  if (!regexApellidos.test(apellidos)) {
    return false;
  }

  // Validar teléfono
  const regexTelefono = /^[0-9]{9}$/;
  if (!regexTelefono.test(telefono)) {
    return false;
  }

  return true;
}

// Cálculo en tiempo real del presupuesto
const producto = document.getElementById("producto");
const plazo = document.getElementById("plazo");
const extras = document.querySelectorAll('input[type="checkbox"]');
const result = document.getElementById("result");

function calcularPresupuesto() {
  let total = parseFloat(producto.value);

  // Agregar el costo de los extras seleccionados
  extras.forEach((extra) => {
    if (extra.checked && extra.id !== "condiciones") {
      // Ignoramos el checkbox de condiciones
      total += parseFloat(extra.value) || 0;
    }
  });

  // Aplicar descuento según el plazo
  const descuento = plazo.value > 2 ? 0.9 : 1.0; // Descuento del 10% si plazo > 2 meses
  total *= descuento;

  result.textContent = `Presupuesto total: $${total.toFixed(2)}`;
}

// Escuchar cambios en los inputs
producto.addEventListener("change", calcularPresupuesto);
plazo.addEventListener("input", calcularPresupuesto);
extras.forEach((extra) =>
  extra.addEventListener("change", calcularPresupuesto)
);
// Evento para el botón Reset
formulario.addEventListener("reset", function () {
  setTimeout(() => {
    result.textContent = "Presupuesto total: $0";
  }, 0);
});

// Inicializar el cálculo
calcularPresupuesto();
