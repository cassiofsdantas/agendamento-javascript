//funcao que redireciona para a pagina de historico
function redirectToHistory()
{
    localStorage.setItem('isEditIndex', JSON.stringify(-1));
    window.location = "./history.html";
}

//funcao que redireciona para a pagina principal
function redirecttohomepage()
{
    localStorage.setItem('isEditIndex', JSON.stringify(-1));
    window.location = "./index.html";
}

//funcao que redireciona para a pagina de registro
function redirecttoregister()
{
    localStorage.setItem('isEditIndex', JSON.stringify(-1));
    window.location = "./register.html";
}

//funcao que redireciona para a pagina de edicao e seta quem sera editado
function redirectToEdit(index)
{
    localStorage.setItem('isEdit', JSON.stringify(true));
    localStorage.setItem('isEditIndex', JSON.stringify(index));
    window.location = "./register.html";
}

//funcao que obtem a data atual formatada
function actualDateFormatted(){
    var date = new Date(),
        day  = date.getDate().toString(),
        dayF = (day.length == 1) ? '0'+day : day,
        mounth  = (date.getMonth()+1).toString(),
        mounthF = (mounth.length == 1) ? '0'+mounth : mounth,
        yearF = date.getFullYear();
    return dayF+"/"+mounthF+"/"+yearF;
}

//funcao que troca o tipo do campo de input de normal para outro
function changeTypeAndShowPicker(inputName, inputType)
{
    if(document.getElementById(inputName).getAttribute("type") == inputType)
    {
        document.getElementById(inputName).showPicker();
        return;
    }

    document.getElementById(inputName).setAttribute("type", inputType);
    
    changeTypeAndShowPicker(inputName, inputType);
}

//funcao que limpa o campo de input
function clearInput(id)
{
    document.getElementById(id).value = "";
}

//funcao que clone um objeto complexo em memoria para evitar edicao por referencia
function clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}