import express from "express";

const app = express();
import data from "./data.json" with { type: "json" };

// verbos HTTP
// GET - Rebecer dados de um Recource
// POST - Enviar dados ou informações para serem processadas por um Recourse
// PUT - Atualizar dados de um Recource
// DELETE - Deletar um Recource

app.use(express.json());

const jogos: { name: string; id: number }[] = [...data];

app.get("/jogos", (req, res) => {
  res.json(data);
});

app.get("/jogos/:id", (req, res) => {
  const { id } = req.params; //pega os id

  const jogo = data.find((jogo) => jogo.id === Number(id));

  if (!jogo) return res.status(204).json();

  res.json(jogo);
}); // unico dado

app.post("/jogos", (req, res) => {
  const { name, id } = req.body;

  const novoJogo = { name, id };
  jogos.push(novoJogo);

  //salvar
  res.json({ name, id });
});

app.put("/jogos/:id", (req, res) => {
  const { id } = req.params; //pega os id
  const { name } = req.body;
  const jogo = jogos.find((item) => item.id === Number(id));

  if (!jogo) {
    return res
      .status(404)
      .json({ mensagem: "Jogo não encontrado para atualização." });
  }

  jogo.name = name;

  return res.status(200).json(jogo);
});

app.delete("/jogos/:id", (req, res) => {
  const { id } = req.params;
  const jogosFiltered = data.filter((jogo) => jogo.id != Number(id));

  res.json(jogosFiltered);
});

app.listen(3000, () => {
  console.log(`Servidor rodando em: http://localhost:3000 `);
});
