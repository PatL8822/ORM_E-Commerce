const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// finding all tags
// be sure to include its associated Product data
router.get('/', async (req, res) => {
  try {
    const TagData = await Tag.findAll(
      {
        include: {
          models: Product,
          attributes: ['product_name', 'price', 'stock', 'ProductTag']
        }
      }
    );
    res.status(200).json(TagData);
  } catch { }
});

// finding a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const TagData = await Tag.findOne(
      {
        where: {
          id: req.params.id
        },
        include: {
          models: Product,
          attributes: ['product_name', 'price', 'stock', 'ProductTag']
        }
      },
    );
    res.status(200).json(TagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// creating a new tag
router.post('/', async (req, res) => {
  try {
    const TagData = await Tag.create(
      {
        tag_name: req.body.tag_name
      },
    );
    res.status(200).json(TagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// updating a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const TagData = await Tag.create(req.body,
      {
        where: {
          id: req.body.tag_name
        },
      },
    );
    res.status(200).json(TagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// deleting on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const TagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!TagData) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }

    res.status(200).json(TagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
