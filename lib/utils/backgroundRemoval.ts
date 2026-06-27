/**
 * Utilidad para quitar el fondo de imágenes usando IA directamente en el navegador.
 * Usa @imgly/background-removal (WebAssembly + ONNX), 100% client-side: las
 * imágenes nunca salen del dispositivo del cliente y no requiere clave de API.
 */

export interface RemoveBgOptions {
  onProgress?: (progress: number) => void;
}

/**
 * Quita el fondo de una imagen y devuelve un data URL (PNG con transparencia).
 *
 * @param source Imagen de origen: un data URL (string), Blob o URL http.
 * @param options Callbacks opcionales (progreso).
 * @returns data URL PNG con el fondo eliminado.
 */
export async function removeImageBackground(
  source: string | Blob,
  options: RemoveBgOptions = {}
): Promise<string> {
  const { onProgress } = options;

  // Import dinámico: la librería sólo se carga cuando el usuario la usa,
  // evitando inflar el bundle inicial y problemas de SSR.
  const { removeBackground } = await import('@imgly/background-removal');

  const resultBlob = await removeBackground(source, {
    // Reporta el progreso de descarga del modelo y del procesamiento.
    progress: (key: string, current: number, total: number) => {
      if (onProgress && total > 0) {
        const pct = Math.round((current / total) * 100);
        onProgress(Math.min(pct, 100));
      }
    },
    output: {
      format: 'image/png',
      quality: 0.9,
    },
  });

  // Convertir el Blob resultante a data URL para usarlo en Fabric.js.
  return await blobToDataUrl(resultBlob);
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
