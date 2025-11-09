/**
 * Configuración y constantes del Odontograma
 */

const OdontogramaConfig = {
  // Dimensiones del canvas
  CANVAS: {
    WIDTH: 810,
    HEIGHT: 300
  },

  // Dimensiones de los dientes
  TOOTH: {
    SIZE: 40,
    SEPARATION_X: 10,
    SEPARATION_Y: 10,
    TOP_ROW_Y: 20,
    BOTTOM_ROW_Y: 140, // SIZE + 100
    TOTAL_TEETH: 32,
    TEETH_PER_ROW: 16
  },

  // Colores para las acciones
  COLORS: {
    FRACTURE: 'red',
    RESTORATION: 'blue',
    EXTRACTION: 'black',
    BRIDGE: 'red',
    HIGHLIGHT: 'yellow',
    OUTLINE: 'black',
    TOOTH_NUMBER: 'blue'
  },

  // Códigos de acción para localStorage
  ACTIONS: {
    FRACTURE: 1,
    RESTORATION: 2,
    EXTRACTION: 3,
    BRIDGE: 4
  },

  // Nombres de acciones
  ACTION_NAMES: {
    FRACTURE: 'fractura',
    RESTORATION: 'restauracion',
    EXTRACTION: 'extraccion',
    BRIDGE: 'puente',
    DELETE: 'borrar'
  },

  // Secciones del diente
  SECTIONS: {
    TOP: 1,        // Superior
    RIGHT: 2,      // Distal/Derecha
    BOTTOM: 3,     // Inferior
    LEFT: 4,       // Mesial/Izquierda
    CENTER: 5      // Oclusal/Centro
  },

  // Configuración de líneas
  LINE: {
    NORMAL_WIDTH: 1,
    THICK_WIDTH: 3,
    BRIDGE_WIDTH: 4
  },

  // Fuente para números de diente
  FONT: {
    SIZE: '10pt',
    FAMILY: 'Calibri'
  }
};

// Hacer disponible globalmente si se usa sin módulos ES6
if (typeof window !== 'undefined') {
  window.OdontogramaConfig = OdontogramaConfig;
}
