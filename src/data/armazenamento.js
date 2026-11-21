// Persistência no localStorage, com proteção caso o navegador bloqueie
import Candidatura from '../models/Candidatura';
import { ALUNO } from './dados';
import { HOJE, diasDe } from '../utils/datas';

export const CHAVE = 'mural-estagios-inatel-v1';
export function estadoInicial() {
  return {
    salvas: ['v2'],
    vistas: [],
    candidaturas: [new Candidatura({
      id: 'c-inicial', vagaId: 'v6', curriculo: ALUNO.curriculo, dataEnvio: diasDe(-10),
      status: 'Em análise', protocolo: `MDE-${HOJE.getFullYear()}-3172`,
    })],
  };
}
export function carregar() {
  try {
    const t = localStorage.getItem(CHAVE);
    if (!t) return null;
    const o = JSON.parse(t);
    return { salvas: o.salvas || [], vistas: o.vistas || [], candidaturas: (o.candidaturas || []).map(Candidatura.fromJSON) };
  } catch (e) { return null; }
}
export function persistir(estado) { try { localStorage.setItem(CHAVE, JSON.stringify(estado)); } catch (e) { /* sem armazenamento */ } }
