import { useState } from "react";
import AlunoForm from "./components/AlunoForm";
import AlunosTable from "./components/AlunosTable";
import Modal from "./components/Modal";
import api from "./api";
import "./components/AlunosTable/index.css";

function App() {

  // Sempre que variável tiver o valor alterado, irá fazer lista ser atualizada
  const [alunosListRenderTrigger, setRenderTrigger] = useState(false);
  // Controla abertura do modal autor
  const [modalAutor, setModalAutor] = useState(false);

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
      <Modal parentState={modalAutor} >
        <p className="confirm-header">
          Autor
          <span onClick={() => setModalAutor(false)} > x </span>
        </p>
        <hr />
        <div id="modal-info-content" >
          <img id="autor-img" src="https://avatars.githubusercontent.com/u/36707396?v=4" />
          <p id="autor-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <hr />
        <div className="confirm-options">
          <button
            onClick={() => setModalAutor(false)}
            style={{ backgroundColor: "#2e86c1", color: "white" }} > Fechar </button>
        </div>
      </Modal>
      <h2> Sistema de Controle de Alunos </h2>
      <span onClick={() => setModalAutor(true)} id="main-info"> ? </span>
      <AlunoForm sendAluno={createAluno} />
      <hr />
      <AlunosTable renderTriger={alunosListRenderTrigger} />
    </main>
  );
}

export default App;
