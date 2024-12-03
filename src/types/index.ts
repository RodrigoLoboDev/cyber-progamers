import { z } from 'zod'

// FORMULARIO DE CONTACTO
export const DraftContactSchema = z.object({
    asunto: z.string(),
    email: z.string(),
    nombre: z.string(),
    apellido: z.string(),
    celular: z.string(),
    mensaje: z.string()
})

export type DraftContactType = z.infer<typeof DraftContactSchema>

// NOTICIAS API
export const noticiaSchema = z.object({
    id: z.string(),
    titulo: z.string(),
    autor: z.string(),
    categoria: z.string(),
    contenido_extenso: z.string(),
    fecha: z.string(),
    descripcion: z.string(),
    enlace_externo: z.string(),
    imagen: z.string(),
})

export const noticiasSchema = z.array(noticiaSchema)

export const DraftFormNoticiaSchema = noticiaSchema.omit({id: true})

export type noticiaType = z.infer<typeof noticiaSchema>
export type DraftFormNoticiaType = z.infer<typeof DraftFormNoticiaSchema>

// GALERIA API
export const imagenSchema = z.object({
    id: z.string(),
    original: z.string(),
    thumbnail: z.string(),
})

export const imagenesSchema = z.array(imagenSchema)

export const DraftFormImagenSchema = imagenSchema.omit({id: true})

export type imagenType = z.infer<typeof imagenSchema>
export type draftFormImagenType = z.infer<typeof DraftFormImagenSchema>