import { Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import pool from "../config/database";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export const getAllArticles = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT a.id, a.title, a.content, a.banner, a.published_at, a.updated_at, u.name as author 
       FROM articles a 
       JOIN users u ON a.user_id = u.id 
       ORDER BY a.published_at DESC`,
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar artigos." });
  }
};

export const createArticle = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { title, content, banner } = req.body;
    const userId = req.userId;

    if (!title || !content) {
      res.status(400).json({ error: "Título e conteúdo são obrigatórios." });
      return;
    }

    await pool.query<ResultSetHeader>(
      "INSERT INTO articles (title, content, banner, user_id) VALUES (?, ?, ?, ?)",
      [title, content, banner || null, userId],
    );

    res.status(201).json({ message: "Artigo criado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar artigo." });
  }
};

export const updateArticle = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content, banner } = req.body;
    const userId = req.userId;

    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT user_id FROM articles WHERE id = ?",
      [id],
    );
    if (rows.length === 0) {
      res.status(404).json({ error: "Artigo não encontrado." });
      return;
    }

    if (rows[0].user_id !== userId) {
      res
        .status(403)
        .json({ error: "Você não tem permissão para editar este artigo." });
      return;
    }

    await pool.query(
      "UPDATE articles SET title = ?, content = ?, banner = ? WHERE id = ?",
      [title, content, banner, id],
    );

    res.json({ message: "Artigo atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar artigo." });
  }
};

export const deleteArticle = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT user_id FROM articles WHERE id = ?",
      [id],
    );
    if (rows.length === 0) {
      res.status(404).json({ error: "Artigo não encontrado." });
      return;
    }

    if (rows[0].user_id !== userId) {
      res
        .status(403)
        .json({ error: "Você não tem permissão para deletar este artigo." });
      return;
    }

    await pool.query("DELETE FROM articles WHERE id = ?", [id]);
    res.json({ message: "Artigo deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar artigo." });
  }
};
