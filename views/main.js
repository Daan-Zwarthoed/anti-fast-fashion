import { trashPileSelectorSelected } from "./componentsJs/trashPile.js";
import { makeLineGraph } from "./componentsJs/lineGraph.js";

const trashPileDivSelectors = document.querySelector(".trashPileDivSelectors");
const trashPileFull = document.querySelector(".trashPileFull");
const body = document.querySelector("body");
const carrousel = document.querySelector(".carrousel");
const carrouselInner = document.querySelector(".carrouselInner");
const containerDetails = document.querySelector(".containerDetails");
const fastFashionMarkers = document.querySelector(".fastFashionMarkers");
const moreInfo = document.querySelector(".moreInfo");
const landing = document.querySelector(".landing");
const backContainer = document.querySelector(".backContainer");
const backTrash = document.querySelector(".backTrash");
let stopCheckingScroll = false;

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
  landing.scrollTo(0, 0);
};

// Trashpile
trashPileDivSelectors.addEventListener("click", function (event) {
  trashPileSelectorSelected(event);
});

// linegraph
makeLineGraph();

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

backContainer.addEventListener("click", function (event) {
  body.classList.remove("toTheRight");
});
backTrash.addEventListener("click", function (event) {
  body.classList.remove("toTheLeft");
});

landing.addEventListener("scroll", function (event) {
  if (!stopCheckingScroll) {
    if (event.target.scrollTop < 10) {
      landing.classList.remove("stateIsScroll");
      trashPileFull.children[0].style = "transform: scale(0.9)";
      trashPileFull.children[1].style = "transform: scale(0.9)";
    } else if (event.target.scrollTop < window.innerHeight - 10) {
      landing.classList.add("stateIsScroll");
      landing.classList.remove("stateIsBottom");
      trashPileFull.children[0].style = "transform: scale(1)";
      trashPileFull.children[1].style = "transform: scale(1)";
    } else {
      stopCheckingScroll = true;
      body.classList.add("showFullPage");
      landing.classList.remove("stateIsScroll");
      landing.classList.add("stateIsBottom");
      setTimeout(() => {
        stopCheckingScroll = false;
        body.classList.add("fullPageShowing");
      }, 2000);
    }
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

function togglePopUp(event, showPopUpClass, elementClass) {
  const activePopUp = document.querySelector(`.${showPopUpClass}`);
  if (!activePopUp) {
    event.composedPath().forEach((element) => {
      if (element.classList) {
        if (element.classList.contains(elementClass)) {
          element.lastChild.classList.add(showPopUpClass);
        }
      }
    });
  } else {
    event.composedPath().forEach((element) => {
      if (element.classList) {
        if (element.classList.contains("closePopUp")) {
          activePopUp.classList.remove(showPopUpClass);
        }
      }
    });
  }
}

// container details
containerDetails.addEventListener("click", function (event) {
  togglePopUp(event, "showContainerPopUp", "pile");
});

// fastFashionMarkers
fastFashionMarkers.addEventListener("click", function (event) {
  togglePopUp(event, "showMarkerPopUp", "marker");
});

moreInfo.addEventListener("click", function (event) {
  togglePopUp(event, "showMoreInfoPopUp", "moreInfo");
});
