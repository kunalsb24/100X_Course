const { Router } = require("express");
const adminRouter = Router();
const jwt = require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD} = require("../config");
const {AdminModel, CourseModel} = require("../db");
const { adminMiddleware } = require("../middlewares/admin");

adminRouter.post('/sign-up', async function(req, res){
    const { email, password, firstName, lastName } = req.body; // TODO: Adding zod validation
        // TODO: hash the password so plaintext pw is not stored in db
    
        // Put inside try catch block
        await AdminModel.create({
            email,
            password,
            firstName,
            lastName
        })
    
        res.json({
            message: "Admin Signup succeeded"
        })
})

adminRouter.post('/sign-in', async function(req, res){
    const { email, password } = req.body;

    const admin = await AdminModel.findOne({
        email,
        password
    });

    if(admin){
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_PASSWORD);

        res.json({
            token: token,
            message: "You are successfully signed-in"
        })
    } else {
        res.status(403).json({
        message: "Incorrect Admin Credentials"
    })
    }
})

//lets an admin create a course
adminRouter.post('/course', adminMiddleware, async function(req, res){
    const adminId = req.userId;

    const { title, description, imageUrl, price } = req.body;

    const course = await CourseModel.create({
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        creatorId: adminId
    })

    res.json({
        message: "Course created",
        courseId: course._id
    })
})

adminRouter.put('/course', adminMiddleware, async function(req, res){
    const adminId = req.userId;

    const { title, description, imageUrl, price, courseId } = req.body;

    const course = await CourseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    }, {
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
    })

    res.json({
        message: "Course Updated",
        courseId: course._id
    })
})

adminRouter.get('/course/bulk',adminMiddleware, async function(req, res){
    const adminId = req.userId;

     const courses = await CourseModel.find({
        creatorId: adminId
    });
    res.json({
        message: "Course List",
        courses
    })
})

module.exports = {
    adminRouter: adminRouter
}


