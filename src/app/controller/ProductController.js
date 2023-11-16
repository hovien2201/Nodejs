const Product = require('../models/Product')
const TypeProduct = require('../models/TypeProduct')

class ProductController {
    list(req, res, next) {
        Product.find()
            .populate('type')
            .then(product => {
                // console.log(product)
                res.render('list', { product: product.map(item => item.toObject()) })
            })
            .catch(err => console.log(err))
    }
    delete(req, res, next) {
        const productId = req.params.id;
        Product.deleteOne({ _id: productId })
            .then(() => {
                res.redirect("/");
            })
            .catch((error) => {
                res.status(500).json({ error: error.message });
            });
    }
    create(req, res, next) {
        TypeProduct.find()
            .then(type => {
                res.render('create', { types: type.map(item => item.toObject()) })
            })
            .catch(err => console.log(err))
    }
    save(req, res, next) {
        const image = req.file? req.file.filename :""
        const { name, price, typeid } = req.body;
        const product = new Product({
            name: name,
            price: price,
            type: typeid,
            image :image
        });

        product.save()
            .then(() => {
                res.redirect('/');
            })
            .catch((err) => {
                if (err.name === 'ValidationError') {
                    // Xử lý lỗi validate
                    const errors = [];
                    for (let field in err.errors) {
                        errors[field] = err.errors[field].message
                    }
                    let types = []
                    let products = req.body
                    TypeProduct.find()
                        .then(type => {
                            res.render('create', { product: products, errors: errors, types: type.map(item => item.toObject()) });
                        })
                        .catch(err => console.log(err))
                } else {
                    // Xử lý các lỗi khác
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            });
    }
    edit(req, res, next) {
        const productId = req.params.id;
        Product.findOne({ _id: productId })
            .then(product => {
                console.log(product)
                TypeProduct.find()
                    .then(type => {
                        let products =product;
                        console.log(products)
                        res.render('update', {product:products.toObject(), types: type.map(item => item.toObject()) })
                    })
                    .catch(err => console.log(err))
            })
            .catch((error) => {
                
                res.status(500).json({ error: error.message });
            });

    }
    saveEdit(req, res, next) {
        const image = req.file? req.file.filename :""
        const productId = req.params.id;
        const { name, price, typeid } = req.body;
        const product = new Product({
            _id:productId,
            name: name,
            price: price,
            type: typeid,
            image :image
        });

        product.updateOne(product, { runValidators: true })
            .then(() => {
                console.log(product)
                res.redirect('/');
            })
            .catch((err) => {
                if (err.name === 'ValidationError') {
                    // Xử lý lỗi validate
                    const errors = [];
                    for (let field in err.errors) {
                        errors[field] = err.errors[field].message
                    }
                    let products = product
                    console.log(products)
                    TypeProduct.find()
                        .then(type => {
                            res.render('update', { product: products.toObject(), errors: errors, types: type.map(item => item.toObject()) });
                        })
                        .catch(err => console.log(err))
                } else {
                    // Xử lý các lỗi khác
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            });
    }

}
module.exports = new ProductController()