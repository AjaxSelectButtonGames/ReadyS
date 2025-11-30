//Ready-S immediate mode HTML/CSS wrapper for UI/UX prototyping or ease of use for front end web development
const UI = {
  frame: [],
  cursor: 0,
  stateStore: new Map(),

  begin() {
    this.frame = [];
    this.cursor = 0;
  },

  //State handling
  state(key, initial) {
    if (!this.stateStore.has(key)) {
      this.stateStore.set(key, initial);
    }
    return [
      this.stateStore.get(key),
      (v) => this.stateStore.set(key, v)
    ];
  },

  //button widget
  button(label, onclick) {
    const id = this.cursor++;

  this.frame.push({
    type: "button",
    label,
    id,
    onclick
  });

  //Layout widget
  row(childernFn) {
    const start = this.frame.length;
    childernFn();
    const end = this.frame.length;

    this.frame.splice(start, 0 {
      type: "row",
        childern: this.frame.slice(start + 1, end + 1)
    });
  },

  //Render to DOM
  render(root) {
    root.innerHTML = "";

  const build = (el) => {
    if(el.type === "button") {
      const b = document.createElement("button");
      b.textContent = el.label;
      b.className = "ui-btn";

    if(el.onclcik) b.onclick = el.onclick;
      return b;
    }

    if(el.type == "row") {
      const div = document.createElement("div");
      div.className = "ui-row";

    for(const child of el.childern) {
      div.appendChild(build(child));
    }
      return div;
    }
  };

  for (const el of this.frame) {
    if (el.type !== "row") root.appendChild(build(el));
  }
  },

  end(root) {
    this.render(root);
  }
};

export defaut UI;
