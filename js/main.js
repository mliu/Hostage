var hostageApp = angular.module('hostageApp', []);

hostageApp.controller('HostageController', function HostageController($scope, $timeout) {
  $scope.emails = [
    {from: "Husband@geemail.com", subject: "Honeymoon photos!", time: moment().format("h:mma"), showPrimary: false, read: false, text: "Hey babe ;) Photos just came in! Love you 4evr <3 <3", image: "honeymoon.png", trigger: honeymoonEmail},
    {from: "ReadMeFirst@geemail.com", subject: "What is this?", time: "3:09pm", showPrimary: false, read: false, text: "This is a 5 minute hostage thriller story... told entirely in an email client. Enjoy.", image: "", trigger: null},
    {from: "MommyJones@geemail.com", subject: "Fwd: You will not believe this! WOW!", time: "3:10pm", showPrimary: false, read: true, text: "Check this out!", image: "poop.jpg", trigger: null},
    {from: "BossMan@work.com", subject: "TPS Reports", time: "9:08am", showPrimary: false, read: true, text: "Hey Mary, do you think you could send those TPS reports to me soon? Thanks.", image: "", trigger: null},
    {from: "Payments@CreditCards.com", subject: "Your Bill Payment", time: "6:08am", showPrimary: false, read: true, text: "Mary, Your bill payment of $302.34 was accepted. Thank you for using Generic CreditCard!", image: "", trigger: null},
    {from: "SPAM@SPAMNOW.COM", subject: "AAAAAAAAAAAAAAHHHHHHHHH", time: "4:08am", showPrimary: false, read: true, text: "OH MY GOD MARY, THIS IS THE BIGGEST DEAL IN THE HISTORY OF FOREVER! GET IT NOW!!!", image: "spam.png", trigger: null},
  ];

  $scope.selectedEmail = null;
  $scope.replyContent = "";
  $scope.finalCountdown = "";
  $scope.endMessage = "";

  var canOpenEmails = true;
  var emailEvents = [];
  var audioLibrary = {
    "honeymoonEmail": new Audio("audio/recording1.mp3"),
    "haveHusbandEmail": new Audio("audio/recording2.mp3"),
    "dontIgnoreEmail": new Audio("audio/recording3.mp3"),
    "whoAreYouReply": new Audio("audio/recording5.mp3"),
    "youKnowEmail": new Audio("audio/recording7.mp3"),
    "husbandDiesEmail": new Audio("audio/recording8.mp3"),
    "pinkyEmail": new Audio("audio/recording6.mp3"),
    "endSound": new Audio("audio/recording9.mp3"),
    "husbandVoicemail": new Audio("audio/husband_voicemail.mp3"),
    "sawintro": new Audio("audio/sawintro.mp3"),
    "sawloop": new Audio("audio/sawloop.mp3"),
    "sawend": new Audio("audio/sawend.mp3"),
  };

  $scope.openEmail = function(email) {
    if (!canOpenEmails) {
      return;
    }
    $scope.finalCountdown = "";
    $scope.endMessage = "";
    $scope.replySent = false;
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
    canOpenEmails = false;
    startSaw();

    $timeout(function() {
      $scope.selectedEmail.showPrimary = true;
    }, 29000);
  }

  function startSaw() {
    audioLibrary["sawintro"].play();

    $timeout(function() {
      audioLibrary["sawloop"].loop = true;
      audioLibrary["sawloop"].play();
    }, 22000);
  }

  function youKnowEmail() {
    audioLibrary["husbandDiesEmail"].play();

    addEmail(4000, "UNKNOWN EMAIL", "GIVE TO US.", false, "GIVE US WHAT WE WANT OR YOUR HUSBAND DIES.", "", husbandDiesEmail);
  }

  function husbandDiesEmail() {
    audioLibrary["youKnowEmail"].play();

    addEmail(13000, "UNKNOWN EMAIL", "CHOOSE.", false, "YOUR LIFE... OR YOUR HUSBAND'S.", "pinky.png", pinkyEmail);
  }

  function pinkyEmail() {
    canOpenEmails = false;
    $timeout(function() {
      audioLibrary["pinkyEmail"].play()
    }, 1000);

    $timeout(function() {
      finalCountdown(3);
    }, 5000);

    $timeout(function() {
      audioLibrary["sawloop"].pause();
      audioLibrary["sawend"].play()
    }, 3500);
  }

  function finalCountdown(num) {
    if (num == 0) {
      $scope.endMessage = "CHOOSE NOW!!!!";
      $timeout(function() {
        audioLibrary["endSound"].play();
        addEmail(17000, "UNKNOWN EMAIL", "Whoops", false, "Shoot man I am sorry I thought this was Jared I had the wrong email ignore lol xD", "theend.png", husbandVoicemail);
        $timeout(function() {
          $scope.killed = true;
          canOpenEmails = true;
        }, 7000)
      }, 2000);
      return;
    }

    $timeout(function() {
      $scope.finalCountdown += num + "...";
      num--;
      finalCountdown(num);
    }, 2500);
  }

  function husbandVoicemail() {
    audioLibrary["husbandVoicemail"].play();
  }

  $scope.reply = function() {
    if (!$scope.selectedEmail.showPrimary) {
      return;
    }

    audioLibrary["whoAreYouReply"].play();

    // Simulate text typing
    $timeout(function() {
      simulateText("Who are you, what do you want???!!?!???")
    }, 1000);

    $scope.selectedEmail.showPrimary = false;
  }

  function simulateText(text) {
    if (text.length == 0) {
      $timeout(function() {
        $scope.replyContent = "";
        $scope.replySent = true;
        canOpenEmails = true;
      }, 1000);
      addEmail(50, "UNKNOWN EMAIL", "No subject", false, "YOU KNOW WHO WE ARE. YOU KNOW WHAT WE WANT.", "", youKnowEmail);
      return;
    }

    $scope.replyContent += text[0];
    text = text.substring(1);

    $timeout(function() {
      simulateText(text);
    }, Math.random() * 200);
  }
});