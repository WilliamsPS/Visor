document.addEventListener("DOMContentLoaded", function () {
    // Obtener datos de la API
    fetch("http://127.0.0.1:5505/api/thing001/minuto")
      .then((response) => response.json())
      .then((data) => {
        // Filtrar solo los datos de temperatura
        const temperaturaData = data.filter((item) => item.attrname === "temperatura");
  
        // Tomar solo los últimos 12 datos
        const last12Data = temperaturaData.slice(-12);
  
        var dates = last12Data.map((item) =>
          convertirFormatoFechaEntrada(item.recvtime)
        );
  
        var prices = last12Data.map((item) => parseFloat(item.attrvalue));
  
        var options = {
          series: [
            {
              name: "temperatura",
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
            text: "temperatura",
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
              text: "temperatura",
            },
          },
          xaxis: {
            type: "datetime",
            categories: dates,
          },
        };
  
        var temperaturaActual = prices[prices.length - 1].toFixed(2); // Obtener el último dato de temperatura
        document.getElementById("temperaturaActual").textContent = temperaturaActual + "%";
        // Crear el gráfico con ApexCharts
        var chart = new ApexCharts(document.querySelector("#temperatura"), options);
        chart.render();
      })
      .catch((error) => console.error("Error fetching data:", error));
  });
  
  function convertirFormatoFechaEntrada(fechaEntrada) {
    var fecha = moment(fechaEntrada, "YYYY-MM-DD HH:mm");
  
    // Formato final "YYYY-MM-DDTHH:mm:ssZ"
    var formatoFinal = fecha.format("YYYY-MM-DDTHH:mm:ss[Z]");
  
    return formatoFinal;
  }
  
  function openModaltemperatura() {
    // Obtener referencia al botón y al modal
    var botonMostrarModal = document.getElementById('mostrarModaltemperatura');
    var modal = document.getElementById('modaltemperatura');
  
    // Obtener referencia al elemento para cerrar el modal
    var cerrarModal = document.getElementsByClassName('cerrar-modal')[0];
  
    // Mostrar modal al hacer clic en el botón
    botonMostrarModal.onclick = function () {
      modal.style.display = 'block';
    }
  
    // Ocultar modal al hacer clic en la 'x'
    cerrarModal.onclick = function () {
      modal.style.display = 'none';
    }
  
    // Ocultar modal al hacer clic fuera de éste
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    }
  }
  