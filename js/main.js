var hostageApp = angular.module('hostageApp', []);

hostageApp.controller('HostageController', function HostageController($scope, $timeout) {
  $scope.emails = [
    {from: "Husband@geemail.com", subject: "Honeymoon photos!", time: moment().format("h:mma"), showPrimary: false, read: false, text: "Hey babe ;) Photos just came in! Love you 4evr <3 <3", image: "honeymoon.png", trigger: honeymoonEmail},
    {from: "MommyJones@geemail.com", subject: "Fwd: You will not believe this! WOW!", time: "7:10pm", showPrimary: false, read: true, text: "Check this out!", image: "poop.jpg", trigger: null}
  ];

  $scope.selectedEmail = null;
  $scope.replyPrimary = false;
  $scope.primaryEmail = $scope.emails[1];

  var emailEvents = [];
  var audioLibrary = {
    "honeymoonEmail": new Audio("audio/recording1.mp3"),
    "haveHusbandEmail": new Audio("audio/recording2.mp3"),
    "dontIgnoreEmail": new Audio("audio/recording3.mp3"),
  };

  $scope.openEmail = function(email) {
    email.read = true;
    $scope.selectedEmail = email;
    if (email.trigger != null && emailEvents.indexOf(email.trigger) < 0) {
      emailEvents.push(email.trigger);
      email.trigger();
    }
  }

  function addEmail(delay, from, subject, read, text, image, trigger) {
    $timeout(function() {
      $scope.emails.unshift(
      {
        showPrimary: false,
        from: from,
        subject: subject,
        time: moment().format("h:mma"),
        read: read,
        text: text,
        image: image,
        trigger: trigger
      });
    }, delay);
  }

  function honeymoonEmail() {
    audioLibrary["honeymoonEmail"].play();

    // Send first hostage email after
    addEmail(18000, "UNKNOWN EMAIL", "No subject", false, "", "haveHusband.png", haveHusbandEmail);
  }

  function haveHusbandEmail() {
    audioLibrary["haveHusbandEmail"].play();

    addEmail(17000, "UNKNOWN EMAIL", "PAY ATTENTION.", false, "", "dontIgnore.png", dontIgnoreEmail);
  }

  function dontIgnoreEmail() {
    audioLibrary["dontIgnoreEmail"].play();

    $timeout(function() {
      $scope.replyPrimary = true;
      $scope.primaryEmail = $scope.selectedEmail;
    }, 29000);
  }

  $scope.reply = function() {
    if (!$scope.selectedEmail.showPrimary) {
      return;
    }

    $scope.selectedEmail.showPrimary = false;
  }
});