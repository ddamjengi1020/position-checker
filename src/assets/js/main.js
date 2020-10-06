const firstInputs = document.querySelectorAll(".jsFirstInput");
const goHome = document.getElementById("jsGoHome");

const clickHandle = () => {
  window.history.back();
};

const init = () => {
  if (goHome) {
    goHome.addEventListener("click", clickHandle);
  }
  firstInputs.forEach((input) => (input.checked = true));
};

init();
