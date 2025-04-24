import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';


export const createProduct = expressAsyncHandler(async (req, res) => {
    const { _id } = req.user;
    const created = new Product({owners: _id, ...req.body});
    await created.save();
    /*await created.populate("store");
    await created.populate("owners");*/
    res.status(201).json(created);
});

export const getAllProducts = expressAsyncHandler(async (req, res) => {
    const filter = {};
    const sort = {};
    let skip = 0;
    let limit = 0;

    if (req.query.store) {
        filter.store = { $in: req.query.store };
    }
    if (req.query.brand) {
        filter.brand = { $in: req.query.brand };
    }

    if (req.query.category) {
        filter.category = { $in: req.query.category };
    }

    if (req.query.stockQuantity) {
        filter.stockQuantity = { $in: req.query.stockQuantity };
    }

    if (req.query.user) {
        filter['isDeleted'] = false;
    }

    if (req.query.sort) {
        sort[req.query.sort] = req.query.order ? (req.query.order === 'asc' ? 1 : -1) : 1;
    }

    if (req.query.page && req.query.limit) {
        const pageSize = req.query.limit;
        const page = req.query.page;
        skip = pageSize * (page - 1);
        limit = pageSize;
    }

    const totalDocs = await Product.find(filter).sort(sort).countDocuments().exec();
    const results = await Product.find(filter).sort(sort).skip(skip).limit(limit).exec();

    res.set("X-Total-Count", totalDocs);
    res.status(200).json(results);
});

export const getAllProductsPerOwner = expressAsyncHandler(async (req, res) => {
    const { _id } = req.user;
    console.log(_id)
    const filter = { owner: _id };
    const sort = {};
    let skip = 0;
    let limit = 0;

    if (req.query.store) {
        filter.store = { $in: req.query.store };
    }
    if (req.query.brand) {
        filter.brand = { $in: req.query.brand };
    }

    if (req.query.category) {
        filter.category = { $in: req.query.category };
    }

    if (req.query.stockQuantity) {
        filter.stockQuantity = { $in: req.query.stockQuantity };
    }

    if (req.query.user) {
        filter['isDeleted'] = false;
    }

    if (req.query.sort) {
        sort[req.query.sort] = req.query.order ? (req.query.order === 'asc' ? 1 : -1) : 1;
    }

    if (req.query.page && req.query.limit) {
        const pageSize = req.query.limit;
        const page = req.query.page;
        skip = pageSize * (page - 1);
        limit = pageSize;
    }

    const totalDocs = await Product.find(filter).sort(sort).countDocuments().exec();
    const results = await Product.find(filter).sort(sort).skip(skip).limit(limit).exec();

    res.set("X-Total-Count", totalDocs);
    res.status(200).json(results);
});

export const getAllProductsPerStore = expressAsyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { storeId } = req.params;
    const filter = { owners: _id, store: storeId };
    const sort = {};
    let skip = 0;
    let limit = 0;

    if (req.query.brand) {
        filter.brand = { $in: req.query.brand };
    }

    if (req.query.category) {
        filter.category = { $in: req.query.category };
    }

    if (req.query.stockQuantity) {
        filter.stockQuantity = { $in: req.query.stockQuantity };
    }

    if (req.query.user) {
        filter['isDeleted'] = false;
    }

    if (req.query.sort) {
        sort[req.query.sort] = req.query.order ? (req.query.order === 'asc' ? 1 : -1) : 1;
    }

    if (req.query.page && req.query.limit) {
        const pageSize = req.query.limit;
        const page = req.query.page;
        skip = pageSize * (page - 1);
        limit = pageSize;
    }

    const totalDocs = await Product.find(filter).sort(sort).countDocuments().exec();
    const results = await Product.find(filter).sort(sort).skip(skip).limit(limit).exec();

    res.set("X-Total-Count", totalDocs);
    res.status(200).json(results);
});


export const getProductById = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await Product.findById(id).populate("brand").populate("category");
    res.status(200).json(result);
});

export const updateProductById = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
});

export const undeleteProductById = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const unDeleted = await Product.findByIdAndUpdate(id, { isDeleted: false }, { new: true }).populate('brand');
    res.status(200).json(unDeleted);
});

export const deleteProductById = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const deleted = await Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).populate("brand");
    res.status(200).json(deleted);
});
