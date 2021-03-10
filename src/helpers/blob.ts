export const readBlobAsText = (blob: Blob) => {
  return new Promise<string>(resolve => {
    const reader = new FileReader();
    reader.addEventListener('loadend', (e) => {
      // @ts-ignore
      resolve(e.srcElement.result);
    });
    reader.readAsText(blob);
  });
};

export function blobConstruct(blobParts: any, mimeType: string = ''): Blob {
  let blob;
  const safeMimeType = blobSafeMimeType(mimeType);
  try {
    blob = new Blob(blobParts, {type: safeMimeType});
  } catch(e) {
    // @ts-ignore
    let bb = new BlobBuilder;
    blobParts.forEach((blobPart: any) => {
      bb.append(blobPart);
    });
    blob = bb.getBlob(safeMimeType);
  }
  return blob;
}

export function blobSafeMimeType(mimeType: string) {
  if([
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/bmp',
    'video/mp4',
    'video/webm',
    'video/quicktime',
    'audio/ogg',
    'audio/mpeg',
    'audio/mp4',
    'application/json'
  ].indexOf(mimeType) === -1) {
    return 'application/octet-stream';
  }

  return mimeType;
}