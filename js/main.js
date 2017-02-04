var hostageApp = angular.module('hostageApp', []);

hostageApp.controller('HostageController', function HostageController($scope, $timeout) {
  $scope.emails = [
    {from: "Husband@geemail.com", subject: "Honeymoon photos!", time: moment().format("h:mma"), read: false, text: "Hey babe ;) Photos just came in! Love you 4evr <3 <3", image: "honeymoon.png", trigger: honeymoonEmail},
    {from: "MommyJones@geemail.com", subject: "Fwd: You will not believe this! WOW!", time: "7:10pm", read: true, text: "Check this out!", image: "poop.jpg", trigger: null}
  ];

  $scope.selectedEmail = null;
  var audio;

  $scope.openEmail = function(email) {
    email.read = true;
    $scope.selectedEmail = email;
    if (email.trigger != null) {
      email.trigger();
    }
  }

  var honeymoonEmailRan = false;
  function honeymoonEmail() {
    if (honeymoonEmailRan) {
      return;
    }
    honeymoonEmailRan = true;

    audio = new Audio("audio/recording1.mp3");
    audio.play();

    // Send first hostage email 23 seconds after
    $timeout(function() {
      $scope.emails.unshift(
      {
        from: "UNKNOWN EMAIL",
        subject: "No subject",
        time: moment().format("h:mma"),
        read: false,
        text: "",
        image: "haveHusband.png",
        trigger: haveHusbandEmail
      });
    }, 18000);
  }

  var haveHusbandEmailRan = false;
  function haveHusbandEmail() {
    if (haveHusbandEmailRan) {
      return;
    }
    haveHusbandEmailRan = true;

    audio = new Audio("audio/recording2.mp3");
    audio.play();
  }
});