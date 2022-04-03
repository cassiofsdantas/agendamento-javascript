function addCards(isIndex) 
{
    document.getElementById('content').innerHTML = "";

    const div = document.createElement('div');

    div.className = 'row';

    var schedules = JSON.parse(localStorage.getItem('agendamentos'));

    if(schedules == null)
    {
        if(isIndex)
        {
            document.getElementById('content').innerHTML = 
            `
                <img src="/imagens/alert.png" height="50px" class="centered" style="padding-bottom:110px;"></img>
                <h3 class="centered center-text">Nenhum agendamento a ser apresentado!</h3>
            `;
        }
        else
        {
            document.getElementById('content').innerHTML = 
            `
                <img src="/imagens/alert.png" height="50px" class="centered" style="padding-bottom:100px;"></img>
                <h3 class="centered center-text">Nenhum histórico de agendamento a ser apresentado!</h3>
            `;
        }

        return;
    }

    i = 0;

    fetch('/templates/cards/card.html')
        .then(response => response.text())
        .then(data => 
        {
            schedules.forEach((schedule, position) =>
            {
                var card = clone(data);

                if(isIndex && (schedule.status == "todo"))
                {
                    card = card.replace("{index}", position);

                    div.innerHTML = div.innerHTML + card;

                    document.getElementById('content').appendChild(div);

                    changeCardInfos(schedule, position);
                }
                else if(!isIndex && (schedule.status != "todo"))
                {
                    card = card.replace("{index}", position);

                    div.innerHTML = div.innerHTML + card;

                    document.getElementById('content').appendChild(div);

                    changeCardInfos(schedule, position);
                }
            });
        });
}

function changeCardInfos(schedule, i)
{
    document.getElementById('client-name').id = "client-name" + i;
    document.getElementById('client-name'+i).append(schedule.name);

    document.getElementById('client-phone').id = "client-phone" + i;
    document.getElementById('client-phone'+i).append(schedule.phone);

    document.getElementById('card-list-services').id = "card-list-services" + i;
    document.getElementById('card-list-services'+i).innerHTML = getServicesList(schedule.services);
    
    document.getElementById('client-schedule-date').id = "client-schedule-date" + i;
    document.getElementById('client-schedule-date'+i).append(schedule.date);

    document.getElementById('client-schedule-time').id = "client-schedule-time" + i;
    document.getElementById('client-schedule-time'+i).append(schedule.time);

    document.getElementById('client-schedule-value').id = "client-schedule-value" + i;
    document.getElementById('client-schedule-value'+i).append(schedule.price);
}

function getServicesList(services)
{
    var html = "";

    services.forEach(element => 
    {
        html += "<li>" + element + "</li>"
    });

    return html;
}