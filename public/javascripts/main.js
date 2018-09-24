var app = angular.module('es_vida', [ ]);


(function(){
  'use strict';

  app.controller('patientController', function($http, $timeout){
    var $pCtr = this;
    $pCtr.years = [];
    $pCtr.appointmentTimes = [];
    $pCtr.getYear = function (birthdate) {
      $http.get('/date/' + birthdate)
      .then(function(result){
        $pCtr.years.push(result.data);
      })
      .catch(function(e){
        console.log(e);
      });
    };

    $pCtr.getAppointmentTimes = function (birthdate) {
      $http.get('/appointment-times/' + birthdate)
      .then(function(result){
        $pCtr.appointmentTimes.push(result.data);
      })
      .catch(function(e){
        console.log(e);
      });
    };

    $pCtr.next = false;

    $pCtr.validateTime = function (date) {
      console.log(date);
      $http.get('/validate-time/' + date)
      .then(function(result){
        $pCtr.next = result.data;
        if (!result.data) {
          $pCtr.message = 'The appointment time is not available';
        }else {
          $pCtr.message =  '';
        }
      })
      .catch(function(e){
        console.log(e);
      });
    };
    // $pCtr.validateTime

  });
})();
