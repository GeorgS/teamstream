FlowRouter.route('/', {
  action() {
    ReactLayout.render(MainLayout, {content: <Login />});
  }
});

FlowRouter.route('/dashboard', {
  action() {
    ReactLayout.render(MainLayout, {content: <App />});
  }
});

FlowRouter.route('/login/:selector/:code', {
  action(params) {
    var options = {
      code: params.code,
      selector: decodeURIComponent(params.selector)
    };

    Meteor.loginWithPasswordless(options, function (error, result) {
        if (error) {
          console.error(error);
        } else {
          // redirect user to your main page.
          FlowRouter.go('/dashboard');
        }
      });
  }
});
