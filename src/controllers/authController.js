const {User} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.register = async(req, res) => {
    try{
        const {name, email, password, designation, mobile_number} = req.body;
        const existingUser = await User.findOne({where : {email}});
        if (existingUser) return res.status(400).json({ message: 'Email already registered' });
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);
        const user = await User.create({userName: name,email,password:hashedpassword,designation,mobileNumber:mobile_number});
        res.status(201).json({ message: 'User registered successfully', user });
    }catch(error){
        res.status(400).json({error: error.message})
    }
};

exports.login = async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({where : {email}});
        if(!user) throw new Error('User not found');
        const  validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) throw new Error("Invalid password");
        const token = jwt.sign({user_id: user.id}, process.env.JWT_SECRET_KEY,{
            expiresIn: '1d'});
        res.status(200).json({ message: "Login successful", token, user });

    } catch(error){
        res.status(400).json({ error: error.message });
    }
}