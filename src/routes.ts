import { Router } from "express";
import { register, login } from "./controllers/authController";
import {
  getAllArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "./controllers/articleController";
import { authMiddleware } from "./middlewares/auth";

const router = Router();

// Rotas Públicas
router.post("/register", register);
router.post("/login", login);
router.get("/articles", getAllArticles);

// Rotas Protegidas (precisam de login)
router.post("/articles", authMiddleware, createArticle);
router.put("/articles/:id", authMiddleware, updateArticle);
router.delete("/articles/:id", authMiddleware, deleteArticle);

export default router;
