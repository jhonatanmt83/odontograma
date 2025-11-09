/**
 * Módulo de renderizado del Odontograma
 * Contiene todas las funciones de dibujo en canvas
 */

const OdontogramaRenderer = (function() {
  'use strict';

  const config = window.OdontogramaConfig;

  /**
   * Dibuja el contorno de un diente dividido en 4 secciones triangulares
   * @param {CanvasRenderingContext2D} ctx - Contexto del canvas
   * @param {number} x - Posición X inicial
   * @param {number} y - Posición Y inicial
   */
  function drawToothOutline(ctx, x, y) {
    const size = config.TOOTH.SIZE;
    const quarter = size / 4;
    const threeQuarters = quarter * 3;

    ctx.strokeStyle = config.COLORS.OUTLINE;
    ctx.lineWidth = config.LINE.NORMAL_WIDTH;

    // Sección 1 - Superior
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size, y);
    ctx.lineTo(x + threeQuarters, y + quarter);
    ctx.lineTo(x + quarter, y + quarter);
    ctx.closePath();
    ctx.stroke();

    // Sección 2 - Derecha
    ctx.beginPath();
    ctx.moveTo(x + threeQuarters, y + quarter);
    ctx.lineTo(x + size, y);
    ctx.lineTo(x + size, y + size);
    ctx.lineTo(x + threeQuarters, y + threeQuarters);
    ctx.closePath();
    ctx.stroke();

    // Sección 3 - Inferior
    ctx.beginPath();
    ctx.moveTo(x + quarter, y + threeQuarters);
    ctx.lineTo(x + threeQuarters, y + threeQuarters);
    ctx.lineTo(x + size, y + size);
    ctx.lineTo(x, y + size);
    ctx.closePath();
    ctx.stroke();

    // Sección 4 - Izquierda
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + quarter, y + quarter);
    ctx.lineTo(x + quarter, y + threeQuarters);
    ctx.lineTo(x, y + size);
    ctx.closePath();
    ctx.stroke();
  }

  /**
   * Calcula las coordenadas de inicio de un diente
   * @param {number} toothNumber - Número del diente (1-32)
   * @returns {Object} - {x, y, index} Coordenadas y índice
   */
  function getToothCoordinates(toothNumber) {
    const size = config.TOOTH.SIZE;
    const sepX = config.TOOTH.SEPARATION_X;
    let index = toothNumber - 1;
    let y;

    if (toothNumber <= 16) {
      y = config.TOOTH.TOP_ROW_Y;
    } else {
      index = toothNumber - 17;
      y = config.TOOTH.BOTTOM_ROW_Y;
    }

    const x = (index * size) + (sepX * index) + sepX;

    return { x, y, index };
  }

  /**
   * Dibuja una sección específica del diente con color
   * @param {CanvasRenderingContext2D} ctx - Contexto del canvas
   * @param {number} toothNumber - Número del diente
   * @param {number} section - Número de sección (1-5)
   * @param {string} color - Color de relleno
   */
  function drawToothSection(ctx, toothNumber, section, color) {
    const { x, y } = getToothCoordinates(toothNumber);
    const size = config.TOOTH.SIZE;
    const quarter = size / 4;
    const threeQuarters = quarter * 3;

    ctx.fillStyle = color;
    ctx.strokeStyle = config.COLORS.OUTLINE;
    ctx.lineWidth = config.LINE.NORMAL_WIDTH;

    ctx.beginPath();

    switch (section) {
      case config.SECTIONS.TOP: // Sección 1 - Superior
        ctx.moveTo(x, y);
        ctx.lineTo(x + size, y);
        ctx.lineTo(x + threeQuarters, y + quarter);
        ctx.lineTo(x + quarter, y + quarter);
        break;

      case config.SECTIONS.RIGHT: // Sección 2 - Derecha
        ctx.moveTo(x + threeQuarters, y + quarter);
        ctx.lineTo(x + size, y);
        ctx.lineTo(x + size, y + size);
        ctx.lineTo(x + threeQuarters, y + threeQuarters);
        break;

      case config.SECTIONS.BOTTOM: // Sección 3 - Inferior
        ctx.moveTo(x + quarter, y + threeQuarters);
        ctx.lineTo(x + threeQuarters, y + threeQuarters);
        ctx.lineTo(x + size, y + size);
        ctx.lineTo(x, y + size);
        break;

      case config.SECTIONS.LEFT: // Sección 4 - Izquierda
        ctx.moveTo(x, y);
        ctx.lineTo(x + quarter, y + quarter);
        ctx.lineTo(x + quarter, y + threeQuarters);
        ctx.lineTo(x, y + size);
        break;

      case config.SECTIONS.CENTER: // Sección 5 - Centro
        ctx.moveTo(x + quarter, y + quarter);
        ctx.lineTo(x + threeQuarters, y + quarter);
        ctx.lineTo(x + threeQuarters, y + threeQuarters);
        ctx.lineTo(x + quarter, y + threeQuarters);
        break;
    }

    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  /**
   * Dibuja el contorno de una sección (para highlight)
   * @param {CanvasRenderingContext2D} ctx - Contexto del canvas
   * @param {number} toothNumber - Número del diente
   * @param {number} section - Número de sección (1-5)
   * @param {string} color - Color del contorno
   */
  function highlightToothSection(ctx, toothNumber, section, color) {
    const { x, y } = getToothCoordinates(toothNumber);
    const size = config.TOOTH.SIZE;
    const quarter = size / 4;
    const threeQuarters = quarter * 3;

    ctx.strokeStyle = color;
    ctx.lineWidth = config.LINE.NORMAL_WIDTH;

    ctx.beginPath();

    switch (section) {
      case config.SECTIONS.TOP:
        ctx.moveTo(x, y);
        ctx.lineTo(x + size, y);
        ctx.lineTo(x + threeQuarters, y + quarter);
        ctx.lineTo(x + quarter, y + quarter);
        break;

      case config.SECTIONS.RIGHT:
        ctx.moveTo(x + threeQuarters, y + quarter);
        ctx.lineTo(x + size, y);
        ctx.lineTo(x + size, y + size);
        ctx.lineTo(x + threeQuarters, y + threeQuarters);
        break;

      case config.SECTIONS.BOTTOM:
        ctx.moveTo(x + quarter, y + threeQuarters);
        ctx.lineTo(x + threeQuarters, y + threeQuarters);
        ctx.lineTo(x + size, y + size);
        ctx.lineTo(x, y + size);
        break;

      case config.SECTIONS.LEFT:
        ctx.moveTo(x, y);
        ctx.lineTo(x + quarter, y + quarter);
        ctx.lineTo(x + quarter, y + threeQuarters);
        ctx.lineTo(x, y + size);
        break;

      case config.SECTIONS.CENTER:
        ctx.moveTo(x + quarter, y + quarter);
        ctx.lineTo(x + threeQuarters, y + quarter);
        ctx.lineTo(x + threeQuarters, y + threeQuarters);
        ctx.lineTo(x + quarter, y + threeQuarters);
        break;
    }

    ctx.closePath();
    ctx.stroke();
  }

  /**
   * Dibuja el contorno de un diente completo (para highlight)
   * @param {CanvasRenderingContext2D} ctx - Contexto del canvas
   * @param {number} toothNumber - Número del diente
   * @param {string} color - Color del contorno
   */
  function highlightTooth(ctx, toothNumber, color) {
    const { x, y } = getToothCoordinates(toothNumber);
    const size = config.TOOTH.SIZE;

    ctx.strokeStyle = color;
    ctx.lineWidth = config.LINE.NORMAL_WIDTH;

    ctx.beginPath();
    ctx.rect(x, y, size, size);
    ctx.closePath();
    ctx.stroke();
  }

  /**
   * Dibuja una X sobre el diente (extracción)
   * @param {CanvasRenderingContext2D} ctx - Contexto del canvas
   * @param {number} toothNumber - Número del diente
   * @param {string} color - Color de la X
   */
  function drawExtraction(ctx, toothNumber, color) {
    const { x, y } = getToothCoordinates(toothNumber);
    const size = config.TOOTH.SIZE;

    ctx.strokeStyle = color;
    ctx.lineWidth = config.LINE.THICK_WIDTH;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size, y + size);
    ctx.moveTo(x + size, y);
    ctx.lineTo(x, y + size);
    ctx.stroke();

    ctx.lineWidth = config.LINE.NORMAL_WIDTH;
  }

  /**
   * Dibuja un puente entre dos dientes
   * @param {CanvasRenderingContext2D} ctx - Contexto del canvas
   * @param {number} tooth1 - Primer diente
   * @param {number} tooth2 - Segundo diente
   * @param {string} color - Color del puente
   */
  function drawBridge(ctx, tooth1, tooth2, color) {
    const size = config.TOOTH.SIZE;
    const coords1 = getToothCoordinates(tooth1);
    const coords2 = getToothCoordinates(tooth2);

    let y;
    if (tooth1 < 17) {
      y = config.TOOTH.TOP_ROW_Y + 60; // Línea superior
    } else {
      y = config.TOOTH.BOTTOM_ROW_Y + 60; // Línea inferior
    }

    const x1 = coords1.x + (size / 2);
    const x2 = coords2.x + (size / 2);

    ctx.strokeStyle = color;
    ctx.lineWidth = config.LINE.BRIDGE_WIDTH;

    ctx.beginPath();
    ctx.moveTo(x1, y);
    ctx.lineTo(x2, y);
    ctx.stroke();

    ctx.lineWidth = config.LINE.NORMAL_WIDTH;
  }

  /**
   * Borra un área específica del diente
   * @param {CanvasRenderingContext2D} ctx - Contexto del canvas
   * @param {number} toothNumber - Número del diente
   */
  function clearTooth(ctx, toothNumber) {
    const { x, y } = getToothCoordinates(toothNumber);
    const size = config.TOOTH.SIZE;
    ctx.clearRect(x, y, size, size);
  }

  /**
   * Dibuja el número del diente
   * @param {CanvasRenderingContext2D} ctx - Contexto del canvas
   * @param {number} toothNumber - Número del diente
   * @param {number} x - Posición X
   * @param {number} y - Posición Y base
   */
  function drawToothNumber(ctx, toothNumber, x, y) {
    const size = config.TOOTH.SIZE;
    const labelY = toothNumber <= 16 ? (y / 2) + 5 : y - 5;

    ctx.font = `${config.FONT.SIZE} ${config.FONT.FAMILY}`;
    ctx.textAlign = 'center';
    ctx.fillStyle = config.COLORS.TOOTH_NUMBER;
    ctx.fillText(toothNumber, x + (size / 2), labelY);
  }

  /**
   * Inicializa el canvas base con todos los dientes
   * @param {CanvasRenderingContext2D} ctx - Contexto del canvas
   */
  function initializeCanvas(ctx) {
    const size = config.TOOTH.SIZE;
    const sepX = config.TOOTH.SEPARATION_X;

    // Dientes 1-16 (fila superior)
    for (let i = 0; i < config.TOOTH.TEETH_PER_ROW; i++) {
      const x = (i * size) + (sepX * i) + sepX;
      const y = config.TOOTH.TOP_ROW_Y;
      drawToothOutline(ctx, x, y);
      drawToothNumber(ctx, i + 1, x, y);
    }

    // Dientes 17-32 (fila inferior)
    for (let i = 0; i < config.TOOTH.TEETH_PER_ROW; i++) {
      const x = (i * size) + (sepX * i) + sepX;
      const y = config.TOOTH.BOTTOM_ROW_Y;
      drawToothOutline(ctx, x, y);
      drawToothNumber(ctx, i + 17, x, y);
    }
  }

  // API pública
  return {
    drawToothOutline,
    drawToothSection,
    highlightToothSection,
    highlightTooth,
    drawExtraction,
    drawBridge,
    clearTooth,
    getToothCoordinates,
    initializeCanvas
  };
})();

// Hacer disponible globalmente
if (typeof window !== 'undefined') {
  window.OdontogramaRenderer = OdontogramaRenderer;
}
