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
    /* Elimina los cursos  */
    carrito.addEventListener('click', eliminarCurso)
    /* Vaciar Carrito */
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
    })
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

/* Elimina los elementos del carrito */

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id')
        /* Elimina por el data-id */
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId )
        carritoHTML()
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

    /* Revisar que no existan elementos repetidos */
    const existe = articulosCarrito.some( curso =>  curso.id === infoCurso.id )
    console.log(existe)
    if(existe){
        /* Actualiza la cantidad */
        const cursos = articulosCarrito.map(curso =>{
            if( curso.id === infoCurso.id ){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        })
        articulosCarrito = [...cursos]
    }else{
        /* Agrega los elementos seleccionados al array vacío */
        articulosCarrito = [...articulosCarrito, infoCurso]
    }
    //console.log(articulosCarrito)
    carritoHTML()
}



/* Inyecta el HTML al carrito */
function carritoHTML(){

    /* Limpia el HTML */
    limpiarHTML()

    /* Recorre el carrito y genera el HTML */
    articulosCarrito.forEach( curso => {
        //console.log(curso)

        const {imagen, titulo, precio, cantidad, id } = curso;

        const row = document.createElement('tr')
        row.innerHTML = 
        
        `
        <td>
            <img src ="${imagen}" width="100">
        </td>

        <td>
            ${titulo}
        </td>

        <td>
            ${precio}
        </td>

        <td>
            ${cantidad}
        </td>

        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
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

