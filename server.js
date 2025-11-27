import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors());
app.use(express.json());

// Ligação ao Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Rota de teste
app.get("/", (req, res) => {
  res.send("Zungo Link Server ON ✔");
});

// Criar usuário
app.post("/register", async (req, res) => {
  const { email, password, name } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } }
  });

  if (error) return res.status(400).json({ error: error.message });

  res.json({ user: data });
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) return res.status(400).json({ error: error.message });

  res.json({ user: data });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("🔥 Servidor do Zungo Link ativo"));
