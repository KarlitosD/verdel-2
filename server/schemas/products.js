import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string().max(300),
    description: z.string().max(200).optional()
}) 

export const editProductSchema = z.object({
    name: z.string().max(300).optional(),
    description: z.string().max(200).optional(),
    bought: z.boolean().optional()
}) 