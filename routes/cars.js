import express from "express";
import { dbQuerry, dbRun } from "../database.js";
const router = express.Router();
router.get("/", async (req, res, next) => {
  try {
    const cars = await dbQuerry("SELECT * FROM cars");
    res.status(200).json(cars);
  } catch (err) {
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const [car] = await dbQuerry("SELECT * FROM cars WHERE id=?;", [
      req.params.id,
    ]);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.status(200).json(car);
  } catch (err) {
    next(err);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const result = await dbRun(
      "INSERT INTO cars (brand, model, color, year) VALUES (?,?,?,?)",
      [req.body.brand, req.body.model, req.body.color, req.body.year]
    );
    res.status(201).json({ id: result.lastID, ...req.body });
  } catch (err) {
    next(err);
  }
});
router.put("/:id", async (req, res, next) => {
  try {
    const [car] = await dbQuerry("SELECT * FROM cars WHERE id=?", [
      req.params.id,
    ]);
    if (!car) return res.status(404).json({ message: "Car not found" });
    await dbRun(
      "UPDATE cars SET brand=?, model=?, color=?, year=? WHERE id=?",
      [
        req.body.brand || car.brand,
        req.body.model || car.model,
        req.body.color || car.color,
        req.body.year || car.year,
        req.params.id,
      ]
    );
    res.status(200).json({ id: req.params.id, ...req.body });
  } catch (err) {
    next(err);
  }
});
router.delete("/:id", async (req, res, next) => {
  const [car] = await dbQuerry("SELECT * FROM cars WHERE id=?", [
    req.params.id,
  ]);
  if (!car) return res.status(404).json({ message: "Car not found" });
  await dbRun("DELETE FROM cars WHERE id=?", [req.params.id]);
  res.sendStatus(204);
});
export default router;
