// Función para formatear URLs (por ejemplo Imgur) usando el proxy de images.weserv.nl
const formatImgurUrl = (url) => {
    if (!url) return 'https://via.placeholder.com/300x300?text=No+Image';
    // Si es una ruta local (empieza con img/ o ./ o /), devolverla sin procesar
    if (url.startsWith('img/') || url.startsWith('./') || url.startsWith('/') || !url.startsWith('http')) {
        return url;
    }
    return `https://images.weserv.nl/?url=${encodeURIComponent(url.replace(/^https?:\/\//, ''))}`;
};

$(document).ready(function() {
    // 1. Animación de entrada para la sección hero (fadeIn secuencial)
    var $heroItems = $(".hero-content > *");
    $heroItems.hide();
    $heroItems.each(function(i) {
        $(this).delay(250*i).fadeIn(700);
    });

    // 2. Scroll suave mejorado para enlaces de navegación
    $('.navbar-collapse a.nav-link, a[href^="#"]').on('click', function(e) {
        const href = $(this).attr('href');
        if (href && href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            const target = $(href);
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 800, 'swing');
            }
        }
        $('.navbar-collapse').collapse('hide');
    });

    // 2.5. Navbar inteligente: se oculta al bajar, aparece al subir
    let lastScrollTop = 0;
    let scrollThreshold = 100; // Píxeles antes de activar el efecto
    const $navbar = $('.navbar-custom');
    
    $(window).on('scroll', function() {
        const scrollTop = $(this).scrollTop();
        
        if (scrollTop > scrollThreshold) {
            if (scrollTop > lastScrollTop) {
                // Scrolling hacia abajo - ocultar navbar
                $navbar.addClass('navbar-hidden').removeClass('navbar-visible');
            } else {
                // Scrolling hacia arriba - mostrar navbar
                $navbar.removeClass('navbar-hidden').addClass('navbar-visible');
            }
        } else {
            // En la parte superior - siempre visible
            $navbar.removeClass('navbar-hidden navbar-visible');
        }
        
        lastScrollTop = scrollTop;
    });

    // 3. Botón Proyectos animado (tamaño y color con jQuery)
    $('#btn-project').on('mouseenter focus', function() {
        $(this).stop().animate({ fontSize: '2.5rem', paddingLeft: '2.5rem', paddingRight: '2.5rem' }, 180)
               .css({ backgroundColor: '#8A784E', color: '#E7EFC7' });
    }).on('mouseleave blur', function() {
        $(this).stop().animate({ fontSize: '2rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }, 180)
               .css({ backgroundColor: '#AEC8A4', color: '#3B3B1A' });
    });

    // 3. Cerrar navegación móvil al hacer clic en un enlace (smooth scroll)
    $('.navbar-collapse a.nav-link').on('click', function() {
        $('.navbar-collapse').collapse('hide');
    });

    // Datos de ejemplo de proyectos (puedes reemplazarlos por datos reales o por fetch)
    const projects = [
        {
            title: 'App Web Librería',
            description: 'Aplicación web completa de e-commerce especializada en la venta de libros. Cuenta con un sistema de gestión de inventario robusto que permite a usuarios administradores realizar operaciones CRUD (crear, leer, actualizar, eliminar) sobre el catálogo de productos. Los clientes pueden navegar por diferentes categorías, buscar libros, agregar productos al carrito de compras y completar transacciones de forma segura. La interfaz de administración incluye dashboard con estadísticas, gestión de pedidos y control de stock en tiempo real. Desarrollado utilizando HTML, CSS, Bootstrap para el frontend, Node.js con Express para el backend, Sequelize como ORM, Handlebars como motor de plantillas y PostgreSQL como base de datos. Proyecto final del bootcamp de Full Stack JavaScript de Coding Dojo / Talento Digital.',
            img: 'img/Libreria.png',
            url: 'https://github.com/Eliu2001/libreria'
        }
    ];

    // Renderizar tarjetas en el grid de proyectos (diseño con hover overlay)
    const $grid = $('#projects-grid');
    $grid.empty();
    projects.forEach(function(p) {
        const card = `
            <div class="col-12 mb-5">
                <div class="project-card-hover" data-url="${p.url}">
                    <div class="project-image-wrapper">
                        <img src="${formatImgurUrl(p.img)}" class="project-main-img" alt="${p.title}">
                        <div class="project-overlay">
                            <div class="overlay-content">
                                <p class="overlay-description">${p.description}</p>
                                <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="btn btn-carousel mt-4" onclick="event.stopPropagation()">Ver Proyecto</a>
                            </div>
                        </div>
                    </div>
                    <div class="project-title-bar">
                        <h4 class="project-card-title">${p.title}</h4>
                    </div>
                </div>
            </div>
        `;
        $grid.append(card);
    });

    // Animación hover para mostrar overlay con descripción
    $grid.on('mouseenter', '.project-card-hover', function() {
        $(this).find('.project-overlay').css({opacity: 1, visibility: 'visible'});
        $(this).find('.project-main-img').css({transform: 'scale(1.05)'});
    }).on('mouseleave', '.project-card-hover', function() {
        $(this).find('.project-overlay').css({opacity: 0, visibility: 'hidden'});
        $(this).find('.project-main-img').css({transform: 'scale(1)'});
    });

    // Click en toda la tarjeta para ir al proyecto
    $grid.on('click', '.project-card-hover', function(e) {
        // Si el click fue en el botón, no hacer nada (el botón maneja su propio click)
        if ($(e.target).hasClass('btn-carousel') || $(e.target).closest('.btn-carousel').length) {
            return;
        }
        const url = $(this).data('url');
        if (url && url !== '#') {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    });

    // Cambiar cursor al pasar sobre la tarjeta
    $grid.on('mouseenter', '.project-card-hover', function() {
        const url = $(this).data('url');
        if (url && url !== '#') {
            $(this).css('cursor', 'pointer');
        }
    });

    // ===== MANEJO DEL FORMULARIO DE CONTACTO =====
    const $form = $('#contact-form');
    const $status = $('#contact-status');
    const $submitBtn = $('#contact-submit');

    if ($form.length) {
        $form.on('submit', async function(e) {
            e.preventDefault();
            
            // Limpiar estado previo
            $status.removeClass('success error').text('Enviando mensaje...');
            $submitBtn.prop('disabled', true);

            const formData = {
                name: $('#contact-name').val().trim(),
                email: $('#contact-email').val().trim(),
                subject: $('#contact-subject').val().trim(),
                message: $('#contact-message').val().trim(),
                access_key: "0c410403-d71e-4f9d-854d-53bad58d9496",
                botcheck: $('input[name="botcheck"]').is(':checked') // Honeypot anti-spam
            };

            // Validación básica
            if (!formData.name || !formData.email || !formData.message) {
                $status.addClass('error').text('Por favor completa todos los campos obligatorios.');
                $submitBtn.prop('disabled', false);
                return;
            }
            
            // Verificar honeypot: si está marcado, es un bot
            if (formData.botcheck === true) {
                console.warn('Bot detectado por honeypot');
                // Simular éxito para el bot, pero no enviar
                $status.addClass('success').text('¡Mensaje enviado con éxito!');
                $form[0].reset();
                $submitBtn.prop('disabled', false);
                return;
            }

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    $status.addClass('success').text('¡Mensaje enviado con éxito! Te responderé pronto.');
                    $form[0].reset();
                } else {
                    $status.addClass('error').text(result.message || 'Error al enviar el mensaje. Intenta más tarde.');
                    console.error('Error:', result);
                }
            } catch (error) {
                console.error('Error completo:', error);
                $status.addClass('error').text('Error de conexión. Por favor intenta más tarde.');
            } finally {
                $submitBtn.prop('disabled', false);
            }
        });
    }
});