const fetchBtn = document.querySelector("#fetchJoke");
const clearBtn = document.querySelector("#clearJokes");
const jokeList = document.querySelector("#jokeList");

let jokes = [];

/* Cargar chistes desde localStorage */
function loadJokes() {
  const storedJokes = localStorage.getItem("jokes");

  if (storedJokes) {
    jokes = JSON.parse(storedJokes);
  }

  renderJokes();
}

/* Guardar chistes en localStorage */
function saveJokes() {
  localStorage.setItem("jokes", JSON.stringify(jokes));
}

/* Pintar chistes */
function renderJokes() {
  jokeList.innerHTML = "";

  jokes.forEach((joke) => {
    const li = document.createElement("li");

    li.classList.add("joke-item");

    li.innerHTML = `
      <span>${joke.text}</span>
      <button class="delete-btn" data-id="${joke.id}">
        Eliminar
      </button>
    `;

    jokeList.appendChild(li);
  });
}

/* Obtener chiste desde la API */
async function fetchJoke() {
  try {
    const response = await fetch(
      "https://api.chucknorris.io/jokes/random"
    );

    const data = await response.json();

    const newJoke = {
      id: data.id,
      text: data.value,
    };

    jokes.unshift(newJoke);

    saveJokes();
    renderJokes();

  } catch (error) {
    console.error("Error al obtener el chiste:", error);
  }
}

/* Eliminar un chiste */
function deleteJoke(id) {
  jokes = jokes.filter((joke) => joke.id !== id);

  saveJokes();
  renderJokes();
}

/* Eventos */
fetchBtn.addEventListener("click", fetchJoke);

/* Delegación de eventos para eliminar */
jokeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    deleteJoke(event.target.dataset.id);
  }
});

/* Borrar todo*/
clearBtn.addEventListener("click", () => {
  jokes = [];

  saveJokes();
  renderJokes();
});

/* Inicializar */
loadJokes();