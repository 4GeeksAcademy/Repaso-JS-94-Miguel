const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email-login");
const passwordInput = document.getElementById("password-login");
const generateCardForm = document.getElementById("generate-card");
const tittleInput = document.getElementById("tittle");
const descriptionInput = document.getElementById("description");
const bgColorInput = document.getElementById("bg-color");
const cardsContainer = document.getElementById("cards-container");

const validEmail = "mitoperni@gmail.com";
const validPassword = "12345678";

let cards = [];

function handleLogin(email, password) {
  if (email === validEmail) {
    if (password === validPassword) {
      alert("Sesión iniciada con éxito");
    } else {
      alert("Contraseña equivocada");
    }
  } else {
    alert("Email incorrecto");
  }
}

let userEmail = "";
let userPassword = "";

emailInput.addEventListener("change", () => {
  userEmail = emailInput.value;
});

passwordInput.addEventListener("change", () => {
  userPassword = passwordInput.value;
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  handleLogin(userEmail, userPassword);
});

let cardTittle = "";
let cardDescription = "";
let cardBgColor = "";

tittleInput.addEventListener("change", () => {
  cardTittle = tittleInput.value;
});
descriptionInput.addEventListener("change", () => {
  cardDescription = descriptionInput.value;
});
bgColorInput.addEventListener("change", () => {
  cardBgColor = bgColorInput.value;
});

generateCardForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!cardTittle || !cardDescription || !cardBgColor) {
    alert("Falta alguno de los campos");
    return;
  }

  const newCard = { cardTittle, cardDescription, cardBgColor };
  cards.push(newCard);

  renderCards();

  // Limpiar los campos del input
  // generateCardForm.reset();
});

function renderCards() {
  cardsContainer.innerHTML = "";

  cards.forEach((card, index) => {
    const cardElement = document.createElement("div"); // cardElement = "<div></div>"
    cardElement.className = "col-md-4 mb-3"; // cardElement = "<div class="col-md-4 mb-3"></div>"

    cardElement.innerHTML = `
      <div
          class="card"
          style="
            width: 18rem;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 10px 20px;
            background: ${card.cardBgColor}
          "
        >
          <div class="card-body">
            <h5 class="card-title">${card.cardTittle}</h5>
            <p class="card-text">
              ${card.cardDescription}
            </p>
          </div>
          <button
            type="button"
            class="btn btn-danger mb-4"
            data-index = "${index}"
          >
            Delete
          </button>
        </div>
      `;

    cardsContainer.appendChild(cardElement);
  });

  const deleteButtons = cardsContainer.querySelectorAll(".btn-danger");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.getAttribute("data-index");
      cards.splice(index, 1);
      renderCards();
    });
  });
}
