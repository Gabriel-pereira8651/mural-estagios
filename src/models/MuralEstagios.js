import { normaliza } from '../utils/datas';

export default class MuralEstagios {
  constructor(vagas) { this.vagas = vagas; }
  buscar(id) { return this.vagas.find(v => v.id === id); }
  listarVagas() { return this.vagas.filter(v => v.estaAberta()); }
  filtrarVagas({ busca = '', curso = '', periodo = 0, modalidade = '' }) {
    const termo = normaliza(busca.trim());
    return this.listarVagas()
      .filter(v => !termo || normaliza(`${v.titulo} ${v.empresa} ${v.area}`).includes(termo))
      .filter(v => !curso || v.cursos.includes(curso))
      .filter(v => !periodo || v.periodoMinimo <= periodo)
      .filter(v => !modalidade || v.modalidade === modalidade)
      .sort((a, b) => (b.nova - a.nova) || (a.diasRestantes() - b.diasRestantes()));
  }
}
