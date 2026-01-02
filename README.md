# 👣 Contador de Pasos - PWA

Una aplicación web progresiva (PWA) moderna para contar tus pasos diarios con estilo y funcionalidad completa.

## ✨ Características

✅ **Interfaz moderna y responsiva** - Funciona perfectamente en móviles y desktop
✅ **Contador de pasos** - Agrega pasos manualmente
✅ **Cálculo de calorías** - Estimación automática de calorías quemadas
✅ **Distancia recorrida** - Calcula en kilómetros
✅ **Barra de progreso** - Visualiza tu avance hacia la meta diaria
✅ **Historial** - Registro de todos tus pasos
✅ **Configuración personalizada** - Ajusta la meta diaria y pasos por km
✅ **Funcionamiento offline** - Usa Service Worker para trabajar sin conexión
✅ **Instalable** - Instálalo como app nativa en tu dispositivo
✅ **Almacenamiento local** - Tus datos se guardan automáticamente

## 📱 Cómo Usar

### Abrir la app
1. Abre `index.html` en tu navegador
2. En dispositivos móviles, verás un botón "📱 Instalar App"

### Agregar pasos
- **Botón rápido**: Haz clic en "➕ Agregar 10 pasos"
- **Pasos personalizados**: Haz clic en "✏️ Agregar pasos personalizados" e ingresa la cantidad

### Configurar
En la sección "⚙️ Configuración" puedes:
- Cambiar la meta diaria (pasos)
- Ajustar pasos por kilómetro

### Otros botones
- **🔄 Resetear Día**: Limpia los datos de hoy
- **⚠️ Eliminar Todo**: Borra toda la información guardada

## 🚀 Instalar como PWA

### En Android (Chrome):
1. Abre la app en Chrome
2. Toca el botón "📱 Instalar App" o usa el menú (⋮) → "Instalar aplicación"
3. ¡Listo! Aparecerá en tu pantalla de inicio

### En iPhone (Safari):
1. Abre en Safari
2. Toca el botón de compartir (↗️)
3. Selecciona "Añadir a pantalla de inicio"
4. Dale un nombre y ¡listo!

### En Desktop (Chrome/Edge):
1. Abre la app
2. Haz clic en el icono de instalación (⊞) en la barra de direcciones
3. O usa el menú → "Instalar aplicación"

## 📊 Estadísticas

La app calcula automáticamente:
- **Pasos totales**: Contador principal
- **Calorías**: ~0.04 calorías por paso
- **Distancia**: Basado en pasos por km (configurable)
- **Progreso**: Porcentaje hacia la meta diaria

## 💾 Almacenamiento de datos

- Los datos se guardan en **localStorage** del navegador
- Se separan por días automáticamente
- Los datos persisten incluso sin conexión
- Se sincronizan cuando vuelva la conexión

## 🛠️ Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Diseño responsivo y animaciones
- **JavaScript Vanilla** - Sin dependencias
- **Service Worker** - Funcionamiento offline
- **Web App Manifest** - Para instalación como PWA

## 📝 Estructura de archivos

```
contador-de-pasos/
├── index.html          # Archivo principal
├── manifest.json       # Configuración PWA
├── service-worker.js   # Worker para offline
├── css/
│   └── style.css       # Estilos
└── js/
    └── app.js          # Lógica principal
```

## ⚙️ Configuración técnica

### manifest.json
Define cómo se ve la app cuando está instalada:
- Nombre y descripción
- Color de tema (verde #4CAF50)
- Iconos para diferentes dispositivos
- Modo de visualización (standalone)

### service-worker.js
Proporciona:
- Caché de archivos para offline
- Sincronización de datos
- Manejo de fetch requests

## 🎨 Tema de colores

- **Principal**: Gradiente morado (#667eea - #764ba2)
- **Secundario**: Verde (#4CAF50 - #45a049)
- **Acentos**: Naranja, rojo, cian

## 📈 Mejoras futuras

- Integración con sensores de acelerómetro
- Historial semanal/mensual
- Gráficos de progreso
- Notificaciones motivacionales
- Sincronización con cloud
- Modo oscuro
- Idiomas adicionales

## 📄 Licencia

Libre para usar y modificar

---

**Versión**: 1.0  
**Última actualización**: 2 de Enero de 2026
