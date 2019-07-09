// 用户模块
const { Comment } = require('../../../model/Comment');

module.exports = async (req, res) => {
    const id =req.params['id'];
    let result = await Comment.find({post:id}).populate("author")
	res.send(result);
}