const express = require('express');
const router = express.Router();
const { Student } = require('../models/mahasiswa');

router.get("/", (req, res, next) => {
    res.render('index');
});

router.get('/students', (req, res) => {
    Student.find({}, (err, data) => {
        if(!err) {
            res.send(data);
        }else console.log(err);
    })
})

router.post('/add', async (req, res, next) => {
    try {
        console.log('Request Body:', req.body); // Log the request body

        // Create a new student instance using the data from the request body
        const newStudent = new Student({
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            parent: req.body.parent,
        });

        // Save the new student to the database
        await newStudent.save();

        res.status(201).json({
            message: 'Student added successfully',
            student: newStudent,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//specific student by id
router.get('/students/:id', (req, res) => {
    Student.findById(req.params.id, (err, data) => {
        if(!err) {
            res.send(data);
        }else console.log(err);
    })
});

// router.put('/students/edit/:id', (req, res) => {
//     const edit = {
//         name: req.body.name,
//         address: req.body.address,
//         phone: req.body.phone,
//         parent: req.body.parent,
//     };
//     Student.findByIdAndUpdate(req.params.id, { $set:edit }, {new:true}, (err, data) => {
//         if(!err){
//             res.status(200).json({ code:200, message: 'Student edited Successfully', updateStudent: data })
//         }else console.log(err)
//     })
// })





router.put('/students/edit/:id', (req, res) => {
    const newStudent = {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        parent: req.body.parent,
    };

    // Use findByIdAndUpdate with the correct callback structure
    Student.findByIdAndUpdate(
        req.params.id,
        { $set: newStudent },
        { new: true },
        (err, data) => {
            if (!err) {
                res.status(200).json({
                    code: 200,
                    message: 'Student edited successfully',
                    updateStudent: data,
                });
            } else {
                console.log(err);
                res.status(500).json({ code: 500, message: 'Internal Server Error' });
            }
        }
    );
});


router.delete('/students/:id', (req, res) => {
    Student.findByIdAndRemove(req.params.id, (err, data) =>{
        if(!err){
            res.status(200).json({ code:200, message: 'Student deleted successfully', deleteStudents: data })
        }else console.log(err)
    })
})

module.exports = router;
