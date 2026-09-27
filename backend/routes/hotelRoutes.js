const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const pool = require("../db");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + file.originalname;

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
});

router.post(
  "/",
  upload.single("image"),
  async (req, res) => {
    try {
      const {
        title,
        description,
        latitude,
        longitude,
        price,
      } = req.body;

  
      if (
        !title ||
        !description ||
        !latitude ||
        !longitude ||
        !price
      ) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }

      if (Number(price) <= 0) {
        return res.status(400).json({
          message: "Price must be greater than 0",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          message: "Hotel image is required",
        });
      }

      const imagePath =
        `/uploads/${req.file.filename}`;

      const query = `
        INSERT INTO hotels
        (
          image,
          title,
          description,
          latitude,
          longitude,
          price
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `;

      const values = [
        imagePath,
        title,
        description,
        latitude,
        longitude,
        price,
      ];

      const result = await pool.query(
        query,
        values
      );

      res.status(201).json({
        message: "Hotel created successfully",
        hotel: result.rows[0],
      });
    } catch (error) {
      console.error(
        "Create hotel error:",
        error
      );

      res.status(500).json({
        message: "Failed to create hotel",
      });
    }
  }
);


router.get("/", async (req, res) => {
  try {
    const {
      title = "",
      minPrice,
      maxPrice,
      offset = 0,
      limit = 10,
    } = req.query;

    let query = `
      SELECT *
      FROM hotels
      WHERE 1=1
    `;

    const values = [];
    let parameterIndex = 1;

    if (title) {
      query += `
        AND title ILIKE $${parameterIndex}
      `;

      values.push(`%${title}%`);
      parameterIndex++;
    }

    if (minPrice) {
      query += `
        AND price >= $${parameterIndex}
      `;

      values.push(minPrice);
      parameterIndex++;
    }

    if (maxPrice) {
      query += `
        AND price <= $${parameterIndex}
      `;

      values.push(maxPrice);
      parameterIndex++;
    }

    query += `
      ORDER BY id DESC
      LIMIT $${parameterIndex}
      OFFSET $${parameterIndex + 1}
    `;

    values.push(Number(limit));
    values.push(Number(offset));

    const result = await pool.query(
      query,
      values
    );

    res.json({
      hotels: result.rows,
      offset: Number(offset),
      limit: Number(limit),
    });
  } catch (error) {
    console.error(
      "Fetch hotels error:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch hotels",
    });
  }
});


router.put(
  "/:id",
  upload.single("image"),
  async (req, res) => {
    try {
      const { id } = req.params;

      const {
        title,
        description,
        latitude,
        longitude,
        price,
      } = req.body;
      if (
        !title ||
        !description ||
        !latitude ||
        !longitude ||
        !price
      ) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }

      if (Number(price) <= 0) {
        return res.status(400).json({
          message: "Price must be greater than 0",
        });
      }

      const existingHotel =
        await pool.query(
          "SELECT * FROM hotels WHERE id = $1",
          [id]
        );

      if (existingHotel.rows.length === 0) {
        return res.status(404).json({
          message: "Hotel not found",
        });
      }

      const oldImage =
        existingHotel.rows[0].image;

      let imagePath = oldImage;

      if (req.file) {
        imagePath =
          `/uploads/${req.file.filename}`;

        if (oldImage?.startsWith("/uploads/")) {
          const oldImagePath = path.join(
            __dirname,
            "..",
            oldImage
          );

          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
      }

      const query = `
        UPDATE hotels
        SET
          image = $1,
          title = $2,
          description = $3,
          latitude = $4,
          longitude = $5,
          price = $6
        WHERE id = $7
        RETURNING *
      `;

      const values = [
        imagePath,
        title,
        description,
        latitude,
        longitude,
        price,
        id,
      ];

      const result = await pool.query(
        query,
        values
      );

      res.json({
        message: "Hotel updated successfully",
        hotel: result.rows[0],
      });
    } catch (error) {
      console.error(
        "Update hotel error:",
        error
      );

      res.status(500).json({
        message: "Failed to update hotel",
      });
    }
  }
);

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

  
    const existingHotel =
      await pool.query(
        "SELECT * FROM hotels WHERE id = $1",
        [id]
      );

    if (existingHotel.rows.length === 0) {
      return res.status(404).json({
        message: "Hotel not found",
      });
    }

    const hotel = existingHotel.rows[0];
    if (
      hotel.image &&
      hotel.image.startsWith("/uploads/")
    ) {
      const imagePath = path.join(
        __dirname,
        "..",
        hotel.image
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    await pool.query(
      "DELETE FROM hotels WHERE id = $1",
      [id]
    );

    res.json({
      message: "Hotel deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete hotel error:",
      error
    );

    res.status(500).json({
      message: "Failed to delete hotel",
    });
  }
});

module.exports = router;