import { corsApi } from "@/api/cors";
import { IEncryptPost } from "@/utils/interface";
import { FormEvent, useState } from "react";

export function usePost() {

     const [content, setContent] = useState<IEncryptPost>({
          file: null,
          image: null,
          password: ""
     });
console.log("DATA :::::::::::::::",content);

     const handleEncrypt = async (e: FormEvent) => {
          e.preventDefault();
          try {
               const formData = new FormData();
               if (content.file) formData.append("file", content.file);
               if (content.image) formData.append("image", content.image);
               if (content.password) formData.append("password", content.password);


               const response = await corsApi.post("/save-metadata", formData);


               console.log("response data", response);

               // Refresh data or perform other actions as needed
          } catch (error) {
               console.log("error submitting data", error);
          }
     };

     return { handleEncrypt, setContent };

}