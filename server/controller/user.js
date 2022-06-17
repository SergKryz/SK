const userModel = require('..//model/user');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const axios = require('axios');



// registering a new user 
module.exports = {
 create: function(req, res, next) {
  
  userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password }, function (err, result) {
      if (err) 
       next(err);
      else
       res.redirect('/')
      
    });
 },//cHECKING IS A USER IN DATABASE
authenticate: function(req, res, next) {
  userModel.findOne({email:req.body.email}, function(err, userInfo){
   if(!req.body.email){
      res.status(404).send({ message : "Not found user with id "+ id})
   }else{
   if(bcrypt.compareSync(req.body.password, userInfo.password)) {
const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
axios.get('http://localhost:3000/api/users')
.then(function(response){
    res.redirect('/main')
})
   }
}
  })
}
}