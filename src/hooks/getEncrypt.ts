import { corsApi } from "@/api/cors";

export const handleGetEncrypt = async () => {

     const response = await corsApi.get("");

     return { countEncrypt: response.data ,data:response.data}
}