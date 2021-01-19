"use strict";
class BaseException extends Error {
  constructor (message = "", fileName, lineNumber){
    super(message, fileName, lineNumber);
    this.name = "BaseException";
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BaseException)
    }
  }
}

//Excepción personalizada para indicar que la galeria no esta definida.
class UndefinedGalleryException extends BaseException {
  constructor (param, fileName, lineNumber){
    super("Error: The gallery called" + param + " is undefined.", fileName, lineNumber);
    this.param = param;
    this.name = "UndefinedGalleryException";
  }
}

//Excepción personalizada para indicar que la galeria no esta definida.
class GalleryExistException extends BaseException {
  constructor (param, fileName, lineNumber){
    super("Error: The gallery called " + param + " is already defined.", fileName, lineNumber);
    this.param = param;
    this.name = "GalleryExistException";
  }
}

//Excepción personalizada para indicar valores vacios.
class EmptyValueException extends BaseException {
  constructor (param, fileName, lineNumber){
    super("Error: The parameter " + param + " can't be empty.", fileName, lineNumber);
    this.param = param;
    this.name = "EmptyValueException";
  }
}

//Excepción personalizada para indicar valores vacios.
class ObjectNullException extends BaseException {
  constructor (param, fileName, lineNumber){
    super("Error: The object " + param + " is null.", fileName, lineNumber);
    this.param = param;
    this.name = "ObjectNullException";
  }
}

class ObjectDuplicateException extends BaseException {
  constructor (param, fileName, lineNumber){
    super("Error: The object " + param + " was already created.", fileName, lineNumber);
    this.param = param;
    this.name = "ObjectDuplicateException";
  }
}

class ObjectNoExistException extends BaseException {
  constructor (param, fileName, lineNumber){
    super("Error: The object " + param + " doesn´t exist.", fileName, lineNumber);
    this.param = param;
    this.name = "ObjectNoExistException";
  }
}

//Excepción de valor inválido
class InvalidValueException extends BaseException {
  constructor (param, value, fileName, lineNumber) {
    super("Error: El parametro " + param + " tiene un valor invalido: " + value, fileName, lineNumber);
    this.param = param; //Creamos propiedad a esta clase
    this.name = "ValorInvalidoException"; //Sobreescribimos la proiedad name de la clase Error
  }
}
