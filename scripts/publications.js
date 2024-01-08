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
    if(ids == null)
        return;

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
    ids.push(document.getElementById("Posters"));
    ids.push(document.getElementById("FullPapers"));

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


var myApp = angular.module('myApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);

myApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

myApp.controller("PublicationCtrl", function($scope, $uibModal)
{
    $scope.publications = {};
    $scope.readPublications = function() 
    {
        var request = new XMLHttpRequest();
        request.open('GET', "datas/publications.json", true);
        request.onreadystatechange = function() {
            if (request.readyState === 4 && request.status === 200) {
                $scope.publications = JSON.parse(request.responseText);
                $scope.$apply();
                console.log($scope.publications);
            }
        };
        request.send(null);
    };
    $scope.readPublications();

    $scope.openVideoLink = function(video)
    {
        console.log("ok");
        $scope.opts = 
        {
            backdrop      : true,
            backdropClick : true,
            dialogFade    : false,
            keyboard      : true,
            templateUrl   : "modalOpenVideo.html",
            controller    : "openVideoModel",
            controllerAs  : "$ctrl",
            resolve : {
                        video : function() {return video;}
                      }
        };

        var modalInstance = $uibModal.open($scope.opts);
    };
});


myApp.controller("openVideoModel", function($scope, $uibModalInstance, $uibModal, $filter, video)
{
    $scope.video = video;
});
