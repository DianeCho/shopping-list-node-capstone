const express = require('express');
const morgan = require('morgan');
var unirest = require('unirest');
var events = require('events');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var config = require('./config');

var recipe = require('./models/recipe');
const User = require('./models/user');
var list = require('./models/list');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

var shoppingList = new Array('');
var shopListItem = new Object();



//setting up the server to run as a module
var runServer = function (callback) {
    mongoose.connect(config.DATABASE_URL, function (err) {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function () {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};




if (require.main === module) {
    runServer(function (err) {
        if (err) {
            console.error(err);
        }
    });
};

// external api function

var getRecepiesFromYum = function (searchTerm) {
    var emitter = new events.EventEmitter();
    //console.log("inside getFromActive function");
    unirest.get("http://api.yummly.com/v1/api/recipes?_app_id=35372e2c&_app_key=971c769d4bab882dc3281f0dc6131324&q=" + searchTerm + '&maxResult=12')
        .header("Accept", "application/json")
        .end(function (result) {
            // //console.log(result.status, result.headers, result.body);
            //success scenario
            if (result.ok) {
                emitter.emit('end', result.body);
            }
            //failure scenario
            else {
                emitter.emit('error', result.code);
            }
        });

    return emitter;
};
var getSingleFromYum = function (recipeId) {
    //console.log(recipeId);
    var emitter = new events.EventEmitter();
    //console.log("inside getFromActive function");
    //console.log("http://api.yummly.com/v1/api/recipe/" + recipeId + "?_app_id=35372e2c&_app_key=971c769d4bab882dc3281f0dc6131324");
    unirest.get("http://api.yummly.com/v1/api/recipe/" + recipeId + "?_app_id=35372e2c&_app_key=971c769d4bab882dc3281f0dc6131324")
        .header("Accept", "application/json")
        .end(function (result) {
            //console.log(result.status, result.headers, result.body);
            //success scenario
            if (result.ok) {
                emitter.emit('end', result.body);
            }
            //failure scenario
            else {
                emitter.emit('error', result.code);
            }
        });

    return emitter;
};


// creating a new user
app.post('/users/create', (req, res) => {
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    email = email.trim();
    let password = req.body.password;
    password = password.trim();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }

        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }

            User.create({
                fname,
                lname,
                email,
                password: hash,
            }, (err, item) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Internal Server Error'
                    });
                }
                if (item) {
                    //console.log(`User \`${fname}\` created.`);
                    return res.json(item);
                }
            });
        });
    });
});

app.post('/users/signin', function (req, res) {
    User
        .findOne({
            email: req.body.email
        }, function (err, items) {
            if (err) {
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
            if (!items) {
                // bad username
                return res.status(401).json({
                    message: "Not found!"
                });
            } else {
                items.validatePassword(req.body.password, function (err, isValid) {
                    if (err) {
                        //console.log('There was an error validating the password.');
                    }
                    if (!isValid) {
                        return res.status(401).json({
                            message: "Not found"
                        });
                    } else {
                        var logInTime = new Date();
                        //console.log("User logged in: " + req.body.email + ' at ' + logInTime);
                        return res.json(items);
                    }
                });
            };
        });
});



//function to check the ingredient short list and the detailed ingredient list and store them in the shopping list collection

function storeShoppingList(ingredientsShortList, ingredientsDetails) {

    //check if the input arrays are not empty
    if ((ingredientsShortList.length != 0) && (ingredientsDetails.length != 0)) {
        //loop the shortlist array


        for (let i = 0; i < ingredientsShortList.length; i++) {
            let foundDetailedtIngredient = 0;

            //check if the short Ingredient name is not empty
            if (ingredientsShortList[i] != "") {

                //get one short Ingredient at a time
                let shortIngredient = ingredientsShortList[i].toLowerCase();

                //if the ingredient was not found yet
                if (foundDetailedtIngredient == 0) {
                    //for each one short Ingredient loop the ingredientsDetails
                    for (let y = 0; y < ingredientsDetails.length; y++) {

                        //check if the detailed Ingredient name is not empty
                        if (ingredientsDetails[i] != "") {

                            //get one detailed Ingredient at a time
                            let detailedIngredient = ingredientsDetails[i].toLowerCase();

                            //match the short Ingredient with the detailed Ingredient
                            if (detailedIngredient.indexOf(shortIngredient) !== -1) {

                                foundDetailedtIngredient++;
                                //console.log(i, shortIngredient, detailedIngredient);
                            }
                        }
                    }
                }

            }
        }
        //check for existing data in DB.
        //No Start adding.
        //Yes check if ingredientsShortList is present
        //no Add ingredientsShortList and ingredientsDetails as object.
        //yes add ingredientsDetails to existing object.
    }
}

function storeIngredient(shortList, qtyList) {
    //function takes two arrays from a recipe.  It ensure that the short list item is present in the qty item.  If so, it checks the shoppingList array to see if the shortlist item is present.  If so it adds the qty to the shortlist qty.
    //if its not present, it adds the shortlist item and qty to shopping list.

    //console.log(shortList, qtyList);
    for (let x = 0; x < qtyList.length; x++) {
        if (shortList[x] !== undefined) {
            let shortListLower = shortList[x].toLowerCase();
        }
        //        let listCounter = 0;
        let found = 0;

        for (let listCounter = 0; listCounter < qtyList.length; listCounter++) {
            if (found < 1) {
                let qtylistLower = qtyList[x].toLowerCase();

                //                //console.log("line 159", shortListLower, qtylistLower);

                //                    //console.log("outside -->", listCounter, " <--> ", shortList[x], " <--> ", qtyList[x]);
                if ((shortList[x] == '') && (qtyList[x] == '') && (shortList[x] == undefined) && (qtyList[x] == undefined)) {
                    //console.log("inside if -->", listCounter);
                } else {
                    //console.log("inside else -->", listCounter, " <--> ", shortList[x], " <--> ", qtyList[x]);
                    list.create({
                        ingredient: shortList[x],
                        qty: qtyList[x]

                    });
                    found = 1;
                }
            }
        }
        found = 0;
    }
}

app.post('/ingredients/create', function (req, res) {
    list.create({
        ingredient: req.body.ingredient,
        qty: req.body.qty,

    }, function (err, item) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(item);
    });
});

//internal api end points

app.get('/search-recipes/:name', (req, res) => {
    //console.log(req);
    //    external api function call and response

    var searchReq = getRecepiesFromYum(req.params.name);

    //get the data from the first api call
    searchReq.on('end', function (item) {
        res.json(item);
    });

    //error handling
    searchReq.on('error', function (code) {
        res.sendStatus(code);
    });

});


app.get('/get-recipe/:id', (req, res) => {

    //console.log(req.params.id);
    //    external api function call and response

    var aRecipe = getSingleFromYum(req.params.id);

    //get the data from the first api call
    aRecipe.on('end', function (item) {
        res.json(item);

        //????
        //        res.json(item.ingredientLines[0]);
    });

    //error handling
    aRecipe.on('error', function (code) {
        res.sendStatus(code);
    });

});
app.get('/retrieve-sList/', function (req, res) {
    list.find({}).sort({
        ingredient: 1
    }).exec(function (err, item) {
        //console.log(item);
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        //console.log(item);
        res.status(200).json(item);
    })
})
app.get('/retrieve-recipes/', function (req, res) {
    recipe.find(function (err, item) {
        //        //console.log(item);
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(200).json(item);
    });
});


app.post('/add-recipe-db/', function (req, res) {


    let aRecipe = getSingleFromYum(req.body.id);
    //    //console.log(aRecipe);

    //get the data from the first api call
    aRecipe.on('end', function (item) {
        //        //console.log(req.body.shortList.split(","));
        //        //console.log(item.ingredientLines);


        storeIngredient(req.body.shortList.split(","), item.ingredientLines);
        //ttstoreShoppingList(req.body.shortList.split(","), item.ingredientLines);
        //console.log(item.ingredientLines);
        //db connection and data queries
        recipe.create({
            name: req.body.name,
            rating: req.body.rating,
            course: req.body.course,
            id: req.body.id,
            day: req.body.day,
            shortList: req.body.shortList,
            username: req.body.username,
            ingredients: JSON.stringify(item.ingredientLines)

        }, function (err, item) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.status(201).json(item);
        });

        list.create({
            ingredients: JSON.stringify(item.ingredientLines)

        }, function (err, item) {
            //            if (err) {
            //                return res.status(500).json({
            //                    message: 'Internal Server Error'
            //                });
            //            }
            //            res.status(201).json(item);
        });


        //res.json(item);
    });

    //error handling
    aRecipe.on('error', function (code) {
        res.sendStatus(code);
    });


});
app.delete('/delete/:ingredientId', function (req, res) {
    //console.log(req.params.id);
    list.findByIdAndRemove(req.params.ingredientId, function (err, items) {
        if (err)
            return res.status(404).json({
                message: 'Item not found.'
            });

        res.status(201).json(items);
    });
});
app.delete('/deleterec/:id', function (req, res) {
    //console.log(req.params.id);
    if (req.params.id = 'killAll') {

        list.remove({}, function (err, items) {
            if (err)
                return res.status(404).json({
                    message: 'Item not found.'
                });

            res.status(201).json(items);
        });


    };
});

app.delete('/deletering/:id', function (req, res) {
    //console.log(req.params.id);
    if (req.params.id = 'killAll') {

        recipe.remove({}, function (err, items) {
            if (err)
                return res.status(404).json({
                    message: 'Item not found.'
                });

            res.status(201).json(items);
        });
    };
});



//export and run
exports.app = app;
exports.runServer = runServer;
//app.listen(process.env.PORT || 8080);
