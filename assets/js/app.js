/**
 * Odontograma Xpertik - Aplicación Principal
 * Punto de entrada y configuración inicial
 */

(function($) {
  'use strict';

  /**
   * Inicializa la aplicación cuando el DOM está listo
   */
  $(function() {
    // Inicializar componentes de jQuery UI
    initializeUIComponents();

    // Inicializar canvas
    initializeCanvases();

    // Configurar eventos de controles
    setupControlEvents();

    // Limpiar localStorage en carga inicial (para demostración)
    // Comentar esta línea si se desea persistencia entre sesiones
    OdontogramaStorage.clear();
  });

  /**
   * Inicializa los componentes de jQuery UI
   */
  function initializeUIComponents() {
    // Inicializar botones de radio con estilo jQuery UI
    $('#action-controls').buttonset();
    $('#delete-options').buttonset();
  }

  /**
   * Inicializa todos los canvas y sus contextos
   */
  function initializeCanvases() {
    const canvases = {
      base: document.getElementById('canvas-base'),
      data: document.getElementById('canvas-data'),
      highlight: document.getElementById('canvas-highlight'),
      bridge: document.getElementById('canvas-bridge')
    };

    // Verificar que todos los canvas existan
    if (!canvases.base || !canvases.data || !canvases.highlight || !canvases.bridge) {
      console.error('Error: No se pudieron encontrar todos los canvas');
      return;
    }

    // Inicializar el módulo de UI con los canvas
    OdontogramaUI.initialize(canvases);
  }

  /**
   * Configura los eventos de los controles de la interfaz
   */
  function setupControlEvents() {
    // Evento cuando cambia la acción seleccionada
    $('#action-controls').on('change', function() {
      const selectedAction = $("input[name='accion']:checked").val();

      // Mostrar/ocultar opciones de borrado según la acción
      if (selectedAction === OdontogramaConfig.ACTION_NAMES.DELETE) {
        $('#delete-options').show('blind', 500);
      } else {
        $('#delete-options').hide();
      }
    });
  }

  /**
   * Función de utilidad para exportar datos (opcional)
   * Puede ser llamada desde la consola para debugging
   */
  window.exportOdontogramaData = function() {
    const data = OdontogramaStorage.getAll();
    console.log('Marcaciones del Odontograma:', data);
    return data;
  };

  /**
   * Función de utilidad para importar datos (opcional)
   * Puede ser usada para restaurar un estado previo
   */
  window.importOdontogramaData = function(data) {
    if (!Array.isArray(data)) {
      console.error('Los datos deben ser un array');
      return false;
    }

    OdontogramaStorage.clear();

    data.forEach(item => {
      OdontogramaStorage.save(
        item.tooth,
        item.section,
        item.action,
        item.tooth2 || 0
      );
    });

    // Recargar la página para redibujar
    location.reload();
    return true;
  };

  /**
   * Manejo de errores globales
   */
  window.addEventListener('error', function(event) {
    console.error('Error en la aplicación:', event.error);
  });

  // Log de inicialización
  console.log('Odontograma Xpertik v2.0 - Inicializado');
  console.log('Usa exportOdontogramaData() para ver las marcaciones actuales');
  console.log('Usa importOdontogramaData(data) para restaurar marcaciones previas');

})(jQuery);
