import { corsApi } from "@/api/cors";

export const handleDeleted = async (id:number) => {

     const response = await corsApi.delete(`/${id}`);

     return {res:response.data}
}