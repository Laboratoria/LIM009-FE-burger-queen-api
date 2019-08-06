const products = require('../models/modelProducts');
const pagination = require('../utils/pagination')

module.exports.getProducts = async(req, resp, next) => {
    let limitPage = parseInt(req.query.limit) || 10;
    let page = parseInt(req.query.page) || 1;
    let protocolo = `${req.protocol}://${req.get('host')}${req.path}`;
    products.find().count().then((number) => {
        resp.set('link', pagination(protocolo, page, limitPage, number))
    });
    const result = await products.find().skip((page - 1) * limitPage).limit(limitPage).exec()
    return resp.send(result);
}

module.exports.getProductById = (req, resp, next) => {
    products.findOne({ _id: req.params.productId }, (err, productById) => {
        if (err || !productById) {
            return next(404)
        }
        resp.send(productById);
    })
}

module.exports.postProduct = async(req, resp, next) => {
    try{
        if (!req.body.name || !req.body.price) {
            return next(400)
        }

        /*Primero, como administrador debo poder crear productos*/
        let newProduct = new products({
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
            type: req.body.type
        });

        const productSave = await newProduct.save()
        console.log(productSave)
        return resp.send(productSave);
        
    } catch(e) {
        return next(err)
    }
}


module.exports.putProductById = (req, resp, next) => {
    if (!req.body) {
        return next(400)
    }
    products.findOne({ _id: req.params.productId }, (err, productById) => {
        if (err) {
            return next(404)
        }
        if (req.body.name) {
            productById.name = req.body.name
        }
        if (req.body.price) {
            productById.price = req.body.price
        }
        if (req.body.image) {
            productById.image = req.body.image
        }
        if (req.body.type) {
            productById.type = req.body.type
        }
        productById.save((err, productStored) => {
            if (err) {
                return next(400)
            }
            resp.send(productStored)
        });
    })
}

module.exports.deleteProductById = (req, resp, next) => {
    products.findByIdAndRemove(req.params.productId, (err, product) => {
        if (err) {
            return next(404)
        }
        // console.log(resp.status)
        resp.send({
            message: 'Se borro satisfactoriamente!',
        });
    })

}





