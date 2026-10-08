/**
 * =============================================================================
 * MAIN.JS - Lógica do Portfolio Terminal
 * =============================================================================
 *
 * Este arquivo controla TUDO que acontece no terminal:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  O QUE ESTE ARQUIVO FAZ:                                                │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │  1. Pega os elementos HTML (input, área de saída, etc.)                 │
 * │  2. Cria funções auxiliares (mostrar texto, esperar, formatar)          │
 * │  3. Define o que cada comando faz (quem, sobre, habilidades...)         │
 * │  4. Controla o teclado (digitar, histórico, atalhos)                    │
 * │  5. Controla o mouse (clicar em comandos)                               │
 * │  6. Toca música (play/pause, barra de progresso)                        │
 * │  7. Faz a abertura animada (boot estilo Linux)                          │
 * │  8. Faz o passeio guiado (mostra tudo sozinho)                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ORGANIZAÇÃO DESTE ARQUIVO:
 * - Parte 1: Pegar elementos do HTML
 * - Parte 2: Funções auxiliares (as ferramentas básicas)
 * - Parte 3: Mostrar texto na tela
 * - Parte 4: Título da janela
 * - Parte 5: Mensagem de boas-vindas
 * - Parte 6: Cada comando (o que faz cada um)
 * - Parte 7: Lista de todos os comandos
 * - Parte 8: Passeio guiado
 * - Parte 9: Executar comando digitado
 * - Parte 10: Música (player)
 * - Parte 11: Teclado (o que acontece quando tecla alguma coisa)
 * - Parte 12: Mouse (clicar)
 * - Parte 13: Abertura (boot)
 * =============================================================================
 */

/* =============================================================================
   PARTE 1: PEGAR ELEMENTOS DO HTML
   =============================================================================
   Aqui a gente "pega" as partes da página que vamos manipular.
   É tipo dar um apelido para cada elemento para usar depois.
   ============================================================================= */

// A janela inteira do terminal (a caixa com bordas arredondadas)
const terminal = document.getElementById("term");

// A área onde o texto dos comandos aparece (a "tela" do terminal)
const areaSaida = document.getElementById("term-output");

// O texto que aparece enquanto o usuário digita (espelho do input)
const textoDigitado = document.getElementById("term-text");

// O campo de input invisível (captura o que o usuário digita no teclado)
const campoInput = document.getElementById("term-input");

// O player de música (áudio escondido)
const player = document.getElementById("audio");

// O título da janela (onde mostra "matheus@cecon — bash — 80×24")
const tituloJanela = document.getElementById("term-title");

/* =============================================================================
   PARTE 2: FUNÇÕES AUXILIARES (as ferramentas básicas)
   =============================================================================
   Funções que são usadas várias vezes. Criar uma vez e usar em vários lugares.
   ============================================================================= */

/**
 * Transforma texto em HTML seguro
 * Evita que alguém digite <script> e quebre o site (proteção básica)
 * @param {string} texto - O texto para transformar
 * @returns {string} - O texto seguro para colocar no HTML
 */
function textoSeguro(texto) {
  return String(texto)
    .replace(/&/g, "&amp;")   // & vira &amp;
    .replace(/</g, "&lt;")    // < vira &lt;
    .replace(/>/g, "&gt;");   // > vira &gt;
}

/**
 * Espera um tempo (para animações)
 * @param {number} ms - Quanto tempo esperar em milissegundos
 * @returns {Promise} - Uma promessa que resolve depois do tempo
 */
function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Verifica se o usuário prefere menos animações (configuração do sistema operacional)
// Se sim, o boot aparece instantâneo (sem digitação linha por linha)
const semAnimacao = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Desenha uma barrinha de progresso visual
 * @param {number} nivel - Número de 0 a 10 (quantos blocos preenchidos)
 * @returns {string} - A barrinha (ex: "█████░░░░░")
 */
function barraProgresso(nivel) {
  return "█".repeat(nivel) + "░".repeat(10 - nivel);
}

/**
 * Formata segundos em minutos:segundos
 * @param {number} segundos - Tempo em segundos (ex: 65)
 * @returns {string} - Formatado (ex: "1:05")
 */
function formatarTempo(segundos) {
  if (!isFinite(segundos)) return "0:00";  // se não for número, mostra 0:00
  const min = Math.floor(segundos / 60);
  const seg = Math.floor(segundos % 60);
  return min + ":" + String(seg).padStart(2, "0");  // completa com 0 (5 vira "05")
}

/* =============================================================================
   PARTE 3: MOSTRAR TEXTO NA TELA
   =============================================================================
   Funções para colocar conteúdo na área de saída do terminal.
   ============================================================================= */

/**
 * Rola a tela para o final (acompanha o texto novo)
 * Deixa sempre visível a última coisa que apareceu
 */
function rolarParaBaixo() {
  areaSaida.scrollTop = areaSaida.scrollHeight;
}

/**
 * Mostra um texto na tela do terminal
 * @param {string} texto - O texto/HTML para mostrar
 * @param {string} classe - Classe CSS extra (opcional, ex: "dimout" para texto apagado)
 * @returns {HTMLElement} - O elemento criado (para poder remover depois se precisar)
 */
function mostrar(texto, classe = "") {
  // Cria um parágrafo novo
  const paragrafo = document.createElement("p");

  // Define a classe CSS (t-out é o padrão, pode adicionar mais)
  paragrafo.className = "t-out" + (classe ? " " + classe : "");

  // Coloca o texto dentro (aceita HTML, tipo <span>, <b>, etc.)
  paragrafo.innerHTML = texto;

  // Adiciona na área de saída
  areaSaida.appendChild(paragrafo);

  // Rola para mostrar o que acabou de aparecer
  rolarParaBaixo();

  return paragrafo;
}

/**
 * Mostra um comando que o usuário digitou (com o prompt na frente)
 * @param {string} comando - O comando digitado (ex: "quem")
 */
function mostrarComando(comando) {
  const linha = document.createElement("p");
  linha.className = "t-line";
  linha.innerHTML = `<span class="t-prompt">matheus@cecon:~$</span> ${textoSeguro(comando)}`;
  areaSaida.appendChild(linha);
  rolarParaBaixo();
}

/**
 * Mostra uma tabela na tela
 * Usado para habilidades, competências e trajetória
 * @param {string} coluna1 - Nome da primeira coluna (ex: "HABILIDADE")
 * @param {string} coluna2 - Nome da segunda coluna (ex: "NÍVEL")
 * @param {string} linhas - O HTML das linhas da tabela (já montado)
 */
function mostrarTabela(coluna1, coluna2, linhas) {
  mostrar(`<table class="t-table">
    <thead><tr><th>${coluna1}</th><th>${coluna2}</th></tr></thead>
    <tbody>${linhas}</tbody>
  </table>`);
}

/* =============================================================================
   PARTE 4: TÍTULO DA JANELA
   =============================================================================
   Atualiza o texto "matheus@cecon — bash — 80×24" com o tamanho real da tela.
   Mede quanto mede um caractere para calcular quantas colunas cabem.
   ============================================================================= */

// Elemento invisível para medir o tamanho de um caractere
const medidor = document.createElement("span");
medidor.id = "probe";
medidor.textContent = "0".repeat(10);  // 10 caracteres "0"
terminal.appendChild(medidor);

/**
 * Atualiza o título da janela com o tamanho atual (colunas × linhas)
 * Roda quando a janela é redimensionada
 */
function atualizarTitulo() {
  // Mede quanto mede 1 caractere (divide a largura dos 10 "0" por 10)
  const larguraCaractere = medidor.getBoundingClientRect().width / 10 || 9;

  // Pega a altura de uma linha do CSS
  const alturaLinha = parseFloat(getComputedStyle(document.body).lineHeight) || 25.5;

  // Calcula quantas colunas e linhas cabem na tela
  const colunas = Math.floor(window.innerWidth / larguraCaractere);
  const linhas = Math.floor(window.innerHeight / alturaLinha);

  // Atualiza o texto
  tituloJanela.textContent = `matheus@cecon — bash — ${colunas}×${linhas}`;
}

// Quando redimensionar a janela, atualiza o título
window.addEventListener("resize", atualizarTitulo);

// Quando a fonte terminar de carregar, atualiza de novo (a fonte muda o tamanho)
document.fonts?.ready?.then(atualizarTitulo);

// Atualiza uma vez no início
atualizarTitulo();

/* =============================================================================
   PARTE 5: MENSAGEM DE BOAS-VINDAS
   =============================================================================
   Aparece depois do boot. Dá as opções iniciais para o usuário.
   ============================================================================= */

function mostrarBoasVindas() {
  // Título grande
  mostrar(`<span class="t-title">Bem-vindo ao meu portfolio</span>`);

  // Texto de apresentação
  mostrar(`Olá, meu nome é Matheus! Aqui você pode me conhecer melhor usando os comandos,
ou deixar que eu te guie.`);

  // Linha em branco para separar
  mostrar(``);

  // Dois comandos sugeridos como botões clicáveis
  mostrar(`<span class="cmd-btn t-accent" data-cmd="passeio">passeio</span> <span class="t-dim">— apresentação guiada</span>`);
  mostrar(`<span class="cmd-btn t-accent" data-cmd="ajuda">ajuda</span> <span class="t-dim">— ver todos os comandos</span>`);
}

/* =============================================================================
   PARTE 6: CADA COMANDO (o que faz cada um)
   =============================================================================
   Uma função para cada comando que o usuário pode digitar.
   ============================================================================= */

/**
 * Comando "ajuda": mostra a lista de todos os comandos disponíveis
 * Os comandos são clicáveis (dá pra clicar em vez de digitar)
 */
function comandoAjuda() {
  mostrar(`Comandos disponíveis:`);
  mostrar(``);

  // Monta uma linha para cada comando da lista
  const lista = CONTEUDO.comandos.map(([numero, nome, descricao]) =>
    `<span class="t-dim">${numero}</span>  <span class="cmd-btn t-accent" data-cmd="${nome}">${nome.padEnd(14)}</span> <span class="t-dim">${textoSeguro(descricao)}</span>`
  ).join("\n");

  mostrar(lista);
}

/**
 * Comando "quem": apresentação pessoal (nome, profissão, texto sobre você)
 */
function comandoQuem() {
  const dados = CONTEUDO.quem;
  mostrar(`<span class="t-title">${textoSeguro(dados.titulo)}</span>`);
  mostrar(`<span class="t-sub">${textoSeguro(dados.profissao)}</span>`);
  mostrar(``);
  mostrar(textoSeguro(dados.texto));
}

/**
 * Comando "sobre": texto mais longo contando sua história
 */
function comandoSobre() {
  mostrar(textoSeguro(CONTEUDO.sobre.texto));
}

/**
 * Comando "habilidades": tabela com suas hard skills e barras de progresso
 */
function comandoHabilidades() {
  // Monta uma linha da tabela para cada habilidade
  const linhas = CONTEUDO.habilidades.lista.map(([nome, nivel]) =>
    `<tr><td class="t-accent">${textoSeguro(nome)}</td><td>${barraProgresso(nivel)}</td><td class="t-dim">${nivel * 10}%</td></tr>`
  ).join("");

  mostrarTabela("HABILIDADE", "NÍVEL", linhas);
}

/**
 * Comando "pessoais": tabela com soft skills (como você trabalha)
 */
function comandoPessoais() {
  const dados = CONTEUDO.pessoais;

  // Nome como título
  mostrar(`<span class="t-title">${textoSeguro(dados.nome)}</span>`);
  mostrar(``);

  // Descrição de como trabalha
  mostrar(textoSeguro(dados.descricao));
  mostrar(``);

  // Tabela de competências
  const linhas = dados.lista.map(([nome, descricao]) =>
    `<tr><td class="t-accent">${textoSeguro(nome)}</td><td class="t-dim">${textoSeguro(descricao)}</td></tr>`
  ).join("");

  mostrarTabela("COMPETÊNCIA", "DESCRIÇÃO", linhas);
}

/**
 * Comando "interesses": lista de áreas que você quer seguir
 * Aparece em formato de árvore (como o comando "tree" do Linux)
 */
function comandoInteresses() {
  const lista = CONTEUDO.interesses.lista;
  const ultimo = lista.length - 1;

  mostrar(`<span class="t-dim">~/interesses</span>`);

  // Cada item usa ├── ou └── (último item usa └)
  const texto = lista.map(([nome, comentario], indice) =>
    `${indice === ultimo ? "└──" : "├──"} <span class="t-accent">${textoSeguro(nome)}</span> <span class="t-dim">${textoSeguro(comentario)}</span>`
  ).join("\n");

  mostrar(texto);
}

/**
 * Comando "log": linha do tempo da sua trajetória
 */
function comandoLog() {
  const linhas = CONTEUDO.trajetoria.lista.map(([periodo, descricao]) =>
    `<tr><td class="t-accent">${textoSeguro(periodo)}</td><td>${textoSeguro(descricao)}</td></tr>`
  ).join("");

  mostrarTabela("PERÍODO", "OCORRÊNCIA", linhas);
}

/**
 * Comando "musica": toca ou pausa a música
 * Se for a primeira vez, cria a barra de progresso na tela
 */
let elementoMusica = null;  // guarda o elemento da barra de música (cria só uma vez)

function comandoMusica() {
  // Se tá tocando, pausa. Se tá pausado, toca.
  if (player.paused) {
    player.play();
  } else {
    player.pause();
  }

  // Se ainda não criou a barra de música, cria agora
  if (!elementoMusica) {
    elementoMusica = document.createElement("p");
    elementoMusica.className = "mstat";
    areaSaida.appendChild(elementoMusica);
    rolarParaBaixo();
  }

  // Atualiza a barra (mostra se tá tocando ou pausado)
  atualizarMusica();
}

/**
 * Comando "contato": mostra email e GitHub como links clicáveis
 */
function comandoContato() {
  const dados = CONTEUDO.contato;
  mostrar(textoSeguro(dados.texto));
  mostrar(``);
  mostrar(`  <a href="mailto:${dados.email}">${dados.email}</a>`);
  mostrar(`  <a href="https://${dados.github}" target="_blank" rel="noopener">${dados.github}</a>`);
}

/**
 * Comando "projetos": mensagem sobre projetos (ainda vazio)
 */
function comandoProjetos() {
  mostrar(textoSeguro(CONTEUDO.projetos.texto));
}

/* =============================================================================
   PARTE 7: LISTA DE TODOS OS COMANDOS
   =============================================================================
   Aqui junta todos os comandos em um objeto.
   A chave é o nome do comando (o que o usuário digita).
   O valor é a função que executa quando digita aquele comando.
   ============================================================================= */

// Sistema de arquivos falso: permite usar "ls" e "cat" como em um terminal real
const arquivosDisponiveis = {
  "sobre.txt": comandoSobre,
  "habilidades.txt": comandoHabilidades,
  "perfil.man": comandoPessoais,
  "trajetoria.log": comandoLog,
  "contato.txt": comandoContato,
};

// Todos os comandos disponíveis
const todosComandos = {
  // Comandos principais (aparecem no ajuda)
  ajuda: comandoAjuda,
  quem: comandoQuem,
  sobre: comandoSobre,
  habilidades: comandoHabilidades,
  pessoais: comandoPessoais,
  interesses: comandoInteresses,
  log: comandoLog,
  musica: comandoMusica,
  contato: comandoContato,
  projetos: comandoProjetos,

  // Passeio guiado (e seu apelido "inicio")
  passeio: comandoPasseio,
  inicio: comandoPasseio,

  // Comandos de sistema
  limpar() {
    // Limpa a tela e mostra boas-vindas de novo
    areaSaida.innerHTML = "";
    elementoMusica = null;
    mostrarBoasVindas();
  },

  sair() {
    mostrar("Valeu pela visita! Até mais.");
  },

  // Easter eggs (comandos escondidos)
  btw() {
    mostrar(textoSeguro(CONTEUDO.segredos.btw));
  },

  windows() {
    mostrar(textoSeguro(CONTEUDO.segredos.windows));
  },

  gentoo() {
    mostrar(textoSeguro(CONTEUDO.segredos.gentoo));
  },

  // Comando "ls": lista os "arquivos" disponíveis
  ls() {
    mostrar(`<span class="t-accent">interesses/</span>  <span class="t-dim">musica/</span>
sobre.txt         habilidades.txt   perfil.man
trajetoria.log    contato.txt`);
    mostrar(`<span class="t-dim">Use "cat" seguido do nome do arquivo. Ex: cat sobre.txt</span>`, "dimout");
  },

  // Comando "cat": lê um "arquivo" (mostra o conteúdo)
  cat(argumentos) {
    const nomeArquivo = (argumentos[0] || "").replace(/^~\//, "");

    // Se termina com /, é uma pasta (não um arquivo)
    if (nomeArquivo.endsWith("/")) {
      return mostrar(`cat: ${textoSeguro(nomeArquivo)}: é uma pasta, não um arquivo`);
    }

    // Se o arquivo existe, executa a função dele
    if (arquivosDisponiveis[nomeArquivo]) {
      return arquivosDisponiveis[nomeArquivo]();
    }

    // Se não existe, avisa
    mostrar(`cat: ${textoSeguro(nomeArquivo)}: não achei esse arquivo. Tenta "ls" pra ver o que tem.`);
  },
};

/* =============================================================================
   PARTE 8: PASSEIO GUIADO
   =============================================================================
   Comando "passeio": mostra todo o portfolio sozinho, na ordem certa.
   É como um tour automático - a pessoa não precisa digitar nada.
   ============================================================================= */

// Versão simplificada do comando música (só mostra info, não toca)
function comandoInfoMusica() {
  const dados = CONTEUDO.musica;
  mostrar(`${textoSeguro(dados.nome)} — ${textoSeguro(dados.artista)}  <span class="t-dim">(${formatarTempo(player.duration || 226)})</span>`);
}

// Monta a lista de seções do passeio baseado na lista de comandos
const secoesPasseio = CONTEUDO.comandos.map(([numero, nome]) => ({
  numero: numero,
  nome: nome,
  funcao: nome === "musica" ? comandoInfoMusica : todosComandos[nome],
})).filter(secao => secao.funcao);  // remove se não tiver função

// Variáveis de controle do passeio
let passeioAtivo = false;       // tá rodando o passeio agora?
let cancelarPasseio = null;     // objeto para cancelar o passeio

/**
 * Comando "passeio": percorre todas as seções automaticamente
 */
async function comandoPasseio() {
  // Se já tá rodando, não faz nada
  if (passeioAtivo) return;

  passeioAtivo = true;
  cancelarPasseio = new AbortController();  // permite cancelar no meio
  const sinal = cancelarPasseio.signal;

  // Avisa que vai começar
  mostrar(`<span class="t-dim">Vou te mostrar meu portfólio.
Se quiser parar, é só digitar qualquer comando ou apertar Enter.</span>`, "dimout");

  // Percorre cada seção
  for (const secao of secoesPasseio) {
    // Se cancelou, para
    if (sinal.aborted) break;

    // Mostra o título da seção (ex: ──[ 01 · quem ]──────)
    const titulo = mostrar(
      `──[ ${secao.numero} · ${secao.nome} ]` + "─".repeat(Math.max(0, 40 - secao.nome.length - 10)),
      "secao"
    );

    await esperar(semAnimacao ? 0 : 500);

    // Se cancelou durante a espera, remove o título e sai
    if (sinal.aborted) {
      titulo.remove();
      break;
    }

    // Executa o comando da seção
    secao.funcao();
    await esperar(semAnimacao ? 0 : 800);
  }

  // Se terminou tudo (não foi cancelado), mostra mensagem final
  if (!sinal.aborted) {
    mostrar(`<span class="t-dim">Pronto! Agora é contigo. Quer falar comigo?</span>
<span class="t-dim">É só usar o comando</span> <span class="cmd-btn t-accent" data-cmd="contato">contato</span>`, "dimout");
  }

  // Reseta o estado
  passeioAtivo = false;
  campoInput.focus({ preventScroll: true });
}

/**
 * Para o passeio no meio (quando o usuário digita algo ou aperta Enter)
 */
function pararPasseio() {
  if (!passeioAtivo) return;
  passeioAtivo = false;
  cancelarPasseio?.abort();  // avisa o loop para parar
  mostrar(`<span class="t-dim">Passeio interrompido. Tô aqui se precisar.</span>`, "dimout");
  campoInput.focus({ preventScroll: true });
}

/* =============================================================================
   PARTE 9: EXECUTAR COMANDO DIGITADO
   =============================================================================
   Quando o usuário aperta Enter, essa função pega o que foi digitado,
   separa o comando dos argumentos, e executa a função certa.
   ============================================================================= */

/**
 * Executa um comando digitado pelo usuário
 * @param {string} textoCompleto - Tudo que foi digitado (ex: "cat sobre.txt")
 */
function executarComando(textoCompleto) {
  const comando = textoCompleto.trim();

  // Se não digitou nada, só mostra o prompt vazio
  if (!comando) return mostrarComando("");

  // Se tava no passeio, para o passeio primeiro
  if (passeioAtivo) pararPasseio();

  // Mostra o comando na tela (com o prompt na frente)
  mostrarComando(comando);

  // Separa o comando dos argumentos
  // "cat sobre.txt" vira ["cat", "sobre.txt"]
  const partes = comando.split(/\s+/);
  const nomeComando = partes[0];      // primeira parte é o comando
  const argumentos = partes.slice(1); // o resto são argumentos

  // Procura a função do comando
  const funcao = todosComandos[nomeComando];

  if (funcao) {
    // Encontrou! Executa (passa os argumentos)
    funcao(argumentos);
  } else {
    // Não encontrou o comando
    mostrar(`<span class="t-dim">Não conheço o comando "${textoSeguro(nomeComando)}". Tenta "ajuda" pra ver o que dá pra fazer.</span>`);
  }
}

/* =============================================================================
   PARTE 10: MÚSICA (player de áudio)
   =============================================================================
   Controla a barra de progresso que aparece quando toca música.
   ============================================================================= */

// Símbolos para o equalizador animado (parece que tá tocando)
const simbolosEqualizador = ["▁","▂","▃","▄","▅","▆","▇"];

/**
 * Atualiza a barra de música na tela
 * Mostra: ícone, nome da música, barra de progresso, tempo, equalizador
 */
function atualizarMusica() {
  if (!elementoMusica) return;  // se não criou ainda, não faz nada

  // Pega informações do player
  const duracao = player.duration || 225.9;  // duração total (se não souber, usa 225.9s)
  const tempoAtual = player.currentTime || 0; // quanto já tocou

  // Gera o equalizador animado (8 blocos aleatórios)
  let equalizador = "";
  if (!player.paused) {
    for (let i = 0; i < 8; i++) {
      equalizador += simbolosEqualizador[Math.floor(Math.random() * simbolosEqualizador.length)];
    }
  } else {
    equalizador = "········";  // parado: mostra pontos
  }

  // Calcula a barra de progresso (22 blocos no total)
  const totalBlocos = 22;
  const blocosPreenchidos = Math.round((tempoAtual / duracao) * totalBlocos);
  const barra = `<span class="bar-chars">${"▰".repeat(blocosPreenchidos)}</span>${"▱".repeat(totalBlocos - blocosPreenchidos)}`;

  // Ícone: ▶ se tá tocando, ⏸ se tá pausado
  const icone = player.paused ? "⏸" : "▶";

  // Monta o HTML completo
  const nomeMusica = textoSeguro(CONTEUDO.musica.nome);
  const nomeArtista = textoSeguro(CONTEUDO.musica.artista);

  elementoMusica.innerHTML = `${icone} <span class="t-accent">${nomeMusica} — ${nomeArtista}</span>  ${barra}  ${formatarTempo(tempoAtual)}/${formatarTempo(duracao)}  <span class="t-dim">${equalizador}</span>`;
}

// Eventos do player de música
player.addEventListener("play", atualizarMusica);    // quando começa a tocar
player.addEventListener("pause", atualizarMusica);   // quando pausa
player.addEventListener("timeupdate", atualizarMusica); // enquanto tá tocando (atualiza a barra)
player.addEventListener("ended", () => {             // quando a música acaba
  player.currentTime = 0;                            // volta pro início
  atualizarMusica();                                 // atualiza a barra
});

/* =============================================================================
   PARTE 11: TECLADO (o que acontece quando tecla alguma coisa)
   =============================================================================
   Controla o input: digitar, histórico (setas), autocompletar (Tab), etc.
   ============================================================================= */

// Histórico de comandos (para usar seta pra cima/baixo)
const historicoComandos = [];
let posicaoHistorico = 0;

// Clicar em qualquer lugar do terminal foca o input (para poder digitar)
terminal.addEventListener("click", () => campoInput.focus({ preventScroll: true }));

// Quando digita algo, atualiza o texto visível na tela
campoInput.addEventListener("input", () => {
  textoDigitado.textContent = campoInput.value;
});

// Quando aperta uma tecla
campoInput.addEventListener("keydown", (evento) => {
  // ── Durante o passeio: Enter para o passeio ──
  if (passeioAtivo && evento.key === "Enter") {
    evento.preventDefault();  // não deixa o Enter fazer a ação padrão
    pararPasseio();
    return;
  }

  // ── Enter: executa o comando ──
  if (evento.key === "Enter") {
    const valor = campoInput.value;

    // Guarda no histórico (se não estiver vazio)
    if (valor.trim()) {
      historicoComandos.push(valor);
      posicaoHistorico = historicoComandos.length;
    }

    // Limpa o input
    campoInput.value = "";
    textoDigitado.textContent = "";

    // Executa
    executarComando(valor);
  }

  // ── Seta para cima: comando anterior do histórico ──
  else if (evento.key === "ArrowUp") {
    evento.preventDefault();
    if (posicaoHistorico > 0) {
      posicaoHistorico--;
      campoInput.value = historicoComandos[posicaoHistorico] ?? "";
    }
    textoDigitado.textContent = campoInput.value;
  }

  // ── Seta para baixo: próximo comando do histórico ──
  else if (evento.key === "ArrowDown") {
    evento.preventDefault();
    if (posicaoHistorico < historicoComandos.length - 1) {
      posicaoHistorico++;
      campoInput.value = historicoComandos[posicaoHistorico];
    } else {
      posicaoHistorico = historicoComandos.length;
      campoInput.value = "";
    }
    textoDigitado.textContent = campoInput.value;
  }

  // ── Tab: autocompletar comando ──
  else if (evento.key === "Tab") {
    evento.preventDefault();
    const valor = campoInput.value.trim();
    if (!valor || valor.includes(" ")) return;  // só autocompleta no início

    // Procura comandos que começam com o que foi digitado
    const correspondencia = Object.keys(todosComandos).filter(c => c.startsWith(valor));

    if (correspondencia.length === 1) {
      // Só um comando bate: completa
      campoInput.value = correspondencia[0] + " ";
      textoDigitado.textContent = campoInput.value;
    } else if (correspondencia.length > 1) {
      // Vários comandos batem: mostra as opções
      mostrar(`<span class="t-dim">Opções: ${correspondencia.join(", ")}</span>`, "dimout");
    }
  }

  // ── Ctrl+C: cancela o que tá digitando ──
  else if (evento.key === "c" && evento.ctrlKey) {
    evento.preventDefault();
    mostrarComando(campoInput.value + "^C");  // mostra ^C como em terminal real
    campoInput.value = "";
    textoDigitado.textContent = "";
  }
});

/* =============================================================================
   PARTE 12: MOUSE (clicar)
   =============================================================================
   Quando clica em um comando (que tem data-cmd), executa ele.
   ============================================================================= */

areaSaida.addEventListener("click", (evento) => {
  // Procura o elemento clicado (ou o pai) que tenha data-cmd
  const alvo = evento.target.closest("[data-cmd]");

  if (alvo) {
    // Limpa o input e executa o comando clicado
    campoInput.value = "";
    textoDigitado.textContent = "";
    executarComando(alvo.dataset.cmd);
  }
});

/* =============================================================================
   PARTE 13: ABERTURA (boot)
   =============================================================================
   A animação que aparece quando o site carrega.
   Simula ligar um computador Linux (linhas aparecendo uma a uma).
   ============================================================================= */

/**
 * Inicia o terminal (faz o boot e mostra boas-vindas)
 */
async function iniciarTerminal() {
  // Se o usuário prefere sem animação, pula o boot
  if (!semAnimacao) {
    // Mostra cada linha do boot com um espacinho entre elas
    for (const linha of CONTEUDO.abertura.linhas) {
      const paragrafo = document.createElement("p");
      paragrafo.className = "boot";

      // Troca "[  OK  ]" por "[  <b>OK</b>  ]" (deixa o OK verde e negrito)
      // Se a linha for vazia, coloca um espaço (senão some)
      paragrafo.innerHTML = linha.replace("[  OK  ]", "[  <b>OK</b>  ]") || "&nbsp;";

      areaSaida.appendChild(paragrafo);
      rolarParaBaixo();

      // Espera um tempinho aleatório (parece mais natural)
      await esperar(40 + Math.random() * 30);
    }

    // Espera um pouco antes do login
    await esperar(400);

    // Mostra a linha de login
    const login = document.createElement("p");
    login.className = "t-line";
    login.innerHTML = `cecon login: <span class="t-accent">matheus</span>`;
    areaSaida.appendChild(login);
    rolarParaBaixo();

    // Espera mais um pouco
    await esperar(500);

    // Mostra a dica (com "passeio" e "ajuda" como botões clicáveis)
    const dica = CONTEUDO.abertura.dica
      .replace(/"passeio"/g, `<span class="cmd-btn t-accent" data-cmd="passeio">"passeio"</span>`)
      .replace(/"ajuda"/g, `<span class="cmd-btn t-accent" data-cmd="ajuda">"ajuda"</span>`);
    mostrar(dica, "dimout");

    // Espera mais um pouco antes das boas-vindas
    await esperar(500);
  } else {
    // Sem animação: só mostra a dica direto
    mostrar(CONTEUDO.abertura.dica, "dimout");
  }

  // Mostra as boas-vindas
  mostrarBoasVindas();

  // Foca o input (para poder digitar imediatamente)
  campoInput.focus({ preventScroll: true });
}

/* =============================================================================
   INICIA TUDO
   =============================================================================
   Quando a página carrega, começa o boot.
   ============================================================================= */
iniciarTerminal();
