const trashPileImages = document.querySelectorAll(".trashPileDivImages img");
const rectangle = document.querySelector(".trashPileDivSelectors rect");
let oldImage = document.querySelector(".trashPileDivImages img");
let currentStep = 0;

function returnWidth(nextStep) {
  switch (nextStep) {
    case 0:
      return "55";
    case 1:
      return "180";
    case 2:
      return "300";
    case 3:
      return "420";
    case 4:
      return "540";
    default:
      return "55";
  }
}

function changePile(nextStep) {
  const newImage = trashPileImages[nextStep];
  if (nextStep < currentStep) oldImage.classList.remove("differentTransition");
  newImage.classList.remove("hidden");
  oldImage.classList.add("hidden");
  if (nextStep > currentStep) oldImage.classList.add("differentTransition");
  oldImage = newImage;
  rectangle.style.width = returnWidth(nextStep);
  currentStep = nextStep;
}

const trashPileInterval = setInterval(() => {
  const nextStep = currentStep === 4 ? 0 : currentStep + 1;
  changePile(nextStep);
}, 3000);

export function trashPileSelectorSelected(event) {
  if (event.target.classList.contains("point")) {
    // sends step you want to show
    if (event.target.classList[1][1] !== currentStep) {
      clearInterval(trashPileInterval);
      changePile(parseInt(event.target.classList[1][1]));
    }
  }
}
