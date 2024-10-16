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

          
          
          
          // Crear la parcela en la posición calculada y asegurar que mantenga su tamaño original
          /*const parcela = scene.add.sprite(x, y, 'textura0').setOrigin(0);
          parcela.posx = columna
          parcela.posy = fila

          // Aseguramos que la parcela tenga el tamaño correcto
          parcela.setDisplaySize(tamanoParcela, tamanoParcela);
          parcela.setInteractive();
          parcela.on('pointerdown', () => {
            console.log(parcela)
        });*/
        let parcela = new Parcela(scene, 'textura0', x, y, fila, columna, tamanoParcela);
          parcelas [fila][columna] = parcela
      }
  }

  // Devolver el arreglo de parcelas
  return parcelas;
}


