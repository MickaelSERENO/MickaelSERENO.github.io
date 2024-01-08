ids = [];
menu = null;

selectChild = function(i)
{
    for(j = 0; j < menu.children.length; j++)
    {
        elem = menu.children[j];
        elem.children[0].style.color = "white";
    }
    elem = menu.children[i];
    elem.children[0].style.color = "yellow";
};

updateScroll = function()
{
    for(i = 0; i < ids.length; i++)
    {
        const rect = ids[i].getBoundingClientRect();
        if(rect.top >= 0) 
        {
            selectChild(i);
            break;
        }
    }
};

window.onload = function()
{
    ids.push(document.getElementById("About"));
    ids.push(document.getElementById("Education"));
    ids.push(document.getElementById("Experiences"));
    ids.push(document.getElementById("Teaching"));

    menu = document.getElementById("menu").childNodes[1];
    for(i = 0; i < menu.children.length; i++)
    {
        menu.children[i].addEventListener("click", function()
            {
                selectChild(i);
            }, false);
    }
    updateScroll();
};

window.addEventListener('scroll', function(e) 
{
    updateScroll();
});
