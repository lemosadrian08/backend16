const { HTTP_STATUS } = require("../constants/api.constants");
const path = require('path')

class WebController {
  
  async renderHome (req, res, next)  {
    const user = req.user;
    try {
        if (user) {
          res.status(HTTP_STATUS.OK).render('index', { sessionUser: user.username ,logout: false});
        }
        else {
          return res.status(HTTP_STATUS.OK).sendFile(path.resolve(__dirname,'../public/login.html'));
        }
    }
    catch(error) {
      next(error);
    }
    }

    async logout (req, res,next)  {
      const user = await req.user;
      try {
        req.session.destroy(error => {
          if (error) {
            res.clearCookie('my-session');
            res.redirect('/')
          }
          else {
            res.clearCookie('my-session');
            return res.sendFile(path.resolve(__dirname,'../public/login.html'));
          }
        })
      }
      catch(error) {
        next(error);
      }
    }

    async renderUnauthorized (req, res,next)  {
      try {
        res.status(401).sendFile(path.resolve(__dirname,'../../public/unauthorized.html'));
      }
      catch(error) {
        next(error);
      }
    }

    async renderError (req, res,next)  {
      try {
        res.status(500).sendFile(path.resolve(__dirname,'../../public/error.html'));
      }
      catch(error) {
        next(error);
      }
    }
    
    async renderRegister (req, res,next)  {
      try {
        return res.sendFile(path.resolve(__dirname,'../../public/register.html'));
      }
      catch(error) {
        next(error);
      }
      
    }

    async renderSignUpError (req, res,next)  {
      try {
        return res.sendFile(path.resolve(__dirname,'../../public/signUp-error.html'));
      }
      catch(error) {
        next(error);
      }
    }

    async renderLoginError (req, res,next)  {
      try {
        return res.sendFile(path.resolve(__dirname,'../../public/logIn-error.html'));
      }
      catch(error) {
        next(error);
      }
    }

    async renderLogin (req, res,next)  {
      try {
        return res.sendFile(path.resolve(__dirname,'../../public/login.html'));
      }
      catch(error) {
        next(error);
      }
    }

  }



  module.exports = new WebController();