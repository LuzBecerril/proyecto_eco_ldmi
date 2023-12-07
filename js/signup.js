let txtNombre = document.getElementById("from_name");
let email = document.getElementById("email_id");
let password = document.getElementById ("crear_contrasena");
let confPassword = document.getElementById ("confirmar_contrasena");
let alertValidaciones = document.getElementById("alertValidaciones");
const btnRegistro = document.getElementById("btnRegistro");
let usuario = new Array();


function validarNombre(){
    let validNombre =/^[a-zA-ZÀ-ÿ\s]{1,40}$/; 
       if (txtNombre.value == null || txtNombre.value == 0 ||(! validNombre.test(txtNombre.value))){
        return false;
       } 
       return true;
    }//validarNombre

function validarCorreo(){
    let validEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (! validEmail.test(email.value)){
        return false;
    }
    return true;
}//validarCorreo


function validarContraseña(){
    let validContraseña = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-._]).{8,}$/;
    if (! validContraseña.test(password.value)){
        return false;
    }
    return true;
}//validarContraseña 
function validarComparacionContrasena (){

if (! ( password.value===confPassword.value) || (confPassword.value== null )||(confPassword.value == 0)){
    return false 
}//ifPassword
return true;
}//ValidarComparaciónContrasena

 let promesa = fetch("http://localhost:8080/api/usuarios/", {method:"GET"} );
    promesa
    .then(response => {response.json()
    .then(result => usuario = result);
    })//then
    .catch(error => { console.log('error en el JSON', error)});
    /*
    .catch (
		(error)=> console.log(error,"Ocurrió un problema en la solicitud")
		);*/
 
document.getElementById('form_registro')
.addEventListener('submit',function(event){
    let isValid = true;
    event.preventDefault();

    txtNombre.style.border="solid thick green";
    email.style.border="solid thick green";
    password.style.border="solid thick green";
    confPassword.style.border="solid thick green";
  
if (! validarComparacionContrasena ()){
    Swal.fire({title:"Las contraseñas no coinciden",
            text: 'El campo "Confirmar Password" debe ser igual al campo "password", recuerda: es requerido con 8 carácteres, mínimo: una letra mayúscula, una letra minúscula, un número y un carácter especial.',
            icon: 'error',
            confirmButtonColor: "#E4C247",
            confirmButtonText: 'Ok, lo checo'
});
    confPassword.style.border="solid thick red";
    isValid = false;
}//ifPassword

if (! validarContraseña()){
    Swal.fire({title:"El campo Contraseña es requerido.",
            text: 'Se requieren 8 carácteres, mínimo: una letra mayúscula, una letra minúscula, un número y un carácter especial.',
            icon: 'error',
            confirmButtonColor: "#E4C247",
            confirmButtonText: 'Ok, lo checo'
});
    password.style.border="solid thick red";
    isValid = false;
}//If txtNombre 

if (! validarCorreo()){
    Swal.fire({title:"El campo e-mail es requerido",
    text: 'Se requiere el siguiente formato: tu_correo@dominio.com',
    icon: 'error',
    confirmButtonColor: "#E4C247",
    confirmButtonText: 'Ok, lo checo'
}); 
    email.style.border="solid thick red";
    isValid = false;
}//IfCorreo 

if (! validarNombre()){
    Swal.fire({title:"El campo Nombre Completo es requerido",
                text: 'Ingresa tu nombre únicamente con letras',
                icon: 'error',
                confirmButtonColor: "#E4C247",
                confirmButtonText: 'Ok, lo checo'
});
            txtNombre.style.border="solid thick red";
            isValid = false;
    }//Nombre

if ((!validarNombre())&&(!validarCorreo())&&(! validarContraseña())&&(! validarComparacionContrasena ())){
 Swal.fire({title:"Completa los campos obligatorios",
            text: 'Campo de nombre, correo, contraseña, son requeridos',
            icon: 'warning',
            confirmButtonColor: "#E4C247",
            confirmButtonText: 'Ok, lo checo'});
}

if (isValid){
    //AQUI VA EL FETCH 
    
    let correoRepetido = usuario.find(usuario => usuario.correo === email);
    if (correoRepetido){
		Swal.fire({title:"Usuario existente",
                            text: 'Su correo ya está registrado',
                            icon: 'error',
                            confirmButtonColor: "#E4C247",
                            confirmButtonText: '¡Lo checo, gracias!'
                });
	}//if
	else {
		let hoy = new Date().toDateString()
	    let tipo = "";
	    if (email.value == "hijasmariaizquierdogaleria@gmail.com"){
	        tipo = "administrador"
	    }else{
	        tipo = "usuario_mortal"
	    }
		let nuevoUsuario = 
		{
		    nombre: txtNombre,
		    correo: email,
		    contrasena: password,
		
		    registrof: hoy,
		    tipo: tipo,
		    foto: "./src/img/User_Izquierdo.jpg",
		    direccion: "Estado, Municipio, colonia, calle número , c.p"
        } 
	
	 let promiss = fetch("http://localhost:8080/api/usuarios/", {method:"POST",
	 headers:{
		 'Content-Type': 'application/json',
	 },//headers
	 body : JSON.stringify(nuevoUsuario)
	 })
    promiss
    /*.then(response => {*/
		.then (response => { response.json()})
		.then (data => {
					Swal.fire({title:"Registro exitoso",
                        text: 'Ya eres parte de nuestra comunidad',
                        icon: 'success',
                        confirmButtonColor: "#E4C247",
                        confirmButtonText: '¡chido, gracias!'
            });//sweetAlert
		})//data
		.catch (error => {
			console.error('Error:',error);
			alertError('Error al registrar el usuario en el servidor');	
		});	//error		
		//});//then1
		 };//else
		usuario.push(JSON.parse(elemento));
    localStorage.setItem("usuarios", JSON.stringify(usuario));

    //HASTA AQUÍ
    txtNombre.value="";
    email.value="";
    password.value="";
    confPassword.value="";
    password.style.border="";
    email.style.border="";
    txtNombre.style.border="";
    confPassword.style.border="";
		
 /*NUESTRO POST QUE NO SALIÓ
    var elemento = JSON.stringify(
    `{
    "nombre": "${txtNombre.value}",
    "correo": "${email.value}",
    "contrasena": "${password.value}",

    "registrof": "${hoy}",
    "tipo": "${tipo}",
    "foto": "./src/img/User_Izquierdo.jpg",
    "direccion": "Estado, Municipio, colonia, calle número , c.p"
        } `
    );
  
    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: elemento,
    redirect: 'follow'
    };

    let promesa2 = fetch("http://localhost:8080/api/usuarios/", requestOptions);

    promesa2
    .then(response => response.text())
    .then(result => { console.log(result)
                    registro(result);
    })//then
    .catch(error => console.log('error', error));
    
    function registro(result){}
    if (result != null){
        Swal.fire({title:"Usuario existente",
                            text: 'Su correo ya está registrado',
                            icon: 'error',
                            confirmButtonColor: "#E4C247",
                            confirmButtonText: '¡Lo checo, gracias!'
                });
    }else{
        Swal.fire({title:"Registro exitoso",
                        text: 'Ya eres parte de nuestra comunidad',
                        icon: 'success',
                        confirmButtonColor: "#E4C247",
                        confirmButtonText: '¡chido, gracias!'
            })
    }
	*/

    /*
    Swal.fire({title:"Registro exitoso",
    text: 'Ya eres parte de nuestra comunidad',
    icon: 'success',
    confirmButtonColor: "#E4C247",
    confirmButtonText: '¡chido, gracias!'
});

    usuario = JSON.parse (localStorage.getItem('usuario')) || []
    let emailregistrado = usuario.find(usuario => usuario.Email === email.value)
    if (emailregistrado){
        return Swal.fire({title:"Usuario existente",
        text: 'Su email ya está registrado',
        icon: 'error',
        confirmButtonColor: "#E4C247",
        confirmButtonText: '¡Lo checo, gracias!'
    });  
    }

    let elemento = `{"Nombre": "${txtNombre.value}","Email": "${email.value}","contraseña": "${password.value}"}`;
    usuario.push(JSON.parse(elemento));
    localStorage.setItem("usuarios", JSON.stringify(usuario));
    */    /*
    usuario = JSON.parse (localStorage.getItem('usuarios')) || []*/
    
        }//isValid
    });//btn "enviar"
//Termina formulario de login