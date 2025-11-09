/**
 * Módulo de interfaz de usuario e interacciones
 * Maneja eventos de mouse, clicks y lógica de interacción
 */

const OdontogramaUI = (function() {
  'use strict';

  const config = window.OdontogramaConfig;
  const renderer = window.OdontogramaRenderer;
  const storage = window.OdontogramaStorage;

  // Referencias a los canvas y contextos
  let contexts = {};
  let canvasDiv = null;

  // Estado de la aplicación
  let bridgeTooth1 = 0;
  let bridgeTooth2 = 0;

  /**
   * Inicializa las referencias a los canvas
   * @param {Object} canvases - Objeto con referencias a los canvas
   */
  function initialize(canvases) {
    contexts = {
      base: canvases.base.getContext('2d'),
      data: canvases.data.getContext('2d'),
      highlight: canvases.highlight.getContext('2d'),
      bridge: canvases.bridge.getContext('2d')
    };

    canvasDiv = document.getElementById('odontograma-container');

    // Inicializar canvas base
    renderer.initializeCanvas(contexts.base);

    // Configurar eventos
    setupEventListeners(canvases);
  }

  /**
   * Configura los event listeners
   * @param {Object} canvases - Objeto con referencias a los canvas
   */
  function setupEventListeners(canvases) {
    const topCanvas = canvases.bridge; // El canvas superior para capturar eventos

    topCanvas.addEventListener('click', handleClick, false);
    topCanvas.addEventListener('mousemove', handleMouseMove, false);
  }

  /**
   * Detecta el diente basado en coordenadas del mouse
   * @param {number} x - Coordenada X
   * @param {number} y - Coordenada Y
   * @returns {Object} - {tooth, divIndex} o {tooth: 0} si no se encontró
   */
  function detectTooth(x, y) {
    const size = config.TOOTH.SIZE;
    const sepX = config.TOOTH.SEPARATION_X;
    let tooth = 0;
    let divIndex = 0;

    // Fila superior (dientes 1-16)
    if (y >= config.TOOTH.TOP_ROW_Y && y <= config.TOOTH.TOP_ROW_Y + size) {
      if (x >= sepX && x <= sepX + size) {
        tooth = 1;
        divIndex = 0;
      } else if (x >= 60 && x <= 800) {
        divIndex = Math.floor(x / 50);
        const start = (divIndex * size) + (sepX * divIndex) + sepX;
        const end = start + size;
        if (x >= start && x <= end) {
          tooth = divIndex + 1;
        }
      }
    }
    // Fila inferior (dientes 17-32)
    else if (y >= config.TOOTH.BOTTOM_ROW_Y && y <= config.TOOTH.BOTTOM_ROW_Y + size) {
      if (x >= sepX && x <= sepX + size) {
        tooth = 17;
        divIndex = 0;
      } else if (x >= 60 && x <= 800) {
        divIndex = Math.floor(x / 50);
        const start = (divIndex * size) + (sepX * divIndex) + sepX;
        const end = start + size;
        if (x >= start && x <= end) {
          tooth = divIndex + 17;
        }
      }
    }

    return { tooth, divIndex };
  }

  /**
   * Detecta la sección del diente basado en coordenadas relativas
   * @param {number} x - Coordenada X relativa al diente
   * @param {number} y - Coordenada Y relativa al diente
   * @returns {number} - Número de sección (1-5) o 0
   */
  function detectSection(x, y) {
    if (y > 0 && y < 10 && x > y && y < 40 - x) {
      return config.SECTIONS.TOP;
    } else if (x > 30 && x < 40 && y < x && 40 - x < y) {
      return config.SECTIONS.RIGHT;
    } else if (y > 30 && y < 40 && x < y && x > 40 - y) {
      return config.SECTIONS.BOTTOM;
    } else if (x > 0 && x < 10 && y > x && x < 40 - y) {
      return config.SECTIONS.LEFT;
    } else if (x > 10 && x < 30 && y > 10 && y < 30) {
      return config.SECTIONS.CENTER;
    }
    return 0;
  }

  /**
   * Obtiene la acción seleccionada y su color
   * @returns {Object} - {action, color, actionCode}
   */
  function getSelectedAction() {
    const selection = $("input[name='accion']:checked").val();

    switch (selection) {
      case config.ACTION_NAMES.FRACTURE:
        return {
          action: 'section',
          color: config.COLORS.FRACTURE,
          actionCode: config.ACTIONS.FRACTURE
        };
      case config.ACTION_NAMES.RESTORATION:
        return {
          action: 'section',
          color: config.COLORS.RESTORATION,
          actionCode: config.ACTIONS.RESTORATION
        };
      case config.ACTION_NAMES.EXTRACTION:
        return {
          action: 'mark',
          color: config.COLORS.EXTRACTION,
          actionCode: config.ACTIONS.EXTRACTION
        };
      case config.ACTION_NAMES.BRIDGE:
        return {
          action: 'bridge',
          color: config.COLORS.BRIDGE,
          actionCode: config.ACTIONS.BRIDGE
        };
      case config.ACTION_NAMES.DELETE:
        return { action: 'delete', color: '', actionCode: 0 };
      default:
        return { action: '', color: '', actionCode: 0 };
    }
  }

  /**
   * Maneja el evento de click
   * @param {MouseEvent} event - Evento del mouse
   */
  function handleClick(event) {
    const coords = getMouseCoordinates(event);
    const { tooth, divIndex } = detectTooth(coords.x, coords.y);

    if (!tooth) {
      return;
    }

    const { action, color, actionCode } = getSelectedAction();

    if (action === 'section') {
      handleSectionClick(tooth, divIndex, coords, color, actionCode);
    } else if (action === 'mark') {
      handleExtractionClick(tooth, actionCode);
    } else if (action === 'bridge') {
      handleBridgeClick(tooth);
    } else if (action === 'delete') {
      handleDeleteClick(tooth, divIndex, coords);
    }
  }

  /**
   * Maneja click en sección del diente
   */
  function handleSectionClick(tooth, divIndex, coords, color, actionCode) {
    const relativeCoords = getRelativeToothCoordinates(tooth, divIndex, coords);
    const section = detectSection(relativeCoords.x, relativeCoords.y);

    if (section) {
      const saved = storage.save(tooth, section, actionCode);
      if (saved) {
        renderer.drawToothSection(contexts.data, tooth, section, color);
      } else {
        alert('Esta sección ya fue marcada');
      }
    }
  }

  /**
   * Maneja click de extracción
   */
  function handleExtractionClick(tooth, actionCode) {
    const saved = storage.save(tooth, 0, actionCode);
    if (saved) {
      renderer.drawExtraction(contexts.data, tooth, config.COLORS.EXTRACTION);
    } else {
      alert('Este diente ya fue marcado como extraído');
    }
  }

  /**
   * Maneja click de puente
   */
  function handleBridgeClick(tooth) {
    if (bridgeTooth1 === 0) {
      renderer.highlightTooth(contexts.bridge, tooth, config.COLORS.BRIDGE);
      bridgeTooth1 = tooth;
    } else if (bridgeTooth2 === 0) {
      bridgeTooth2 = tooth;

      const [minTooth, maxTooth] = bridgeTooth1 < bridgeTooth2 ?
        [bridgeTooth1, bridgeTooth2] : [bridgeTooth2, bridgeTooth1];

      // Validar que estén en la misma fila
      const validBridge = (minTooth < 17 && maxTooth < 17 && minTooth !== maxTooth) ||
                          (minTooth > 16 && maxTooth > 16 && minTooth !== maxTooth);

      if (validBridge) {
        renderer.highlightTooth(contexts.bridge, tooth, config.COLORS.BRIDGE);

        const saved = storage.save(minTooth, 0, config.ACTIONS.BRIDGE, maxTooth);
        if (saved) {
          clearBridgeHighlights();
          renderer.drawBridge(contexts.bridge, minTooth, maxTooth, config.COLORS.BRIDGE);
        } else {
          alert('Este puente ya fue marcado');
          clearBridgeHighlights();
        }
      } else {
        clearBridgeHighlights();
      }

      bridgeTooth1 = 0;
      bridgeTooth2 = 0;
    }
  }

  /**
   * Maneja click de borrado
   */
  function handleDeleteClick(tooth, divIndex, coords) {
    const deleteMode = $("input[name='seccion']:checked").val();

    renderer.clearTooth(contexts.data, tooth);

    if (deleteMode === 'seccion') {
      const relativeCoords = getRelativeToothCoordinates(tooth, divIndex, coords);
      const section = detectSection(relativeCoords.x, relativeCoords.y);

      if (section) {
        const marking = storage.getLastBySection(tooth, section);
        if (marking) {
          storage.remove(marking.key);
        }
      }
    } else if (deleteMode === 'diente') {
      const marking = storage.getLastExtraction(tooth);
      if (marking) {
        storage.remove(marking.key);
      }
    }

    // Redibujar marcaciones del diente
    redrawToothMarkings(tooth);
  }

  /**
   * Maneja el movimiento del mouse (hover)
   * @param {MouseEvent} event - Evento del mouse
   */
  function handleMouseMove(event) {
    const coords = getMouseCoordinates(event);
    const { tooth, divIndex } = detectTooth(coords.x, coords.y);

    // Limpiar highlight previo
    contexts.highlight.clearRect(0, 0, config.CANVAS.WIDTH, config.CANVAS.HEIGHT);

    if (!tooth) {
      return;
    }

    const { action } = getSelectedAction();
    const deleteMode = action === 'delete' ? $("input[name='seccion']:checked").val() : '';

    if (action === 'section' || (action === 'delete' && deleteMode === 'seccion')) {
      const relativeCoords = getRelativeToothCoordinates(tooth, divIndex, coords);
      const section = detectSection(relativeCoords.x, relativeCoords.y);

      if (section) {
        renderer.highlightToothSection(contexts.highlight, tooth, section, config.COLORS.HIGHLIGHT);
      }
    } else if (action === 'mark' || action === 'bridge' || (action === 'delete' && deleteMode === 'diente')) {
      renderer.highlightTooth(contexts.highlight, tooth, config.COLORS.HIGHLIGHT);
    }
  }

  /**
   * Obtiene coordenadas del mouse relativas al canvas
   * @param {MouseEvent} event - Evento del mouse
   * @returns {Object} - {x, y}
   */
  function getMouseCoordinates(event) {
    const rect = canvasDiv.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  /**
   * Obtiene coordenadas relativas al diente
   * @param {number} tooth - Número del diente
   * @param {number} divIndex - Índice de división
   * @param {Object} coords - Coordenadas absolutas
   * @returns {Object} - {x, y} relativas
   */
  function getRelativeToothCoordinates(tooth, divIndex, coords) {
    const size = config.TOOTH.SIZE;
    const sepX = config.TOOTH.SEPARATION_X;

    const x = coords.x - ((divIndex * size) + (sepX * divIndex) + sepX);
    let y = coords.y - config.TOOTH.TOP_ROW_Y;

    if (tooth > 16) {
      y = coords.y - config.TOOTH.BOTTOM_ROW_Y;
    }

    return { x, y };
  }

  /**
   * Limpia los highlights de puentes
   */
  function clearBridgeHighlights() {
    const row1Y = 0;
    const row1Height = config.TOOTH.BOTTOM_ROW_Y - 10;
    const row2Y = config.TOOTH.BOTTOM_ROW_Y - 5;
    const row2Height = config.CANVAS.HEIGHT - row2Y;

    contexts.bridge.clearRect(0, row1Y, config.CANVAS.WIDTH, row1Height);
    contexts.bridge.clearRect(0, row2Y, config.CANVAS.WIDTH, row2Height);
  }

  /**
   * Redibuja las marcaciones de un diente
   * @param {number} tooth - Número del diente
   */
  function redrawToothMarkings(tooth) {
    const markings = storage.getByTooth(tooth).sort((a, b) => a.timestamp - b.timestamp);

    markings.forEach(marking => {
      if (marking.action === config.ACTIONS.FRACTURE) {
        renderer.drawToothSection(contexts.data, marking.tooth, marking.section, config.COLORS.FRACTURE);
      } else if (marking.action === config.ACTIONS.RESTORATION) {
        renderer.drawToothSection(contexts.data, marking.tooth, marking.section, config.COLORS.RESTORATION);
      } else if (marking.action === config.ACTIONS.EXTRACTION) {
        renderer.drawExtraction(contexts.data, marking.tooth, config.COLORS.EXTRACTION);
      }
    });
  }

  /**
   * Redibuja todos los puentes de una fila
   * @param {number} row - 1 para superior, 2 para inferior
   */
  function redrawBridges(row) {
    const bridges = storage.getBridgesByRow(row);
    bridges.forEach(bridge => {
      renderer.drawBridge(contexts.bridge, bridge.tooth, bridge.tooth2, config.COLORS.BRIDGE);
    });
  }

  // API pública
  return {
    initialize,
    redrawToothMarkings,
    redrawBridges
  };
})();

// Hacer disponible globalmente
if (typeof window !== 'undefined') {
  window.OdontogramaUI = OdontogramaUI;
}
