import { useEffect, useState } from "react";
import api from "../../api";
import "./index.css";

export default function AlunoForm({ sendAluno }) {

  // Guarda list de campus da api
  const [campus, setCampus] = useState([]);

  // Valores dos inputs dos formulários
  const [matricula, setMatricula] = useState("");
  const [nome, setNome] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [email, setEmail] = useState("");
  const [ddd, setDdd] = useState("");
  const [telefone, setTelefone] = useState("");
  const [operadora, setOperadora] = useState("");
  const [campiCodigo, setCampiCodigo] = useState("");
  const [cursoCodigo, setCursoCodigo] = useState("");

  function resetForm() {
    setMatricula("");
    setNome("");
    setNascimento("");
    setEmail("");
    setDdd("");
    setTelefone("");
    setOperadora("");
    setCampiCodigo("");
    setCursoCodigo("");
  }

  function handleSubmit(e) {
    e.preventDefault();       // Impede formulário de recarregar página
    const data = {
      codigoCurso: cursoCodigo,
      matricula,
      nome,
      dataNascimento: nascimento,
      operadora,
      ddd,
      numero: telefone,
    }

    // Componente pai tem responsabilidade de enviar para api
    sendAluno(data);

    resetForm();
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/api/campi");
        setCampus(response.data);

      } catch (error) {
        console.log(error);
      }
    }

    fetchData();

  }, [])

  return (
    <form className="aluno-form" onSubmit={handleSubmit} >
      <span className="form-header"> Formulário de alunos </span>
      <div>
        <span>
          <label> Matricula </label>
          <input
            required
            placeholder="Adicione a matricula do aluno"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)} />
        </span>
        <span className="label-large">
          <label> Nome </label>
          <input
            required
            placeholder="Adicione o nome do aluno"
            value={nome}
            onChange={(e) => setNome(e.target.value)} />
        </span>
      </div>

      <div>
        <span>
          <label> Data de Nascimento </label>
          <input
            required
            type="date"
            value={nascimento}
            onChange={(e) => setNascimento(e.target.value)} />
        </span>
        <span className="label-large">
          <label> Email </label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </span>
      </div>

      <div>
        <span>
          <label> DDD </label>
          <input
            required
            placeholder="DDD"
            type="number"
            value={ddd}
            onChange={(e) => setDdd(e.target.value)} />
        </span>
        <span>
          <label> Tefelone </label>
          <input
            required
            placeholder="Adicione o telefone do aluno"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)} />
        </span>
        <span>
          <label> Operadora </label>
          <select required value={operadora} onChange={(e) => setOperadora(e.target.value)}>
            <option value="">  </option>
            <option value="Oi" > Oi </option>
            <option value="Claro" > Claro </option>
            <option value="Tim" > Tim </option>
          </select>
        </span>
      </div>

      <div>
        <span>
          <label> Campus </label>
          <select required value={campiCodigo} onChange={(e) => setCampiCodigo(e.target.value)} >
            <option value="" ></option>
            {
              campus.map((campi, index) => {
                return <option key={index} value={campi.codigo} > {campi.nome} </option>
              })
            }
          </select>
        </span>
        <span className="label-large">
          <label> Curso </label>
          <select required value={cursoCodigo} onChange={(e) => setCursoCodigo(e.target.value)} >
            <option value="" ></option>
            {
              campiCodigo ? campus.find(item => item.codigo === campiCodigo).cursos.map((curso, index) => {
                return <option key={index} value={curso.codigo} > {curso.nome} </option>
              }) : null
            }
          </select>
        </span>
      </div>

      <div id="form-footer">
        <button type="reset" onClick={resetForm} > Limpar </button>
        <button type="submit"> Inserir </button>
      </div>

    </form>
  )
}