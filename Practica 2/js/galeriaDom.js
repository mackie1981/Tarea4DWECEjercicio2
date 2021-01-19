"use strict";
//Variables galeria
const tituloGaleria = document.getElementById("titulo-galeria");
const botonGaleria = document.getElementById("crear-galeria");
const botonGetTituloGaleria = document.getElementById("get-titulo-galeria");
const botonSetTituloGaleria = document.getElementById("set-titulo-galeria");

//Variables autor
const nickname = document.getElementById("nickname");
const email = document.getElementById("email");
const avatar = document.getElementById("avatar");
const botonAñadirAutor = document.getElementById("añadir-autor");
const botonRemoveAutor = document.getElementById("remove-autor");
const botonGetAutores = document.getElementById("get-autores");

const tituloCategoria = document.getElementById("titulo-categoria");
const descripcionCategoria = document.getElementById("descripcion-categoria");
const botonAñadirCategoria = document.getElementById("añadir-categoria");
const botonRemoveCategoria = document.getElementById("remove-categoria");

const tituloImagen = document.getElementById("titulo-imagen");
const descripcionImagen = document.getElementById("descripcion-imagen");
const urlImagen = document.getElementById("url-imagen");
const latitudImagen = document.getElementById("latitud-imagen");
const longuitudImagen = document.getElementById("longuitud-imagen");
const autorSeleccionado = document.getElementById("select-autor");
const categoriaSeleccionada = document.getElementById("select-categoria");
const tipoSeleccionado = document.getElementById("select-tipo-imagen");
const botonAñadirImagen = document.getElementById("añadir-imagen");
const botonRemoveImagen = document.getElementById("remove-imagen");


const botonGetCategoriaImages = document.getElementById("cat-ima");
const botonGetAutorImages = document.getElementById("aut-ima");
const botonGetPortImages = document.getElementById("portrait-ima");
const botonGetLandImages = document.getElementById("landscape-ima");
const botonGetCategorias = document.getElementById("get-cats");

const divResultado = document.getElementById("result");


botonGaleria.addEventListener("click", function () {
  crearGaleria();
  console.log(galeria);
  result.innerHTML = '<p>' + galeria.title + ' creada<p>';
  limpiar();
});

botonGetTituloGaleria.addEventListener("click", function () {
  if(!galeria) {
    result.innerHTML = '<p>Error: Galeria no está creada</p>';
    throw new UndefinedGalleryException("galeria");
  }
  console.log(galeria.title);
  result.innerHTML = '<p>El titulo de la galeria es: ' + galeria.title + '<p>';
  limpiar();
});

botonSetTituloGaleria.addEventListener("click", function () {
  if(!galeria) {
    result.innerHTML = '<p>Error: Galeria no está creada</p>';
    throw new UndefinedGalleryException("galeria");
  }
  galeria.title = tituloGaleria.value;
  console.log(galeria.title);
  result.innerHTML = '<p>El titulo de la galeria ahora es: ' + galeria.title + '<p>';
  limpiar();
});


botonAñadirAutor.addEventListener("click", function () {
  if(!galeria){
    result.innerHTML = '<p>Error: Galeria no está creada</p>';
    throw new UndefinedGalleryException("galeria");
  }
  let authorName = nickname.value;
  //if(authorName === '') {
  //  authorName = null;
  //}
  let autor = new Author(authorName, email.value, avatar.value);
  let res = galeria.addAuthor(autor);
  result.innerHTML = '<p>Hay: ' + res+ ' autores<p>';
  limpiar();
});

botonRemoveAutor.addEventListener("click", function () {
  if(!galeria){
    result.innerHTML = '<p>Error: Galeria no está creada</p>';
    throw new UndefinedGalleryException("galeria");
  }
  let autor = new Author(nickname.value, email.value, avatar.value);
  let res = galeria.removeAuthor(autor);
  result.innerHTML = '<p>Hay: ' + res+ ' autores<p>';
  limpiar();
});

botonGetAutores.addEventListener("click", function () {
  if(!galeria){
    result.innerHTML = '<p>Error: Galeria no está creada</p>';
    throw new UndefinedGalleryException("galeria");
  }
  console.log(galeria.authors);
  let aPantalla ='';
  for(let i = 0; i < galeria.authors.length; i++){
    aPantalla += '<p>' + galeria.authors[i].nickname +'-' +galeria.authors[i].email + '</p>'
  }
  result.innerHTML = aPantalla;
  limpiar();
});

botonAñadirCategoria.addEventListener("click", function () {
  if(!galeria){
    result.innerHTML = '<p>Error: Galeria no está creada</p>';
    throw new UndefinedGalleryException("galeria");
  }
  let categoria = new Category(tituloCategoria.value, descripcionCategoria.value);
  let res = galeria.addCategory(categoria);
  result.innerHTML = '<p>Hay: ' + res+ ' categorias<p>';
  limpiar();
});

botonRemoveCategoria.addEventListener("click", function () {
  //Si la galeria no está creada lanzamos excepcion
  if(!galeria){
    result.innerHTML = '<p>Error: Galeria no está creada</p>';
    throw new UndefinedGalleryException("galeria");
  }
  //
  let categoria = new Category(tituloCategoria.value, descripcionCategoria.value);
  let res = galeria.removeCategory(categoria);
  result.innerHTML = '<p>Hay: ' + res+ ' categorias<p>';
  limpiar();
});

botonAñadirImagen.addEventListener("click", function () {
  //Si la galeria no está creada lanzamos excepcion
  if(!galeria){
    result.innerHTML = '<p>Error: Galeria no está creada</p>';
    throw new UndefinedGalleryException("galeria");
  }

  //Si el tipo de imagen no es ni landscape ni portrait lanzamos excepcion
  if(tipoSeleccionado.value === 'tipo-imagen'){
    result.innerHTML = '<p>Error: Debes seleccionar un tipo de imagen</p>';
    throw new InvalidValueException(tipoSeleccionado, "tipoSeleccionado");
  }

  //Creamos el objeto Coords para añadirlo a la imagen
  let coordenadas = new Coords(latitudImagen.value, longuitudImagen.value);

  //Variable que recogerá la imagen
  let imagen;
  //Creamos una imagen landscape o portrait segun la seleccion del usuario
  if(tipoSeleccionado.value === 'tipo-landscape'){
    imagen = new Landscape(tituloImagen.value, descripcionImagen.value, urlImagen.value, coordenadas);
  } else {
    imagen = new Portrait(tituloImagen.value, descripcionImagen.value, urlImagen.value, coordenadas);
  }
  //Variable para recoger la categoria de la imagen
  let categoria;
  //Si no se ha seleccionado categoria usamos categoria por defecto
  if(categoriaSeleccionada.value === 'categoria'){
    categoria = new Category('Sin categoria', '');
  } else {
    categoria = new Category(categoriaSeleccionada.value, '');
  }
  //Variable para el autor
  let autorImagen;
  if(autorSeleccionado.value === 'autor'){
    autorImagen = new Author('Sin autor', 'xxx@ccc.com', '');
  } else {
    autorImagen = galeria.autores[buscarAutor(new Author(autorSeleccionado.value,'---',''))];
  }
  let res = galeria.addImage(imagen, categoria, autorImagen);
  result.innerHTML = '<p>Hay: ' + res+ ' imagenes en la categoria ' +categoria.title + '<p>';
  limpiar();
});

botonRemoveImagen.addEventListener("click", function () {
  //Si la galeria no está creada lanzamos excepcion
  if(!galeria){
    result.innerHTML = '<p>Error: Galeria no está creada</p>';
    throw new UndefinedGalleryException("galeria");
  }
  //Creamos objeto imagen
  let imagen = new Image(tituloImagen.value, descripcionImagen.value, urlImagen.value, new Coords(1,2));
  let res = galeria.removeImage(imagen);
  result.innerHTML = '<p>Hay: ' + res+ ' imagenes en la categoria<p>';
  limpiar();
});


botonGetCategoriaImages.addEventListener("click", function () {
  if(!galeria){
    result.innerHTML = '<p>Error: Galeria no está creada</p>';
    throw new UndefinedGalleryException("galeria");
  }
  let categoria = new Category(categoriaSeleccionada.value, '');
  if(categoria.title === 'categoria'){
    categoria.title = 'Sin categoria';
  }
  let images = galeria.getCategoryImages(categoria);
  console.log(images);
  let aPantalla ='<p>Imagenes de la categoria ' + categoria.title + '</p>';
  for(let i = 0; i < images.length; i++){
    aPantalla += '<p>' + images[i].image.title + '</p>'
  }
  result.innerHTML = aPantalla;
  limpiar();
});

botonGetAutorImages.addEventListener("click", function () {
  if(!galeria){
    result.innerHTML = '<p>Error: Galeria no está creada</p>';
    throw new UndefinedGalleryException("galeria");
  }
  let autor = new Author(autorSeleccionado.value, 'asjaj', '');
  if(autor.nickname === 'autor'){
    autor.nickname = 'Sin autor';
  }
  let images = galeria.getAuthorImages(autor);
  console.log(images);
  let aPantalla ='<p>Imagenes del autor ' + autor.nickname + '</p>';
  for(let i = 0; i < images.length; i++){
    aPantalla += '<p>' + images[i].title + '</p>'
  }
  result.innerHTML = aPantalla;
  limpiar();
});

botonGetPortImages.addEventListener("click", function () {
  if(!galeria){
    result.innerHTML = '<p>Error: Galeria no está creada</p>';
    throw new UndefinedGalleryException("galeria");
  }
  let images = galeria.getPortraits();
  console.log(images);
  let aPantalla ='<p>Imagenes del tipo Portrait</p>';
  for(let i = 0; i < images.length; i++){
    aPantalla += '<p>' + images[i].title + '</p>'
  }
  result.innerHTML = aPantalla;
  limpiar();
});

botonGetLandImages.addEventListener("click", function () {
  if(!galeria){
    result.innerHTML = '<p>Error: Galeria no está creada</p>';
    throw new UndefinedGalleryException("galeria");
  }
  let images = galeria.getLandscapes();
  console.log(images);
  let aPantalla ='<p>Imagenes del tipo Landscape</p>';
  for(let i = 0; i < images.length; i++){
    aPantalla += '<p>' + images[i].title + '</p>'
  }
  result.innerHTML = aPantalla;
  limpiar();
});

botonGetCategorias.addEventListener("click" ,function () {
  if(!galeria){
    result.innerHTML = '<p>Error: Galeria no está creada</p>';
    throw new UndefinedGalleryException("galeria");
  }
  let cat = galeria.categories;
  console.log(cat);
  let aPantalla ='<p>Todas las categorias</p>';
  for(let i = 0; i < cat.length; i++){
    aPantalla += '<p>' + cat[i].title + '</p>'
  }
  result.innerHTML = aPantalla;
  limpiar();
});

function limpiar(){
  tituloGaleria.innerHTML = '';
  nickname.innerHTML = '';
  email.innerHTML = '';
  avatar.innerHTML = '';
  tituloCategoria.innerHTML = '';
  descripcionCategoria.innerHTML = '';
  tituloImagen.innerHTML = '';
  descripcionImagen.innerHTML = '';
  latitudImagen.innerHTML = '';
  latitudImagen.innerHTML = '';
  autorSeleccionado.selectedIndex = "0";
  categoriaSeleccionada.selectedIndex = "0";
  tipoSeleccionado.selectedIndex = "0";
}
