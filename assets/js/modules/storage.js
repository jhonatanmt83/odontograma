/**
 * Módulo para manejo de almacenamiento en localStorage
 * Gestiona las marcaciones del odontograma
 */

const OdontogramaStorage = (function() {
  'use strict';

  /**
   * Guarda una marcación en localStorage
   * @param {number} tooth - Número del diente (1-32)
   * @param {number} section - Sección del diente (0 para diente completo, 1-5 para secciones)
   * @param {number} action - Código de acción (1: fractura, 2: restauración, 3: extracción, 4: puente)
   * @param {number} tooth2 - Segundo diente (solo para puentes)
   * @returns {boolean} - True si se guardó exitosamente, false si ya existía
   */
  function save(tooth, section, action, tooth2 = 0) {
    const key = generateKey(tooth, section, action, tooth2);

    if (localStorage.getItem(key)) {
      return false; // Ya existe
    }

    const data = [tooth, section, action, Date.now(), tooth2];
    localStorage.setItem(key, data.toString());
    return true;
  }

  /**
   * Genera la clave única para localStorage
   * @param {number} tooth - Número del diente
   * @param {number} section - Sección del diente
   * @param {number} action - Código de acción
   * @param {number} tooth2 - Segundo diente (para puentes)
   * @returns {string} - Clave única
   */
  function generateKey(tooth, section, action, tooth2 = 0) {
    if (action === OdontogramaConfig.ACTIONS.BRIDGE) {
      return `${tooth}-0-4-${tooth2}`;
    }
    return `${tooth}-${section}-${action}`;
  }

  /**
   * Elimina una marcación específica
   * @param {string} key - Clave de la marcación
   * @returns {boolean} - True si se eliminó exitosamente
   */
  function remove(key) {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
      return true;
    }
    return false;
  }

  /**
   * Obtiene todas las marcaciones
   * @returns {Array} - Array de marcaciones ordenadas por fecha
   */
  function getAll() {
    const markings = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const item = localStorage.getItem(key);

      if (item) {
        const data = item.split(',').map(val => parseInt(val, 10));
        markings.push({
          key: key,
          tooth: data[0],
          section: data[1],
          action: data[2],
          timestamp: data[3],
          tooth2: data[4]
        });
      }
    }

    // Ordenar por fecha ascendente
    return markings.sort((a, b) => a.timestamp - b.timestamp);
  }

  /**
   * Obtiene las marcaciones de un diente específico
   * @param {number} tooth - Número del diente
   * @returns {Array} - Array de marcaciones del diente
   */
  function getByTooth(tooth) {
    return getAll().filter(marking => marking.tooth === tooth);
  }

  /**
   * Obtiene la última marcación de una sección específica
   * @param {number} tooth - Número del diente
   * @param {number} section - Sección del diente
   * @returns {Object|null} - Objeto con la marcación o null
   */
  function getLastBySection(tooth, section) {
    const markings = getAll().filter(m =>
      m.tooth === tooth &&
      m.section === section &&
      (m.action === OdontogramaConfig.ACTIONS.FRACTURE ||
       m.action === OdontogramaConfig.ACTIONS.RESTORATION)
    );

    return markings.length > 0 ? markings[markings.length - 1] : null;
  }

  /**
   * Obtiene la última marcación de extracción de un diente
   * @param {number} tooth - Número del diente
   * @returns {Object|null} - Objeto con la marcación o null
   */
  function getLastExtraction(tooth) {
    const markings = getAll().filter(m =>
      m.tooth === tooth &&
      m.action === OdontogramaConfig.ACTIONS.EXTRACTION
    );

    return markings.length > 0 ? markings[markings.length - 1] : null;
  }

  /**
   * Obtiene todos los puentes de una sección (fila)
   * @param {number} section - 1 para fila superior, 2 para inferior
   * @returns {Array} - Array de puentes
   */
  function getBridgesByRow(section) {
    return getAll().filter(m => {
      if (m.action !== OdontogramaConfig.ACTIONS.BRIDGE) {
        return false;
      }

      if (section === 1) {
        return m.tooth < 17;
      } else {
        return m.tooth > 16;
      }
    });
  }

  /**
   * Limpia todo el localStorage
   */
  function clear() {
    localStorage.clear();
  }

  /**
   * Cuenta el total de marcaciones
   * @returns {number} - Total de marcaciones
   */
  function count() {
    return localStorage.length;
  }

  // API pública
  return {
    save,
    remove,
    getAll,
    getByTooth,
    getLastBySection,
    getLastExtraction,
    getBridgesByRow,
    clear,
    count
  };
})();

// Hacer disponible globalmente
if (typeof window !== 'undefined') {
  window.OdontogramaStorage = OdontogramaStorage;
}
