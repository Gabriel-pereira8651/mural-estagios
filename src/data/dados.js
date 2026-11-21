import Vaga from '../models/Vaga';
import Curriculo from '../models/Curriculo';
import Aluno from '../models/Aluno';
import MuralEstagios from '../models/MuralEstagios';
import { diasDe } from '../utils/datas';

export const CURSOS = ['Engenharia de Software', 'Engenharia de Computação', 'Engenharia de Telecomunicações', 'Engenharia Elétrica'];
export const MODALIDADES = ['Presencial', 'Híbrido', 'Remoto'];

export const ALUNO = new Aluno({
  nome: 'Carlos', nomeCompleto: 'Carlos Souza', matricula: '1847',
  curso: 'Engenharia de Software', periodo: 7, email: 'carlos.souza@ges.inatel.br',
  curriculo: new Curriculo({ arquivoPdf: 'curriculo_carlos_souza.pdf', dataAtualizacao: diasDe(-68), origem: 'perfil', tamanho: 412000 }),
});

export const MURAL = new MuralEstagios([
  new Vaga({
    id: 'v1', titulo: 'Estágio em Segurança da Informação', empresa: 'Arco Segurança Digital', sigla: 'AS', cor: '#0b4fa8',
    area: 'cibersegurança pentest redes', cidade: 'Santa Rita do Sapucaí, MG', modalidade: 'Híbrido',
    cursos: ['Engenharia de Software', 'Engenharia de Computação'], periodoMinimo: 6, prazoInscricao: diasDe(9), nova: true,
    bolsa: 'R$ 1.600', carga: '6h por dia',
    descricao: 'Apoie o time de segurança em análises de vulnerabilidade, revisão de configurações e resposta a incidentes em clientes da indústria.',
    requisitos: ['Noções de redes e Linux', 'Conhecimento básico de Python', 'Interesse em segurança ofensiva e defensiva'],
  }),
  new Vaga({
    id: 'v2', titulo: 'Estágio em Desenvolvimento Web', empresa: 'Pátio Labs', sigla: 'PL', cor: '#2f7d6d',
    area: 'frontend react javascript', cidade: 'Remoto', modalidade: 'Remoto',
    cursos: ['Engenharia de Software', 'Engenharia de Computação'], periodoMinimo: 5, prazoInscricao: diasDe(2), nova: true,
    bolsa: 'R$ 1.400', carga: '6h por dia',
    descricao: 'Construa telas e componentes em React para a plataforma de reservas da empresa, com acompanhamento de um desenvolvedor sênior.',
    requisitos: ['HTML, CSS e JavaScript', 'Noções de React', 'Git e GitHub'],
  }),
  new Vaga({
    id: 'v3', titulo: 'Estágio em Desenvolvimento Mobile', empresa: 'Vértice Sistemas', sigla: 'VS', cor: '#7a4cc2',
    area: 'android flutter kotlin', cidade: 'Pouso Alegre, MG', modalidade: 'Presencial',
    cursos: ['Engenharia de Software'], periodoMinimo: 6, prazoInscricao: diasDe(14), nova: true,
    bolsa: 'R$ 1.500', carga: '6h por dia',
    descricao: 'Participe do desenvolvimento do app de gestão de frotas, da especificação das telas à publicação nas lojas.',
    requisitos: ['Orientação a objetos', 'Kotlin ou Flutter', 'Boa comunicação em equipe'],
  }),
  new Vaga({
    id: 'v4', titulo: 'Estágio em Ciência de Dados', empresa: 'Lumen Dados', sigla: 'LD', cor: '#c05621',
    area: 'dados python machine learning', cidade: 'Remoto', modalidade: 'Remoto',
    cursos: ['Engenharia de Software', 'Engenharia de Computação', 'Engenharia Elétrica'], periodoMinimo: 8, prazoInscricao: diasDe(20), nova: false,
    bolsa: 'R$ 1.800', carga: '6h por dia',
    descricao: 'Trabalhe com limpeza de dados, criação de dashboards e modelos preditivos para clientes do varejo.',
    requisitos: ['Python e pandas', 'SQL', 'Estatística básica'],
  }),
  new Vaga({
    id: 'v5', titulo: 'Estágio em Redes e Telecom', empresa: 'Rede Sul Telecom', sigla: 'RS', cor: '#2b6cb0',
    area: 'redes fibra telecom', cidade: 'Santa Rita do Sapucaí, MG', modalidade: 'Presencial',
    cursos: ['Engenharia de Telecomunicações', 'Engenharia de Computação'], periodoMinimo: 5, prazoInscricao: diasDe(6), nova: false,
    bolsa: 'R$ 1.300', carga: '5h por dia',
    descricao: 'Acompanhe projetos de expansão da rede de fibra óptica e ajude na documentação técnica das instalações.',
    requisitos: ['Fundamentos de redes', 'Disponibilidade para visitas técnicas'],
  }),
  new Vaga({
    id: 'v6', titulo: 'Estágio em QA e Testes', empresa: 'Vértice Sistemas', sigla: 'VS', cor: '#7a4cc2',
    area: 'qualidade testes automacao', cidade: 'Pouso Alegre, MG', modalidade: 'Híbrido',
    cursos: ['Engenharia de Software'], periodoMinimo: 4, prazoInscricao: diasDe(25), nova: false,
    bolsa: 'R$ 1.300', carga: '6h por dia',
    descricao: 'Escreva casos de teste, automatize cenários e ajude a garantir a qualidade das entregas do time de produto.',
    requisitos: ['Lógica de programação', 'Atenção a detalhes', 'Noções de testes automatizados (desejável)'],
  }),
  new Vaga({
    id: 'v7', titulo: 'Estágio em Sistemas Embarcados', empresa: 'Faísca Eletrônica', sigla: 'FE', cor: '#4a5568',
    area: 'embarcados firmware c microcontroladores', cidade: 'Santa Rita do Sapucaí, MG', modalidade: 'Presencial',
    cursos: ['Engenharia de Computação', 'Engenharia Elétrica'], periodoMinimo: 6, prazoInscricao: diasDe(11), nova: false,
    bolsa: 'R$ 1.500', carga: '6h por dia',
    descricao: 'Desenvolva firmware para sensores industriais e participe dos testes em bancada.',
    requisitos: ['Linguagem C', 'Eletrônica digital', 'Microcontroladores'],
  }),
  new Vaga({
    id: 'v8', titulo: 'Estágio em Suporte de TI', empresa: 'Rede Sul Telecom', sigla: 'RS', cor: '#2b6cb0',
    area: 'suporte infraestrutura', cidade: 'Santa Rita do Sapucaí, MG', modalidade: 'Presencial',
    cursos: CURSOS, periodoMinimo: 3, prazoInscricao: diasDe(-2), nova: false,
    bolsa: 'R$ 1.100', carga: '4h por dia', descricao: 'Vaga encerrada.', requisitos: [],
  }),
]);

export const DISCIPLINAS = [
  { codigo: 'S205', nome: 'S205 - Interface Homem-Máquina', local: 'P1-S17, 10:00', faltas: '2/25', cr: '9,0', crCor: 'verde' },
  { codigo: 'S206', nome: 'S206 - Estruturas de Dados', local: 'P1-S12, 08:00', faltas: '4/25', cr: '7,5', crCor: 'amarelo', prova: diasDe(5) },
];
