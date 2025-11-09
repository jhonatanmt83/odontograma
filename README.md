# Odontograma FTD

Aplicación web interactiva para la creación y gestión de odontogramas dentales utilizando HTML5 Canvas.

## Descripción

Este proyecto es una herramienta digital para profesionales de la odontología que permite registrar y visualizar el estado dental de los pacientes mediante un odontograma interactivo. La aplicación permite marcar diferentes condiciones dentales en una representación visual de 32 dientes.

## Características

### Tipos de Marcaciones

La aplicación permite registrar las siguientes condiciones dentales:

- **Fracturas** (rojo): Marcar secciones específicas del diente con fracturas
- **Restauraciones** (azul): Indicar áreas restauradas o con obturaciones
- **Extracciones** (negro): Marcar dientes extraídos con una X
- **Puentes**: Conectar dientes con prótesis fijas
- **Borrar**: Eliminar marcaciones previas por sección o diente completo

### Funcionalidades Interactivas

- **Selección por secciones**: Cada diente se divide en 5 secciones (superior, derecha, inferior, izquierda y centro)
- **Visualización en tiempo real**: Las marcaciones se muestran instantáneamente sobre el odontograma
- **Hover visual**: Resaltado amarillo al pasar el cursor sobre secciones o dientes
- **Persistencia de datos**: Las marcaciones se guardan automáticamente en el navegador (localStorage)
- **Historial temporal**: Sistema de timestamps para gestionar múltiples marcaciones

## Requisitos

- Navegador web moderno con soporte para HTML5 Canvas
- JavaScript habilitado
- No requiere instalación ni servidor

## Uso

1. Abrir el archivo `odontograma.html` en cualquier navegador web
2. Seleccionar el tipo de acción deseada (Fractura, Restauración, Borrar, Extracción o Puente)
3. Hacer clic en la sección del diente correspondiente
4. Las marcaciones se guardan automáticamente

### Acciones Específicas

**Marcar Fracturas o Restauraciones:**
1. Seleccionar "Fractura" o "Restauración"
2. Hacer clic en la sección específica del diente
3. La sección se coloreará en rojo (fractura) o azul (restauración)

**Marcar Extracciones:**
1. Seleccionar "Extracción"
2. Hacer clic en cualquier parte del diente
3. Aparecerá una X sobre el diente completo

**Crear Puentes:**
1. Seleccionar "Puente"
2. Hacer clic en el primer diente
3. Hacer clic en el segundo diente
4. Se dibujará una línea conectando ambos dientes

**Borrar Marcaciones:**
1. Seleccionar "Borrar"
2. Elegir si desea borrar por "Sección" o "Diente" completo
3. Hacer clic en la sección o diente a borrar

## Estructura del Proyecto

```
odontograma/
├── odontograma.html          # Archivo principal de la aplicación
├── js/
│   ├── jquery-1.7.2.min.js           # jQuery 1.7.2
│   └── jquery-ui-1.8.13.custom.min.js # jQuery UI 1.8.13
├── css/
│   └── custom-theme/
│       ├── jquery-ui-1.8.13.custom.css # Estilos de jQuery UI
│       └── images/                      # Recursos gráficos del tema
└── cur438.cur                # Cursor personalizado
```

## Tecnologías Utilizadas

- **HTML5 Canvas**: Para el renderizado gráfico del odontograma
- **JavaScript**: Lógica de la aplicación y manejo de eventos
- **jQuery 1.7.2**: Manipulación del DOM y utilidades
- **jQuery UI 1.8.13**: Componentes de interfaz (botones de radio personalizados)
- **localStorage**: Almacenamiento persistente de datos en el navegador

## Arquitectura Técnica

La aplicación utiliza un sistema de 4 capas de canvas superpuestas:

1. **Capa Base**: Contornos y números de los dientes (1-32)
2. **Capa de Datos**: Marcaciones de fracturas, restauraciones y extracciones
3. **Capa de Interacción**: Resaltado visual al pasar el cursor
4. **Capa de Puentes**: Conexiones entre dientes

Cada diente mide 40x40 píxeles y está dividido geométricamente en 5 secciones triangulares/cuadradas para permitir marcaciones precisas.

## Limitaciones Conocidas

- Los datos se almacenan únicamente en el navegador local (no hay sincronización en la nube)
- No incluye funcionalidad de exportación o impresión de reportes
- No hay sistema de múltiples pacientes o historial clínico
- La interfaz está optimizada para pantallas de escritorio

## Licencia

Este proyecto es de código abierto para uso educativo y profesional.

## Contribuciones

Las contribuciones son bienvenidas. Para mejoras o reportes de errores, por favor crear un issue en el repositorio.

---

**Desarrollado por Xpertik** :)
