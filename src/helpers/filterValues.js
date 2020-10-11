import  FormValidator  from './form-validator'
function filterAlpha(value){
    return  value.replace(/[^a-zA-ZÑñ ]/g, "");
}
function filterNumber(value){
    return value.replace(/[^0-9]/g, "");
}

function onBlurEmail( email, Contact ){
    //console.log(email)
    const validatorEmail = new FormValidator([
        {
            field: "email",
            method: "isEmpty",
            validWhen: false,
            message: "Debe ingresar su correo electronico"
        },
        {
          field: "email",
          method: "isEmail",
          validWhen: true,
          message: "Ingrese un correo electrónico valido"
        }
    ])
    let validation=validatorEmail.validate({email});
    return validation.email.message;
}

export {
    filterAlpha,
    filterNumber,
    onBlurEmail
}