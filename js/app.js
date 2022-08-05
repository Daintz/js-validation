//Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');
const formEmail = document.querySelector('#email');
const formAffair = document.querySelector('#asunto');
const formSend = document.querySelector('#mensaje');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//EventListeners
eventListeners()
function eventListeners() {
    document.addEventListener('DOMContentLoaded', iniciarApp);
    formEmail.addEventListener('blur', validateForm);
    formAffair.addEventListener('blur', validateForm);
    formSend.addEventListener('blur', validateForm);
    formulario.addEventListener('submit', enviarEmail);
    btnReset.addEventListener('click', resetForm);
}

//Funciones
function iniciarApp() {
    btnEnviar.disable = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

function validateForm(e) {
    if (e.target.value.length > 0) {
        borderColors(e, 'red-green');
        const error = document.querySelector('p.error');
        if (error) {
            error.remove();            
        }
    } else {
        borderColors(e, 'green-red');
        mostrarError('Todos los campos son obligatorios');
    }

    if (e.target.type === 'email') {

        if(er.test( e.target.value )){
            borderColors(e, 'red-green');
            const error = document.querySelector('p.error');
            if (error) {
                error.remove();            
            }
        } else {
            borderColors(e, 'green-red');
            mostrarError('Email no válido');
        }
    }

    if(er.test( formEmail.value ) && formAffair.value !== '' && formAffair.value !== ''){
        btnEnviar.disable = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    } else {
        btnEnviar.disable = true;
        btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');

    if(errores.length === 0){
        formulario.appendChild(mensajeError);
    }
}

function borderColors(e, valor) {
    if(valor === 'red-green'){
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else if (valor === 'green-red'){
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
    }
    
}

function enviarEmail(e) {
    e.preventDefault();
    const spinner = document.querySelector('#spinner');
    console.log(spinner.style.display);
    spinner.style.display = 'flex';

    setTimeout(() => {
        spinner.style.display = 'none';
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envio correctamente.';
        parrafo.classList.add('text-center', 'my-10', 'p-3', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');
        formulario.insertBefore(parrafo, spinner);
            setTimeout(() => {
                parrafo.remove();
                resetForm();
            }, 5000);
    }, 3000);
}

function resetForm() {
    formulario.reset();
    iniciarApp();
}