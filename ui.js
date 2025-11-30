// ui.js
const UI = {
  frame: [],
  cursor: 0,
  stateStore: new Map(),

  begin() {
    this.frame = [];
    this.cursor = 0;
  },

  // ─────────────── STATE HANDLING ───────────────
  state(key, initial) {
    if (!this.stateStore.has(key)) {
      this.stateStore.set(key, initial);
    }
    return [
      this.stateStore.get(key),
      (v) => this.stateStore.set(key, v)
    ];
  },

  // ─────────────── BUTTON WIDGET ───────────────
  button(label, onclick) {
    const id = this.cursor++;

    this.frame.push({
      type: "button",
      label,
      id,
      onclick
    });

    return id;
  },

  // ─────────────── LAYOUT (ROW) ───────────────
  row(childrenFn) {
    const start = this.frame.length;
    childrenFn();
    const end = this.frame.length;

    this.frame.splice(start, 0, {
      type: "row",
      children: this.frame.slice(start + 1, end + 1)
    });
  },

  // ─────────────── RENDER TO DOM ───────────────
  render(root) {
    root.innerHTML = "";

    const build = (el) => {
      if (el.type === "button") {
        const b = document.createElement("button");
        b.textContent = el.label;
        b.className = "ui-btn";

        if (el.onclick) b.onclick = el.onclick;
        return b;
      }

      if (el.type === "row") {
        const div = document.createElement("div");
        div.className = "ui-row";

        for (const child of el.children) {
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

export default UI;
