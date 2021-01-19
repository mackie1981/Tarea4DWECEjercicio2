"use strict";

let galeria; //Variable que almacenará el objeto galeria

//Variables para la iniciacion de la galeria
let _authors = [];
let categories = [];

let titulo; //Variable para recoger el titulo de la galeria al crearla

function existeCategoria(categoria) {
  let existe = false;
  if (galeria.categoriasCompleto.length > 0) {
    for (let i = 0; i < galeria.categoriasCompleto.length; i++) {
      if (galeria.categoriasCompleto[i].category.title === categoria.title) {
        existe = true;
        break;
      }
    }
  }
  return existe;
}

function buscarImagen(imagen) {
  let existe = false;
  //recorremos la categorias
  for (let i = 0; i < galeria.categoriasCompleto.length; i++) {
    //Capturamos las imagenes de esa categoria
    let cat = galeria.categoriasCompleto[i].images;
    //Recorremos las imagenes de esa categoria
    if (cat.length > 0) {
      for (let j = 0; j < cat.length; j++) {
        //capturamos la imagen
        let imas = cat[j].image;
        if (imas.title === imagen.title) {
          existe = true;
          break;
        }
      }
    }
  }
  return existe;
}

function buscarAutor(autor) {
  let index = galeria.authors.map(function(aut) {
    return aut.nickname;
  }).indexOf(autor.nickname);
  return index;
}

function crearGaleria() {
  titulo = tituloGaleria.value;
  galeria = new Gallery(titulo);
  limpiar();
}

function crearGaleriaTest(titulo) {
  galeria = new Gallery(titulo);
  return galeria;
}

function rellenarSelectAutores() {
  let select = document.getElementById("select-autor");
  for (let j = 1; j < select.length; j++) {
    select.remove(j);
    j--;
  }
  if (galeria.authors.length > 0) {
    //eliminamos los option que pueda haber excepto el primero
    for (let i = 0; i < galeria.authors.length; i++) {
      let option = document.createElement("option");
      option.value = galeria.authors[i].nickname;
      option.innerHTML = galeria.authors[i].nickname;
      select.appendChild(option);
    }
  }
}

function rellenarSelectCategorias() {
  let select = document.getElementById("select-categoria");
  //eliminamos los option que pueda haber excepto el primero
  for (let j = 1; j < select.length; j++) {
    select.remove(j);
    j--;
  }
  if (galeria.categoriasCompleto.length > 0) {
    for (let i = 0; i < galeria.categoriasCompleto.length; i++) {
      let option = document.createElement("option");
      option.value = galeria.categoriasCompleto[i].category.title;
      option.innerHTML = galeria.categoriasCompleto[i].category.title;
      select.appendChild(option);
    }
  }
}

function crearIterador(array) {
  var siguienteIndice = 0;
  return {
    next: function() {
      return siguienteIndice < array.length ? {
        value: array[siguienteIndice++],
        done: false
      } : {
        done: true
      };
    }
  }
}

function testTotal() {
  let gal;

  function testGallery() {
    //Intentamos crear una galeria con titulo vacio
    try {
      gal = crearGaleriaTest('');
    } catch (error) {
      console.log('Creación galeria sin titulo');
      console.log(error.toString());
      console.log('Fin creación galeria sin titulo');
    }
    //Intentamos crear una galeria con titulo
    try {
      gal = crearGaleriaTest('Mi galeria');
      console.log('Creación galeria con titulo');
      console.log('Creada con exito galeria con titulo: ' + gal.title);
      console.log('Fin creación galeria con titulo');
    } catch (error) {
      console.log('Creación galeria con titulo');
      console.log(error.toString());
      console.log('Fin creación galeria con titulo');
    }

    try {
      gal = crearGaleriaTest('Mi galeria 2');
      Object.defineProperty(gal, "#title", {enumerable: true, writable: true, configurable: false});
      Object.defineProperty(gal, "#categorias_imagenes", {enumerable: true, writable: true, configurable: false});
      Object.defineProperty(gal, "#autores", {enumerable: true, writable: true, configurable: false});
      gal = Object.freeze(gal);
      console.log('Creación galeria con titulo');
      console.log('Creada con exito galeria con titulo: ' + gal.title);
      console.log('Fin creación galeria con titulo');
    } catch (error) {
      console.log('Creación galeria con titulo');
      console.log(error.toString());
      console.log('Fin creación galeria con titulo');
    }

    console.log(Object.keys(gal));
    console.log(Object.getOwnPropertyNames(gal));

    try {
      gal.title = '';
    } catch (error) {
      console.log('Usando set title con titulo vacio');
      console.log(error.toString());
      console.log('Fin usando set title con titulo vacio');
    }

    try {
      gal.title = 'Mi galeria modificada';
      console.log('Usando set title con titulo');
      console.log('Modificado titulo galeria con exito: ' + gal.title);
      console.log('Fin usando set titulo con titulo');
    } catch (error) {
      console.log('Usando set galeria con titulo nuevo');
      console.log(error.toString());
      console.log('Fin usando set galeria con titulo nuevo');
    }

    //Añadiendo autores
    try {
      let autor1 = null;
      gal.addAuthor(autor1);
    } catch (error) {
      console.log('Añadiendo autor nulo');
      console.log(error.toString());
      console.log('Fin añadiendo autor nulo');
    }
    let autor2;
    try {
      autor2 = new Author('Álvaro', 'alvaro@alvaro.com', '');
      console.log('Añadiendo autor valido 1');
      console.log('Añadido autor ' + autor2.nickname);
      console.log(gal.addAuthor(autor2));
      console.log('Fin añadiendo autor valido 1');
    } catch (error) {
      console.log('Añadiendo autor valido 1');
      console.log(error.toString());
      console.log('Fin añadiendo autor valido 1');
    }
    let autor3;
    try {
      autor3 = new Author('Pepe', 'pepe@pepe.com', '');
      console.log('Añadiendo autor valido 2');
      console.log('Añadido autor ' + autor3.nickname);
      console.log(gal.addAuthor(autor3));
      console.log('Fin añadiendo autor valido 2');
    } catch (error) {
      console.log('Añadiendo autor valido 2');
      console.log(error.toString());
      console.log('Fin añadiendo autor valido 2');
    }

    try {
      let autor4 = new Author('Paco', 'paco@paco.com', '');
      console.log('Añadiendo autor valido 3');
      console.log('Añadido autor ' + autor4.nickname);
      console.log(gal.addAuthor(autor4));
      console.log('Fin añadiendo autor valido 3');
    } catch (error) {
      console.log('Añadiendo autor valido 3');
      console.log(error.toString());
      console.log('Fin añadiendo autor valido 3');
    }

    //Obteniendo el array de autores
    console.log('Obteniendo el array de autores');
    console.log(gal.authors);
    console.log('Fin obteniendo el array de autores');
    //Obteniendo el numero de autores
    console.log('Obteniendo el numero de autores');
    console.log(gal.authors.length);
    console.log('Fin obteniendo el numero de autores');

    //Eliminando autores
    //Uno que no exista
    try {
      let autor5 = new Author('Tito', 'tito@tito.com', '');
      gal.removeAuthor(autor5);
    } catch (error) {
      console.log('Eliminando un autor que no existe');
      console.log(error.toString());
      console.log('Fin eliminando autor que no existe');
    }

    try {
      let autor6 = new Author('Paco', 'paco@paco.com', '');
      console.log('Eliminando autor Paco');
      console.log('Eliminado autor ' + autor6.nickname);
      console.log(gal.removeAuthor(autor6));
      console.log('Fin eliminando autor Paco');

    } catch (error) {
      console.log('Eliminando un autor que existe');
      console.log(error.toString());
      console.log('Fin eliminando autor que existe');
    }

    //Obteniendo el array de autores tras la eliminacion
    console.log('Obteniendo el array de autores tras la eliminacion');
    console.log(gal.authors);
    console.log('Fin obteniendo el array de autores tras la eliminacion');
    //Obteniendo el numero de autores
    console.log('Obteniendo el numero de autores tras la eliminacion');
    console.log(gal.authors.length);
    console.log('Fin obteniendo el numero de autores tras la eliminacion');

    //Añadiendo categorias
    //Una nula
    try {
      let cat1 = null;
      gal.addCategory(cat1);
    } catch (error) {
      console.log('Añadiendo categoria nula');
      console.log(error.toString());
      console.log('Fin añadiendo categoria nula');
    }
    //Introducimos una categoria valida
    let cat1;
    try {
      cat1 = new Category('Categoria 1', '');
      console.log('Añadiendo categoria 1');
      console.log('Añadida categoria ' + cat1.title);
      console.log(gal.addCategory(cat1));
      console.log('Fin añadiendo categoria 1');
    } catch (error) {
      console.log('Añadiendo categoria nula');
      console.log(error.toString());
      console.log('Fin añadiendo categoria nula');
    }
    //Introducimos una categoria valida 2
    try {
      let cat2 = new Category('Categoria 2', '');
      console.log('Añadiendo categoria 2');
      console.log('Añadida categoria ' + cat2.title);
      console.log(gal.addCategory(cat2));
      console.log('Fin añadiendo categoria 2');
    } catch (error) {
      console.log('Añadiendo categoria 2');
      console.log(error.toString());
      console.log('Fin añadiendo categoria 2');
    }

    //Introducimos una categoria valida 3
    let cat6;
    try {
      cat6 = new Category('Categoria 3', '');
      console.log('Añadiendo categoria 3');
      console.log('Añadida categoria ' + cat6.title);
      console.log(gal.addCategory(cat6));
      console.log('Fin añadiendo categoria 3');
    } catch (error) {
      console.log('Añadiendo categoria 3');
      console.log(error.toString());
      console.log('Fin añadiendo categoria 3');
    }

    //Introducimos una categoria repetida
    try {
      let cat3 = new Category('Categoria 2', '');
      gal.addCategory(cat3);
    } catch (error) {
      console.log('Añadiendo categoria 3');
      console.log(error.toString());
      console.log('Fin añadiendo categoria 3');
    }

    //Eliminando una categoria
    //Una que no exista
    try {
      let cat4 = new Category('Categoria 10', '');
      gal.removeCategory(cat4);
    } catch (error) {
      console.log('Eliminando categoria 10');
      console.log(error.toString());
      console.log('Fin eliminando categoria 10');
    }

    try {
      let cat5 = new Category('Categoria 2', '');
      console.log('Eliminando categoria 2');
      console.log('Eliminada categoria: ' + cat5.title);
      console.log(gal.removeCategory(cat5));
      console.log('Fin eliminando categoria 2');
    } catch (error) {
      console.log('Eliminando categoria 2');
      console.log(error.toString());
      console.log('Fin eliminando categoria 2');
    }

    //Obtenemos el array de objetos Category
    console.log('Mostramos las categorias');
    console.log(gal.categories);
    console.log('Fin mostramos las categorias');

    //Añadiendo imagenes tanto Landscape como Portrait a las categorias y de varios autores
    //Intentamos una imagen nula
    try {
      let ima1 = null
      gal.addImage(ima1);
    } catch (error) {
      console.log('Añadiendo imagen nula');
      console.log(error.toString());
      console.log('Fin añadiendo imagen nula');
    }
    //Intentamos una imagen Landscape
    try {
      let ima2 = new Landscape('Titulo 1', '', 'url1', new Coords(1, 2));
      console.log('Añadiendo imagen 1');
      console.log('Añadiendo imagen Landscape con titulo ' + ima2.title + ' en ' + cat1.title + ' del autor ' + autor2.nickname);
      console.log(gal.addImage(ima2, cat1, autor2));
      console.log('Fin añadiendo imagen 1');
    } catch (error) {
      console.log('Añadiendo imagen landscape');
      console.log(error.toString());
      console.log('Fin añadiendo imagen nula');
    }
    //Intentamos una imagen Landscape
    try {
      let ima3 = new Landscape('Titulo 2', '', 'url2', new Coords(1, 2));
      console.log('Añadiendo imagen 2');
      console.log('Añadiendo imagen Landscape con titulo ' + ima3.title + ' en ' + cat1.title + ' del autor ' + autor3.nickname);
      console.log(gal.addImage(ima3, cat1, autor3));
      console.log('Fin añadiendo imagen 2');
    } catch (error) {
      console.log('Añadiendo imagen landscape');
      console.log(error.toString());
      console.log('Fin añadiendo imagen nula');
    }
    //Intentamos una imagen Landscape
    try {
      let ima4 = new Landscape('Titulo 3', '', 'url3', new Coords(1, 2));
      console.log('Añadiendo imagen 3');
      console.log('Añadiendo imagen Landscape con titulo ' + ima4.title + ' en ' + cat6.title + ' del autor ' + autor3.nickname);
      console.log(gal.addImage(ima4, cat6, autor3));
      console.log('Fin añadiendo imagen 3');
    } catch (error) {
      console.log('Añadiendo imagen landscape');
      console.log(error.toString());
      console.log('Fin añadiendo imagen nula');
    }
    //Intentamos una imagen Landscape
    try {
      let ima5 = new Landscape('Titulo 4', '', 'url4', new Coords(1, 2));
      console.log('Añadiendo imagen 4');
      console.log('Añadiendo imagen Landscape con titulo ' + ima5.title + ' en ' + cat6.title + ' del autor ' + autor2.nickname);
      console.log(gal.addImage(ima5, cat6, autor2));
      console.log('Fin añadiendo imagen 4');
    } catch (error) {
      console.log('Añadiendo imagen landscape');
      console.log(error.toString());
      console.log('Fin añadiendo imagen nula');
    }
    //Intentamos una imagen Portrait
    try {
      let ima6 = new Portrait('Titulo 5', '', 'url5', new Coords(1, 2));
      console.log('Añadiendo imagen 5');
      console.log('Añadiendo imagen Portrait con titulo ' + ima6.title + ' en ' + cat1.title + ' del autor ' + autor2.nickname);
      console.log(gal.addImage(ima6, cat1, autor2));
      console.log('Fin añadiendo imagen 5');
    } catch (error) {
      console.log('Añadiendo imagen landscape');
      console.log(error.toString());
      console.log('Fin añadiendo imagen nula');
    }
    //Intentamos una imagen Portrait
    try {
      let ima7 = new Portrait('Titulo 6', '', 'url6', new Coords(1, 2));
      console.log('Añadiendo imagen 6');
      console.log('Añadiendo imagen Portrait con titulo ' + ima7.title + ' en ' + cat1.title + ' del autor ' + autor3.nickname);
      console.log(gal.addImage(ima7, cat1, autor3));
      console.log('Fin añadiendo imagen 6');
    } catch (error) {
      console.log('Añadiendo imagen landscape');
      console.log(error.toString());
      console.log('Fin añadiendo imagen nula');
    }
    //Intentamos una imagen Portrait
    try {
      let ima8 = new Portrait('Titulo 7', '', 'url3', new Coords(1, 2));
      console.log('Añadiendo imagen 7');
      console.log('Añadiendo imagen Portrait con titulo ' + ima8.title + ' en ' + cat6.title + ' del autor ' + autor3.nickname);
      console.log(gal.addImage(ima8, cat6, autor3));
      console.log('Fin añadiendo imagen 7');
    } catch (error) {
      console.log('Añadiendo imagen landscape');
      console.log(error.toString());
      console.log('Fin añadiendo imagen nula');
    }
    //Intentamos una imagen Portrait
    try {
      let ima9 = new Portrait('Titulo 8', '', 'url3', new Coords(1, 2));
      console.log('Añadiendo imagen 8');
      console.log('Añadiendo imagen Portrait con titulo ' + ima9.title + ' en ' + cat6.title + ' del autor ' + autor2.nickname);
      console.log(gal.addImage(ima9, cat6, autor2));
      console.log('Fin añadiendo imagen 8');
    } catch (error) {
      console.log('Añadiendo imagen landscape');
      console.log(error.toString());
      console.log('Fin añadiendo imagen nula');
    }
    //Obtenemos las imagenes de una categoria null
    try {
      let cate = null;
      galeria.getCategoryImages(cate);
    } catch (error) {
      console.log('Obteniendo imagenes de categoria null');
      console.log(error.toString());
      console.log('Fin obteniendo imagenes de una categoria null');
    }
    //Obteniendo las imagenes de la categoria cat1
    try {
      console.log('Obteniendo imagenes de categoria cat1');
      console.log(galeria.getCategoryImages(cat1));
      console.log('Fin obteniendo imagenes de categoria cat1');
    } catch (error) {
      console.log('Obteniendo imagenes de categoria cat1');
      console.log(error.toString());
      console.log('Fin obteniendo imagenes de categoria cat1');
    }
    //Obteniendo las imagenes de la categoria cat6
    try {
      console.log('Obteniendo imagenes de categoria cat6');
      console.log(galeria.getCategoryImages(cat6));
      console.log('Fin obteniendo imagenes de categoria cat6');
    } catch (error) {
      console.log('Obteniendo imagenes de categoria cat6');
      console.log(error.toString());
      console.log('Fin obteniendo imagenes de categoria cat6');
    }
    //Obtenemos las imagenes de cada autor
    //Primero un autor nulo
    try {
      let aut = null;
      galeria.getAuthorImages(aut);
    } catch (error) {
      console.log('Obteniendo imagenes de autor null');
      console.log(error.toString());
      console.log('Fin obteniendo imagenes de autor null');
    }
    //Imagenes del autor2
    try {
      console.log('Obteniendo imagenes de autor2');
      console.log(galeria.getAuthorImages(autor2));
      console.log('Fin obteniendo imagenes de autor2');
    } catch (error) {
      console.log('Obteniendo imagenes de autor2');
      console.log(error.toString());
      console.log('Fin obteniendo imagenes de autor2');
    }
    //Imagenes del autor3
    try {
      console.log('Obteniendo imagenes de autor3');
      console.log(galeria.getAuthorImages(autor3));
      console.log('Fin obteniendo imagenes de autor3');
    } catch (error) {
      console.log('Obteniendo imagenes de autor3');
      console.log(error.toString());
      console.log('Fin obteniendo imagenes de autor3');
    }
    //Obtenemos las imagenes Portrait
    console.log('Obteniendo las imagenes tipo Portrait');
    console.log(galeria.getPortraits());
    console.log('Fin obteniendo las imagenes tipo Portrait');
    //Obtenemos las imagenes Landscape
    console.log('Obteniendo las imagenes tipo Landscape');
    console.log(galeria.getLandscapes());
    console.log('Fin obteniendo las imagenes tipo Landscape');
    //Eliminando imagenes
    //Primero una que no exista
    try {
      let im1 = new Image('Titulo 9', '', 'url3', new Coords(1, 2));
      galeria.removeImage(im1);
    } catch (error) {
      console.log('Eliminando una imagen no existente');
      console.log(error.toString());
      console.log('Fin eliminando una imagen no existente');
    }
    try {
      let im2 = new Image('Titulo 8', '', 'url3', new Coords(1, 2));
      console.log('Eliminando una imagen existente');
      console.log(galeria.removeImage(im2));
      console.log('Fin eliminando una imagen existente');
    } catch (error) {
      console.log('Eliminando una imagen existente');
      console.log(error.toString());
      console.log('Fin eliminando una imagen existente');
    }
  }

  function testImage() {
    //Intentamos crear una imagen con titulo vacio
    try {
      let ima1 = new Image('', '', 'miurl', new Coords(12, 23));
    } catch (error) {
      console.log('Creación imagen sin titulo');
      console.log(error.toString());
      console.log('Fin creación imagen sin titulo');
    }
    //Intentamos crear una imagen con url vacia
    try {
      let ima1 = new Image('Imagen 1', '', '', new Coords(12, 23));
    } catch (error) {
      console.log('Creación imagen sin url');
      console.log(error.toString());
      console.log('Fin creación imagen sin url');
    }

    //Intentamos crear una imagen con latitud vacia
    try {
      let ima1 = new Image('Imagen 1', '', 'miurl', new Coords('', 23));
    } catch (error) {
      console.log('Creación imagen sin latitud');
      console.log(error.toString());
      console.log('Fin creación imagen sin latitud');
    }

    //Intentamos crear una imagen con longuitud vacia
    try {
      let ima1 = new Image('Imagen 1', '', 'miurl', new Coords(12, ''));
    } catch (error) {
      console.log('Creación imagen sin longuitud');
      console.log(error.toString());
      console.log('Fin creación imagen sin longuitud');
    }

    //Intentamos crear una imagen con todos los parametros
    try {
      let ima1 = new Image('Imagen 1', '', 'miurl', new Coords(12, '12'));
      console.log('Creación imagen con los parametros obligatorios');
      console.log('Creada con exito imagen con titulo: ' + ima1.title);
      console.log('Fin creación imagen con titulo');
    } catch (error) {
      console.log('Creación imagen con los parametros obligatorios');
      console.log(error.toString());
      console.log('Fin creación imagen con los parametros obligatorios');
    }
  }

  function testCategory() {
    //Intentamos crear una categoria con titulo vacio
    try {
      let cat1 = new Category('', '');
    } catch (error) {
      console.log('Creación categoria sin titulo');
      console.log(error.toString());
      console.log('Fin creación categoria sin titulo');
    }

    //Intentamos crear una categoria con titulo
    try {
      let cat1 = new Category('Categoria 1', '');
      console.log('Creación categoria con titulo');
      console.log('Creada con exito categoria con titulo: ' + cat1.title);
      console.log('Fin creación categoria con titulo');
    } catch (error) {
      console.log('Creación categoria con titulo');
      console.log(error.toString());
      console.log('Fin creación categoria con titulo');
    }
  }

  function testAuthor() {
    //Intentamos crear un autor con el nickname vacio
    try {
      let aut1 = new Author('', 'aaa@aaa.com', '');
    } catch (error) {
      console.log('Creación autor sin titulo');
      console.log(error.toString());
      console.log('Fin creación autor sin titulo');
    }

    //Intentamos crear un autor con el email vacio
    try {
      let aut1 = new Author('Álvaro', '', '');
    } catch (error) {
      console.log('Creación autor sin email');
      console.log(error.toString());
      console.log('Fin creación autor sin email');
    }

    //Intentamos crear un autor con los parametros obligatorios
    try {
      let aut1 = new Author('Álvaro', 'aaa@aaa.com', '');
      console.log('Creación autor con parametros obligatorios');
      console.log('Creado con exito autor con nickname: ' + aut1.nickname + " y email: " + aut1.email);
      console.log('Fin creación autor con parametros obligatorios');
    } catch (error) {
      console.log('Creación autor con parametros obligatorios');
      console.log(error.toString());
      console.log('Fin creación autor con parametros obligatorios');
    }
  }

  function testCoords() {
    //Intentamos crear un objeto Coords sin latitud
    try {
      let coord1 = new Coords('', 24);
    } catch (error) {
      console.log('Creación coords sin latitud');
      console.log(error.toString());
      console.log('Fin creación coords sin latitud');
    }
    //Intentamos crear un objeto Coords sin longuitud
    try {
      let coord1 = new Coords(12, '');
    } catch (error) {
      console.log('Creación coords sin longuitud');
      console.log(error.toString());
      console.log('Fin creación coords sin longuitud');
    }
    //Intentamos crear un objeto Coords con parametros obligatorios
    try {
      let coord1 = new Coords(12, 24);
      console.log('Creación coord con parametros obligatorios');
      console.log('Creada con exito coord con latitud: ' + coord1.latitude + " y longuitud: " + coord1.longitude);
      console.log('Fin creación coord con parametros obligatorios');
    } catch (error) {
      console.log('Creación coords con parametros obligatorios');
      console.log(error.toString());
      console.log('Fin creación coords con parametros obligatorios');
    }
  }
  console.log('--- Inicio TestGallery ---');
  testGallery();
  console.log('--- Fin TestGallery ---');
  console.log('');
  console.log('--- Inicio TestImage ---');
  testImage();
  console.log('--- Fin TestImage ---');
  console.log('');
  console.log('--- Inicio TestCategory ---');
  testCategory();
  console.log('--- Fin TestCategory ---');
  console.log('');
  console.log('--- Inicio TestAuthor ---');
  testAuthor();
  console.log('--- Fin TestAuthor ---');
  console.log('');
  console.log('--- Inicio TestCoords ---');
  testCoords();
  console.log('--- Fin TestCoords ---');

}

testTotal();
result.innerHTML = 'Text realizado comprueba la consola';
