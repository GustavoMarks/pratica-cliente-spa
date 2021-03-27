import { useState, useEffect } from "react";
import api from "../../api";
import "./index.css"

export default function AlunosTable({ renderTriger }) {

  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/api/alunos");
        if (response.data) setAlunos(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();

  }, [renderTriger])

  return (
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
                <td> # </td>
              </tr>
            })
          )
        }
      </tbody>
    </table>
  )
}