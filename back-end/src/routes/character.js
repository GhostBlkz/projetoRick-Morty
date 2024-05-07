import { Router } from "express";
import character from "../controllers/character.js";

const router = Router()


//rota pra recuperar todos personagens
router.get("/", character.retrieveAll)

export default router