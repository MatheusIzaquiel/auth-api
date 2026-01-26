import { Request, Response } from "express";
import prisma from "../utils/prisma";
import { AuthenticatedRequest } from "../interfaces/user";

export const profile = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ isLoggedIn: false, message: "Não autenticado" });
  }

  try {
    const userFromDb = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    if (!userFromDb) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res
      .status(200)
      .json({
        isLoggedIn: true,
        Message: "Perfil carregado com sucesso",
        user: userFromDb,
      });
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    return res
      .status(500)
      .json({ isLoggedIn: false, message: "Erro interno no servidor" });
  }
};
