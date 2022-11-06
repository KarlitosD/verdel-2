import { z } from "zod";

export const editCreateListSchema = z.object({
    name: z.string().max(30)
}) 