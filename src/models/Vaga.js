import { HOJE, diffDias, fmtData } from '../utils/datas';

export default class Vaga {
  constructor(dados) { Object.assign(this, dados); }
  diasRestantes() { return diffDias(this.prazoInscricao, HOJE); }
  estaAberta() { return this.diasRestantes() >= 0; }
  urgente() { const d = this.diasRestantes(); return d >= 0 && d <= 3; }
  textoPrazo() {
    const d = this.diasRestantes();
    if (d < 0) return 'Inscrições encerradas';
    if (d === 0) return 'Encerra hoje';
    if (d === 1) return 'Encerra amanhã';
    if (d <= 3) return `Encerra em ${d} dias`;
    return `Inscrições até ${fmtData(this.prazoInscricao)}`;
  }
}
