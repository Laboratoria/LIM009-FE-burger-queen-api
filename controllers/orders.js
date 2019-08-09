const order = require('../models/modelOrders')
const products = require('../models/modelProducts');
const pagination = require('../utils/pagination');
const mongodb = require('mongodb');

module.exports.getOrders = async(req, resp, next) => {
    let limitPage = parseInt(req.query.limit) || 10;
    let page = parseInt(req.query.page) || 1;
    let protocolo = `${req.protocol}://${req.get('host')}${req.path}`;
    const number = await order.find().count();
    resp.set('link', pagination(protocolo, page, limitPage, number))
    const orderFound = await order.find().skip((page - 1) * limitPage).limit(limitPage).exec();
    if (!orderFound) return next(400)
    return resp.send(orderFound)
};

module.exports.getOrdersById = async(req, resp, next) => {
    try {
        const orderFound = await order.findOne({ _id: req.params.orderid });
        if (!orderFound) return next(404);
        return resp.send(orderFound);
    } catch (e) {
        return next(404)
    }
};

module.exports.postOrders = async(req, resp, next) => {
    if (!req.body.products || !req.body.userId) {
        return next(400);
    };
    let newOrder = new order();
    newOrder.userId = req.body.userId;
    newOrder.client = req.body.client;

    const arrOfProducts = await products.find({ _id: { $in: req.body.products.map(p => mongodb.ObjectId(p.product)) } })
    if (arrOfProducts.length !== req.body.products.length) {
        req.body.products = req.body.products.filter((x) => {
            return x !== null || undefined
        })
    }
    const productsReales = req.body.products.map((p, index) => ({
        product: {
            id: mongodb.ObjectId(p.product),
            name: arrOfProducts[index].name,
            price: arrOfProducts[index].price
        },
        qty: p.qty
    }));
    newOrder.products = productsReales;
    const orderStored = await newOrder.save();
    return resp.send(orderStored)
};

module.exports.putOrders = async(req, resp, next) => {
    try {
        if (!req.body.status) {
            return next(400);
        }
        const orderFoundandUpdate = await order.findOneAndUpdate({ _id: req.params.orderid }, { $set: { status: req.body.status, userId: req.body.userId, client: req.body.client  } }, { runValidators: true, new: true });
        if (orderFoundandUpdate.status === 'canceled' || !orderFoundandUpdate) {
            return next(404);
        }
        return resp.send(orderFoundandUpdate);
    } catch (e) {
        if (e.kind !== 'enum' && e.kind) {
            return next(404);
        }
        return next(400);
    }
}

module.exports.deleteOrders = (req, resp, next) => {

    order.findByIdAndRemove(req.params.orderid, (err, product) => {
        if (err) {
            return next(404)
        }
        return resp.send({ message: 'Se borro satisfactoriamente!' });
    });
}