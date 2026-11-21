import Curriculo from './Curriculo';

export default class Candidatura {
  constructor({ id, vagaId, curriculo, dataEnvio = null, status = 'Rascunho', protocolo = null, mensagem = '' }) {
    Object.assign(this, { id, vagaId, curriculo, dataEnvio, status, protocolo, mensagem });
  }
  // Simula o envio ao servidor (processamento) e devolve o comprovante
  enviar() {
    return new Promise(resolve => setTimeout(() => {
      this.dataEnvio = new Date();
      this.status = 'Enviada';
      this.protocolo = `MDE-${this.dataEnvio.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      resolve(this);
    }, 1500));
  }
  comStatus(status) { return new Candidatura({ ...this, status }); }
  toJSON() {
    return {
      ...this,
      dataEnvio: this.dataEnvio ? this.dataEnvio.toISOString() : null,
      curriculo: { ...this.curriculo, dataAtualizacao: this.curriculo.dataAtualizacao.toISOString() },
    };
  }
  static fromJSON(o) {
    return new Candidatura({
      ...o,
      dataEnvio: o.dataEnvio ? new Date(o.dataEnvio) : null,
      curriculo: new Curriculo({ ...o.curriculo, dataAtualizacao: new Date(o.curriculo.dataAtualizacao) }),
    });
  }
}
