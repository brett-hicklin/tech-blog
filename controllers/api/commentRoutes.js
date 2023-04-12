const router = require('express').Router();
const {Comments} = require('../../models');
const withAuth = require('../../utils/auth');

//creates a comment
router.post("/",withAuth, async (req, res) => {
    
    try {
      const comment = await Comments.create(
        {
          
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