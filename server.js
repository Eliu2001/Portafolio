const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Sirve los archivos estáticos del portafolio

const PORT = process.env.PORT || 3000;

// Configurar transporte de correo con Nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465', // true para puerto 465, false para 587
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    tls: {
        rejectUnauthorized: false // Solución para algunos entornos de hosting
    },
    connectionTimeout: 10000, // 10 segundos timeout
    greetingTimeout: 5000
});

// Verificar configuración de correo al iniciar
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ Error en configuración SMTP:', error.message);
        console.log('⚠️  El servidor funcionará pero el envío de correos fallará.');
    } else {
        console.log('✅ Servidor de correo listo para enviar mensajes');
    }
});

// Endpoint para recibir mensajes de contacto
app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body || {};

    // Validación
    if (!name || !email || !message) {
        return res.status(400).json({ 
            error: 'Faltan campos obligatorios. Por favor completa nombre, email y mensaje.' 
        });
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ 
            error: 'El formato del correo electrónico no es válido.' 
        });
    }

    const mailOptions = {
        from: process.env.FROM_EMAIL || process.env.SMTP_USER,
        to: process.env.TO_EMAIL,
        replyTo: email,
        subject: subject ? `[Portafolio] ${subject}` : '[Portafolio] Nuevo mensaje de contacto',
        text: `
Nuevo mensaje de contacto desde tu portafolio

Nombre: ${name}
Email: ${email}
Asunto: ${subject || 'Sin asunto'}

Mensaje:
${message}
        `,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
                <div style="background-color: #AEC8A4; padding: 20px; border-radius: 10px 10px 0 0;">
                    <h2 style="color: #3B3B1A; margin: 0;">Nuevo Mensaje de Contacto</h2>
                </div>
                <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px;">
                    <p style="margin-bottom: 20px; color: #666;">Has recibido un nuevo mensaje desde tu portafolio:</p>
                    
                    <div style="margin-bottom: 15px;">
                        <strong style="color: #8A784E;">Nombre:</strong>
                        <p style="margin: 5px 0; color: #3B3B1A;">${name}</p>
                    </div>
                    
                    <div style="margin-bottom: 15px;">
                        <strong style="color: #8A784E;">Email:</strong>
                        <p style="margin: 5px 0; color: #3B3B1A;">${email}</p>
                    </div>
                    
                    <div style="margin-bottom: 15px;">
                        <strong style="color: #8A784E;">Asunto:</strong>
                        <p style="margin: 5px 0; color: #3B3B1A;">${subject || 'Sin asunto'}</p>
                    </div>
                    
                    <div style="margin-bottom: 15px;">
                        <strong style="color: #8A784E;">Mensaje:</strong>
                        <p style="margin: 5px 0; color: #3B3B1A; white-space: pre-wrap;">${message}</p>
                    </div>
                    
                    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
                    
                    <p style="color: #999; font-size: 12px; margin: 0;">
                        Puedes responder directamente a este correo para contactar a ${name}.
                    </p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`📧 Mensaje enviado desde: ${email}`);
        res.json({ 
            ok: true, 
            message: 'Mensaje enviado correctamente' 
        });
    } catch (error) {
        console.error('❌ Error enviando correo:', error.message);
        console.error('Detalles completos:', error);
        
        let errorMessage = 'Error al enviar el mensaje.';
        
        if (error.code === 'EAUTH') {
            errorMessage = 'Error de autenticación SMTP. Verifica las credenciales.';
        } else if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
            errorMessage = 'No se pudo conectar al servidor de correo.';
        } else if (error.responseCode === 535) {
            errorMessage = 'Credenciales SMTP inválidas. Verifica el App Password.';
        } else if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            errorMessage = 'Variables de entorno SMTP no configuradas.';
        }
        
        res.status(500).json({ 
            error: errorMessage,
            details: error.message
        });
    }
});

// Ruta para servir el index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`\n🚀 Servidor iniciado en http://localhost:${PORT}`);
    console.log(`📧 Correos se enviarán a: ${process.env.TO_EMAIL || 'NO CONFIGURADO'}\n`);
});
