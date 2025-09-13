import { corsApi } from "@/api/cors";
import { FormEvent, useState } from "react";

export function usePost() {
  const [res, setRes] = useState<{ url: string; status: number }>({
    url: "",
    status: 0
  });

  const handleEncrypt = async (
    e: FormEvent,
    content: { file: File | null; image: File | null; password: string }
  ) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (content.file) formData.append("file", content.file);
      if (content.image) formData.append("image", content.image);
      if (content.password) formData.append("password", content.password);

      const response = await corsApi.post("/save-metadata", formData);

      console.log("response data", response);
      setRes({
        url: response.data,
        status: response.status
      });
      return response; 
    } catch (error) {
      console.log("error submitting data", error);
          return null;
    }
  };

  return { handleEncrypt, res };
}
