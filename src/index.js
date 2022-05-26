import { displayText } from "./displayText";
import personImg from "./public/img/person.jpg";

document.getElementById("button").onclick = displayText;

const img = document.createElement("img");
img.src = personImg;
document.body.appendChild(img);
