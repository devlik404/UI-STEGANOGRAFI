import { Accept } from "react-dropzone";
import { IconType } from "react-icons";

export interface IEncryptPost{
file :  any | Blob | MediaSource,
image: any | Blob | MediaSource,
password:string
}

export interface IEncryptGet{
count : number,
countDecrypt : number
}
export interface CardDropzoneProps {
     icon: IconType;
     title: string;
     accept?: Accept; 
     onDrop: (files: File[]) => void;
     acceptedFiles: string;
}