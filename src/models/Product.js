import mongoose, { Schema } from "mongoose";
import { slugify } from "@/lib/utils";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    category: {
      type: String,
      required: true,
      enum: ["Fans", "Irons", "Air Coolers", "Washing Machines"]
    },
    image: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

ProductSchema.pre("validate", function productPreValidate(next) {
  if (this.name && !this.slug) {
    this.slug = slugify(this.name);
  }

  if (this.isModified("name")) {
    this.slug = slugify(this.name);
  }

  next();
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
