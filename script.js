$(document).ready(function() {
    // 1. Animación de entrada para el main (fadeIn secuencial)
    var $mainItems = $("main .d-flex.flex-column.text-center.align-items-center > *");
    $mainItems.hide();
    $mainItems.each(function(i) {
        $(this).delay(250*i).fadeIn(700);
    });

    // 2. Botón Proyectos animado (tamaño y color con jQuery)
    $('#btn-project').on('mouseenter', function() {
        $(this).stop().animate({ fontSize: '2.5rem', paddingLeft: '2.5rem', paddingRight: '2.5rem' }, 180)
               .css({ backgroundColor: '#8A784E', color: '#E7EFC7' });
    }).on('mouseleave', function() {
        $(this).stop().animate({ fontSize: '2rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }, 180)
               .css({ backgroundColor: '#AEC8A4', color: '#3B3B1A' });
    }).on('click', function(e) {
        e.preventDefault();
        var $btn = $(this);
        $btn.prop('disabled', true);
        $btn.text('¡Gracias por tu interés!');
        setTimeout(function() {
            $btn.text('P r o y e c t o s');
            $btn.prop('disabled', false);
        }, 1200);
    });

    // 3. Animación en el carrusel al mostrar slide (usando 'shown.bs.carousel')
    $('#carouselExampleInterval').on('slid.bs.carousel', function (e) {
        var $active = $(this).find('.carousel-item.active');
        $active.find('p, a').css({opacity:0, position:'relative', top:'30px'});
        $active.find('p, a').each(function(i) {
            $(this).delay(200*i).animate({opacity:1, top:0}, 500);
        });
    });

    // Inicializa la animación en el primer slide
    var $first = $('#carouselExampleInterval .carousel-item.active');
    $first.find('p, a').css({opacity:0, position:'relative', top:'30px'});
    $first.find('p, a').each(function(i) {
        $(this).delay(200*i).animate({opacity:1, top:0}, 500);
    });
});