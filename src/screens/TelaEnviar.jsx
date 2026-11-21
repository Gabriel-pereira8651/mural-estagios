import { useState, useEffect, useRef } from 'react';
import Icone, { IC } from '../components/Icone';
import Logo from '../components/Logo';
import Curriculo from '../models/Curriculo';
import Candidatura from '../models/Candidatura';
import { HOJE, fmtDataCompleta, fmtTamanho, LIMITE_PDF } from '../utils/datas';

// Tela 5: Enviar candidatura (HTA 3, opções A e B)
export default function TelaEnviar({ vaga, aluno, onVoltar, onConcluir, onBloqueio }) {
  const [opcao, setOpcao] = useState('perfil');
  const [arquivo, setArquivo] = useState(null);
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [enviando, setEnviando] = useState(false);
  const travaRef = useRef(false);
  const inputRef = useRef(null);
  const perfil = aluno.curriculo;
  const podeEnviar = opcao === 'perfil' || !!arquivo;
  useEffect(() => { onBloqueio(enviando); }, [enviando]);

  function escolherArquivo(e) {
    const f = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!f) return;
    const ehPdf = f.type === 'application/pdf' || /\.pdf$/i.test(f.name);
    if (!ehPdf) { setArquivo(null); setErro('Esse arquivo não é um PDF. Exporte seu currículo em PDF e escolha de novo.'); return; }
    if (f.size > LIMITE_PDF) { setArquivo(null); setErro(`O arquivo tem ${fmtTamanho(f.size)}. O limite é 5 MB.`); return; }
    setErro('');
    setArquivo(new Curriculo({ arquivoPdf: f.name, dataAtualizacao: new Date(HOJE), origem: 'anexo', tamanho: f.size }));
  }

  async function confirmar() {
    if (travaRef.current || !podeEnviar) return; // bloqueia o segundo toque
    travaRef.current = true;
    setEnviando(true);
    const c = new Candidatura({
      id: 'c-' + Date.now(), vagaId: vaga.id,
      curriculo: opcao === 'perfil' ? perfil : arquivo, mensagem: mensagem.trim(),
    });
    await c.enviar();
    onConcluir(c);
  }

  const dias = perfil.diasDesdeAtualizacao();
  return (
    <>
      <section className="card resumo">
        <Logo vaga={vaga} />
        <div><strong>{vaga.titulo}</strong><span>{vaga.empresa}. {vaga.textoPrazo()}</span></div>
      </section>

      <h2 className="secao-titulo" id="titulo-cv">Qual currículo você quer enviar?</h2>
      <fieldset className="opcoes" aria-labelledby="titulo-cv" disabled={enviando}>
        <label className={'opcao' + (opcao === 'perfil' ? ' sel' : '')}>
          <input type="radio" name="curriculo" checked={opcao === 'perfil'} onChange={() => setOpcao('perfil')} />
          <span className="opcao-txt">
            <strong>Usar currículo do perfil</strong>
            <span className="arquivo-nome"><Icone d={IC.arquivo} tamanho={16} />{perfil.arquivoPdf}</span>
            <span className={'data-cv' + (perfil.desatualizado() ? ' antiga' : '')}>
              Atualizado em {fmtDataCompleta(perfil.dataAtualizacao)} (há {dias} dias)
            </span>
          </span>
        </label>
        {opcao === 'perfil' && perfil.desatualizado() && (
          <div className="alerta" role="note">
            <Icone d={IC.alerta} tamanho={18} />
            <span>Esse currículo tem mais de 2 meses. Se ele não mostra suas experiências recentes, anexe uma versão nova.</span>
          </div>
        )}

        <label className={'opcao' + (opcao === 'novo' ? ' sel' : '')}>
          <input type="radio" name="curriculo" checked={opcao === 'novo'} onChange={() => setOpcao('novo')} />
          <span className="opcao-txt">
            <strong>Anexar novo currículo</strong>
            <span>Arquivo em PDF de até 5 MB</span>
          </span>
        </label>
        {opcao === 'novo' && (
          <>
            <input ref={inputRef} type="file" accept="application/pdf,.pdf" onChange={escolherArquivo} hidden />
            {arquivo ? (
              <div className="arquivo-chip">
                <Icone d={IC.check} />
                <div><strong>{arquivo.arquivoPdf}</strong><span>{fmtTamanho(arquivo.tamanho)}, pronto para enviar</span></div>
                <button className="link" onClick={() => inputRef.current.click()}>Trocar</button>
              </div>
            ) : (
              <button className="dropzone" onClick={() => inputRef.current.click()}>
                <Icone d={IC.upload} tamanho={26} />
                Escolher arquivo PDF
                <small>Toque para buscar no seu celular</small>
              </button>
            )}
            {erro && <p className="erro" role="alert"><Icone d={IC.alerta} tamanho={16} />{erro}</p>}
            {!arquivo && !erro && <p className="ajuda">Anexe um PDF para liberar o envio.</p>}
          </>
        )}
      </fieldset>

      <label className="campo">
        <span>Mensagem para a empresa (opcional)</span>
        <textarea rows={3} maxLength={300} value={mensagem} disabled={enviando}
          onChange={e => setMensagem(e.target.value)} placeholder="Conte em poucas linhas por que essa vaga combina com você." />
        <span className="contagem">{mensagem.length}/300</span>
      </label>

      <div className="barra-acao">
        <button className="btn secundario" onClick={onVoltar} disabled={enviando}>Cancelar</button>
        <button className="btn primario" onClick={confirmar} disabled={!podeEnviar || enviando} aria-busy={enviando}>
          {enviando ? <><span className="spinner" aria-hidden="true" />Enviando...</> : 'Confirmar envio'}
        </button>
      </div>
    </>
  );
}
