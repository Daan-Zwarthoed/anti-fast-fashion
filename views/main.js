import { trashPileSelectorSelected } from "./js/trashPile.js";

const trashPileDivSelectors = document.querySelector(".trashPileDivSelectors");

trashPileDivSelectors.addEventListener("click", function (event) {
  trashPileSelectorSelected(event);
});
