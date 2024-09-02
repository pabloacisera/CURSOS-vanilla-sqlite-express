import path from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Obtén la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
// Obtén la ruta del directorio actual
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "some-secret-key";

export const getDashboardPage = (req, res) => {
  const dashboardPath = path.join(
    __dirname,
    "../public/pages/dashboard/",
    "dashboard.html"
  );
  return res.sendFile(dashboardPath);
};

export const getLoginPage = (req, res) => {
  const loginPath = path.join(
    __dirname,
    "../public/pages/login/",
    "login.html"
  );
  return res.sendFile(loginPath);
};

export const getRegisterPage = (req, res) => {
  const registerPath = path.join(
    __dirname,
    "../public/pages/register",
    "register.html"
  );
  return res.sendFile(registerPath);
};

export const loginUsers = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Received data:", req.body);

    const userFound = await prisma.user.findUnique({
      where: email,
    });

    if (!userFound)
      return res
        .status(400)
        .json({ message: "El email no se encuentra en base de datos" });

    const verifyPass = bcrypt.compare(password, userFound.password);

    if (!verifyPass)
      return res
        .status(401)
        .json({ message: "La contraseña proporciona no coincide" });

    const token = jwt.sign(
      { email: userFound.email, id: userFound.id },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      data: {
        name: userFound.name,
        email: userFound.email,
        token,
      },
    });
  } catch (error) {
    console.error("error al iniciar sesion: ", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  console.log("Received data:", req.body);

  try {
    const userFound = await prisma.user.findUnique({
      where: { email },  // Correct way to use Prisma findUnique
    });

    if (userFound)
      return res.status(400).json({
        message: "El email ya esta registrado",
      });

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      { email: newUser.email, password: newUser.hashedPassword },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.json({
      data: {
        success: true,
        token,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("error al iniciar sesion: ", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
