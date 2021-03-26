import "./index.css";

export default function AlunoForm() {
  return (
    <form className="aluno-form" >
      <span className="form-header"> Formulário de alunos </span>
      <div>
        <span>
          <label> Matricula </label>
          <input placeholder="Adicione a matricula do aluno" />
        </span>
        <span className="label-large">
          <label> Nome </label>
          <input placeholder="Adicione o nome do aluno" />
        </span>
      </div>

      <div>
        <span>
          <label> Data de Nascimento </label>
          <input type="date" />
        </span>
        <span className="label-large">
          <label> Email </label>
          <input type="email" />
        </span>
      </div>

      <div>
        <span>
          <label> DDD </label>
          <input placeholder="DDD" type="number" />
        </span>
        <span>
          <label> Tefelone </label>
          <input placeholder="Adicione o telefone do aluno" />
        </span>
        <span>
          <label> Operadora </label>
          <select>
            <option> Oi </option>
            <option> Claro </option>
            <option> Tim </option>
          </select>
        </span>
      </div>

      <div>
        <span>
          <label> Campus </label>
          <select>

          </select>
        </span>
        <span className="label-large">
          <label> Curso </label>
          <select>

          </select>
        </span>
      </div>

      <div id="form-footer">
        <button> Limpar </button>
        <button> Inserir </button>
      </div>

    </form>
  )
}