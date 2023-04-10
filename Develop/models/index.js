const User = require('./User');
const BlogPost = require('./BlogPost');
const Comments = require('./Comments')

User.hasMany(BlogPost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

BlogPost.belongsTo(User, {
  foreignKey: 'user_id'
});

// User.hasMany(Comments,{
//   foreignKey:'user_id',
//   onDelete:'CASCADE'
// })

Comments.belongsTo(User,{foreignKey:'user_id'})


BlogPost.hasMany(Comments,{
  foreignKey:'blog_post_id',
  onDelete:'CASCADE'
})

// Comments.belongsTo(BlogPost,{
//   foreignKey:'blog_post_id'
// })

module.exports = { User, BlogPost, Comments};