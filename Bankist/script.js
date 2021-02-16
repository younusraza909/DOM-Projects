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

// SCROLLING
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();
  // To get Scroll Position
  console.log("Current Scroll (X/Y)", window.pageXOffset, pageYOffset);
  //Height and widht of viewport
  console.log(
    "Height/widht viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: "smooth",
  });

  //Modern Way To Scroll
  section1.scrollIntoView({ behavior: "smooth" });
});

///////////////////////////////////////////////////
// Page Navigation(Technique:1)
// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     //id we write this.href it will give absolute url so we use getAttribute
//     const id = this.getAttribute("href");
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

//Page Navifation with event delegation
// 1.Add event listner to common parent
//2.detemine what element originated event

document.querySelector(".nav__links").addEventListener("click", function (e) {
  //Matching Strategedy
  if (e.target.classList.contains("nav__link")) {
    e.preventDefault();
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});
//////////////////////////////////////////////////////////
// //Creating and insterting cookies message to Page
// const header = document.querySelector(".header");

// //Creating element
// const message = document.createElement("div");
// message.classList.add("cookie-message");

// message.innerHTML = `We use cookiees for improved functionality and analytics.<button class="btn btn--close-cookie">Got it!</button>`;

// header.prepend(message);
// //dom element is unique so message can  be shown at one place only but if you want to make multiple of it you can use its clone
// // header.append(message.cloneNode(true));

// //Deleting Element
// document
//   .querySelector(".btn--close-cookie")
//   .addEventListener("click", function () {
//     message.remove();
//   });

//////////////////////////////////////////////////////////
// //Styles
// // .style only accesable for inline styles
// message.style.backgroundColor = "#37383d";
// message.style.width = "120%";

// // to get all styles for element we will use (getComputedStyle(element))
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 20 + "px";

// //Accessing Css variable
// // document.documentElement.style.setProperty("--color-primary", "orangered");

// //Attributes
// const logo = document.querySelector(".nav__logo");
// console.log(logo.alt);
// console.log(logo.className);
// console.log(logo.designer); //will not work
// //those property which are standard to element can be accessed by this otherwise will return undefined
// console.log(logo.getAttribute("designer")); //will work

// //Data Attributes
// console.log(logo.dataset.versionNumber);

///////////////////////////////////////////////////////
// //EVENT PROPOGATION IN PRACTICE

// // rgb(255,255,255)
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgba(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   // console.log("LINK", e.target, e.currentTarget);
//   //target is where event occurs
//   //current target is where event is attatched
//   e.stopPropagation();
//   //to stop event bubbling
// });

// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   // console.log("CONTAINER", e.target, e.currentTarget);
// });

// document.querySelector(".nav").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   // console.log("NAv", e.target, e.currentTarget);
// });

///////////////////////////////////////////////////////
// // DOM TRAVERSING
// const h1 = document.querySelector("h1");

// //Going Downward: child
// console.log(h1.querySelectorAll(".highlight"));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = "white";
// h1.lastElementChild.style.color = "green";

// //Going Upward
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// //closet method find parent
// //query selector find children
// h1.closest(".header").style.background = "var(--gradient-secondary)";

// //going siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// //
// console.log(h1.parentElement.children);
// // [...xyz] will create array from that
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = "scale(0.5)";
// });
