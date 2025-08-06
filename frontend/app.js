const input = document.querySelector("input");
const previsualise = document.getElementById("previewContainer");
const genererBtn = document.getElementById("generatePdfBtn");

input.addEventListener("change", (e) => {
  console.log(input.files);
});
