export default class Aluno {
  constructor(dados) { Object.assign(this, dados); }
  atendePeriodo(vaga) { return this.periodo >= vaga.periodoMinimo; }
}
