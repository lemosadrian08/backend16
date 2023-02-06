const { Router } = require("express");
const auth = require('../../middlewares/auth');
const path =require('path');
const passport =require('../../middlewares/passport')
const ProcessInfoController= require('../../controllers/processInfo.controller')
const compression = require('compression')
const webController = require("../../controllers/web.controller")
const router = Router();


router.get('/', webController.renderHome);
router.get('/logout', auth, webController.logout);
router.get('/error', webController.renderError);
router.get('/logIn', webController.renderLogin);
router.get('/logIn-error', webController.renderLoginError);
router.get('/unauthorized', webController.renderUnauthorized);
router.get('/signup-error', webController.renderSignUpError);

router.post('/logIn',
  passport.authenticate('logIn', {
    failureRedirect: '/logIn-error',
    successRedirect: '/'
    })
  );

router.post('/signUp',
    passport.authenticate('signUp', { 
        failureRedirect: '/signUp-error',
        successRedirect: '/logIn'
      })
  );
  


router.get('/info', compression(), ProcessInfoController.processInfoC)


module.exports = router;

