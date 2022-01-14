import { trashPileSelectorSelected } from "./componentsJs/trashPile.js";
import { makeLineGraph, updateLineGraph } from "./componentsJs/lineGraph.js";

const trashPileDivSelectors = document.querySelector(".trashPileDivSelectors");
const lineGraphSelectors = document.querySelector(".lineGraphSelectors");
const lineGraphSelectorsInputs = document.querySelectorAll(
  ".lineGraphSelectors input"
);
const trashPileFull = document.querySelector(".trashPileFull");
const body = document.querySelector("body");

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
  body.classList.add("showFullPage");
});

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
