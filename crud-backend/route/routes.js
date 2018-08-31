var express = require('express')
var router = express.Router()
const item = require('../model/shoppingItem')

router.get('/item', (req, res, next)=> {
  item.find(function(err, item) {
    if(err) {
      res.json(err)
    } else {
      res.json(item)
    }
  })
})

router.post('/item', (req, res, next)=> {
  let newshoppingItem = new item({
    itemName: req.body.itemName,
    itemQuantity:req.body.itemQuantity,
    itemBought:req.body.itemBought
  });

  newshoppingItem.save((err, item) => {
    if(err) {
      res.json(err)
    } else {
      res.json({msg: 'item has been added successfully'})
    }
  })

})

router.put('/item/:id', (req, res, next)=> {
  item.findOneAndUpdate({_id:req.params.id}, {
    $set:{
      itemName: req.body.itemName,
      itemQuantity:req.body.itemQuantity,
      itemBought:req.body.itemBought
    }
  }, (err, result) =>{
      if(err) {
        res.json(err)
      } else {
        res.json({msg:'item updated'})
      }
    })
})

router.delete('/item/:id', (req, res, next)=> {
  item.remove({_id:req.params.id},(err,response) => {
    if(err) {
      res.json(err)
    } else {
      res.json({msg:'item deleted'})
    }
  })
})

module.exports = router
