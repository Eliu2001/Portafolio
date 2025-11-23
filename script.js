// Función para formatear URLs (por ejemplo Imgur) usando el proxy de images.weserv.nl
const formatImgurUrl = (url) => {
    if (!url) return 'https://via.placeholder.com/300x300?text=No+Image';
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
            img: 'https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_1280.jpg',
            url: '#'
        },
        {
            title: 'Centro de salud mental',
            description: 'Centro de salud mental, sonoroterapia y Masoterapia',
            img: 'https://cdn.pixabay.com/photo/2022/10/01/17/22/lotus-7491929_1280.jpg',
            url: '#'
        },
        {
            title: 'Noticiero Combarbalá',
            description: 'Noticiero general de la comuna de Combarbalá',
            img: 'https://cdn.pixabay.com/photo/2014/05/21/22/28/old-newspaper-350376_640.jpg',
            url: '#'
        }
    ];

    // Renderizar tarjetas en el grid de proyectos (diseño con hover overlay)
    const $grid = $('#projects-grid');
    $grid.empty();
    projects.forEach(function(p) {
        const card = `
            <div class="col-12 mb-5">
                <div class="project-card-hover">
                    <div class="project-image-wrapper">
                        <img src="${formatImgurUrl(p.img)}" class="project-main-img" alt="${p.title}">
                        <div class="project-overlay">
                            <div class="overlay-content">
                                <p class="overlay-description">${p.description}</p>
                                <a href="${p.url}" class="btn btn-carousel mt-4">Ver Proyecto</a>
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
                message: $('#contact-message').val().trim()
            };

            // Validación básica
            if (!formData.name || !formData.email || !formData.message) {
                $status.addClass('error').text('Por favor completa todos los campos obligatorios.');
                $submitBtn.prop('disabled', false);
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok) {
                    $status.addClass('success').text('¡Mensaje enviado con éxito! Te responderé pronto.');
                    $form[0].reset();
                } else {
                    $status.addClass('error').text(result.error || 'Error al enviar el mensaje. Intenta más tarde.');
                }
            } catch (error) {
                console.error('Error:', error);
                $status.addClass('error').text('Error de conexión. Por favor verifica que el servidor esté activo.');
            } finally {
                $submitBtn.prop('disabled', false);
            }
        });
    }
});