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

User.hasMany(Comments,{
  foreignKey:'user_id',
  onDelete:'CASCADE'
})

BlogPost.hasMany(Comments,{
  foreignKey:'user_id',
  onDelete:'CASCADE'
})

module.exports = { User, BlogPost, Comments};