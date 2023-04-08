const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogPostData = await BlogPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogPostData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a blog post by id
  try {
    const updatedBlogPost = await BlogPost.update(
      {
        // All the fields you can update and the data attached to the request body.
        title: req.body.title,
        body: req.body.body
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json(updatedBlogPost);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;