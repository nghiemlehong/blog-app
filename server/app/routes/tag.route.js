const express = require('express');
const {TagService} = require('../services/tag.service');
const {mustBeUser} = require('./mustBeUser.middleware');

const tagRouter = express.Router();

tagRouter.post("/",(req, res)=>{
    const {name} = req.body;
    TagService.createTag(name)
    .then(tag => res.send({success : true , tag}))
    .catch(res.onError)
});

tagRouter.get("/",(req,res)=>{
   TagService.getAll()
   .then(tags => res.send({success: true, tags}))
})

tagRouter.get("/:_id",(req,res)=>{
    const {_id} = req.params;
    TagService.getPostByIdTag(_id)
    .then(tag => res.send({success : true , tag}))
    .catch(res.onError)
})

module.exports = {tagRouter};