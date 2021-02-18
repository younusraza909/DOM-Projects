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

//Tabbed Component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  //Guard clause
  if (!clicked) return;
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");

  //Active Content Tab
  tabsContent.forEach((t) => t.classList.remove("operations__content--active"));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//Menu Fade Animation
const nav = document.querySelector(".nav");
//event like mouseover and mouseenter are similar with big difference like mouse enter does not bubble up like mouse over
//mouseEnter||mouseLeave
//mouseover ||mouseout
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
//Method 1 to pass argument
// nav.addEventListener("mouseover", function (e) {
//   handleHover(e, 0.5);
// });
// nav.addEventListener("mouseout", function (e) {
//   handleHover(e, 1);
// });
//Method 2 to pass argument
//bind will make a copy of function and make this keyword changing from current target to argument which we pass
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

/////////////////////////////////////////////////////////
//STICKY NAVIGATION
//scroll event available on window only
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);
window.addEventListener("scroll", function () {
  if (window.scrollY > initialCoords.top) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
});

//Reveal Section On Scrolling

const allSection = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  //null is for complete view port can specifie any element
  threshold: 0.15,
});

allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//Lazy Image Loading Using intersecton API

const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;

  entry.target.attributes[0].value = entry.target.attributes[1].value;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.2,
  //it will start loading img 200px before we reach threshold
  rootMargin: "200px",
});

imgTargets.forEach(function (img) {
  imgObserver.observe(img);
});
///////////////////////////////////////////////////////
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
