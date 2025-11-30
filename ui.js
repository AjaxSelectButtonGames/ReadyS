// ui.js
const UI = {
  frame: [],
  cursor: 0,
  stateStore: new Map(),

  theme: {
    button: {
      background: "#333",
      color: "white",
      padding: "10px 16px",
      border: "1px solid #555",
      borderRadius: "6px",
      margin: "4px",
      cursor: "pointer",
      transition: "0.1s",
    },
    buttonHover: {
      background: "#444"
    },
    row: {
      display: "flex",
      gap: "8px",
      marginBottom: "12px"
    }
  },

  begin() {
    this.frame = [];
    this.cursor = 0;
  },

  state(key, initial) {
    if (!this.stateStore.has(key)) {
      this.stateStore.set(key, initial);
    }
    return [
      this.stateStore.get(key),
      (v) => this.stateStore.set(key, v)
    ];
  },

  button(label, onclick, style = {}) {
    const id = this.cursor++;

    this.frame.push({
      type: "button",
      label,
      id,
      onclick,
      style
    });
  },

  row(childrenFn, style = {}) {
    const childrenStart = this.frame.length;
    childrenFn();
    const children = this.frame.splice(childrenStart);

    this.frame.push({
      type: "row",
      children,
      style
    });
  },

  render(root) {
    root.innerHTML = "";

    const applyStyle = (el, styleObj) => {
      for (let key in styleObj) {
        el.style[key] = styleObj[key];
      }
    };

    const build = (node) => {
      if (node.type === "button") {
        const b = document.createElement("button");
        b.textContent = node.label;

        // merge style: theme + per-widget
        applyStyle(b, this.theme.button);
        applyStyle(b, node.style);

        b.onmouseenter = () => applyStyle(b, this.theme.buttonHover);
        b.onmouseleave = () => applyStyle(b, this.theme.button);

        if (node.onclick) b.onclick = node.onclick;
        return b;
      }

      if (node.type === "row") {
        const div = document.createElement("div");

        applyStyle(div, this.theme.row);
        applyStyle(div, node.style);

        node.children.forEach(child => div.appendChild(build(child)));
        return div;
      }
    };

    this.frame.forEach(node => root.appendChild(build(node)));
  },

  end(root) {
    this.render(root);
  }
};

export default UI;
