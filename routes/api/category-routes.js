const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


// finding all categories
router.get('/', async (req, res) => {
  try {
    const CategoryData = await Category.findAll(
      {
        include: {
          models: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      }
    );
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(400).json(err);
  }

});

// finding one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const CategoryData = await Category.findOne(
      {
        where: {
          id: req.params.id
        },
        include: {
          models: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      },
    );
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(400).json(err);
  }

});

// creating a new category
router.post('/', async (req, res) => {
  try {
    const CategoryData = await Category.create(
      {
        category_name: req.params.category_name
      },
    );
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});


//updating a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const CategoryData = await Category.update(req.body,
      {
        where: { id: req.params.id }
      },
    )
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// deleting a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const CategoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!CategoryData) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }

    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
