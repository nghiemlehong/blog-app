const { Post } = require('../models/post.model');
const { User } = require('../models/user.model');
const { Comment } = require('../models/comment.model');
const { Tag } = require('../models/tag.model');
const { checkObjectId } = require('../helpers/checkObjectId');
const { MyError } = require('../models/my-error.model');
const { format } = require('util');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
    projectId: "blog2-45cf5",
    keyFilename: "app/blog2-45cf5-firebase-adminsdk-tjvdv-06acd31d4e.json"
});

const bucket = storage.bucket("blog2-45cf5.appspot.com");

class PostService {
    static getAll() {
        const populateObject = {
            path: 'comments',
            populate: { path: 'author', select: 'name and avatar' }
        };

        return Post.find({}).sort({ _id: -1 })
            .populate('author', 'name and avatar')
            .populate('tag', 'name')
            .populate(populateObject);

    }

    static async getOne(_id) {
        try {
            const populateObject = {
                path: 'comments',
                populate: { path: 'author', select: 'name and avatar' }
            };
            const post = await Post.findOne({ _id })
                .populate('author', 'name and avatar')
                .populate('tag', 'name')
                .populate(populateObject);
            if (!post) throw new MyError("CAN_NOT_FIND_POST", 404)
            return post
        } catch (error) {
            throw new MyError('CAN_NOT_FIND_POST', 404);
        }

    }

    static async getPostByIdUser(idUser) {
        checkObjectId(idUser);
        const populateObject = {
            path: 'comments',
            populate: { path: 'author', select: 'name and avatar' }
        };
        const query = { author: idUser }
        const posts = await Post.find(query)
            .populate('author', 'name and avatar')
            .populate('tag', 'name')
            .populate(populateObject);
        return posts;
    }

    static async pagination(page) {
        let perPage = 5
        const populateObject = {
            path: 'comments',
            populate: { path: 'author', select: 'name and avatar' }
        };
        const posts = await Post
            .find({})
            .populate('author', 'name and avatar')
            .populate('tag', 'name')
            .populate(populateObject)
            .sort({ _id: -1 })
            .skip((perPage * page) - perPage)
            .limit(perPage)
        return posts
    }

    static async getNewPost(limit) {

        const posts = await Post
            .find({})
            .populate('author', 'name and avatar')
            .sort({ _id: -1 })
            .limit(parseInt(limit))
        return posts
    }

    static async favoritesList(idUser, page) {
        let perPage = 5
        const populateObject = {
            path: 'comments',
            populate: { path: 'author', select: 'name and avatar' }
        };
        const posts = await Post
            .find({ fans: idUser })
            .populate('author', 'name and avatar')
            .populate('tag', 'name')
            .populate(populateObject)
            .skip((perPage * page) - perPage)
            .limit(perPage)
        return posts
    }

    static async createPost(idUser, idTag, title, date, image, mainContent, content) {
        if (!title) throw new MyError('TITLE_MUST_BE_PROVIDED', 400);
        if (!content) throw new MyError('CONTENT_MUST_BE_PROVIDED', 400);
        if (!date) throw new MyError('DATE_MUST_BE_PROVIDED', 400);
        if (!mainContent) throw new MyError('MAIN_CONTENT_MUST_BE_PROVIDED', 400);
        if (!idTag) throw new MyError('ID_TAG_MUST_BE_PROVIDED', 400);
        let urlImage = "";
        if (image) {
            let newFileName = `images/${image.originalname}_${Date.now()}`;
            let fileUpload = bucket.file(newFileName);
            const uuid = '123';
            const blobStream = fileUpload.createWriteStream({
                metadata: {
                    contentType: image.mimetype,
                    metadata: {
                        firebaseStorageDownloadTokens: uuid
                    }
                }
            });
            blobStream.on('error', (error) => {
                throw new MyError('CAN_NOT_UPLOAD_IMAGE', 400);
            });
            blobStream.on('finish', () => {
                // The public URL can be used to directly access the file via HTTP.
                const url = format("https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(newFileName) + "?alt=media&token=" + uuid);

            });
            blobStream.end(image.buffer);
            urlImage = format("https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(newFileName) + "?alt=media&token=" + uuid);
        }

        const post = new Post({ content, author: idUser, title, tag: idTag, date, mainContent, image: urlImage });
        await User.findByIdAndUpdate(idUser, { $push: { posts: post._id } });
        const tag = await Tag.findByIdAndUpdate(idTag, { $push: { posts: post._id } });
        if (!tag) throw new MyError('CANNOT_FIND_TAG', 404);
        await post.save();
        return Post.populate(post, { path: "author", select: 'name and avatar' })
    }

    static async updatePost(idUser, _id, idTag, title, date, mainContent, content, image) {
        if (!content) throw new MyError('CONTENT_MUST_BE_PROVIDED', 400);
        if (!date) throw new MyError('DATE_MUST_BE_PROVIDED', 400);
        if (!mainContent) throw new MyError('MAIN_CONTENT_MUST_BE_PROVIDED', 400);
        if (!idTag) throw new MyError('ID_TAG_MUST_BE_PROVIDED', 400);
        if (!title) throw new MyError('TITLE_MUST_BE_PROVIDED', 400);
        checkObjectId(_id, idUser);
        const query = { _id, author: idUser };
        const oldPost = await Post.findOne(query);
        const oldPostInfo = oldPost.toObject();
        let urlImage = oldPostInfo.image;
        if (image) {
            let newFileName = `images/${image.originalname}_${Date.now()}`;
            let fileUpload = bucket.file(newFileName);
            const uuid = '123';
            const blobStream = fileUpload.createWriteStream({
                metadata: {
                    contentType: image.mimetype,
                    metadata: {
                        firebaseStorageDownloadTokens: uuid
                    }
                }
            });
            blobStream.on('error', (error) => {
                throw new MyError('CAN_NOT_UPLOAD_IMAGE', 400);
            });
            blobStream.on('finish', () => {
                // The public URL can be used to directly access the file via HTTP.
                const url = format("https://firebasestorage.googleapis.com/v0/b/"
                    + bucket.name
                    + "/o/"
                    + encodeURIComponent(newFileName)
                    + "?alt=media&token=" + uuid);

            });
            blobStream.end(image.buffer);
            urlImage = format("https://firebasestorage.googleapis.com/v0/b/"
                + bucket.name
                + "/o/" + encodeURIComponent(newFileName)
                + "?alt=media&token=" + uuid);
        }
        const populateObject = {
            path: 'comments',
            populate: { path: 'author', select: 'name and avatar' }
        };
        const post = await Post.findOneAndUpdate(query,
            { date, title, mainContent, content, image: urlImage, tag: idTag },
            { new: true })
            .populate('author', 'name and avatar')
            .populate('tag', 'name')
            .populate(populateObject);
        if (!post) throw new MyError('CANNOT_FIND_POST', 404);
        await Tag.findByIdAndUpdate(oldPostInfo.tag, { $pull: { posts: _id } });
        await Tag.findByIdAndUpdate(idTag, { $push: { posts: post._id } });
        return post;
    }

    static async deletePost(idUser, _id,) {
        checkObjectId(_id, idUser);
        const query = { _id, author: idUser };
        const post = await Post.findOneAndDelete(query);
        if (!post) throw new MyError('CANNOT_FIND_POST', 404);
        const postInfo = post.toObject();
        await Comment.deleteOne({ _id: { $in: post.comments } });
        await User.findByIdAndUpdate(idUser, { $pull: { posts: _id } });
        await Tag.findByIdAndUpdate(postInfo.tag, { $pull: { posts: _id } });
        return postInfo;
    }
    static async likePost(idUser, _id) {
        checkObjectId(idUser, _id);
        const queryObject = { _id, fans: { $ne: idUser } };
        const populateObject = {
            path: 'comments',
            populate: { path: 'author', select: 'name and avatar' }
        };
        const post = await Post.findOneAndUpdate(queryObject, { $addToSet: { fans: idUser } }, { new: true })
            .populate('author', 'name and avatar')
            .populate('tag', 'name')
            .populate(populateObject);
        if (!post) throw new MyError('CAN_NOT_FIND_POST', 404);
        return post;
    }
    static async dislikePost(idUser, _id) {
        checkObjectId(idUser, _id);
        const queryObject = { _id, fans: { $eq: idUser } };
        const populateObject = {
            path: 'comments',
            populate: { path: 'author', select: 'name and avatar' }
        };
        const post = await Post.findOneAndUpdate(queryObject, { $pull: { fans: idUser } }, { new: true })
            .populate('author', 'name and avatar')
            .populate('tag', 'name')
            .populate(populateObject);
        if (!post) throw new MyError('CANNOT_FIND_POST', 404);
        return post;
    }

    static async uploadImage(image) {
        if (!image) throw new MyError('IMAGE_NOT_FOUND', 400);
        let newFileName = `uploads/${image.originalname}_${Date.now()}`;
        let fileUpload = bucket.file(newFileName);
        const uuid = '123';
        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: image.mimetype,
                metadata: {
                    firebaseStorageDownloadTokens: uuid
                }
            }
        });
        blobStream.on('error', (error) => {
            throw new MyError('CAN_NOT_UPLOAD_IMAGE', 400);
        });
        blobStream.on('finish', () => {
            // The public URL can be used to directly access the file via HTTP.
            const url = format("https://firebasestorage.googleapis.com/v0/b/"
                + bucket.name
                + "/o/"
                + encodeURIComponent(newFileName)
                + "?alt=media&token=" + uuid);

        });
        blobStream.end(image.buffer);
        let urlImage = format("https://firebasestorage.googleapis.com/v0/b/"
            + bucket.name
            + "/o/" + encodeURIComponent(newFileName)
            + "?alt=media&token=" + uuid);
        return urlImage
    }

}
module.exports = { PostService };