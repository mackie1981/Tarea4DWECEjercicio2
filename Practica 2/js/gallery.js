"use strict";

//Clase para el objeto galeria
class Gallery {
  #title;
  #categorias_imagenes;
  #autores;

  //constructor de la clase
  constructor(titulo) {
    if (titulo === ""){
      result.innerHTML = '<p>Error: El titulo no puede estar vacío</p>';
      throw new EmptyValueException("titulo");
    }
    this.#title = titulo;
    this.#categorias_imagenes = categories;
    this.#autores = _authors;

    //Patron singleton para que solo pueda haber una sola instancia de Gallery
    //Si ya existe una instancia del objeto
    if(typeof Gallery.instancia === "object"){
      //Devolvemos esa instancia que existia
      return Gallery.instancia;
    }
    //Si no habia la instancia del objeto asignamos a la instancia el objeto Gallery creado mediante el constructor
    Gallery.instancia = this;
    return this;
  }

  //getter para el titulo
  get title() {
    return this.#title;
  }

  //setter para el titulo
  set title(tit) {
    if(tit === ''){
      result.innerHTML = '<p>Error: El titulo no pude estar vacio</p>';
      throw new EmptyValueException("titulo");
    }

    this.#title = tit;
  }

  get categoriasCompleto(){
    return this.#categorias_imagenes;
  }
  //Getter para las categorias que devuelve array de objetos Category
  get categories() {
    let cats = [];
    for(let i = 0; i < this.#categorias_imagenes.length; i++){
      cats.push(this.#categorias_imagenes[i].category);
    }
    return cats;
  }
  //getter para los autores
  get authors() {
    return this.#autores;
  }
  //Funcion para añadir categorias nuevas que devuelve el numero de categorias que hay
  addCategory(categoria) {
    //Si la categoria es null lanzamos excepcion
    if(categoria === null){
      result.innerHTML = '<p>Error: La categoria es nula</p>';
      throw new ObjectNullException("categoria");
    }
    //Si ya existe la categoria lanzamos excepcion
    if(existeCategoria(categoria)){
      result.innerHTML = '<p>Error: La categoria ya existe</p>';
      throw new ObjectDuplicateException("categoria");
    }
    //Creamos un objeto literal con la categoria y un array vacio para las imagenes
    let objetoCategoria = {
      category: categoria,
      images: []
    }
    //Añadimos el objeto literal a la propiedad categorias_imagenes
    this.#categorias_imagenes.push(objetoCategoria);
    rellenarSelectCategorias();
    return this.#categorias_imagenes.length;
  }
  //Funcion para eliminar una categoria existente que devuelve el numero de categorias que hay
  removeCategory(categoria) {
    if(!existeCategoria(categoria)){
      result.innerHTML = '<p>Error: La categoria no existe</p>';
      throw new ObjectNoExistException("categoria");
    }
    //Obtenemos el indice de esa categoria
    let index = this.#categorias_imagenes.map(function(cat) {
      return cat.category.title;
    }).indexOf(categoria.title);
    //Eliminamos la categoria
    this.#categorias_imagenes.splice(index, 1);
    rellenarSelectCategorias();
    //Devolvemos el numero de categorias
    return this.#categorias_imagenes.length;
  }
  //Funcion que añade una imagen que no sea nula y que no este ya en la galeria
  //que devuelve el numero de imagenes total de todas las categorias
  addImage(imagen, categoria, autor) {
    //Si la imagen es null lanzamos excepcion
    if(imagen === null){
      result.innerHTML = '<p>Error: La imagen es nula</p>';
      throw new ObjectNullException("imagen");
    }
    if(buscarImagen(imagen)){
      result.innerHTML = '<p>Error: La imagen ya existe</p>';
      throw new ObjectDuplicateException("imagen");
    }
    //buscamos el indice de esa categoria
    let index = this.#categorias_imagenes.map(function(cat) {
      return cat.category.title;
    }).indexOf(categoria.title);
    //Si el indice es -1 no esta creada esa categoria y por tanto la creamos
    if(index === -1){
      galeria.addCategory(categoria);
      //Buscamos el indice de la categoria recien introducida
      index = this.#categorias_imagenes.map(function(cat) {
        return cat.category.title;
      }).indexOf(categoria.title);
    }
    //Buscamos el autor
    let indiceAutor = buscarAutor(autor);
    if(indiceAutor === -1){
      galeria.addAuthor(autor);
      indiceAutor = buscarAutor(autor);
    }
    //añadimos la imagen dentro de su categoria y con su autor correspondiente
    let objetoImagenAutor = {
      image: imagen,
      author: this.#autores[indiceAutor].nickname
    };
    this.#categorias_imagenes[index].images.push(objetoImagenAutor);
    return this.#categorias_imagenes[index].images.length;
  }
  //Funcion que elimina una imagen que exista en la galeria
  //que devuelve el numero de imagenes
  removeImage(imagen) {
    //Si no existe la imagen lanzamos excepcion
    if(!buscarImagen(imagen)){
      result.innerHTML = '<p>Error: La imagen no existe</p>';
      throw new ObjectNoExistException("imagen");
    }
    //Buscamos la imagen para eliminarla
    //Recorremos categorias_imagenes
    let index;
    for(let i = 0; i < this.#categorias_imagenes.length; i++){
      //Capturamos las imagenes de esa categoria
      let cat = this.#categorias_imagenes[i].images;
      if(cat.length > 0){
        //Recorremos las imagenes de esa categoria
        for(let j = 0; j < cat.length; j++){
          //capturamos la imagen
          let imas = cat[j].image;
          //si el titulo coincide
          if(imas.title === imagen.title){
            //eliminamos la imagen
            index = i;
            this.#categorias_imagenes[i].images.splice(j, 1);
            break;
          }
        }
      }
    }
    return this.#categorias_imagenes[index].images.length;
  }

  //Metodo que devuelve un array de objetos Image de una determinada categoria
  getCategoryImages(categoria) {
    let todasLasImaganes = [];
    if(categoria === null){
      result.innerHTML = '<p>Error: La categoria es nula/p>';
      throw new ObjectNullException("categoria");
    }
    //Recorremos categorias_imagenes
    let cat;
    for(let i = 0; i < this.#categorias_imagenes.length; i++){
      //Capturamos las imagenes de esa categoria
      if(this.#categorias_imagenes[i].category.title === categoria.title){
        cat = this.#categorias_imagenes[i].images;
      }
    }
    return cat;
  }
  //Metodo que añade un autor si no es nulo y si no existe ya,
  //que devuelve el numero de autores que hay
  addAuthor(autor) {
    if (autor === null) {
      result.innerHTML = '<p>Error: El autor es nulo</p>';
      throw new ObjectNullException("autor");
    }
    //Si ya existe ese autor
    if(buscarAutor(autor) !== -1) {
      result.innerHTML = '<p>Error: La autor ya existe</p>';
      throw new ObjectDuplicateException("autor");
    }

    this.#autores.push(autor);
    rellenarSelectAutores();
    return this.#autores.length;
  }
  //Metodo que elimina un autor si existe y devuelve el numero de autores
  removeAuthor(autor) {
    //Buscamos si existe
    let index = buscarAutor(autor);
    if(index === -1){
      result.innerHTML = '<p>Error: El autor no existe</p>';
      throw new ObjectNoExistException("autor");
    }
    this.#autores.splice(index, 1);
    rellenarSelectAutores();
    return this.#autores.length;
  }
  //Metodo que devuelve un array de objetos Image pertenecientes a un autor
  //siempre que el autor no sea nulo
  getAuthorImages(autor){
    if(autor === null){
      result.innerHTML = '<p>Error: El autor es nulo</p>';
      throw new ObjectNullException("autor");
    }
    let autIma = [];
    for(let i = 0; i < this.#categorias_imagenes.length; i++){
      let cat = this.#categorias_imagenes[i].images;
      for(let j = 0; j < cat.length; j++){
        let ima = cat[j];
        if(ima.author === autor.nickname){
          let imag = new Image(ima.image.title, ima.image.descripcion, ima.image.url,
            new Coords(ima.image.coordenadas.latitude, ima.image.coordenadas.longitude));
          autIma.push(imag);
        }
      }
    }
    return autIma;
  }
  //metodo que devuelve un array de objetos Portrait con todas las imagenes de ese tipo
  getPortraits(){
    let portraits = [];
    for(let i = 0; i < this.#categorias_imagenes.length; i++){
      let cat = this.#categorias_imagenes[i].images;
      for(let j = 0; j < cat.length; j++){
        let ima = cat[j];
        if(ima.image instanceof Portrait){
          portraits.push(ima.image);
        }
      }
    }
    return portraits;
  }
  //metodo que devuelve un array de objetos Landscape con todas las imagenes de ese tipo
  getLandscapes(){
    let landscapes = [];
    for(let i = 0; i < this.#categorias_imagenes.length; i++){
      let cat = this.#categorias_imagenes[i].images;
      for(let j = 0; j < cat.length; j++){
        let ima = cat[j];
        if(ima.image instanceof Landscape){
          landscapes.push(ima.image);
        }
      }
    }
    return landscapes;
  }

}
