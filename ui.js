//Simple 1st version of ReadyS
const UI = {
  elements: [],
  currentId: 0,

  begin() {
    this.elements = [];
    this.currentId = 0;
  },
  button(label) {
    const id = this.currentId++;
    this.elements.push({
      type: "button",
      id,
      label,
    });
    return id;
  },

  end(root = document.body) {
    //clear root
  root.innerHTML = "";

  //render each of the elements
  for (const el of this.elements) {
    if(el.type === "button") {
      const btn = document.createElement("button");
      btn.textContent = el.label;
      root.appendChild(btn);
    }
  }
}
};

export default UI;
