/* Variables */
const carrito = document.querySelector('#carrito')
/* tbody vacio,ya que es donde inyectaremos contenido dinamico */
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')
let articulosCarrito = [];

/* Eventos */
cargarEventListeners();
function cargarEventListeners(){
    listaCursos.addEventListener('click', agregarCurso)
}

/* -------------------------------------------------------------------------- */
/*                                  FUNCIONES                                 */
/* -------------------------------------------------------------------------- */
function agregarCurso(e){
    e.preventDefault();
    if( e.target.classList.contains('agregar-carrito') ){
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatos(cursoSeleccionado);
    }
}


/* Lee y extrae */

function leerDatos(curso){

    //console.log(curso)
    /* Creando un Objeto con el contenido actual */
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id : curso.querySelector('a').getAttribute('data-id'),
        cantidad : 1
    }
    //console.log(infoCurso)

    /* Agrega los elementos seleccionados al array vacío */
    articulosCarrito = [...articulosCarrito, infoCurso]
    console.log(articulosCarrito)
    carritoHTML()
}



/* Inyecta el HTML al carrito */
function carritoHTML(){

    /* Limpia el HTML */
    limpiarHTML()

    /* Recorre el carrito y genera el HTML */
    articulosCarrito.forEach( curso => {
        console.log(curso)

        const row = document.createElement('tr')
        row.innerHTML = 
        
        `
        <td>
            <img src ="${curso.imagen}" width="100">
        </td>

        <td>
            ${curso.titulo}
        </td>

        <td>
        ${curso.precio}
        </td>

        <td>
        ${curso.cantidad}
        </td>
        
        `;

        /* Inyectando HTML en el tbdoy */
        contenedorCarrito.appendChild(row)
    })
    
}

/* Limpia el HTML */
function limpiarHTML(){
    /* Metodo 1 */
    //contenedorCarrito.innerHTML = '';

    /* Metodo 2 */
    while( contenedorCarrito.firstChild ){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

