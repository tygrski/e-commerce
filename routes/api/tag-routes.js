const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll ({
    attributes: [
      "id",
      "tag_name"
    ],
    include: [
      {
      model: Category,
      attributes: ['category_id', 'category_name']
      
      }, 
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"]
      }
    ]
  }).then(data =>  res.json(data))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: ["tag_name"],
    include: [
      {
      model: Category,
      attributes: ['category_id', 'category_name']
      
      }, 
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"]
      }
    ]
  })
  .then(data => {
    if(!data) {
      res.status(404).json({ message: "no tag found with that id"})
    }  res.json(data)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tagname: red.body.tag_name
  }).then(data =res.json(data))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tagname: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(data => {
    if (!data) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(data);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(data => {
    if (!data) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(data);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
