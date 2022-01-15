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
      details.classList.remove("hidden");
      trashDetails.classList.remove("hidden");
    } else if (event.target.classList.contains("trashPileUp")) {
      details.classList.remove("hidden");
      containersDetails.classList.remove("hidden");
    }
  }
  body.classList.add("showFullPage");
  setTimeout(() => {
    body.classList.add("fullPageShowing");
  }, 2000);
});

details.addEventListener("click", function (event) {
  if (event.target.classList.contains("details")) {
    details.classList.add("hidden");
    trashDetails.classList.add("hidden");
    containersDetails.classList.add("hidden");
  }
});

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
