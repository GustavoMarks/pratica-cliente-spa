import { useState } from "react";
import AlunoForm from "./components/AlunoForm";
import AlunosTable from "./components/AlunosTable";
import api from "./api";

function App() {

  // Sempre que variável tiver o valor alterado, irá fazer lista ser atualizada
  const [alunosListRenderTrigger, setRenderTrigger] = useState(false);

  async function createAluno(data) {
    try {
      const res = await api.post("/api/alunos", data);
      if (!res) return alert("Erro ao tentar criar aluno... Tente novamente mais tarde!");
      setRenderTrigger(!alunosListRenderTrigger);
    } catch (error) {
      console.log(error);
      return alert("Erro ao tentar criar aluno... Tente novamente mais tarde!");
    }
  }

  return (
    <main>
      <h2> Sistema de Controle de Alunos </h2>
      <AlunoForm sendAluno={createAluno} />
      <hr />
      <AlunosTable renderTriger={alunosListRenderTrigger} />
    </main>
  );
}

export default App;
