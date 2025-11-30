import UI from "ui.js";

function render() {
  UI.begin();
  UI.button("Click me");
  UI.button("Another button");
  UI.end(document.getElementById("app"));
}

render();
