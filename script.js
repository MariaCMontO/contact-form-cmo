const message = document.querySelector('#success-text')
const form = document.querySelector('form')
const submitButton = form.querySelector('.button-submit')

//----------STYLES---------

//Poner en verde cada que se clickea en un radio
const queryTypeButtons = Array.from(document.querySelectorAll('.query-type'))
queryTypeButtons.forEach((button) => {
    button.addEventListener(('click'), () => {
        deleteActiveButtons(button)
        activeCurrentButton(button)
    })
})

function activeCurrentButton(button) {
    button.classList.add('active')
    button.querySelector('img').classList.remove('is-hidden')
    button.querySelector('input').classList.add('active')
    button.querySelector('input').checked=true
}

function deleteActiveButtons() {
    queryTypeButtons.forEach((button) => {
        button.classList.remove('active')
        button.querySelector('img').classList.add('is-hidden')
        button.querySelector('input').classList.remove('active')
        button.querySelector('input').checked=false
    })
}

//Cambiar el estilo cada que se da click
const consentInput = document.querySelector('.consent-text')
consentInput.addEventListener(('change'), (e) => {
    const element = e.target
    const isChecked = consentInput.checked
    element.classList.toggle('active', isChecked)
    consentInput.querySelector('img').classList.toggle('is-hidden', isChecked)
})


//-------VALIDATION--------
// Cada que cambia algo en el form mostrar errores
form.addEventListener('change', (e) => {

    //Text validation
    textValidation(form)

    //Query type validation
    pressedValidation(form)

    //Consent validation
    consentValidation(form)
})

//Submit
submitButton.addEventListener('click', (e) => {
    //Prevenir comportamiento por defecto
    e.preventDefault()

    const text = textValidation(form)
    const queryType = pressedValidation(form)
    const consent = consentValidation(form)

    if (text && queryType && consent) {
        showSuccessMessage()
    }
})

//Mostrar mensaje de envio exitoso
function showSuccessMessage() {
    message.classList.add('success-text')
    message.classList.remove('is-hidden')

    setTimeout(() => {
        message.classList.remove('success-text')
        message.classList.add('is-hidden')
        //Resetear el form para que no guarde info anterior
        form.reset()
        deleteActiveButtons()
    }, 5000)
}

//Validacion de campos de texto
function textValidation(form) {
    //Selecciono todos los input de texto (nombre ,email y mensaje)
    const inputText = Array.from(form.querySelectorAll('input[type=text], input[type=email], textarea'))
    let isEmptyTotal = false;

    //Iteramos sobre cada input
    inputText.forEach((input) => {
        //Seleccionamos el error correspondiente al campo
        const error = form.querySelector(`#${input.name}-required`)
        const isEmpty = input.value.trim() === ''

        //Si algún input está vacío (isEmpty === true), entonces isEmptyTotal se vuelve true. Una vez que es true,
        // ya no vuelve a cambiar, porque el OR || no re-asigna si isEmptyTotal ya tiene valor verdadero.
        isEmptyTotal ||= isEmpty ;

        //Si el campo esta vacio, añadimos el estilo de error al input y quitamos el estilo de is-hidden del error.
        error.classList.toggle('is-hidden', !isEmpty)
        input.classList.toggle('error', isEmpty)
    })

    return !isEmptyTotal
}

//Validacion de inputs de tipo radio
function pressedValidation(form) {
    //Seleccionamos los input de tipo radio
    const inputType = Array.from(form.querySelectorAll('input[type=radio]'))
    //Seleccionamos el error correspondiente
    const error = form.querySelector('#query-type-required')
    //Buscamos el elemento presionado en el arreglo
    const hasElement = inputType.some((input) => input.checked);
    console.log(hasElement)
    error.classList.toggle('is-hidden', hasElement)

    return hasElement
}

//Validacion del consentimiento en checkbox
function consentValidation(form) {
    //Seleccionar el input de consent y su error correspondiente
    const consentInput = form.querySelector('input[type=checkbox]')
    const error = form.querySelector('#consent-required')

    //Si el input esta checkeado, añadir is-hidden sino removerlo.
    const isChecked = consentInput.checked
    error.classList.toggle('is-hidden', isChecked)

    return isChecked
}