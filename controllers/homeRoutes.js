const router = require('express').Router();
const { BlogPost, User, Comments } = require('../models');
const withAuth = require('../utils/auth');

//displays all blog posts on the home page
router.get('/', async (req, res) => {
  try {
    
    const blogPostData = await BlogPost.findAll({
       
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    
    const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));

   
    res.render('homepage', { 
      blogPosts, 
       
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//displays the blog post of the id selected
router.get('/blogpost/:id', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model:Comments,
          attributes:['body','date_created','user_id', 'blog_post_id'],
          include:[
            {model:User,
            attributes:['name'],
            
            }
          ]
        }
      ],
    });

    const blogPost = blogPostData.get({ plain: true });
    console.log('blogPost comments', blogPost.comments)

    res.render('blogPost', {
      ...blogPost,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
  
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: BlogPost }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
  // If the user is already logged in, redirect the request to another route
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/edit/:id', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const blogPost = blogPostData.get({ plain: true });

    res.render('edit', {
      ...blogPost,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;