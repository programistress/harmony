const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  periodLength: { average: { type: Number }, times: { type: Number } },
  cycleLength: { average: { type: Number }, times: { type: Number } },
  periodDates: { type: [[Date]], default: [] },
});

module.exports = model("User", UserSchema);
