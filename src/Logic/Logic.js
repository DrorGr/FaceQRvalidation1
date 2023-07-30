import pako from 'pako';
import { Buffer } from 'buffer';

class Logic {
  constructor() {}

  prefix = 'sQr1';
  suffix = '1QrE';

  zip(obj) {
    obj.photoDescriptor = this.landmarksCompress(obj.photoDescriptor);
    // return JSON.stringify(obj);//normal string
    return (
      this.prefix +
      Buffer.from(JSON.stringify(obj)).toString('base64') + //base64
      // btoa(JSON.stringify(obj))

      this.suffix
    ); //base64
  }

  landmarksCompress(originalFloat32Array) {
    const compressedArray = pako.gzip(new Uint8Array(originalFloat32Array.buffer));
    return btoa(String.fromCharCode.apply(null, compressedArray));
  }

  unzip(commpresedData) {
    if (commpresedData.startsWith(this.prefix) && commpresedData.endsWith(this.suffix)) {
      commpresedData = commpresedData.substring(this.prefix.length, commpresedData.length - this.suffix.length);
      // var jsonString = atob(commpresedData); //from base64

      // var jsonString = Buffer.from(commpresedData, "base64").toString(); //from base64

      const json = JSON.parse(commpresedData); //from base64
      // const json = JSON.parse(commpresedData); //normal string
      // console.log(json);
      // console.log(json.photoDescriptor);
      json.photoDescriptor = this.landmarksDeCompress(json.photoDescriptor);
      return json;
    } else {
      return -1;
    }
  }

  landmarksDeCompress(photoDescriptor) {
    // console.log(photoDescriptor);
    const decodedString = Buffer.from(photoDescriptor, 'base64'); //from base64

    // console.log([decodedString]);

    // atob(photoDescriptor);

    // convert the decoded string to a Uint8Array
    // const decodedArray = new Uint8Array(decodedString.length);
    // for (let i = 0; i < decodedString.length; i++) {
    //   decodedArray[i] = decodedString.charCodeAt(i);
    // }

    // console.log(decodedArray);
    // decompress the Uint8Array using gzip
    console.log(decodedString);
    const decompressedArray = pako.ungzip(decodedString);
    console.log(decompressedArray);

    // convert the decompressed Uint8Array back to a Float32Array
    return new Float32Array(decompressedArray.buffer);
  }
}

export default Logic;
