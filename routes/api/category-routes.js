const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  Category.findAll({
    attributes: ["id", "category_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock"],
      },
    ],
  })
    .then((dbCategory) => res.json(dbCategory))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// fetch request route sent to server directed at only one item, found by ID
router.get("/:id", (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "category_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock"],
      },
    ],
  })
    .then((dbCategory) => {
      if (!dbCategory) {
        res
          .status(404)
          .json({ message: "Please check your information and try again" });
        return;
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// utilizing CRUD with the creation of a new one
router.post("/", (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then((dbCategory) => res.json(dbCategory))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbCategory) => {
      if (!dbCategory) {
        res.status(400).json({ message: "No category found by this id" });
        return;
      }
      res.json(dbCategory);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCategory) => {
      if (!dbCategory) {
        res.status(400).json({ message: "No category found by this ID" });
        return;
      }
      res.json(dbCategory);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
