const {Router} = require('express');
const {PostService} =  require('../services/post.service');
const { mustBeUser } = require('../routes/mustBeUser.middleware');
const Multer = require('multer');

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    }
});

const postRouter = Router();


postRouter.get('/',(req,res)=>{
    PostService.getAll()
    .then(posts => res.send({success : true, posts}));
});

postRouter.get('/:_id',(req,res)=>{
    const {_id} = req.params;
    PostService.getOne(_id)
    .then(post=>res.send({success:true, post}))
    .catch(res.onError)
})

postRouter.use(mustBeUser);

postRouter.patch('/', (req, res) => {
    PostService.getPostByIdUser(req.idUser)
        .then(posts => res.send({ success: true, posts }))
        .catch(res.onError)
})

postRouter.post('/',multer.single('file'),(req,res)=>{
    const {title,content,idTag,date, mainContent} = req.body;
    PostService.createPost(req.idUser,idTag,title,date,req.file,mainContent,content)
    .then(postInfo => res.send({success : true, post : postInfo}))
    .catch(res.onError)
});

postRouter.put('/:_id',multer.single('file'),(req,res)=>{
    const {content,title, idTag, date,mainContent} = req.body;
    PostService.updatePost(req.idUser,req.params._id,idTag,title,date, mainContent,content, req.file)
    .then(post => res.send({success:true,post}))
    .catch(res.onError);
})

postRouter.delete('/:_id',(req,res)=>{
    PostService.deletePost(req.idUser,req.params._id)
    .then(post => res.send({success:true,post}))
    .catch(res.onError);

})

postRouter.post('/like/:_id',(req,res)=>{
    const {_id} = req.params;
    PostService.likePost(req.idUser,_id)
    .then(postInfo => res.send({success : true, post : postInfo }))
    .catch(res.onError);
})

postRouter.post('/dislike/:_id', (req, res) => {
    const { _id } = req.params;
    console.log(_id);
    PostService.dislikePost(req.idUser, _id)
    .then(postInfo => res.send({ success: true, story: postInfo }))
    .catch(res.onError);
});

module.exports = {postRouter};