import UI from "./ui.js";

function render() {
  UI.begin();

const [count, setCopunt] = UI.state("counter",0);

UI.row(() => {
  UI.button("+ Add", () => setCount(count + 1));
  UI.button("- Subtract", => setCount(count - 1));
});

UI.button("Show Count", () => alert("Count: " + count));

UI.end(document.getElementById("app"));

requestAnimationFrame(render);
}

render();
