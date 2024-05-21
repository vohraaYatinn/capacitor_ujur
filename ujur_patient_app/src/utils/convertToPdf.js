import html2pdf from 'html2pdf.js';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

const convertToPDF = async(htmlContent, fileName) => {
  const pdfOptions = {
    margin: 10,
    filename: fileName,  // Use the provided fileName for naming the PDF
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  };

  try {
    // Generate PDF and get the blob
    const pdf_blob = await html2pdf().from(htmlContent).set(pdfOptions).outputPdf('blob');

    // Convert the blob to base64
    const base64Data = await convertBlobToBase64(pdf_blob);

    // Write the base64 data to the file system
    await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Documents,
      encoding: Encoding.UTF8
    });

    console.log("PDF file created successfully");
  } catch (error) {
    console.error("Failed to create PDF file", error);
  }
};

// Helper function to convert Blob to Base64
function convertBlobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject('Failed to read blob as base64');
    reader.onload = () => resolve(reader.result.split(',')[1]); // Get only the base64 string without the prefix
    reader.readAsDataURL(blob);
  });
}

export default convertToPDF;
