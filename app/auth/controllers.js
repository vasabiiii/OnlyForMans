// const sendMail = require("../utils/sendMail")
// const AuthCode =require('./AuthCode')
// const Role = require('./Role')
// const User=require('./User')

// const jwt = require('jsonwebtoken');
// const {jwtOptions} = require('./passport');
// const { where } = require("sequelize");


const AuthCode = require('./AuthCode')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const User = require('./User')
const Role = require('./Role')
const {jwtOptions} = require('./passport');
const Company = require('./Company');
const sendEmail = require('../utils/sendMail')

const sendVerificationEmail=(req,res)=>{
    console.log(req.body)
    const code="HH"+Date.now()
    
    AuthCode.create({
        email:req.body.email,
        code:code,
        valid_till: Date.now() + 120000
    })
    
    sendEmail(req.body.email,"Код авторизации для hh.kz",code)
    res.status(200).end()
    // res.send('Mail SENDED')
}

const verifyCode=async(req,res)=>{
    const authCode=await AuthCode.findOne(
        {where:{email: req.body.email},
        order:[['valid_till','DESC']] } 
    )
    if (!authCode){
        // console.log(1,typeof(1))
        res.status(401).send({error:"EMAIL NOT FOUND"})
    }else if((new Date(authCode.valid_till).getTime()) < Date.now()){
        // console.log(2)
        // console.log(new Date(authCode.valid_till).getTime())
        // console.log(Date.now())
        res.status(401).send({error:"время прошло"})
    }else if(authCode.code !== req.body.code){
        // console.log(3)
        res.status(401).send({error:"код не совпадает"})
    }
    else{
        console.log(4)
        const role = await Role.findOne({where:{name: 'employee'}})
        let user = await User.findOne({where: {email: req.body.email}})
        if(!user){
            user=await User.create({
                roleId: role.id,
                email: req.body.email
            })
         }

        const token = jwt.sign({
            id: user.id,
            email: user.email,
            full_name: user.full_name,
            phone: user.phone,
            role: {
                id: role.id,
                name: role.name
            }
        }, jwtOptions.secretOrKey,
        {
            expiresIn: 24 * 60 * 60 * 365
        });
        res.status(200).send({token});


        // res.status(200).send(user)
    }

    // if(){

    // }
}   

const signUp = async (req, res) =>{
    try {
        const role = await Role.findOne({
            where: {
                name: 'manager'
            }
        })
        
        const company = await Company.create({
            name: req.body.company_name,
            description: req.body.company_description,
            address: req.body.company_address,
            logo: '/company/' + req.file.filename
        })
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        await User.create({
            email: req.body.email,
            full_name: req.body.full_name,
            password: hashedPassword,
            companyId: company.id,
            roleId: role.id,
        })

        res.status(200).end();
    } catch (error) {
        res.status(500).send(error)
    }
}

const logIn = async (req, res) =>{
    try {
        if(
            !req.body.email
            || req.body.email.length === 0
            || !req.body.password
            || req.body.password.length === 0){
                res.status(401).send({message: "Bad credentials"})
            }else{
                const user = await User.findOne({
                    where: {
                        email: req.body.email
                    }
                })
                if(!user) return res.status(401).send({message: "User with that email is not exists"})

                const isMatch = await bcrypt.compare(req.body.password, user.password)
                if(isMatch){
                    const role = await Role.findByPk(user.roleId)
                    const token = jwt.sign({
                        id: user.id,
                        email: user.email,
                        full_name: user.full_name,
                        phone: user.phone,
                        role: {
                            id: role.id,
                            name: role.name
                        }
                    }, jwtOptions.secretOrKey, {
                        expiresIn: 24 * 60 * 60 * 365
                    });
                    res.status(200).send({token});
                }else{
                    res.status(401).send({message: "Password is incorrect"})
                }
            }
    } catch (error) {
        res.status(500).send(error)
    }      
}

module.exports={
    sendVerificationEmail,
    verifyCode,
    signUp,
    logIn
}