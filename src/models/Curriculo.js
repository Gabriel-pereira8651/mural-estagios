import { HOJE, diffDias } from '../utils/datas';

export default class Curriculo {
  constructor({ arquivoPdf, dataAtualizacao, origem, tamanho }) {
    Object.assign(this, { arquivoPdf, dataAtualizacao, origem, tamanho });
  }
  diasDesdeAtualizacao() { return diffDias(HOJE, this.dataAtualizacao); }
  desatualizado() { return this.diasDesdeAtualizacao() > 60; }
}
