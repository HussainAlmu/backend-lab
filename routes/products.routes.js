const Product = require("../models/Product")
const router = require("express").Router()

router.post("/", async (req, res) => {
    try {
        const createdProduct = await Product.create(req.body)
        res.status(201).json(createdProduct)
    } catch (err) {
        console.log(err)
    }
})

router.get("/", async (req, res) => {
    try {
        const allProducts = await Product.find()
        res.status(200).json(allProducts)
    } catch (err) {
        console.log(err)
    }
})

router.get("/:productId", async (req, res) => {
    try {
        const foundProduct = await Product.findById(req.params.productId)
        res.status(200).json(foundProduct)
    } catch (err) {
        console.log(err)
    }
})

router.put("/:productId", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, { returnDocument: "after", runValidators: true })
        res.status(200).json(updatedProduct)

    } catch (error) {
        console.log(error)
    }
})

router.delete("/:productId", async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.productId, req.body)
        if(!deletedProduct){
            return res.status(404).json({ message: "Product not found" })
        }
        res.status(204)

    } catch (error) {
        console.log(error)
    }
})

module.exports = router