import { z } from "zod";

export const createSectionSchema = z.object({
    name: z.string().max(30),
    color: z.string().max(10)
}) 

export const editSectionSchema = z.object({
    name: z.string().max(30).optional(),
    color: z.string().max(10).optional()
}) 