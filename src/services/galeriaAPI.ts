import { collection, doc, setDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig"; // Asegúrate de importar tu configuración de Firebase aquí
import { draftFormImagenType, imagenType } from "../types";

import { isAxiosError } from "axios";

export interface RawImagen {
    original: string;
    thumbnail: string;
}

// Referencia a la colección "galeria"
const galeriaRef = collection(db, "galeria");

// **Obtener todas las imagenes**
export const getImagenes = async () => {
    try {
        const querySnapshot = await getDocs(galeriaRef);
        // Valida, mapea y ordena los datos
        const imagenes: imagenType[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as RawImagen)
        }))

        return imagenes
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.message);
        }
    }
};

// **2. Cargar una imagen**
export const createImagen = async (imagen: draftFormImagenType) => {
  try {
    const docRef = doc(galeriaRef); // Crea un nuevo documento con un ID único
    await setDoc(docRef, imagen);
    return { message: "Imagen Agregada a la Galeria" }
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.message);
    }
  }
};

// **3. Eliminar una noticia**
export const deleteImagen = async (id: string) => {
  try {
    const docRef = doc(galeriaRef, id);
    await deleteDoc(docRef);
    return { message: "Imagen Eliminada Correctamente" }
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.message);
    }
  }
};
