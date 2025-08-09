const input = document.querySelector("input");
const previsualise = document.getElementById("previewContainer");
const imageLeft = document.getElementById("previewLeft");
const imageRight = document.getElementById("previewRight");
const genererBtn = document.getElementById("generatePdfBtn");

let currentDoc = null;
let currentPdfUrl = null;

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
  // Nettoyer ancien PDF en mémoire
  if (currentPdfUrl) {
    URL.revokeObjectURL(currentPdfUrl);
    currentPdfUrl = null;
  }
  currentDoc = null;
  document.getElementById("pdfMessage").style.display = "none";

  // Récupérer la première image pour le PDF
  const premiereImage = imageLeft.querySelector("img");
  if (!premiereImage) {
    alert("Ajoutez d'abord une image !");
    return;
  }

  // Générer le PDF sans le télécharger tout de suite
  const doc = new jspdf.jsPDF();
  doc.addImage(premiereImage.src, "JPEG", 10, 10, 180, 160);

  // Sauvegarder en mémoire
  currentDoc = doc;
  currentPdfUrl = doc.output("bloburl");

  // Afficher le message avec les boutons
  document.getElementById("pdfMessage").style.display = "block";
});

// Gestion du clic "Aperçu"
document.getElementById("previewPdfBtn").addEventListener("click", () => {
  if (currentPdfUrl) {
    window.open(currentPdfUrl, "_blank");
  }
});

// Gestion du clic "Télécharger"
document.getElementById("downloadPdfBtn").addEventListener("click", () => {
  if (currentDoc) {
    currentDoc.save("images.pdf");
  }
});
