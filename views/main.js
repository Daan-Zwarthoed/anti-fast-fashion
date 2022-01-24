import { trashPileSelectorSelected } from "./componentsJs/trashPile.js";
import { makeLineGraph, updateLineGraph } from "./componentsJs/lineGraph.js";

const trashPileDivSelectors = document.querySelector(".trashPileDivSelectors");
const lineGraphSelectors = document.querySelector(".lineGraphSelectors");
const lineGraphSelectorsInputs = document.querySelectorAll(
  ".lineGraphSelectors input"
);
const trashPileFull = document.querySelector(".trashPileFull");
const body = document.querySelector("body");
const details = document.querySelector(".details");
const trashDetails = document.querySelector(".details .trash");
const containersDetails = document.querySelector(".details .containers");
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
  event.target.scrollTop < 10
    ? landing.classList.remove("stateIsScroll")
    : landing.classList.add("stateIsScroll");

  if (event.target.scrollTop === window.innerHeight) {
    body.classList.add("showFullPage");
    setTimeout(() => {
      body.classList.add("fullPageShowing");
    }, 2000);
  }
});
