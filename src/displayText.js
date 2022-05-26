import { toUppercase } from "./toUppercase";
export function displayText() {
  const logInputText = document.getElementById("input").value || "Default Text";
  const upperText = toUppercase(logInputText);
  document.getElementById("display").innerText = upperText;
}
