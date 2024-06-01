import { FilesystemDirectory, FilesystemEncoding } from '@capacitor/filesystem';
import { Plugins, Directory, Encoding } from '@capacitor/core';
import html2pdf from 'html2pdf.js';

const { Permissions, Filesystem } = Plugins;

const convertToPDF = async (htmlContent, fileName, setPercentageDownload=false, setPercentageIsError=false) => {
  const currentDate = new Date().toLocaleString().replace(/[,:\s\/]/g, '-');

  const pdfOptions = {
    margin: 10,
    filename: `${fileName}-${currentDate}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  };

  // Generate PDF from HTML using html2pdf and get the blob

  const pdfBlob = await html2pdf().from(htmlContent).set(pdfOptions).output('blob');

  // Convert blob to base64
  const base64data = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result.split(',')[1]); // Remove data URL part
    };
    reader.onerror = reject;
    reader.readAsDataURL(pdfBlob);
  });

  // Save PDF file using Capacitor's Filesystem API
  try {
    await Filesystem.writeFile({
      path: `${fileName}.pdf`,
      data: base64data,
      directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.Base64, // Use Base64 encoding
    });
    if(setPercentageDownload){
      setPercentageDownload(100)
    }
    console.log('PDF saved successfully.');
  } catch (error) {
    setPercentageDownload(100)
    setPercentageIsError(true)

    console.error('Error saving PDF:', error);
  }
};

export default convertToPDF;
