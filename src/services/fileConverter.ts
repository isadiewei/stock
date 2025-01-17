import 'buffer';

export const fileToString = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

// export function stringToFile(content: string, fileName: string, mimeType: string = "text/plain"): File {
//   const blob = new Blob([content], { type: mimeType });
//   return new File([blob], fileName, { type: mimeType });
// }
export const stringToFile = (base64String: string): Blob => {
  // Split the Base64 string to remove the data URI prefix, if present
  const [header, base64Content] = base64String.split(",");
  const mimeType = header?.match(/:(.*?);/)?.[1] || "application/octet-stream";
  const binaryString = atob(base64Content || base64String); // Fallback for pure Base64 strings

  // Convert binary string to a Uint8Array
  const byteArray = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }

  // Create a Blob and resolve it
  const blob = new Blob([byteArray], { type: mimeType });
  return blob;
}
