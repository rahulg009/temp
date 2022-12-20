const productController = require('../controllers/product.controller.js')

const router = require('express').Router()


router.post('/addproduct', productController.addProduct)

router.get('/allproduct', productController.getAllProducts)

router.get('/published', productController.getPublishedProduct)

router.get('/:id', productController.getOneProduct)

router.put('/:id', productController.updateProduct)

router.delete('/:id', productController.deleteProduct)

module.exports = router