//funcao que adiciona o cabeçalho nas paginas
function addHeader(isIndex) 
{
    const div = document.createElement('div');

    div.className = 'row';

    fetch('/templates/header/header.html')
        .then(response => response.text())
        .then(data => 
        {
            div.innerHTML =  data;

            document.getElementById('header-content').appendChild(div);

            const homeTitle = "Agenda de atendimentos";
            const historyTitle = "Histórico de atendimentos";

            changeHeaderTitle(isIndex ? homeTitle : historyTitle);
            changeHeaderFocusTab(isIndex);
            showInputFields();
        });
}

//funcao que troca o titulo do cabeçalho
function changeHeaderTitle(title)
{
    document.getElementById('header-title').append(title)
}

//funcao que troca a tab em focus de acordo com a pagina
function changeHeaderFocusTab(isIndex)
{
    document.getElementById("tab-home").className += document.getElementById("tab-home").className + " " + getHeaderTitle(isIndex); 

    document.getElementById("tab-history").className += document.getElementById("tab-history").className + " " + getHeaderTitle(!isIndex);
}

//funcao que identifica qual a tab selecionada na determinada pagina
function getHeaderTitle(isIndex)
{
    return isIndex ? "selected-tab-menu" : "unselected-tab-menu";
}

//funcao que identifica quais filtros mostrar
function showInputFields()
{
    var showAll = document.getElementById("input-show-all").checked;
    var showFilleds = document.getElementById("input-show-filled").checked;

    showInputField("input-name", showAll, showFilleds);
    showInputField("input-phone", showAll, showFilleds);
    showInputField("input-day", showAll, showFilleds);
    showInputField("input-time", showAll, showFilleds);
    showInputField("input-service", showAll, showFilleds);
}

//funcao que habilita todos os filtros ou um especifico
function showInputField(id, showAll, showFilleds)
{
    document.getElementById("container-"+id).className = document.getElementById("container-"+id).className.replace(" collapse-input", "");
    document.getElementById("container-"+id).className += " collapse-input";

    if(showFilledInput(id, showFilleds) || showAll)
    {
        document.getElementById("container-"+id).className = document.getElementById("container-"+id).className.replace(" collapse-input", "");
    }
}

//funcao que verifica se o campo de filtro esta preenchido com algum valor
function showFilledInput(id, showFilleds)
{
    return showFilleds &&
        (document.getElementById(id).value != "");
}