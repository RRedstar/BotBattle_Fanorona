// Récup la zone editeur de code
editZone = document.getElementById("editor")

let editor = CodeMirror.fromTextArea(editZone, {
    mode: "python",
    lineNumbers: true,
    theme: "default",
  });

  let output = document.getElementById("output");

  async function runCode() {
    console.log("Alefa Barea!!!");
  }

  document.getElementById("run-btn").addEventListener("click", runPython);