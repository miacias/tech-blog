// verifies user is logged in before loading page via route
const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
      res.redirect('/login'); // redirects back to log in page
    } else {
      next(); // continues path
    }
  };
  
module.exports = withAuth;