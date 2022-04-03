function redirectToHistory()
{
    localStorage.setItem('isEditIndex', JSON.stringify(-1));
    window.location = "./history.html";
}

function redirecttohomepage()
{
    localStorage.setItem('isEditIndex', JSON.stringify(-1));
    window.location = "./index.html";
}

function redirecttoregister()
{
    localStorage.setItem('isEditIndex', JSON.stringify(-1));
    window.location = "./register.html";
}

function redirectToEdit(index)
{
    localStorage.setItem('isEdit', JSON.stringify(true));
    localStorage.setItem('isEditIndex', JSON.stringify(index));
    window.location = "./register.html";
}

function actualDateFormatted(){
    var date = new Date(),
        day  = date.getDate().toString(),
        dayF = (day.length == 1) ? '0'+day : day,
        mounth  = (date.getMonth()+1).toString(),
        mounthF = (mounth.length == 1) ? '0'+mounth : mounth,
        yearF = date.getFullYear();
    return dayF+"/"+mounthF+"/"+yearF;
}

function clearInput(id)
{
    document.getElementById(id).value = "";
}

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