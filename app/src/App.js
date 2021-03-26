import AlunoForm from "./components/AlunoForm";
import api from "./api";

function App() {

  async function createAluno(data) {
    try {
      const res = await api.post("/api/alunos", data);
      if (!res) return alert("Erro ao tentar criar aluno... Tente novamente mais tarde!");
    } catch (error) {
      console.log(error);
      return alert("Erro ao tentar criar aluno... Tente novamente mais tarde!");
    }
  }

  return (
    <main>
      <h2> Sistema de Controle de Alunos </h2>
      <AlunoForm sendAluno={createAluno} />
      <br />
    </main>
  );
}

export default App;
