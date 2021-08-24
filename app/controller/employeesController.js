const Employee = require('../model/employees')

module.exports.list = (req, res)=>{
    Employee.find({ userId: req.user._id })
      .then((emp) => {
        res.json(emp);
      })
      .catch((err) => {
        res.json(err);
      });
}

module.exports.create = (req, res)=>{
    const body = req.body
    const employee = new Employee(body)
    employee.userId = req.user._id;
    employee.save()
    .then(emp =>{
        res.json(emp)
    })
    .catch(err =>{
        res.json(err)
    })
}

module.exports.show = (req, res)=>{
    const id = req.params.id
    Employee.findOne({ _id: id, userId: req.user._id })
      .then((emp) => {
        res.json(emp);
      })
      .catch((err) => {
        res.json(err);
      });
}

module.exports.edit = (req, res)=>{
    const id = req.params.id
    const body = req.body
    Employee.findOneAndUpdate({_id:id, userId: req.user._id}, body, {new: true, runValidators: true})
    .then(emp =>{
        res.json(emp)
    })
    .catch(err =>{
        res.json(err)
    })
}

module.exports.remove = (req, res)=>{
    const id = req.params.id
    Employee.findOneAndDelete({_id: id, userId: req.user._id})
    .then(emp =>{
        if(emp)
        res.json(emp)
        else
        res.json({})
    })
    .catch(err =>{
        res.json(err)
    })
}