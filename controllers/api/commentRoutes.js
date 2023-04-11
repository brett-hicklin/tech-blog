const router = require('express').Router();
const {Comments} = require('../../models');
const withAuth = require('../../utils/auth');

router.post("/",withAuth, async (req, res) => {
    // creates a comment
    try {
      const comment = await Comments.create(
        {
          // All the fields you can update and the data attached to the request body.
            ...req.body,
          user_id: req.session.user_id,
        },
      );
  
      res.status(200).json(comment);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;