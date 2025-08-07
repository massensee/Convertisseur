const input = document.querySelector("input");
const previsualise = document.getElementById("previewContainer");
const imageLeft = document.getElementById("previewLeft");
const imageRight = document.getElementById("previewRight");
const genererBtn = document.getElementById("generatePdfBtn");

input.addEventListener("change", () => {
  imageLeft.innerHTML = "";
  const fichiers = input.files;

  Array.from(fichiers).forEach((fichier) => {
    const imageURL = URL.createObjectURL(fichier);

    const img = document.createElement("img");

    img.src = imageURL;
    imageLeft.appendChild(img);
  });

  console.log(input.files);
});

genererBtn.addEventListener("click", () => {
  imageRight.innerHTML = "";

  const imagesCopiees = imageLeft.querySelectorAll("img");

  imagesCopiees.forEach((image) => {
    const clone = image.cloneNode(true);
    imageRight.appendChild(clone);
  });
});
