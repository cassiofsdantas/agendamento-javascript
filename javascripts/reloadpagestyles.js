//Script que forca a atualização da classe de estilos em cache
window.forceReload = function()
{
    if (!window.fetch) 
    {
        return document.location.reload(true);
    }

    var els = document.getElementsByTagName("*");
    for(var i = 0 ; i < els.length ; i++)
    {
        var src = "";
        if (els[i].tagName == "A") continue;
        if (!src && els[i].src) src = els[i].getAttribute("src");
        if (!src && els[i].href) src = els[i].getAttribute("href");
        if (!src) continue;
        fetch(src, {cache: "reload"});
    }

    return document.location.reload(true);
};

window.onbeforeunload = forceReload;