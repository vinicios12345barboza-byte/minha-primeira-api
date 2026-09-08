import express, {type Request, type Response } from "express";
import data from "./data.json" with { type: "json" };

const app = express();
app.use(express.json());


interface Jogo {
  id: number;
  name: string;
}

const jogos: Jogo[] = [...data];

app.get("/jogos", (req: Request, res: Response) => {
  return res.status(200).json(jogos);
});

app.get("/jogos/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const jogo = jogos.find((item) => item.id === id);

  if (!jogo) {
    return res.status(404).json({ mensagem: "Jogo não encontrado." });
  }

  return res.status(200).json(jogo);
});

app.post("/jogos", (req: Request, res: Response) => {
  const { name, id } = req.body;

  if (!name || typeof id !== "number") {
    return res.status(400).json({ mensagem: "Campos 'id' e 'name' são obrigatórios." });
  }

  const jogoExiste = jogos.some((item) => item.id === id);
  if (jogoExiste) {
    return res.status(409).json({ mensagem: "Já existe um jogo com este ID." });
  }

  const novoJogo: Jogo = { id, name };
  jogos.push(novoJogo);

  return res.status(201).json(novoJogo);
});


app.put("/jogos/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ mensagem: "O campo 'name' é obrigatório." });
  }

  const jogo = jogos.find((item) => item.id === id);

  if (!jogo) {
    return res.status(404).json({ mensagem: "Jogo não encontrado para atualização." });
  }

  jogo.name = name;
  return res.status(200).json(jogo);
});


app.delete("/jogos/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = jogos.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: "Jogo não encontrado." });
  }

  jogos.splice(index, 1); 

  return res.status(204).send(); 

});


app.listen(3000, () => {
  console.log("Servidor rodando em: http://localhost:3000")});