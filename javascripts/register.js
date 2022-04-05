var index = -1;
var currentServicesCount = 0;

window.onbeforeunload = function (e) {

    //Seta a variavel de se a pagina esta no modo edicao no recarregamento
    if(index > -1)
    {
        localStorage.setItem('isEdit', JSON.stringify(true));
    }
};

//funcao que verificar se a tela de cadastro ira ser utilizada como edição e ajusta e seta os valores nos campos para se comportarem como tal
function ifEditLoadInfos()
{
    var isEdit = JSON.parse(localStorage.getItem('isEdit'));
    index = JSON.parse(localStorage.getItem('isEditIndex'));

    if(isEdit && index > -1)
    {
        var schedules = JSON.parse(localStorage.getItem('agendamentos'));

        var schedule = schedules[index];

        document.getElementById("input-name").value = schedule.name;
        document.getElementById("input-phone").value = schedule.phone;
        document.getElementById("input-day").value = schedule.date;
        document.getElementById("input-time").value = schedule.time;

        schedule.services.forEach(element => 
        {
            createServiceInput(currentServicesCount, element);
        });
        
        setStatus(schedule.status);

        document.getElementById("input-price").value = schedule.price;
    }
    else
    {
        createServiceInput(0, null);
    }

    localStorage.setItem('isEdit', JSON.stringify(false));
}

//funcao que verifica a mudancao de valores no campo de entrada e seta o valor no value do campo no html para nao perder na adicão de um novo campo
function onInputChanged(inputName)
{
    document.getElementById(inputName).setAttribute("value", document.getElementById(inputName).value);
}

//funcao que criar os novos campos de entrada para novos servicos no mesmo atendimento
function createServiceInput(index, service)
{
    if(index == -2)
    {
        index = currentServicesCount;
    }

    var newInput = `
        <div id="container-input-service-{id}" class="relative-container default-margin-vertical" style="width: 100%; height: 30px;">
            <img src="/imagens/service-icon.png" width="16px" style="position: absolute; top: 50%; left: 10px; transform: translateY(-50%)" />
            <input id="input-service-{id}" onchange="onInputChanged('input-service-{id}')"  class="input-custom" placeholder="Serviço a ser realizado" width="100%" Value="{value}" />
            <img src="/imagens/clear-icon.png" width="16px" onclick="clearInput('input-service-{id}')" style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%)" />
        </div>
    `;

    newInput = newInput.replace("{id}", index);
    newInput = newInput.replace("{id}", index);
    newInput = newInput.replace("{id}", index);
    newInput = newInput.replace("{id}", index);
    if(service == null)
    {
        newInput = newInput.replace('Value="{value}"', null);
    }
    else
    {
        newInput = newInput.replace("{value}", service);
    }

    if(index > 0)
    {
        newInput = newInput.replace("Serviço a ser realizado", "Serviço adicional a ser realizado");
    }

    currentServicesCount++;
    document.getElementById("services-container").innerHTML += newInput;
}

//funcao que faz a selecao do status selecionado atualmente
function setStatus(currentStatus)
{
    var status = document.getElementsByName('status');
              
    for(i = 0; i < status.length; i++) {
        if(status[i].value == currentStatus)
        {
            status[i].checked = true;
        }
    }
}

//função que realiza o registro de um novo cadastro
function register()
{
    var name = document.getElementById("input-name").value;
    var phone = document.getElementById("input-phone").value;
    var date = document.getElementById("input-day").value;
    var time = document.getElementById("input-time").value;
    var service = document.getElementById("input-service-0").value;
    var price = document.getElementById("input-price").value;

    var status = document.getElementsByName('status');

    var isTodo = false;
    var isCanceled = false;
    var isFinished = false;
              
    for(i = 0; i < status.length; i++) {
        if(status[i].value == "todo" && status[i].checked)
        {
            isTodo = true;
        }
        else if (status[i].value == "canceled" && status[i].checked)
        {
            isCanceled = true;
        }
        else if (status[i].value == "finished" && status[i].checked)
        {
            isFinished = true;
        }
    }

    if(!verifyNotNull(name, "Necessário informar o nome"))
    {
        return;
    }

    if(!verifyNotNull(phone, "Necessário informar o telefone"))
    {
        return;
    }

    if(!verifyNotNull(date, "Necessário informar o dia"))
    {
        return;
    }
    
    if(!verifyNotNull(time, "Necessário informar a hora"))
    {
        return;
    }
    
    if(!verifyNotNull(service, "Necessário informar o serviço"))
    {
        return;
    }
    
    if(!verifyNotNull(price, "Necessário informar o preço"))
    {
        return;
    }
    
    if(!verifyOneChecked(isTodo, isCanceled, isFinished, "Necessário marcar um estado válido")) 
    {
        return;
    }
    
    var services = [service];

    for(var i = 1; i < currentServicesCount; i++)
    {
        var currentService = document.getElementById("input-service-" + i).value;
        
        if(currentService != null)
        {
            services[i] = currentService;
        }
    }
    
    var status = "todo";

    if(isCanceled)
    {
        status = "canceled";
    }
    else if(isFinished)
    {
        status = "finished";
    }

    var schedule = new Schedule(name, phone, services, date, time, price, status);

    var schedules = JSON.parse(localStorage.getItem('agendamentos'));

    if(schedules == null)
    {
        var newSchedules = [schedule];

        localStorage.setItem('agendamentos', JSON.stringify(newSchedules));
    }
    else
    {
        if(index < 0)
        {
            schedules[schedules.length] = schedule;
        }
        else
        {
            schedules[index] = schedule;
        }

        localStorage.setItem('agendamentos', JSON.stringify(schedules));
    }

    localStorage.setItem('isEditIndex', JSON.stringify(-1));
    redirecttohomepage();
}

//funcao que verifica se o valor passado não é nulo, e caso seja mostra um alerta em tela
function verifyNotNull(value, message)
{
    if(value == null || value.trim() == "")
    {
        alert(message);
        return false;
    }

    return true;
}

// Função que verifica se pelo menos um status foi selecionado
function verifyOneChecked(isTodo, isCanceled, isFinished, message)
{
    if(!isTodo && !isCanceled && !isFinished)
    {
        alert(message);
        return false;
    }
    else if(isTodo && isCanceled && isFinished)
    {
        alert(message);
        return false;
    }

    return true;
}