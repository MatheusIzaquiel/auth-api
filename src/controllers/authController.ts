import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";
import { RegisterRequest, LoginRequest } from "../interfaces/user";
import prisma from "../utils/prisma";

export const register = async (
  req: Request<RegisterRequest>,
  res: Response,
) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "Preencha todos os campos" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Senhas não coincidem" });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(400).json({ message: "Email já cadastrado" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = generateToken({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    });

    res.status(201).json({
      message: "Usuário criado com sucesso",
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

export const login = async (req: Request<LoginRequest>, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Preencha todos os campos" });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: "Email inválido" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }
  try {
    const token = generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    res.status(200).json({
      message: "Login realizado com sucesso",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

