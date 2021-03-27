import { useState, useEffect } from "react";
import Modal from "../Modal";
import api from "../../api";
import "./index.css"

export default function AlunosTable({ renderTriger }) {

  const [alunos, setAlunos] = useState([]);
  // Guarda matricula de aluno para remoção
  const [removerAluno, setRemoverAluno] = useState("");

  // eslint-disable-next-line
  async function fetchData() {
    try {
      const response = await api.get("/api/alunos");
      if (response.data) setAlunos(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteAluno() {
    try {
      await api.delete(`/api/alunos/${removerAluno}`);
      // Atualizando lista após remoção
      await fetchData();
      // Fechando modal
      return setRemoverAluno("")
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line
    fetchData();
  }, [renderTriger, fetchData])

  return (
    <>
      <Modal parentState={removerAluno} >
        <p className="confirm-header">
          Solicitação de Confirmação
          <span onClick={() => setRemoverAluno("")} > x </span>
        </p>
        <hr />
        <h1 className="confirm-header"> Confirma exclusão?! </h1>
        <hr />
        <div className="confirm-options">
          <button onClick={() => setRemoverAluno("")} > Cancelar </button>
          <button onClick={deleteAluno} style={{ backgroundColor: "#2e86c1", color: "white" }} > Ok </button>
        </div>
      </Modal>

      <table className="aluno-table" cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th> Matricula </th>
            <th> Nome </th>
            <th> Ações </th>
          </tr>
        </thead>
        <tbody>
          {
            alunos.length === 0 ? (
              <tr>
                <td colSpan="3"> Sem regsitros no momento </td>
              </tr>
            ) : (
              alunos.map((aluno, index) => {
                return <tr key={index}>
                  <td> {aluno.matricula} </td>
                  <td> {aluno.nome} </td>
                  <td> <button onClick={() => setRemoverAluno(aluno.matricula)}> remover </button> </td>
                </tr>
              })
            )
          }
        </tbody>
      </table>
    </>
  )
}