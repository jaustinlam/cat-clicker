// Model //
var model = {
    currentCat: null,
    cats: [
            {
                clickcount : 0,
                name  : "Scruffy",
                img   : "images/cat1.jpg",
            },
            {
                clickcount : 0,
                name  : "Puffy",
                img   : "images/cat2.jpg",
            },
            {
                clickcount : 0,
                name  : "Fluffy",
                img   : "images/cat3.jpg",
            },
            {
                clickcount : 0,
                name  : "Tuffy",
                img   : "images/cat4.jpg",
            },
            {
                clickcount : 0,
                name  : "Muffy",
                img   : "images/cat5.jpg",
            },
            {
                clickcount : 0,
                name  : "Duffy",
                img   : "images/cat6.jpg",
            },
            {
                clickcount : 0,
                name  : "Gruffy",
                img   : "images/cat7.jpg",
            }
    ]
};

// Octopus //

var octopus = {

    init: function() {
        // set current cat to first cat in the list
        model.currentCat = model.cats[0];
        // initialize the views
        catView.init();
        catListView.init();
        adminView.init()

    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getAllCats: function() {
        return model.cats;
    },

    // set the current cat to the cat passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increment the cat count for the current cat
    incrementCatCount: function() {
        model.currentCat.clickcount++;
        // render the view with updated count
        catView.render();
    },

    updateCat: function(name, url, clicks) {
        // update cat from form
        model.currentCat.name = name;
        model.currentCat.img = url;
        model.currentCat.clickcount = clicks;
        catView.render();
        adminView.render();
    }
};

// View //

var catView = {

    init: function() {
        this.catElem = $("#cat-pics");
        this.catNameElem = $("#cat-name");
        this.catImageElem = $(".cat-img");
        this.countElem = $("#score");

        // on click event listener to increment count for cat
        this.catImageElem.on('click', function(){
            octopus.incrementCatCount();
            adminView.render();
        });

        // render the view with updated values
        this.render();

    },

    render: function() {
        // update the DOM elements with values of the current cat
        var thisCat = octopus.getCurrentCat();
        this.countElem.text(thisCat.clickcount);
        this.catNameElem.text(thisCat.name);
        this.catImageElem.attr('src', thisCat.img);
    }
};

var catListView = {

    init: function() {
        this.catListElem = $("#cat-list");

        // render the view with cats
        this.render();
    },

    render: function() {
        var cat, elem, i;
        // get the cat list
        var cats = octopus.getAllCats();

        // empty cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for(i = 0; i < cats.length ; i++){
            // the current cat in the loop
            cat = cats[i];

            // make a new cat list
            elem = document.createElement('li');
            elem.textContent = cat.name;
            $(elem).on('click', (function(catCopy) {
                return function() {
                    $('#cat-list li').removeClass('active');
                    $(this).addClass('active');
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                    adminView.render();
                };
            })(cat));

            // append this to the list
            this.catListElem.append(elem);
        }
    }
};

var adminView = {
    init: function(){
        adminElem = $("#admin-mode");
        adminForm = $("#admin-form");
        adminButton = $("#admin-button");
        cancelButton = $("#cancel-button");
        formCatName = $("#form-name");
        formCatImg = $("#form-image");
        formCatClicks = $("#form-clicks");

        adminButton.on('click', function(){
            adminForm.show();
        });
        cancelButton.on('click', function(){
            adminForm.hide();
        });

        this.render();
    },

    render: function(){
        adminForm.hide();
        var thisCat = octopus.getCurrentCat();
        formCatName.attr('value', thisCat.name);
        formCatImg.attr('value', thisCat.img);
        formCatClicks.attr('value', thisCat.clickcount);
        adminForm.submit(function(){
            octopus.updateCat(formCatName.val(), formCatImg.val(), formCatClicks.val());
            return false;

        });



    }

};

// run the script
octopus.init();


