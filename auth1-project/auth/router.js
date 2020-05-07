const bcrypt = require("bcryptjs");

const router = require("express").Router();

const model = require("../users/users-model");

router.post("/register", (req, res) => {
    const userInfo = req.body;

    const ROUNDS = process.env.HASHING_ROUNDS || 8;
    const hash = bcrypt.hashSync(userInfo.password, ROUNDS)

    userInfo.password = hash;

    model.add(userInfo)
      .then(user => {
        res.json(user);
      })
      .catch(err => res.send(err));
  });

  router.post("/login", (req, res) => {
    const { username, password } = req.body;

    model.findBy({ username })
    .then(([user]) => {
        if(user && bcrypt.compareSync(password, user.password)) {
            req.session.user = {
                id: user.id,
                username: user.username
            };
            
            res.status(200).json({ hello: user.username });
        } else {
            res.status(401).json({ message: "invalid credentials" });
        }
    }).catch(error => {
        res.status(500).json({ errormessage: "error finding the user" });
    })
  })

  router.get("/logout", (req, res) => {
      if(req.session) {
        req.session.destroy(error => {
            if(error) {
                res.status(500).json({ message: "you can checkout any time you like, but you can't never leave!" })
            } else {
                res.status(200).json({ message: "logged out successfully" })
            }
        });
      } else {
          res.status(200).json({ message: "I don't know you" })
      }
  })
  
  module.exports = router;