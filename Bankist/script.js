"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  //to prevent default behaviour link
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//Creating and insterting cookies message to Page
const header = document.querySelector(".header");

//Creating element
const message = document.createElement("div");
message.classList.add("cookie-message");

message.innerHTML = `We use cookiees for improved functionality and analytics.<button class="btn btn--close-cookie">Got it!</button>`;

header.prepend(message);
//dom element is unique so message can  be shown at one place only but if you want to make multiple of it you can use its clone
// header.append(message.cloneNode(true));

//Deleting Element
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
  });
