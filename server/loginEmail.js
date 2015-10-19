Meteor.startup(function () {

  Accounts.passwordless.emailTemplates.sendVerificationCode = {
    subject: function (code) {
      return "Your verification code is " + code + " for " + Accounts.passwordless.emailTemplates.siteName;
    },
    text: function (user, code, selector, options) {

      var greeting = (user && user.username) ? ("Hello " + user.username + ",") : "Hello,";

      var loginURL = Meteor.absoluteUrl().replace(/^https?:\/\//, '').replace(/\/$/, '') + '/login/';
      loginURL += encodeURIComponent(selector) + '/' + code;

      if (options && options.length == 2) {
        // options come from client and must be checked
        check(options[0], String);
        check(options[1], String);
        loginURL +=  '/' + options[0] + '/' + options[1];
      }

      return greeting + "\n"
        + "\n"
        + "You can login directly by clicking this <a href='" + loginURL + "'>link</a>\n"
        + "\n"
        + "Thanks.\n";
    }
  };
});
