

//Selectors
var $catPicsElem = $("#cat-pics");
var $catListElem = $("#catList");

// Variables
var cats = {
    "cats" : [
    {
        "name"  : "Scruffy",
        "img"   : "images/cat1.jpg",
    },
    {
        "name"  : "Puffy",
        "img"   : "images/cat2.jpg",
    },
    {
        "name"  : "Fluffy",
        "img"   : "images/cat3.jpg",
    },
    {
        "name"  : "Tuffy",
        "img"   : "images/cat4.jpg",
    },
    {
        "name"  : "Muffy",
        "img"   : "images/cat5.jpg",
    },
    {
        "name"  : "Duffy",
        "img"   : "images/cat6.jpg",
    },
    {
        "name"  : "Gruffy",
        "img"   : "images/cat7.jpg",
    }]
};



// Append cat names to list
loadCats = function(){
    for(var i = 0; i < cats.cats.length; i++){
        var thisCat = cats.cats[i];
        thisCat.clicks = 0;
        var elem = document.createElement('li');
        elem.textContent = thisCat.name;
        $catListElem.append(elem);
        $(elem).on('click', (function(c){
            return function(){
                $('#catList li').removeClass('active');
                $(this).addClass('active');
                $catPicsElem.empty();
                $catPicsElem.append("<h2 class='catName'>" + c.name + "</h2>");
                $catPicsElem.append("<img class='cat-img responsive-img' src='"+ c.img + "'>");
                $('#score').text(c.clicks);
                $('.cat-img').on('click', function(){
                    c.clicks += 1;
                    $('#score').text(c.clicks);
                });
            };
        })(thisCat));
    }

};
loadCats();










