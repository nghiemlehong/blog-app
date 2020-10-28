function mustBeAdmin (req,res,next){
    const {token} = req.headers;
    if(token ==="adjfweiasd;fklajasdfa;ksldjfwifalksdfjas;dlf")
    {
        next();
    }
    else{
        res.status(400).send({ success: false, message: 'INVALID_TOKEN' });
    }
}

module.exports = {mustBeAdmin};