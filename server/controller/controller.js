let {Comic} = require('../models/index')
let {User} = require('../models/index')
let jwt = require('jsonwebtoken')
class Controller{

    static register(req,res,next){
        User.create({name:req.body.name,email:req.body.email,password:req.body.password})
        .then(data=>{
            res.status(201).json({"201":{data}})
        })
        .catch(err=>{
            res.status(401).json(err)
        })
    }
    
    static login(req,res,next){
        User.findOne({where:{password:req.body.password}})
        .then(data=>{
            if(data){
                var token = jwt.sign({id:data.id,email:data.email},'ini rahasia')
                res.status(200).json(token)
            }
            else{
                let msg = {errorStatus:400,msg:'wrong username or password'}
                next(msg)
            }
            
        })
        .catch(err=>{
            res.status(401).json(err)
        })
    }
    
    static getComic(req,res,next){
        Comic.findAll()
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            
        })
    }

    static updateComic(req,res,next){
        User.findOne({where:{id:req.user.id}})
        .then(data=>{
            if(data){
                return Comic.update({
                    title:req.body.name,
                    author:req.body.email,
                    imageUrl:req.body.imageUrl
                })
            }
            else{
                let msg = {errorStatus:400,msg:'wrong username or password'}
                next(msg)
            }
            
        })
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(401).json(err)
        })
    }

    static findOne(req,res,next){
        Comic.findOne({where:{id:req.params.id}})
        .then(data=>{
            if(data){
                res.status(200).json(data)
            }
            else{
                let msg = {errorStatus:400,msg:'comand not found'}
                next(msg)
            }
        })
    }

}

module.exports=Controller