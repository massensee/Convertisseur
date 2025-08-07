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

  const premiereImage = imageRight.querySelector("img");

  // Crée un nouvel objet Image à partir du src
  const tempImage = new Image();
  tempImage.src = premiereImage.src;

  tempImage.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = tempImage.naturalWidth;
    canvas.height = tempImage.naturalHeight;

    ctx.drawImage(tempImage, 0, 0);

    const imageData = canvas.toDataURL("image/png");

    const doc = new jspdf.jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const ratio = Math.min(
      pageWidth / canvas.width,
      pageHeight / canvas.height
    );

    const imgWidth = canvas.width * ratio;
    const imgHeight = canvas.height * ratio;

    doc.addImage(imageData, "PNG", 10, 10, imgWidth, imgHeight);
    doc.save("images.pdf");
  };
});
