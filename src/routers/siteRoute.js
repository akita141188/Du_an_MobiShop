const express = require("express");
const router = express.Router();
const SiteController = require("../apps/controllers/SiteController")

router.get("/",SiteController.home)
router.get("/category-:slug.:id",SiteController.category)
router.get("/product-:slug.:id",SiteController.product)
router.post("/product-:slug.:id",SiteController.comment)
router.get("/product-:prd_id/edit-:id",SiteController.editComment)
router.post("/product-:prd_id/update-:id",SiteController.updateComment)
router.get("/product-:prd_id/delete-:id",SiteController.delComment)
router.get("/search",SiteController.search)
router.get("/cart",SiteController.cart)
router.post("/add-to-cart",SiteController.addToCart)
router.post("/update-item-cart",SiteController.updateItemCart)
router.get("/del-item-cart-:id",SiteController.delItemCart)
router.get("/cart",SiteController.cart)
router.post("/order",SiteController.order)
router.get("/success",SiteController.success)
module.exports = router;