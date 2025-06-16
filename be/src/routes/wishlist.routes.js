const express = require('express');
const { addWishlist, getWishlist, deleteWishlist } = require('../controllers/wishlist.controller');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', authMiddleware, addWishlist);
router.get('/', authMiddleware,  getWishlist);
router.delete('/:id', authMiddleware, deleteWishlist);

module.exports = router;
