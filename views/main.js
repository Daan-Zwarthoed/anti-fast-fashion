import { trashPileSelectorSelected } from "./componentsJs/trashPile.js";
import { makeLineGraph, updateLineGraph } from "./componentsJs/lineGraph.js";

const trashPileDivSelectors = document.querySelector(".trashPileDivSelectors");
const lineGraphSelectors = document.querySelector(".lineGraphSelectors");
const lineGraphSelectorsInputs = document.querySelectorAll(
  ".lineGraphSelectors input"
);
const trashPileFull = document.querySelector(".trashPileFull");
const body = document.querySelector("body");
const carrousel = document.querySelector(".carrousel");
const carrouselInner = document.querySelector(".carrouselInner");
const containerDetails = document.querySelector(".containerDetails");
const landing = document.querySelector(".landing");

// Trashpile
trashPileDivSelectors.addEventListener("click", function (event) {
  trashPileSelectorSelected(event);
});

// linegraph
makeLineGraph();

lineGraphSelectors.addEventListener("click", function (event) {
  if (event.target.parentElement.classList[0] === "lineGraphInputAndLabel") {
    const unCheckedInputs = [];
    lineGraphSelectorsInputs.forEach((input) => {
      if (!input.checked) unCheckedInputs.push(input.id);
    });
    updateLineGraph(unCheckedInputs);
  }
});

// Trashpiletofullpage
trashPileFull.addEventListener("click", function (event) {
  if (body.classList.contains("fullPageShowing")) {
    window.scrollTo(0, 1);
    window.scrollY = 1;

    if (event.target.classList.contains("trashPileDown")) {
      body.classList.toggle("toTheLeft");
    } else if (event.target.classList.contains("trashPileUp")) {
      body.classList.toggle("toTheRight");
    }
  }
});

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
  landing.scrollTo(0, 0);
};

landing.addEventListener("scroll", function (event) {
  if (event.target.scrollTop > 10) {
    landing.classList.add("stateIsScroll");
    trashPileFull.children[0].style = "transform: scale(1)";
    trashPileFull.children[1].style = "transform: scale(1)";
  } else {
    landing.classList.remove("stateIsScroll");
    trashPileFull.children[0].style = "transform: scale(0.9)";
    trashPileFull.children[1].style = "transform: scale(0.9)";
  }

  if (event.target.scrollTop === window.innerHeight) {
    body.classList.add("showFullPage");
    setTimeout(() => {
      body.classList.add("fullPageShowing");
    }, 2000);
  }
});

window.addEventListener("scroll", function (event) {
  if (window.scrollY === 0) {
    body.classList.remove("showFullPage");
    body.classList.remove("fullPageShowing");
  }
});

// carrousel
carrousel.addEventListener("click", function (event) {
  if (event.target.classList.contains("leftArrow")) {
    const lastChild =
      carrouselInner.children[carrouselInner.children.length - 1];

    lastChild.style.width = 0;
    lastChild.style.margin = 0;
    const test = carrouselInner.prepend(lastChild);
    setTimeout(() => {
      lastChild.style.width = "30vw";
      lastChild.style.margin = "0 0.5rem 0 0.5rem";
    });
  } else if (event.target.classList.contains("rightArrow")) {
    const firstChild = carrouselInner.children[0];
    firstChild.style.width = 0;
    firstChild.style.margin = 0;
    setTimeout(() => {
      firstChild.style.width = "30vw";
      firstChild.style.margin = "0 0.5rem 0 0.5rem";
      carrouselInner.appendChild(firstChild);
    }, 2000);
  }
});

// container details
containerDetails.addEventListener("click", function (event) {
  if (!document.querySelector(".showPopUp")) {
    event.path.forEach((element) => {
      if (element.classList) {
        if (element.classList.contains("pile")) {
          element.querySelector(".pilePopUp").classList.add("showPopUp");
        }
      }
    });
  } else {
    event.path.forEach((element) => {
      if (element.classList) {
        if (element.classList.contains("closePopUp")) {
          element.parentElement.parentElement.classList.remove("showPopUp");
        }
      }
    });
  }
});
