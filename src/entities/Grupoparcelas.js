import { Parcela } from "./Parcela";
export function crearParcelas(scene) {
  const filas = 8;
  const columnas = 16;
  const tamanoParcela = 100;

  // Centrar la matriz
  const offsetX = (scene.cameras.main.width - (columnas * tamanoParcela)) / 2;
  const offsetY = (scene.cameras.main.height - (filas * tamanoParcela)) / 2;

  // Array para almacenar parcelas
  const parcelas = [];

  for (let fila = 0; fila < filas; fila++) {
      parcelas[fila] = []
      for (let columna = 0; columna < columnas; columna++) {
          const x = columna * tamanoParcela + offsetX;
          const y = fila * tamanoParcela + offsetY;
        let parcela = new Parcela(scene, 'textura0', x, y, fila, columna, tamanoParcela);
          parcelas [fila][columna] = parcela
      }
  }

  // Devolver el arreglo de parcelas
  return parcelas;
}



