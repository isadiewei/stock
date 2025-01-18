import 'buffer';

export const fileToString = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export const stringToFile = (base64String: string): Blob => {
  const [header, base64Content] = base64String.split(",");
  const mimeType = header?.match(/:(.*?);/)?.[1] || "application/octet-stream";
  const binaryString = atob(base64Content || base64String);

  const byteArray = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }

  const blob = new Blob([byteArray], { type: mimeType });

  return blob;
}
