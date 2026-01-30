import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      sparse: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    businessName: {
      type: String,
      required: [true, "Please add a business name"],
      maxlength: [150, "Business name cannot be more than 150 characters"],
    },
    city: {
      type: String,
      required: [true, "Please specify city"],
    },
    number: {
      type:String,                                           //ye change kiye
      required : [true,"Please add a bussiness number"],
    }
  },
  {
    timestamps: true,
  },
);



const User = mongoose.model("User", userSchema);
export { User };
