const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema(
{
  role: {
    type: Array,
    default: [],
  },
},
{ timestamps: true });

module.exports = mongoose.model("Role", RoleSchema);
