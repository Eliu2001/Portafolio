# Portafolio con Formulario de Contacto

Portafolio personal de Germain Sepúlveda con formulario de contacto funcional usando Node.js, Express y Nodemailer.

## 🚀 Características

- Diseño responsive con Bootstrap
- Scroll suave entre secciones
- Formulario de contacto funcional que envía correos
- Backend Node.js con Express
- Validación de formularios
- Estilos personalizados con paleta de colores

## 📋 Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn
- Una cuenta de correo para SMTP (Gmail, Outlook, etc.)

## 🔧 Instalación

1. **Instalar dependencias**

```powershell
npm install
```

2. **Configurar variables de entorno**

Copia el archivo `.env.example` a `.env`:

```powershell
Copy-Item .env.example .env
```

3. **Editar el archivo `.env` con tus credenciales SMTP**

Para Gmail (recomendado para pruebas):
- Ve a tu cuenta de Google
- Activa la verificación en 2 pasos
- Genera una "Contraseña de aplicación" en https://myaccount.google.com/apppasswords
- Usa esa contraseña en `SMTP_PASS`

Ejemplo de configuración para Gmail:

```env
PORT=3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-email@gmail.com
SMTP_PASS=xxxx-xxxx-xxxx-xxxx
FROM_EMAIL=tu-email@gmail.com
TO_EMAIL=tu-email@gmail.com
```

## ▶️ Ejecutar el Proyecto

**Modo producción:**

```powershell
npm start
```

**Modo desarrollo (con auto-recarga):**

```powershell
npm run dev
```

El servidor se iniciará en `http://localhost:3000`

## 📧 Uso del Formulario de Contacto

1. Abre tu navegador en `http://localhost:3000`
2. Navega a la sección "Contacto"
3. Completa el formulario con:
   - Nombre
   - Correo electrónico
   - Asunto
   - Mensaje
4. Haz clic en "Enviar Mensaje"
5. Recibirás el correo en la dirección configurada en `TO_EMAIL`

## 🎨 Estructura del Proyecto

```
Portafolio/
├── index.html          # Página principal
├── styles.css          # Estilos personalizados
├── script.js           # JavaScript del cliente
├── server.js           # Servidor Express
├── package.json        # Dependencias del proyecto
├── .env.example        # Ejemplo de configuración
├── .env               # Configuración (NO subir a Git)
└── img/               # Imágenes del portafolio
```

## 🔒 Seguridad

- **NUNCA** subas el archivo `.env` a Git/GitHub
- Usa contraseñas de aplicación, no tu contraseña principal
- En producción, considera usar servicios como SendGrid o Mailgun
- Añade rate limiting para prevenir spam

## 🐛 Solución de Problemas

**Error: "Error en configuración SMTP"**
- Verifica que las credenciales en `.env` sean correctas
- Para Gmail, asegúrate de usar una App Password
- Verifica que la verificación en 2 pasos esté activada

**Error: "Error de conexión"**
- Verifica que el servidor esté corriendo (`npm start`)
- Comprueba que estés usando `http://localhost:3000`
- Revisa la consola del navegador para más detalles

**El correo no llega**
- Revisa la carpeta de spam
- Verifica que `TO_EMAIL` esté configurado correctamente
- Revisa los logs del servidor en la terminal

## 📝 Notas

- El formulario usa `fetch` API para enviar datos
- Los estilos están optimizados para la paleta de colores del portafolio
- El servidor también sirve los archivos estáticos del frontend

## 🚀 Deploy en Producción

Para deploy en servicios como Heroku, Render, o Railway:

1. Asegúrate de que `.env` esté en `.gitignore`
2. Configura las variables de entorno en el panel del servicio
3. El servidor escucha en el puerto definido por `process.env.PORT`

## 📞 Soporte

Si tienes problemas, revisa:
- La consola del navegador (F12)
- Los logs del servidor en la terminal
- La configuración del archivo `.env`

---

Desarrollado por **Germain Sepúlveda**
