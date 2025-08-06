const input = document.querySelector("input");
const previsualise = document.getElementById("previewContainer");
const genererBtn = document.getElementById("generatePdfBtn");

input.addEventListener("change", () => {
  previsualise.innerHTML = "";
  const fichiers = input.files;

  Array.from(fichiers).forEach((fichier) => {
    const imageURL = URL.createObjectURL(fichier);

    const img = document.createElement("img");

    img.src = imageURL;
    previsualise.appendChild(img);
  });

  console.log(input.files);
});
