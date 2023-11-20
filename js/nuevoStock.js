let title = document.getElementById("title");
let autor = document.getElementById("autor");
let description = document.getElementById("description");
let section = document.getElementById("section");
let btnpublicar =document.getElementById("btnPublicar");
let img = document.getElementById("inputFile")

let cardbody = document.getElementById("CardNueva");

let datos = new Array();

let fileImage = document.getElementById('fileImage');
let btnFake = document.getElementById('btnFake');
let imageFile = document.getElementById('imageFile');

btnFake.addEventListener('click', function(){
    fileImage.click();
});
fileImage.addEventListener('change', function(){
    previewFile('imageFile', 'fileImage', 'inputFile' )
    //previewFile(id imagen, input type file , textArea);
});
    //previewFile(id imagen, input type file , textArea);
    function previewFile(img, inputFile, input) {
        
        var preview = document.getElementById(img);
        var file    = document.getElementById(inputFile).files[0];
        var reader  = new FileReader();

        reader.addEventListener("load", function () {
            document.getElementById(input).value = reader.result;
              preview.src = reader.result;
          }, false);
        
          if (file) {
            reader.readAsDataURL(file);
          }// file
    }// previewFile 

function validarautor(){
  if( autor.value == null || autor.value == 0 ||(! /^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(autor.value))) { 
    return false;
  }
    return true;
  }//validar autor
function validartitulo(){
    if( title.value == null || title.value == 0) { 
      return false;
    }
      return true;
    }//validar autor
function validardecripcion(){
  if (description.value==0){
    return false;
  }//mensaje 0
    return true;
}//validar descripcion
function validarseccion(){
  if(section.value == ""){
    return false;
  }
  return true;
}
function validarimg(){
  if(img.value == ""){
    return false;
  }
  return true;
}


btnpublicar.addEventListener("click", function(event){
  let isValid = true;
  event.preventDefault();
  title.style.border="solid thin green";
  autor.style.border="solid thin green";
  description.style.border="solid thin green";
  section.style.border="solid thin green";
  if (! validartitulo()){
    Swal.fire({title:"El título no es correcto",
            text: 'El campo "Título de obra" es obligatorio',
            icon: 'error',
            confirmButtonColor: "#E4C247",
            confirmButtonText: 'Ok, lo checo'
    });
    title.style.border="solid thin red";
    isValid = false;
  }//Titilo
  if (! validarautor()){
    Swal.fire({title:"El nombre de autor no es correcto",
            text: 'El campo "Autora" es obligatorio y solo acepta letras',
            icon: 'error',
            confirmButtonColor: "#E4C247",
            confirmButtonText: 'Ok, lo checo'
    });
    autor.style.border="solid thin red";
    isValid = false;
  }//Autor
  if (! validardecripcion()){
    Swal.fire({title:"La descripción no es correcta",
            text: 'El campo "Descripción" es obligatorio',
            icon: 'error',
            confirmButtonColor: "#E4C247",
            confirmButtonText: 'Ok, lo checo'
    }); 
    description.style.border="solid thin red";
    isValid = false;
  }//Descipcion
  if (! validarseccion()){
    Swal.fire({title:"La sección galeria no es correcta",
            text: 'El campo "Sección" es obligatorio',
            icon: 'error',
            confirmButtonColor: "#E4C247",
            confirmButtonText: 'Ok, lo checo'
    }); 
    section.style.border="solid thin red";
    isValid = false;
  }//seccion
  if (! validarimg()){
    Swal.fire({title:"La imagen es necesaria",
            text: 'El campo "Imagen" es obligatorio',
            icon: 'error',
            confirmButtonColor: "#E4C247",
            confirmButtonText: 'Ok, lo checo'
    }); 
    btnFake.style.border="solid thin red";
    isValid = false;
  }//img
  if(isValid){
    if(section.value == 1){
    let card = `
      <div class="col" style="margin-bottom: 2rem;">
        <div class="card9" style="background-color:#E4C247; height: 450px; border-radius: 20px; padding: 5%;">
          <div class="card-body">
            <h5 class="card-title">${title.value}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">${autor.value}<strong></strong></h6>
            <img src="${img.value}" id="ImagenPrueba" width="70%" height="280px" style="border-radius: 20px;">
              <br>
              <br>
            <p class="card-text">${description.value}</p>
          </div>
        </div>
      </div>`;
      registrarObra();
      // myWidget.open();
      cardbody.insertAdjacentHTML("beforeend", card);}
      if(section.value == 2){
        let card = `
      <div class="col" style="margin-bottom: 2rem;">
        <div class="card9" style="background-color:#f5f5f5; height: 450px; border-radius: 20px; padding: 5%;">
          <div class="card-body">
            <h5 class="card-title">${title.value}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">${autor.value}<strong></strong></h6>
            <img src="${img.value}" id="ImagenPrueba" width="70%" height="280px" style="border-radius: 20px;">
              <br>
              <br>
            <p class="card-text">${description.value}</p>
          </div>
        </div>
      </div>`;
      registrarObra();
      // myWidget.open();
      cardbody.insertAdjacentHTML("beforeend", card);
      }
      if(section.value == 3){
        let card = `
        <div class="col" style="margin-bottom: 2rem;">
          <div class="card9" style="background-color:#008e93; height: 450px; border-radius: 20px; padding: 5%;">
            <div class="card-body">
              <h5 class="card-title">${title.value}</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary">${autor.value}<strong></strong></h6>
              <img src="${img.value}" id="ImagenPrueba" width="70%" height="280px" style="border-radius: 20px;">
                <br>
                <br>
              <p class="card-text">${description.value}</p>
            </div>
          </div>
        </div>`;
        registrarObra();
        // myWidget.open();
        cardbody.insertAdjacentHTML("beforeend", card);
      }
      
      title.value = "";
      autor.value = "";
      description.value = "";
      section.value = "";
      img.value= "";
      title.focus();
    }
});

function registrarObra(){
  
  let elemento = `{"name": "${title.value}","autor": "${autor.value}","img": "${img.value}", "description": "${description.value}", "section": "${section.value}"}`;//section.value devuelve el número de la selección
  datos.push(JSON.parse(elemento));
  localStorage.setItem("datos", JSON.stringify(datos));
}//funcion registrarObra

// window.addEventListener("load", function(event){
//   if(localStorage.getItem("datos") != null){
//     localStorage.clear();
// }//if para agregar info del local storage de manera repetitiva

// })//window FALTA HACER UNA FUNCION QUE ENVIE LOS DATOS A GALERIA