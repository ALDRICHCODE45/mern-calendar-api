import { User } from "../MongoDbModels/User";
import { generateJWT } from "../helpers/generateJWT";
import {
  FunctionControllers,
  createUserQueryParamas,
  loginUserQueryParams,
} from "./interfaces/auth";
import * as bcrypt from "bcryptjs";

export const createUser: FunctionControllers = async (req, res) => {
  const { email, password }: createUserQueryParamas = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "un usuario ya existe con ese correo",
      });
    }
    user = new User(req.body);

    //encriptar password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    // generar JSON Web Token
    const token = generateJWT(user.id, user.name as string);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "ha ocurrido un error por favor hable con el administrador",
    });
  }
};

export const userLogin: FunctionControllers = async (req, res) => {
  const { email, password }: loginUserQueryParams = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "el usuario con ese email no existe",
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password as string);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "password no valido",
      });
    }

    // generar JSON WEB TOKEN
    const token = generateJWT(user.id, user.name as string);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "ha ocurrido un error por favor hable con el administrador",
    });
  }
};

export const renewToken: FunctionControllers = (req: any, res): void => {
  const { name, uid } = req;
  //generar JWT
  const token = generateJWT(uid, name);

  res.json({
    ok: true,
    msg: "Renew JWToken",
    token,
  });
};
