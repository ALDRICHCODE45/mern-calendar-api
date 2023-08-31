import { Schema, model } from "mongoose";

const SchemaEvent = new Schema({
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
SchemaEvent.method("toJSON", function () {
  const { _id, __v, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export const Event = model("Event", SchemaEvent);
