const auth = async(req,res,next)=>{
    const log=req.session.loggedin
    if(log){

        next();

    }
    else{
        res.status(300).redirect("/login")
    }


}

module.exports = auth;