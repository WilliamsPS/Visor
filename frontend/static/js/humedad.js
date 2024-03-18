document.addEventListener("DOMContentLoaded", function () {
  // Obtener datos de la API
  fetch("http://127.0.0.1:5505/api/thing001/minuto")
    .then((response) => response.json())
    .then((data) => {
      debugger;
      // Filtrar solo los datos de humedad
      const humedadData = data.filter((item) => item.attrname === "humedad");

      //Tomar solo los últimos 12 datos
      const last12Data = humedadData.slice(-12);

      var dates = last12Data.map((item) =>
        convertirFormatoFechaEntrada(item.recvtime)
      );

      var prices = last12Data.map((item) => parseFloat(item.attrvalue));

      var options = {
        series: [
          {
            name: "humedad",
            data: prices,
          },
        ],
        chart: {
          type: "area",
          stacked: false,
          height: 200,
          zoom: {
            type: "x",
            enabled: false,
            autoScaleYaxis: false,
          },
          toolbar: {
            autoSelected: "zoom",
            tools: {
              download: false, // Desactivar el botón de descarga
            },
          },
        },
        dataLabels: {
          enabled: false, // Des
        },
        markers: {
          size: 0,
        },
        title: {
          text: "",
          align: "left",
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
          },
        },
        yaxis: {
          title: {
            text: "Humedad",
          },
        },
        xaxis: {
          type: "datetime",
          categories: dates,
        },
      };

      // Crear el gráfico con ApexCharts
      var chart = new ApexCharts(document.querySelector("#Humedad"), options);
      chart.render();

      // Añadir detalles de humedad
      var humedadActual = prices[prices.length - 1].toFixed(2); // Obtener el último dato de humedad
      document.getElementById("humedadActual").textContent = humedadActual + "%";
    })
    .catch((error) => console.error("Error fetching data:", error));
});

function convertirFormatoFechaEntrada(fechaEntrada) {
  var fecha = moment(fechaEntrada, "YYYY-MM-DD HH:mm");

  // Formato final "YYYY-MM-DDTHH:mm:ssZ"
  var formatoFinal = fecha.format("YYYY-MM-DDTHH:mm:ss[Z]");

  return formatoFinal;
}

function openModalHumedal() {
  // Obtener referencia al botón y al modal
var botonMostrarModal = document.getElementById('mostrarModal');
var modal = document.getElementById('miModal');

// Obtener referencia al elemento para cerrar el modal
var cerrarModal = document.getElementsByClassName('cerrar-modal')[0];

// Mostrar modal al hacer clic en el botón
botonMostrarModal.onclick = function() {
  modal.style.display = 'block';
}

// Ocultar modal al hacer clic en la 'x'
cerrarModal.onclick = function() {
  modal.style.display = 'none';
}

// Ocultar modal al hacer clic fuera de éste
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

}

function closeModalHumedal() {
  var modal = document.getElementById('modalHumedad');
  modal.classList.remove('mostrar');
  modal.classList.remove('slide-up');
}