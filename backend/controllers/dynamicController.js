const Collection = require("../models/Collection");
const Record = require("../models/Record");

exports.handle = async (req, res) => {
  try {
    const { projectId, collection, id } = req.params;

    // 🔍 récupérer collection + schema
    const col = await Collection.findOne({
      projectId,
      name: collection
    });

    if (!col) {
      return res.status(404).json({ error: "Collection not found" });
    }

    // =========================
    // 🔥 GET (READ)
    // =========================
    if (req.method === "GET") {
      const records = await Record.find({
        projectId,
        collectionName: collection
      });

      return res.json(records);
    }

    // =========================
    // 🔥 POST (CREATE)
    // =========================
    if (req.method === "POST") {

      const data = {};

      col.schema.forEach(field => {
        let value = req.body[field.name];

        // ignore si champ absent
        if (value === undefined) return;

        // 🔥 TYPE CASTING + VALIDATION
        if (field.type === "number") {
          value = Number(value);
          if (isNaN(value)) {
            return res.status(400).json({
              error: `Field ${field.name} must be a number`
            });
          }
        }

        if (field.type === "boolean") {
          value = value === "true" || value === true;
        }

        if (field.type === "string") {
          value = String(value);
        }

        data[field.name] = value;
      });

      const record = await Record.create({
        projectId,
        collectionName: collection,
        data
      });

      return res.json(record);
    }

    // =========================
    // 🔥 PUT (UPDATE)
    // =========================
    if (req.method === "PUT") {

      if (!id) {
        return res.status(400).json({ error: "Record ID required" });
      }

      const data = {};

      col.schema.forEach(field => {
        let value = req.body[field.name];

        if (value === undefined) return;

        if (field.type === "number") {
          value = Number(value);
          if (isNaN(value)) {
            return res.status(400).json({
              error: `Field ${field.name} must be a number`
            });
          }
        }

        if (field.type === "boolean") {
          value = value === "true" || value === true;
        }

        if (field.type === "string") {
          value = String(value);
        }

        data[field.name] = value;
      });

      const updated = await Record.findByIdAndUpdate(
        id,
        { data },
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({ error: "Record not found" });
      }

      return res.json(updated);
    }

    // =========================
    // ❌ METHOD NOT ALLOWED
    // =========================
    return res.status(405).json({ error: "Method not allowed" });

  } catch (err) {
    console.error("API ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
};