const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const Ink = require('./models/ink');
const methodOverride   = require("method-override")

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(methodOverride("_method"))

var port = process.env.PORT || 3000;

// var router = express.Router();  

app.set('view engine', 'ejs')

// mongoose.connect('mongodb://localhost:27017/inkDB', {
//   useNewUrlParser: true
// })

mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true });

app.listen(port);
console.log('Server running on port ' + port);


var locationArray = [
    'NTMD',
    'SHLF',
    'C218',
    'C312',
    'C318',
    'GA10',
    'GA18',
    'SMPL',
    'SP10', 
    'SP14'
]

//GET SEARCH RESULT OR ALL INKS
app.get("/", function(req, res){
  var noMatch = null;
  if(req.query.search) {
    
    ////FUZZY SEARCH////
    // function escapeRegex(text) {
    //   return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    // };
    // const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    ////////////////////
    
    // Find one ink from DB
    Ink.find({ink: req.query.search}, function(err, foundInk){
      if(err){
        console.log(err);
    } else {
        if(foundInk.length < 1) {
          noMatch = "No match, please try again.";
      }
        res.render('new-index', {ink: foundInk, locationArray: locationArray, noMatch: noMatch })
      }
    });
  } else {
    // Get all inks from DB
    Ink.find({}, function(err, allInks){
      if(err){
          console.log(err);
      } else {
        res.render("index", {ink: allInks, locationArray: locationArray, noMatch: noMatch });
      }
    });
  }
});

// app.get("/", function(req, res){
//   // FIND ALL INKS FROM DB
//   Ink.find({}, function(err, allInks){
//     if(err){
//       console.log(err);
//     } else {
//       res.render("index", {ink: allInks, locationArray: locationArray })
//     }
//   });
// })

// app.get("/", function(req, res) {
//   // FIND ONE INK FROM DB
//   var noMatch = null;
//   Ink.findOne({ink: req.query.search}, function(err, foundInk){
//     if(err){
//       console.log(err);
//     } else 
//       if(!foundInk) {
//         noMatch = "No match, please try again.";
//       }

//       res.render("new-index", {ink: foundInk, locationArray: locationArray, noMatch: noMatch })
//   });
// });

//LIST OF STRINGS FOR AUTOCOMPLETE ON SEARCH BOX
app.get('/inklist', function(req, res){
	Ink.distinct("ink", function(err, allInks) {
		if(err){
			console.log(err);
		} else {
      res.json(allInks); 
    }  	
  })
});

//ADD INK TO DATABASE
app.post('/inventory', (req, res) => {
  var ink = req.body.ink
  var location = req.body.location

  var newInk = {
    ink: ink,
    location: location
  }

  Ink.create(newInk, function(err, result) {
    if (err) {
      console.log(err)
    } else {
      console.log(result);
    } 
    res.redirect('/')
  })
})

// UPDATE LOCATION
app.put('/:id', function(req, res){
	Ink.findByIdAndUpdate(req.params.id, req.body.ink, function(err, updatedInk){
		if(err) {
			res.send("error");
		} else {
      res.redirect("/", "edit", {ink: updatedInk});
      console.log("Location Updated")
		}
	});
});

//DELETE INK
app.get('/delete/:id', function(req, res){
  Ink.deleteOne({_id: req.params.id}, function(err){
    if(err) {
      console.log(err);
      res.json(err);
    } 
    else {
      console.log("Ink Deleted")
    }
    res.redirect('/');
  });
});	  
  
