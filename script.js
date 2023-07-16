// Configuración de la API de Google Sheets
const CLIENT_ID = "117080436197405858753";
const API_KEY = "AIzaSyBRFWI1WbhY5JwkuqBPI6-712lpQmWyrmo";
const SPREADSHEET_ID = "DBPCONCET";

// Autenticación de la API de Google Sheets
function init() {
  gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: [
        "https://sheets.googleapis.com/$discovery/rest?version=v4",
      ],
      scope: "https://www.googleapis.com/auth/spreadsheets",
    })
    .then(function () {
      // Escucha el envío del formulario
      const formulario = document.getElementById("formulario");
      formulario.addEventListener("submit", handleFormSubmit);
    });
}

// Maneja el envío del formulario
function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const nombre = formData.get("nombre");
  const email = formData.get("email");

  // Guarda los datos en la hoja de Google Sheets
  gapi.client.sheets.spreadsheets.values
    .append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1!A:B",
      valueInputOption: "RAW",
      resource: {
        values: [[nombre, email]],
      },
    })
    .then(
      function () {
        // Datos guardados exitosamente
        alert("Datos enviados correctamente");
        formulario.reset();
      },
      function (error) {
        // Error al guardar los datos
        console.error(error.result.error.message);
        alert("Error al enviar los datos");
      }
    );
}

// Inicializa la API de Google Sheets
gapi.load("client", init);
