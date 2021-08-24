const Customer = require('../model/customers')

module.exports.create = (req, res)=>{
    const body = req.body
    const customer = new Customer(body)
    customer.userId = req.user._id
    customer.save()
    .then(cust =>{
        res.json(cust)
    })
    .catch(err =>{
        res.json(err)
    })
}

module.exports.list = (req, res)=>{
    Customer.find({ userId: req.user._id })
      .then((cust) => {
        res.json(cust);
      })
      .catch((err) => {
        res.json(err);
      });
}

module.exports.show = (req, res)=>{
    const id = req.params.id
    Customer.findOne({_id: id, userId: req.user._id})
    .then(cust =>{
        res.json(cust)
    })
    .catch(err =>{
        res.json(err)
    })
}

module.exports.edit = (req, res)=>{
    const id = req.params.id
    const body = req.body
    Customer.findOneAndUpdate({_id: id, userId: req.user._id}, body, {new: true, runValidators: true})
    .then(cust =>{
        res.json(cust)
    })
    .catch(err =>{
        res.json(err)
    })
}

module.exports.remove = (req, res)=>{
    const id = req.params.id
    Customer.findOneAndDelete({_id: id, userId: req.user._id})
    .then(cust =>{
        if(cust)
        {res.json(cust)}
        else
        {res.json({ });}
    })
    .catch(err =>{
        res.json(err)
    })
}

