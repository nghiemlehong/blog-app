const {MyError} = require('../models/my-error.model');
const {Tag}  = require('../models/tag.model')

class TagService {
    static async createTag(name)
    {
        if(!name) throw new MyError('NAME_MUST_BE_PROVIDED', 400);
        const tag = new Tag ({name});
        await tag.save();
        return tag
    }

    static async getAll()
    {
         return Tag.find({}).sort({ _id: -1 });
    }

    static async getPostByIdTag(_id){
        try {
            const tag = await Tag.findOne({_id})
            .populate('posts')
            if(!tag) throw new MyError("CAN_NOT_FIND_TAG",404)
            return tag
        } catch (error) {
            throw new MyError('CAN_NOT_FIND_TAG',404);
        }
    }
}
module.exports = {TagService};