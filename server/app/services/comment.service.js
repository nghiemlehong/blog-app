const {MyError} = require('../models/my-error.model');
const {checkObjectId} = require('../helpers/checkObjectId');
const {Comment} = require('../models/comment.model');
const {Post} = require('../models/post.model')

class CommentService{
    static async createComment(idUser,idPost,content){
        checkObjectId(idPost,idUser);
        if (!content) throw new MyError('INVALID_COMMENT', 400);
        const comment = new Comment({author: idUser, content, post : idPost})
        const updateObj = {$push :{comments : comment._id}};
        const post = await Post.findByIdAndUpdate(idPost,updateObj);
        if(!post) throw  new MyError('CANNOT_FIND_POST',404);
        await comment.save();
        return Comment.populate(comment,{path:'author', select:'name and avatar'});
    }

    static async updateComment(idUser,_id,content)
    {
        checkObjectId(_id,idUser);
        const query = {_id,author:idUser};
        const comment = await Comment.findOneAndUpdate(query,{content},{new :true});
        if(!comment) throw new MyError('CANNOT_FIND_COMMENT',404);
        return Comment.populate(comment,{path:'author', select:'name and avatar'});
    }

    static async removeComment(idUser, _id) {
        checkObjectId(_id, idUser);
        const query = { _id, author: idUser };
        const comment = await Comment.findOneAndRemove(query);
        if (!comment) throw new MyError('CANNOT_FIND_COMMENT', 404);
        await Post.findByIdAndUpdate(comment.post, { $pull: { comments: _id } });
        return Comment.populate(comment,{path:'author', select:'name and avatar'});        
    }

    static async likeComment(idUser, _id) {
        checkObjectId(idUser, _id);
        const queryObject = { _id, fans: { $ne: idUser } };
        const comment = await Comment.findOneAndUpdate(queryObject, { $addToSet: { fans: idUser } }, { new: true });
        if (!comment) throw new MyError('CANNOT_FIND_COMMENT', 404);
        return Comment.populate(comment,{path:'author', select:'name and avatar'});   
    }

    static async dislikeComment(idUser, _id) {
        checkObjectId(idUser, _id);
        const queryObject = { _id, fans: { $eq: idUser } };
        const comment = await Comment.findOneAndUpdate(queryObject, { $pull: { fans: idUser } }, { new: true });
        if (!comment) throw new MyError('CANNOT_FIND_COMMENT', 404);
        return Comment.populate(comment,{path:'author', select:'name and avatar'});   
    }

}
module.exports ={CommentService}