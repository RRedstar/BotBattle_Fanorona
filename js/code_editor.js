// Récup la zone editeur de code
editZone = document.getElementById("editor")

let editor = CodeMirror.fromTextArea(editZone, {
    mode: "python",
    lineNumbers: true,
    theme: "darcula",
    autoCloseBrackets: true,
    extraKeys: {"Ctrl-Space":"autocomplete"},
  });

  let output = document.getElementById("output");

  async function runCode() {
    console.log("Alefa Barea!!!");
  }
