import { corsApi } from "@/api/cors";

export const handleDecryptPost =() => {

     const handleRequestDecrypt = async (
          contentDecrypt: { image: File | null; password: string }
     ) => {
          try {
               const formData = new FormData();
               if (contentDecrypt.image) formData.append("image", contentDecrypt.image);
               if (contentDecrypt.password) formData.append("password", contentDecrypt.password);

               const response = await corsApi.post("/extract", formData);

               console.log("response data", response);

               return response;
          } catch (error) {
               console.log("error submitting data", error);
               return null;
          }
     };
     return { handleRequestDecrypt };

};

