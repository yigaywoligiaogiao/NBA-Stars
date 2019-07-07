const { User } = require('./model/User');
const { Post } = require('./model/Post');
const { Comment } = require('./model/Comment');

(async () => {

    const users = await User.find();
    const posts = await Post.find();

    posts.forEach(post => {
        users.forEach(async user => {
            await Comment.create({
                author: user._id,
                post: post._id,
                content: `这是"${user.nickName}在文章《${post.title}》上发表的评论`,
                state: Math.random() < 0.5 ? 0 : 1
            });
        });
    });

})();