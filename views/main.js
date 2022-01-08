import { trashPileSelectorSelected } from "./componentsJs/trashPile.js";
import { makeLineGraph, updateLineGraph } from "./componentsJs/lineGraph.js";

// trashpile
const trashPileDivSelectors = document.querySelector(".trashPileDivSelectors");

trashPileDivSelectors.addEventListener("click", function (event) {
  trashPileSelectorSelected(event);
});

// linegraph
makeLineGraph();

const lineGraphSelectors = document.querySelector(".lineGraphSelectors");
const lineGraphSelectorsInputs = document.querySelectorAll(
  ".lineGraphSelectors input"
);
lineGraphSelectors.addEventListener("click", function (event) {
  if (event.target.parentElement.classList[0] === "lineGraphInputAndLabel") {
    const unCheckedInputs = [];
    lineGraphSelectorsInputs.forEach((input) => {
      if (!input.checked) unCheckedInputs.push(input.id);
    });
    updateLineGraph(unCheckedInputs);
  }
});
