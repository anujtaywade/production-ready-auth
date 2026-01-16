const bcrypt = require("bcrypt")


exports.signup =async (req,res) => {
    try {
        const {name , email , password  }  = req.body ; //add any feild if required
        
        if(!name || !email || !password){
            return res.status(400).json({message : "All Feilds are mandatory"}) //validate all feilds
        }  

        const existingUser = await user.findOne({email}); // check if user already exist
        if (existingUser) {
            return res.status(409).json({message : "User already exist"})
        }

        const hashPassword = await bcrypt.hash(password , 10)

        const newUser = await user.create({    //create new user
            name,
            email,
            password :hashPassword,
        })
        res.status(201).json({message : "User created successfully",
            user : {
                id : newUser._id ,
                email : newUser.email,
                createdAt : newUser.createdAt
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Internal Server error"})
    }
}


exports.login = async (req,res) => {
    try {
        const {email , password} = req.body   // take crenditional for req.body 

    if (!email || !password) {
        res.status(409).json({message : "All feilds are mandatory"})    // validate the crenditionals
    }

    const existingUser = await User.findOne({email})   // find the user in database

    if (!existingUser) {
        res.status(409).json({message : "User not found"})  // check if exist 
    }

    const isMatch = await bcrypt.compare(password , existingUser.password)  // compare harshed password
    if(!isMatch) {
        res.status(401).json({message : "invalid password"})
    }
    } catch (error) {
        console.log(error)
        res.status(500).json({message : " Internal server error"})
    }
}


exports.logout= async (req,res) => {
    try {
        res.status(200).json({message : "logout sccessful"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Internal server"})
    }
}