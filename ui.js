const UI = {
  frame: [],
  cursor: 0,
  stateStore: new Map(),
  _renderFn: null,

  setRenderFunction(fn) {
    this._renderFn = fn;
  },

  requestRender() {
    if (this._renderFn) this._renderFn();
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
      style,
      onclick
    });

    return id;
  },

  row(childrenFn, style = {}) {
    const start = this.frame.length;
    childrenFn();
    const children = this.frame.splice(start);
    this.frame.push({ type: "row", children, style });
  },

  renderDOM(root) {
    root.innerHTML = "";

    const applyStyle = (elem, style) => {
      for (const key in style) elem.style[key] = style[key];
    };

    const build = (node) => {
      if (node.type === "button") {
        const b = document.createElement("button");
        b.textContent = node.label;

        applyStyle(b, {
          background: "#333",
          color: "white",
          padding: "10px 16px",
          border: "1px solid #555",
          borderRadius: "6px",
          margin: "4px",
          cursor: "pointer"
        });

        if (node.onclick) {
          b.onclick = () => {
            node.onclick();
            this.requestRender();
          };
        }

        return b;
      }

      if (node.type === "row") {
        const r = document.createElement("div");

        applyStyle(r, {
          display: "flex",
          gap: "8px",
          marginBottom: "12px"
        });

        node.children.forEach(c => r.appendChild(build(c)));
        return r;
      }
    };

    this.frame.forEach(n => root.appendChild(build(n)));
  },

  end(root) {
    this.renderDOM(root);
  }
};

export default UI;
