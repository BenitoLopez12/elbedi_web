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
            caja.scrollTop += orientacion * caja.clientHeight;
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

document.addEventListener('DOMContentLoaded', (event) => {
    
    setTimeout(() => {
        let cardSlider = document.querySelectorAll('.caja-slider-img');
        
        cardSlider.forEach(card => {
            let altoCard = card.offsetHeight;
            let timeTranslate = (altoCard / 100);
            if ((altoCard / 100) < 9) {
                timeTranslate = (altoCard / 100) - (altoCard / 180);
                timeTranslate = timeTranslate.toFixed(2);
            }
            card.style.animationDuration = timeTranslate + 's';
        });
    }, 100);
});

function formSend() {
    fetch("https://formsubmit.co/ajax/benito.lopez.tecno@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: "Ejemplo",
            age: 30,
            email: "ejemplo@example.com",
            address: {
                city: "Ciudad Ejemplo",
                country: "País Ejemplo"
            },
            interests: ["Programación", "Tecnología", "Viajes"]
        })
    })
    .then(response => response.json()) // Parsea la respuesta JSON
    .then(data => console.log(data)) // Imprime los datos recibidos en la consola
    .catch(error => console.log(error)); // Maneja cualquier error que ocurra durante la solicitud
}