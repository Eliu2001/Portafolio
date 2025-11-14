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

    // 2. Botón Proyectos animado (tamaño y color con jQuery)
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
            title: 'Centro de salud mental',
            description: 'Centro de salud mental, sonoroterapia y Masoterapia',
            img: 'https://cdn.pixabay.com/photo/2022/10/01/17/22/lotus-7491929_1280.jpg',
            url: '#'
        },
        {
            title: 'Página cristiana',
            description: 'Página cristiana para poder encontrar el camino hacia Cristo',
            img: 'https://cdn.pixabay.com/photo/2015/03/26/00/47/cross-689658_1280.jpg',
            url: '#'
        },
        {
            title: 'Noticiero Combarbalá',
            description: 'Noticiero general de la comuna de Combarbalá',
            img: 'https://cdn.pixabay.com/photo/2014/05/21/22/28/old-newspaper-350376_640.jpg',
            url: '#'
        }
    ];

    // Renderizar tarjetas en el grid de proyectos (3 por fila en md+ gracias a Bootstrap)
    const $grid = $('#projects-grid');
    $grid.empty();
    projects.forEach(function(p) {
        const card = `
            <div class="col-12 col-md-6 col-lg-4 mb-4">
                <div class="card project-card border-3">
                    <div class="card-img-wrapper">
                        <img src="${formatImgurUrl(p.img)}" class="card-img-top" alt="${p.title}">
                        <div class="card-overlay">
                            <p class="card-desc">${p.description}</p>
                            <a href="${p.url}" class="btn btn-carousel mt-2">Ir al proyecto</a>
                        </div>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${p.title}</h5>
                    </div>
                </div>
            </div>
        `;
        $grid.append(card);
    });

    // Pequeña animación hover para mostrar overlay con descripción
    $grid.on('mouseenter', '.project-card', function() {
        $(this).find('.card-overlay').css({opacity:1});
        $(this).find('img').css({opacity:0.2});
    }).on('mouseleave', '.project-card', function() {
        $(this).find('.card-overlay').css({opacity:0});
        $(this).find('img').css({opacity:1});
    });
});