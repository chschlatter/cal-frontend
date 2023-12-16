import Alpine from "alpinejs";
import calLogin from "./calLogin.js";

Alpine.data("calLogin", calLogin);
window.Alpine = Alpine;
window.App = { apiUrl: "/api" };

// see if DOM is already available
if (
  document.readyState === "complete" ||
  document.readyState === "interactive"
) {
  // call on next available tick
  setTimeout(init, 1);
} else {
  document.addEventListener("DOMContentLoaded", init);
}

function init() {
  Alpine.start();
}
