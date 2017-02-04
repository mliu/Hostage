var hostageApp = angular.module('hostageApp', []);

hostageApp.controller('HostageController', function HostageController($scope) {
  $scope.emails = [
    {from: "MommyJones@geemail.com", subject: "Fwd: You will not believe this! WOW!", time: "7:10pm", read: false}
  ];

  $scope.selectedEmail = null;

  $scope.openEmail = function(email) {
    email.read = true;
    $scope.selectedEmail = email;
  }
});