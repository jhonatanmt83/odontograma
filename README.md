# Odontograma Xpertik

Aplicación web interactiva para la creación y gestión de odontogramas dentales utilizando HTML5 Canvas.

[![Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://jhonatanmt83.github.io/odontograma)
[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/jhonatanmt83/odontograma)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## 🌐 Demo en Vivo

**[Ver Demo →](https://jhonatanmt83.github.io/odontograma)**

Prueba la aplicación directamente en tu navegador sin necesidad de instalación.

## Descripción

Este proyecto es una herramienta digital para profesionales de la odontología que permite registrar y visualizar el estado dental de los pacientes mediante un odontograma interactivo. La aplicación permite marcar diferentes condiciones dentales en una representación visual de 32 dientes.

**Versión 2.0** - Actualizado en 2025 con arquitectura modular, librerías actualizadas y mejores prácticas de desarrollo.

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

## Instalación

### Requisitos Previos

- Navegador web moderno con soporte para HTML5 Canvas
- JavaScript habilitado
- Node.js y npm (opcional, solo para desarrollo local con servidor)

### Pasos de Instalación

**Opción 1: Uso directo (recomendado)**
1. Clonar o descargar el repositorio
2. Abrir el archivo `index.html` directamente en tu navegador

**Opción 2: Con servidor de desarrollo**
1. Clonar o descargar el repositorio
2. Instalar dependencias de desarrollo:
```bash
npm install
```
3. Iniciar servidor:
```bash
npm start
```

Esto abrirá automáticamente la aplicación en tu navegador en `http://localhost:8080`

## Uso

1. Abrir el archivo `index.html` en cualquier navegador web
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
├── index.html                    # Página principal
├── package.json                  # Dependencias y scripts npm
├── .gitignore                    # Archivos ignorados por git
├── .nojekyll                     # Configuración para GitHub Pages
├── README.md                     # Este archivo
├── assets/
│   ├── css/
│   │   └── styles.css           # Estilos principales
│   ├── js/
│   │   ├── app.js               # Punto de entrada de la aplicación
│   │   └── modules/
│   │       ├── config.js        # Configuración y constantes
│   │       ├── storage.js       # Manejo de localStorage
│   │       ├── odontograma.js   # Funciones de renderizado
│   │       └── ui.js            # Manejo de interacciones
│   └── images/
│       └── cur438.cur           # Cursor personalizado
├── node_modules/                # Dependencias npm (solo desarrollo local)
├── css/                         # Archivos legacy (compatibilidad v1.0)
└── js/                          # Archivos legacy (compatibilidad v1.0)
```

## Tecnologías Utilizadas

- **HTML5 Canvas**: Para el renderizado gráfico del odontograma
- **JavaScript ES6+**: Lógica de la aplicación con patrones modernos
- **jQuery 3.7.1**: Manipulación del DOM y utilidades (CDN)
- **jQuery UI 1.13.2**: Componentes de interfaz (botones de radio personalizados) (CDN)
- **localStorage**: Almacenamiento persistente de datos en el navegador
- **npm**: Gestión de dependencias (solo para desarrollo local)

## Arquitectura Técnica

### Sistema de Canvas por Capas

La aplicación utiliza un sistema de 4 capas de canvas superpuestas (z-index 1-4):

1. **Canvas Base** (`canvas-base`): Contornos y números de los dientes (1-32)
2. **Canvas de Datos** (`canvas-data`): Marcaciones (fracturas, restauraciones, extracciones)
3. **Canvas de Resaltado** (`canvas-highlight`): Resaltado visual al pasar el cursor (hover)
4. **Canvas de Puentes** (`canvas-bridge`): Conexiones entre dientes

### Módulos JavaScript

- **config.js**: Constantes de configuración (dimensiones, colores, códigos de acción)
- **storage.js**: API para manejo de localStorage con patrón Module
- **odontograma.js**: Funciones de renderizado en canvas
- **ui.js**: Manejo de eventos e interacciones del usuario
- **app.js**: Inicialización y orquestación de la aplicación

### Patrones de Diseño

- **Module Pattern**: Encapsulación de funcionalidades con API pública
- **Separation of Concerns**: Separación clara entre datos, vista y lógica
- **Event-Driven**: Sistema de eventos para interacciones del usuario

## Funciones de Utilidad

La aplicación expone dos funciones en la consola del navegador para desarrollo y depuración:

```javascript
// Exportar todas las marcaciones actuales
exportOdontogramaData()

// Importar marcaciones (restaurar un estado previo)
importOdontogramaData(data)
```

## Scripts Disponibles

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start

# Iniciar servidor (alias)
npm run dev
```

## Limitaciones Conocidas

- Los datos se almacenan únicamente en el navegador local (no hay sincronización en la nube)
- No incluye funcionalidad de exportación o impresión de reportes
- No hay sistema de múltiples pacientes o historial clínico
- La interfaz está optimizada para pantallas de escritorio

## Roadmap Futuro

- [ ] Exportación de datos a PDF
- [ ] Sistema de múltiples pacientes
- [ ] Sincronización con backend
- [ ] Historial de cambios por paciente
- [ ] Modo responsive para tablets y móviles
- [ ] Soporte para odontograma infantil (20 dientes)

## Licencia

Este proyecto es de código abierto para uso educativo y profesional.

## Contribuciones

Las contribuciones son bienvenidas. Para mejoras o reportes de errores, por favor crear un issue en el repositorio.

## Despliegue en GitHub Pages

Este proyecto está configurado para desplegarse automáticamente en GitHub Pages. Para configurar tu propia instancia:

1. **Fork o clona el repositorio** en tu cuenta de GitHub

2. **Configura GitHub Pages:**
   - Ve a Settings → Pages en tu repositorio
   - En "Source", selecciona la rama `main` (o `master`)
   - En "Folder", selecciona `/ (root)`
   - Guarda los cambios

3. **Espera unos minutos** y tu sitio estará disponible en:
   ```
   https://[tu-usuario].github.io/[nombre-repositorio]
   ```

4. **Actualiza el package.json** (opcional):
   ```json
   "homepage": "https://[tu-usuario].github.io/[nombre-repositorio]"
   ```

**Nota:** El archivo `.nojekyll` está incluido para asegurar que GitHub Pages procese correctamente todos los archivos.

## Historial de Versiones

### v2.0.0 (2025)
- Actualización de jQuery 1.7.2 → 3.7.1
- Actualización de jQuery UI 1.8.13 → 1.13.2
- Reorganización modular del código JavaScript
- Separación de responsabilidades (config, storage, renderer, ui)
- Implementación de Module Pattern
- Renombrado de IDs a nombres semánticos (canvas-base, action-controls, etc.)
- Uso de librerías desde CDN para compatibilidad con GitHub Pages
- Gestión de dependencias con npm
- CSS extraído a archivos separados
- Configuración para GitHub Pages con .nojekyll
- Documentación completa actualizada

### v1.0.0 (2014)
- Versión inicial del proyecto
- Funcionalidades básicas de odontograma

---

**Desarrollado por Xpertik** :)
