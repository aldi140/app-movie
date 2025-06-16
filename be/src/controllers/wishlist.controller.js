import { Wishlist } from "../models/index.js";

export const addWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { tmdbId, title, poster_path, realase_date, vote_average } = req.body;
    const existing = await Wishlist.findOne({ where: { userId, tmdbId } });
    if (existing)
      return res
        .status(400)
        .json({ message: "This movie is already in your wishlist." });
    const wishlist = await Wishlist.create({
      userId,
      tmdbId,
      title,
      poster_path,
      realase_date,
      vote_average
    });
    res.status(201).json({ message: "Wishlist added", wishlist });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const wishlist = await Wishlist.findAll({ where: { userId } });
    res.status(200).json({ wishlist });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const wishlist = await Wishlist.findByPk(id);
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist item not found" });
    }
    await Wishlist.destroy({ where: { id } });
    res.status(200).json({ message: "Wishlist deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
