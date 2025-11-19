# 🚀 Guía de Deploy en Render

## Paso 1: Preparar tu Repositorio GitHub

1. **Asegúrate de tener Git instalado** y tu proyecto inicializado:
```bash
git init
git add .
git commit -m "Preparar proyecto para deploy en Render"
```

2. **Crea un repositorio en GitHub:**
   - Ve a https://github.com/new
   - Nombre: `Portafolio` (o el que prefieras)
   - Público o Privado (ambos funcionan)
   - **NO** inicialices con README (ya tienes archivos)
   - Click en "Create repository"

3. **Conecta tu proyecto local con GitHub:**
```bash
git remote add origin https://github.com/Eliu2001/Portafolio.git
git branch -M main
git push -u origin main
```

---

## Paso 2: Crear Cuenta en Render

1. Ve a https://render.com
2. Click en **"Get Started for Free"**
3. Regístrate con tu cuenta de **GitHub** (más fácil para conectar repos)
4. Autoriza a Render para acceder a tus repositorios

---

## Paso 3: Crear Web Service en Render

1. Una vez en el dashboard, click en **"New +"** → **"Web Service"**

2. **Conectar repositorio:**
   - Busca tu repositorio `Portafolio`
   - Click en **"Connect"**

3. **Configurar el servicio:**
   - **Name:** `mi-portafolio` (o el nombre que quieras, será parte de la URL)
   - **Region:** `Oregon (US West)` (o el más cercano)
   - **Branch:** `main`
   - **Root Directory:** (dejar vacío)
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`

4. **Click en "Advanced"** (abajo) para configurar variables de entorno

---

## Paso 4: Configurar Variables de Entorno

En la sección **"Environment Variables"**, agrega las siguientes variables:

### Variables SMTP (Gmail):

| Key | Value | Ejemplo |
|-----|-------|---------|
| `SMTP_HOST` | `smtp.gmail.com` | smtp.gmail.com |
| `SMTP_PORT` | `587` | 587 |
| `SMTP_SECURE` | `false` | false |
| `SMTP_USER` | Tu email de Gmail | ejemplo@gmail.com |
| `SMTP_PASS` | Tu App Password de Gmail | abcd efgh ijkl mnop |
| `FROM_EMAIL` | Tu email de Gmail | ejemplo@gmail.com |
| `TO_EMAIL` | Email donde recibirás mensajes | ejemplo@gmail.com |

### ⚠️ IMPORTANTE: Obtener App Password de Gmail

1. Ve a tu cuenta de Google: https://myaccount.google.com/apppasswords
2. **Debes tener verificación en 2 pasos activada**
3. En "Seleccionar app" → Elige "Correo"
4. En "Seleccionar dispositivo" → Elige "Otro" → Escribe "Render"
5. Click en **"Generar"**
6. Copia la contraseña de 16 caracteres (sin espacios)
7. Pégala en `SMTP_PASS` en Render

---

## Paso 5: Deploy

1. Después de configurar las variables, click en **"Create Web Service"**
2. Render comenzará a:
   - ✅ Clonar tu repositorio
   - ✅ Ejecutar `npm install`
   - ✅ Ejecutar `npm start`
   - ✅ Asignar una URL pública

3. **El proceso tarda 2-5 minutos**. Verás los logs en tiempo real.

4. Cuando veas:
   ```
   🚀 Servidor iniciado en http://localhost:10000
   ✅ Servidor de correo listo para enviar mensajes
   ```
   ¡Tu sitio está LIVE! 🎉

---

## Paso 6: Acceder a tu Portafolio

Tu URL será algo como:
```
https://mi-portafolio.onrender.com
```

**Render te la mostrará en el dashboard.** Copia y compártela.

---

## 🔄 Actualizar tu Sitio (Deploy Automático)

Cada vez que hagas cambios y los subas a GitHub:

```bash
git add .
git commit -m "Descripción de cambios"
git push
```

**Render detectará el push y automáticamente:**
1. Descargará los cambios
2. Ejecutará `npm install`
3. Reiniciará el servidor

No necesitas hacer nada más. 🚀

---

## ⚠️ Limitaciones del Plan Gratuito

1. **Sleep Mode:** 
   - Después de 15 minutos sin tráfico, el servicio se "duerme"
   - Primera visita después del sleep tarda ~30 segundos en cargar
   - Visitas siguientes son instantáneas

2. **Horas mensuales:** 
   - 750 horas/mes gratis (suficiente para un portafolio)

3. **Dominio personalizado:**
   - Plan gratuito: `tu-sitio.onrender.com`
   - Plan de pago: puedes usar tu propio dominio

---

## 🐛 Solución de Problemas

### El deploy falla:
1. Revisa los logs en Render (pestaña "Logs")
2. Verifica que `package.json` tenga `"start": "node server.js"`
3. Asegúrate de que todas las dependencias estén en `package.json`

### El formulario no envía correos:
1. Verifica que las variables de entorno estén bien configuradas
2. Confirma que usaste App Password (no tu contraseña de Gmail)
3. Revisa los logs del servidor en Render

### El sitio está "dormido":
- Esto es normal en el plan gratuito
- Primera visita tarda ~30s en despertar
- Considera un "ping service" como https://uptimerobot.com (gratuito) para mantenerlo despierto

---

## 📝 Notas Finales

- ✅ Tu código está en GitHub (respaldado)
- ✅ Tu sitio está en producción (accesible públicamente)
- ✅ Los deploys son automáticos
- ✅ SSL/HTTPS incluido gratis
- ✅ Variables de entorno seguras (no expuestas en el código)

**¡Tu portafolio está listo para compartir!** 🎉
