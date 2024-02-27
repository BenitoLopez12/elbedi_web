let pantallas = document.querySelectorAll('.pantalla'); 
let pantallasCount = 0;
pantallas.forEach(function(pantalla){
    let caja = pantalla;
    caja.scrollTop = pantallasCount * caja.clientHeight;
    pantallasCount ++;
    let orientacion = 1; // 1 indica dirección hacia abajo, -1 indica dirección hacia arriba
    setTimeout(() => {
        setInterval(function() {
            if (caja.scrollTop >= (caja.scrollHeight - caja.clientHeight) && orientacion === 1) {
                // Si llega al final, cambia la dirección a hacia arriba
                orientacion = -1;
            }  
            if (caja.scrollTop <= 0 && orientacion === -1) {
                // Si llega al principio, cambia la dirección a hacia abajo
                orientacion = 1;
            }

            // Incrementa o decrementa el scrollTop según la dirección
            // caja.scrollTop += orientacion * caja.clientHeight;

        }, 3000);
    }, pantallasCount * 1000);
});

function scrollMain(direccion) {
    let html = document.querySelector('html');
    html.scrollTop += direccion * html.clientHeight;
}

function btnScrollDifer(){
    let seccionActiva = false;
    let btnScrollElemnt = document.querySelector('.btns-scroll');
    let secciones = ['expande-negocio', 'beneficios', 'demos'];
    secciones.forEach(element => {
        let seccion = document.getElementById(element);
        let rect = seccion.getBoundingClientRect();
        if (rect.top <= (window.innerHeight - 600) && rect.bottom >= 600) {
            seccionActiva = true;
            btnScrollElemnt.classList.add(element);
        }
    });
    if (seccionActiva) {
        btnScrollElemnt.classList.add('btns-scroll-active');
    }
    else{
        btnScrollElemnt.classList.remove('btns-scroll-active');
        secciones.forEach(element => {
            btnScrollElemnt.classList.remove(element);
        });
    }
}
window.addEventListener('scroll', btnScrollDifer);
btnScrollDifer();

function slider(sliderDirec) {
    document.querySelector('.caja-items-slider').scrollLeft += document.querySelector('.item-slider').offsetWidth * sliderDirec;
}






































function menuHeader() {
    document.querySelector('.btn-menu-header').classList.toggle('active');
    document.querySelector('header nav').classList.toggle('active');
}

    
let imgPageExample = document.querySelectorAll('.caja-slider-img img');

imgPageExample.forEach(imgPage => {
    imgPage.onload = function () {
        
        let cardSlider = imgPage.parentNode;
        
        let altoCard = cardSlider.offsetHeight;

        let timeTranslate = altoCard / 100;

        if ((altoCard / 100) < 9) {
            timeTranslate = (altoCard / 100) - (altoCard / 180);
            timeTranslate = timeTranslate.toFixed(2);
        }

        cardSlider.style.animationDuration = timeTranslate + 's';
    }
});

document.getElementById('form-contact').addEventListener('submit', function(e) {
    e.preventDefault();

    const datos = new FormData(this);
    const datosJson = {};

    datos.forEach((value, key) => {
        datosJson[key] = value;
    });

    const btnSend = document.getElementById('btn-send-form');

    const titleContact = document.getElementById('title-contactanos');

    btnSend.classList.add('enviando');

    document.querySelectorAll('#form-contact input').forEach(input => {
        input.setAttribute('disabled', true);
    });
    btnSend.setAttribute('disabled', true);
    document.querySelector('#form-contact textarea').setAttribute('disabled', true);

    fetch("https://formsubmit.co/ajax/benito.lopez.tecno@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(datosJson)
    })
    .then(response => response.json()) 
    .then(data => {
        btnSend.classList.add('enviado');
        btnSend.classList.remove('enviando');

        titleContact.innerHTML = '<strong> ¡Gracias por tu mensaje! </strong> Nos pondremos en contacto pronto';
        titleContact.style.color = '#a45bac';
        titleContact.style.fontWeight = 'lighter';
    })
    .catch(error => {
        console.log(error);
        btnSend.classList.remove('enviando');
    }); 
});
