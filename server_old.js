var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var passport	= require('passport');
var config      = require('./server/config/database'); // get db config file
var User        = require('./server/app/models/user'); // get the mongoose model
var jwt         = require('jwt-simple');
var multer      = require('multer');
var fs          = require('fs');
var grid        = require('gridfs-stream');
var formidable  = require("formidable");
var util        = require('util');
var Productupload     = require('./server/app/models/productupload');
var uuid        = require('node-uuid');

// get our request parameters
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname +'/src' ));
// log to console
// app.use(morgan('dev'));
 
// Use the passport package in our application
app.use(passport.initialize());

// Start server
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000
, ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
app.listen(port, ip, function() {
  console.log('Express server listening on %d', port);
});
 
// connect to database
mongoose.connect(config.database);
var conn = mongoose.connection;
 
// pass passport for configuration
require('./server/config/passport')(passport);
 
// bundle our routes
var apiRoutes = express.Router();
// connect the api routes under /api/*
app.use('/api', apiRoutes);
// create a new user account (POST http://localhost:8080/api/signup)
apiRoutes.post('/signup', function(req, res) {
  if (!req.body.name || !req.body.password) {
    res.json({success: false, msg: 'Please pass name and password.'});
  } else {
    var newUser = new User({
      profilename: req.body.profile,
      name: req.body.name,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});
 

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function(req, res) {
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;
 
    if (!user) {
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user.name, config.secret);
          var name = user.name;
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token, Name:user.name});
     //     res.json({Name:user.name})
        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

// route to a restricted info (GET http://localhost:8080/api/memberinfo)
apiRoutes.get('/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;
 
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          res.json({success: true, msg: 'Welcome in the member area ' + user + '!'});
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

//---------image upload-----------

apiRoutes.post('/upload',function(req,res){
  var form = new formidable.IncomingForm();
  form.uploadDir = __dirname+'/uploads';
  form.keepExtensions = true;
  form.parse(req, function (err, fields, files) {
    if (!err) {
      console.log('Files Uploaded');
      grid.mongo = mongoose.mongo;
      var gfs = grid(conn.db);
      var writestream = gfs.createWriteStream({
        filename: files.image.name
      });
      fs.createReadStream(files.image.path).pipe(writestream);
      writestream.on('close', function (file) {
      //  callback(null, file);
        var pid = (file._id.toString());
        res.send(pid);
      });
    }
  });

});

apiRoutes.get('getfile', function(req,res){
//  var fs_write_stream = fs.createWriteStream('write.txt');

//read from mongodb
  var readstream = gfs.createReadStream({
    filename: req
  });
  //readstream.pipe(fs_write_stream);
  //fs_write_stream.on('close', function () {
  //  console.log('file has been written fully!');
  //});
});


apiRoutes.post('/product', function(req, res) {

    var newProduct = new Productupload({
      name: req.body.data.name,
      category: req.body.data.category,
      price: req.body.data.price,
      arrivaldate: req.body.data.arrivaldate,
      productimg: req.body.data.productimg
    });

  newProduct.save(function(err) {
    if (err) {
      console.log(err);
      return res.json({success: false, msg: 'Error in inserting.'});
    } else {
      res.json({success: true, msg: 'Successful Inserted.'});
    }
  });
});

apiRoutes.get('/productlist/:id', function(req,res){
  return Productupload.findById(req.params.id, function (err, product) {
    if (!err) {
      imgid = product._doc.productimg;
      getFileById(imgid);
      return res.send(product);

    } else {
      return console.log(err);
    }
  });
});

 function getFileById(req, res, next) {
   grid.mongo = mongoose.mongo;
   var gfs = grid(conn.db);
  //  var readstream = gfs.createReadStream({
  //    ID: req
  //  });
  //
  //
  // readstream.pipe(res);
   if (req) {
     // var mime = 'image/jpeg';
     // res.set('Content-Type', mime);
     var read_stream = gfs.createReadStream({ID: req});
     read_stream.pipe(res);
   } else {
     res.json('File Not Found');
   }
}