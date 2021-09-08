import express from 'express';
import BodyParser from 'body-parser';
import CORS from 'cors';
const app = express();
app.use(BodyParser.json());
app.use(CORS());
const PORT = process.env.PORT || 5000;
const users = [];
app.get('/', (req, res) => {
  users.push("New Login");
  res.send(JSON.stringify(users));
}); //register 

app.post('/register', (req, res) => {
  const email = req.query.email;
  const password = req.query.password;
  users.push({
    email: req.body.email,
    password: req.body.password
  });
  res.send("Register Success");
  console.log(users);
}); //login
//if the request matches with the email && password matches with the ones stored in the array, then result is success, else is fail.

app.get('/login', (req, res) => {
  if (req.query.email && req.query.password) {
    //instance var 
    //finding the element that exist in the arry .find()
    const result = users.find(instance => {
      if (instance.email === req.query.email && instance.password === req.query.password) {
        return true;
      }

      return false;
    });

    if (result) {
      res.send("Login Successful");
    } else {
      res.send("Login Failed");
    }

    return;
  }

  console.log("failed");
  res.send("Login Failed");
  return;
}); // app.post('/signup', (req, res) => {
//     if (req.body.email && req.body.password) {
//         logins.push({
//             email: req.body.email,
//             password: req.body.password,
//         });
//     }
//     res.send(JSON.stringify(logins));
// });

app.get('/profile', (req, res) => {
  res.render('homePage.js');
}); //static 

app.listen(PORT, () => console.log(`Server started on ${PORT}`));