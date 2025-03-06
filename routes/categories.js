var express = require('express');
var router = express.Router();
let categoryModel = require('../schemas/categories');

/* GET categories listing. */
router.get('/', async function(req, res, next) {
  try {
    let categories = await categoryModel.find({});
    res.status(200).send({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

/* POST create a new category */
router.post('/', async function(req, res, next) {
  try {
    let newCategory = new categoryModel({
      name: req.body.name,
      description: req.body.description
    });
    await newCategory.save();
    res.status(200).send({
      success: true,
      data: newCategory
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    });
  }
});

/* PUT update a category */
router.put('/:id', async function(req, res, next) {
  try {
    let updatedCategory = await categoryModel.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, description: req.body.description },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).send({ success: false, message: 'Category not found' });
    }
    res.status(200).send({ success: true, data: updatedCategory });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

/* DELETE a category */
router.delete('/:id', async function(req, res, next) {
  try {
    let deletedCategory = await categoryModel.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).send({ success: false, message: 'Category not found' });
    }
    res.status(200).send({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

module.exports = router;
