# 📱 Mi Pokedex App (Práctica 6)

¡Bienvenido a mi proyecto de Pokedex! Esta es una aplicación móvil híbrida creada con **Ionic** y **React** que funciona como una Pokedex real.

## ✨ ¿Qué hace esta App?
- **Pokedex**: Puedes ver una lista de los primeros 151 Pokémon con sus fotos y descripciones reales.
- **Bolsa de Objetos**: Una lista de objetos del juego con detalles de para qué sirven.
- **Controles Reales**: La aplicación se maneja usando los botones de la carcasa (la cruceta y los botones digitales).
- **Datos Reales**: Todo se conecta a la [PokeAPI](https://pokeapi.co/) para obtener información actualizada.

## 🕹️ ¿Cómo se usan los controles?
- **Cruceta Negra (D-Pad)**: Úsala para moverte hacia ARRIBA o ABAJO en las listas y el menú.
- **Botón Azul Grande**: Es el botón de "Aceptar" o "A". Sirve para entrar a una opción del menú.
- **Botón Rojo Pequeño**: Es el botón de "Inicio/Atrás". Úsalo para regresar al menú principal desde cualquier pantalla.

## 🚀 ¿Cómo instalar y correr el proyecto?

### 1. Preparación
Primero, descarga las piezas (dependencias) necesarias:
```bash
npm install
```

### 2. Ver en la computadora
Para abrir la App en tu navegador y empezar a probarla:
```bash
npm run dev
```

### 3. Ver en el celular (WiFi)
Si quieres verla en tu celular rápido (estando en el mismo WiFi):
```bash
npm run dev -- --host
```
*Luego abre en el navegador de tu celular la dirección IP que te dé la terminal.*

## 📲 ¿Cómo ver los cambios en Android?

Si realizas cambios en el código y quieres verlos reflejados en tu celular o emulador de Android Studio, debes sincronizar el proyecto:

1. **Compila la web**:
   ```bash
   npm run build
   ```
2. **Sincroniza con Capacitor**:
   ```bash
   npx cap sync android
   ```
3. **Ejecuta en Android Studio**: Haz clic en el botón **Run ▶️** en el IDE.

## ⚠️ Solución de Problemas Comunes

### Error: "Your project path contains non-ASCII characters"
Si al compilar en Windows obtienes un error porque tu carpeta contiene acentos (ej: `Móviles`), la solución ya está aplicada en el archivo `android/gradle.properties`:

Asegúrate de que esta línea esté presente:
```properties
android.overridePathCheck=true
```

## 🛠️ Tecnologías usadas
- **Ionic Framework**: Para los componentes móviles.
- **React**: Para la lógica de la aplicación.
- **Vite**: Para que todo cargue súper rápido.
- **Capacitor**: Para convertir la web en App nativa.
- **PokeAPI**: La base de datos de Pokémon.

---
*Hecho por Eduardo Naal - Universidad Autónoma de Campeche*
