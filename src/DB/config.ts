import mongoose from "mongoose";

export const dbConection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN as string);
    console.log("db online");
  } catch (error) {
    console.log(error);

    throw new Error("Error en la inicializacion de la base de datos");
  }
};
