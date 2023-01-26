// Contiene una funcion que se llama desde el submit del form cuando demos click y todo este validado
// en el envio del formlario se llama la funcion se genera un evento para capturar los valores del formulario

const URL_API = "http://localhost:8080/personas" 
const UPDATE_FLAG = {
    update: false,
    id: null
}

function get_data_form(evt){
    // Indicar al evento que no recargue la pagina
    evt.preventDefault ()
    // Captura de todos los datos, pero como enviamos al sevidor en formato json las peticiones que hacemos desde postman
    // para enviar los datos con post en el cuerpo de la peticion armabamos objeto json
    // armamos objeto de una vez y le vamos asignando los valores
    let persona = {
        nombre: evt.target.nombre.value,
        apellido: evt.target.apellido.value,
        email: evt.target.email.value,
        fecha_nacimiento: evt.target.fecha_nacimiento.value,
        foto: evt.target.foto.value
    }
    if (UPDATE_FLAG.update){
        // Creamos la llave id, funciiona como python si ya existe la sobreescribe si no existe la crea
        persona.id = UPDATE_FLAG.id
        update(persona)
    } else {
        create(persona)
    }
    clear_input(evt.target)
    //console.table(persona)
    //console.log("Hola mundo desde un submit -> ", evt)
}

function clear_input(form){
    form.nombre.value = ""
    form.apellido.value = ""
    form.email.value = ""
    form.fecha_nacimiento.value = ""
    form.foto.value = ""
}

async function create(persona){
    // Enviar peticion
    const resp = await fetch(URL_API, {
        method: 'POST',
        headers: { //se agrega la cabecera de la peticion
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(persona) //convierte un objeto js a json string
    })
    const text = await resp.text()
    alert(text)
}

async function update(persona){    
    persona.nombre = persona.nombre
    persona.apellido = persona.apellido
    console.table(persona)
    const resp = await fetch (URL_API, {
        method: 'PUT',
        mode: 'cors',          
        headers: { //se agrega la cabecera de la peticion
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(persona)
    })

    /* if (!resp.ok){
        throw new Error(`Error! status: ${resp.status}`)
    }
 */
    const text = await resp.text()
    alert (text)
    // Redireccionar al home cuando se actualilce el usuario
    window.location.href = "index.html"
}

// Captura de parametros de una persona mediante la url
function get_params_url(){
    const params = window.location.search
    if (params){
        const url = new URLSearchParams(params)
        //console.log(url.get("persona"))
        const persona = JSON.parse(url.get("persona"))
        alert("Voy a actualizar")
        console.table(persona)
        set_data_form(persona)
        document.getElementById("btn").innerText = "Actualizar"
        UPDATE_FLAG.update = true
        UPDATE_FLAG.id = persona.id        
    } else {
        alert("Voy a crear")
    }
    
    // luego seteamos el formulario, obtenemos los valores de esse objeto y lo asignamos a los inputs


    /* // aplicar split para sacar de la cadena en donde esta el igual
    const arrayParams = params.split("=")
    console.log(params)
    console.log(arrayParams)
    // Capturar lo que hay en la posicion 1
    let cliente = arrayParams[1]
    console.log(cliente)
    cliente = JSON.parse(cliente)
    console.log(cliente) */
}

function set_data_form(persona){
    // hacer split en la fecha para partir la cadena en donde se encuentre la t mayuscula
    const arrayFecha = persona.fecha_nacimiento.split("T")
    console.log(arrayFecha)
    document.getElementById("input_nombre").setAttribute("value", persona.nombre) //referenciar etiquetas los inputs tienen value
    document.getElementById("input_apellido").setAttribute("value", persona.apellido) 
    document.getElementById("input_email").setAttribute("value", persona.email)
    document.getElementById("input_fecha_nacimiento").setAttribute("value", arrayFecha[0]) //el formato en que lo toma es año mes dia, pero enn como se muestra al usuario es dia mes año
    document.getElementById("input_foto").setAttribute("value", persona.foto)
}

get_params_url()

/* 
Cuando se tiene un json en forma de string
"nombre":"Juan"
*/

