import UI from "./ui.js";

function render() {
  UI.begin();

  const [count, setCount] = UI.state("counter", 0);

  UI.row(() => {
    UI.button("➕ Increment", () => setCount(count + 1));
    UI.button("➖ Decrement", () => setCount(count - 1));
  });

  UI.button("Show Count", () => alert("Count: " + count));

  UI.end(document.getElementById("app"));
}

UI.setRenderFunction(render);
render(); // initial paint
