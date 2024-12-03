import { collection, doc, setDoc, getDocs, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig"; // Asegúrate de importar tu configuración de Firebase aquí
import { DraftFormNoticiaType, noticiaSchema, noticiaType } from "../types";

import { isAxiosError } from "axios";

export interface RawNoticia {
  titulo: string;
  autor: string;
  categoria: string;
  contenido_extenso: string;
  fecha: string; // La fecha como Timestamp
  descripcion: string;
  enlace_externo: string;
  imagen: string;
}

// Referencia a la colección "noticias"
const noticiasRef = collection(db, "noticias");

// **Obtener todas las noticias**
export const getNoticias = async () => {
  try {
    const querySnapshot = await getDocs(noticiasRef);
    // Valida, mapea y ordena los datos
    const noticias: noticiaType[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as RawNoticia)
    }))

    return noticias
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.message);
    }
  }
};


// **Obtener una noticia por ID**
export const getNoticiaById = async (id: string): Promise<noticiaType> => {
  const docRef = doc(noticiasRef, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // Extraer y procesar los datos
    const rawData = { id: docSnap.id, ...(docSnap.data() as RawNoticia) };

    // Validar los datos con el esquema
    return noticiaSchema.parse(rawData); // Devuelve la noticia validada
  } else {
    throw new Error("La noticia no existe.");
  }
};


// **3. Crear una noticia**
export const createNoticia = async (noticia: DraftFormNoticiaType) => {
  try {
    const docRef = doc(noticiasRef); // Crea un nuevo documento con un ID único
    await setDoc(docRef, noticia);
    return { message: "Noticia Creada Correctamente" }
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.message);
    }
  }
};

// **4. Editar una noticia**
export const editNoticia = async (id: string, noticia: DraftFormNoticiaType) => {
  try {
    const docRef = doc(noticiasRef, id);
    await updateDoc(docRef, noticia);
    return { message: "Cambios Guardados Correctamente" }
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.message);
    }
  }
};

// **5. Eliminar una noticia**
export const deleteNoticia = async (id: string) => {
  try {
    const docRef = doc(noticiasRef, id);
    await deleteDoc(docRef);
    return { message: "Noticia Eliminada Correctamente" }
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.message);
    }
  }

};
