var express = require('express'),
  debug=require("debug")("EV:index"),
  ObjectId = require('mongoose').Types.ObjectId,
  Patient =  require('../models/Patients'),
  Quote =  require('../models/Quotes'),
  moment= require('moment'),
  router = express.Router();


router.get("/", function(req, res) {
  Patient.find()
  .then(function (list) {
    res.render("patient/list", {list:list});
  })
  .catch(function (errors) {
    res.render("patient/list");
  });
});

router.get("/quotes", function(req, res) {
  Quote.aggregate([{$lookup: {from: 'patients', localField: 'patientId', foreignField: '_id', as: 'patient'}}, { $unwind: "$patient" }])
  .then(function (list) {
    debug(list);
    res.render("quotes/list", {list:list});
  })
  .catch(function (errors) {
    debug('errors');
    debug(errors);
    res.render("quotes/list");
  });
});


router.get("/add-patient", function(req, res) {
  res.render("index");
});

router.get("/date/:date", function(req, res) {
  res.json (moment(req.params.date).format('LL'));
});


router.get("/appointment-times/:date", function(req, res) {
  res.json (moment(req.params.date).format('LLL'));
});


router.get("/validate-time/:date", function(req, res) {
  var fecha = moment(req.params.date);
  Quote.find()
  .then(function (list) {
    var flag = true;
    list.forEach(function (valor) {
      var fechaDos = moment(valor.appointmentTime);
      diferencia = fecha.diff(fechaDos, 'minutes');
      if (valor.type == "phone") {
        if (diferencia < -15 || diferencia > 15) {
          debug('si se puede ');
        }
        else {
          flag = false;
          debug('no se puede ');
        }
      }else {
        if (diferencia < -30 || diferencia > 30) {
          debug('si se puede ');
        }
        else {
          flag = false;
          debug('no se puede ');
        }
      }
    });
    res.json(flag);
  }).catch(function (errors) {

  });
  
});


router.post("/patient", function(req, res) {
  var newPatient = new Patient(req.body);
  newPatient.save()
  .then(function (documento) {
    res.redirect('/');
  })
  .catch(function (error) {
    res.redirect('/');
  });
});

router.post("/quote", function(req, res) {
  debug(req.body);
  var newQuote = new Quote(req.body);
  newQuote.save()
  .then(function (documento) {
    res.redirect('/quotes');
  })
  .catch(function (error) {
    debug(error);
    res.redirect('/');
  });
});



module.exports = router;
