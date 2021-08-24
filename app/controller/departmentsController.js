const Department = require('../model/departments')

module.exports.list = (req, res)=>{
    Department.find({userId: req.user._id})
    .then(dept =>{
        res.json(dept)
    })
    .catch(err =>{
        res.json(err)
    })
}

module.exports.create = (req, res)=>{
    const body = req.body
    const department = new Department(body)
    department.userId = req.user._id
    department.save()
    .then(dept =>{
        res.json(dept)
    })
    .catch(err =>{
        res.json(err)
    })
}

module.exports.show = (req, res)=>{
    const id = req.params.id
    Department.findOne({_id: id, userId: req.user._id})
    .then(dept =>{
        res.json(dept)
    })
    .catch(err =>{
        res.json(err)
    })
}

module.exports.edit = (req, res)=>{
    const id = req.params.id
    const body = req.body
    Department.findOneAndUpdate({_id: id, userId: req.user._id}, body, {new: true, runValidators: true})
    .then(dept =>{
        res.json(dept)
    })
    .catch(err =>{
        res.json(err)
    })
}

module.exports.remove = (req, res)=>{
    const id = req.params.id
    Department.findOneAndDelete({_id: id, userId: req.user._id})
    .then(dept =>{
        if(dept){
            res.json(dept);
        }
        else{
            res.json({})
        }
    })
    .catch(err =>{
        res.json(err)
    })
}