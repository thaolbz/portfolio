/**
 * =============================================================================
 * CONTEUDO.JS - Todo o texto do portfolio
 * =============================================================================
 *
 * Este arquivo é o "banco de dados" do site. Toda informação que aparece
 * na tela vem daqui: textos, habilidades, contatos, mensagens de abertura.
 *
 * Para personalizar o portfolio, é só editar os textos aqui embaixo.
 * Não precisa mexer no main.js (a lógica) nem no style.css (o visual).
 *
 * Estrutura de cada seção:
 * - quem:       apresentação inicial (nome, profissão, texto sobre você)
 * - sobre:      texto mais longo contando sua história
 * - habilidades: lista de hard skills com nível de 0 a 10
 * - pessoais:   soft skills (competências comportamentais)
 * - interesses: áreas que você quer seguir
 * - trajetoria: linha do tempo da sua vida profissional
 * - musica:     nome da música que toca no player
 * - contato:    email e redes sociais
 * - projetos:   mensagem sobre seus projetos
 * - segredos:   comandos escondidos (easter eggs)
 * - comandos:   lista que aparece no "ajuda"
 * - abertura:   texto da tela de boot (simula ligar o computador)
 * =============================================================================
 */

const CONTEUDO = {

  /* ──────────────────────────────────────────────────────────────────────────
     QUEM: Aparece quando digita "quem" ou no passeio guiado
     É a primeira impressão que a pessoa tem de você.
     ────────────────────────────────────────────────────────────────────────── */
  quem: {
    // Título grande no topo
    titulo: "Meu nome é Matheus",

    // Subtítulo embaixo do título (sua profissão/curso)
    profissao: "Estudante de técnico em informática pra internet",

    // Texto de apresentação (pode ter várias linhas)
    // Quebras de linha no texto viram quebras de linha na tela
    texto: `Gosto de entender como as coisas funcionam por dentro. Não me contento
em só usar uma tecnologia, sabe? Preciso abrir, configurar, fuçar,
entender o que tá acontecendo debaixo do capô.

É assim que eu aprendo. Quebrando, consertando, investigando.`,
  },

  /* ──────────────────────────────────────────────────────────────────────────
     SOBRE: Aparece quando digita "sobre" ou "cat sobre.txt"
     Um texto mais longo e pessoal, contando sua história.
     ────────────────────────────────────────────────────────────────────────── */
  sobre: {
    texto: `Vou ser bem direto contigo: ainda não tenho experiência profissional
formal. Mas o que eu tenho é curiosidade de verdade e vontade de aprender.

Uma dúvida sobre bateria vira estudo de governor, TLP, kernel.
Uma questão de boot vira EFI, LUKS, TPM. Eu não descanso enquanto
não entendo o porquê das coisas.

Isso construiu uma base sólida, feita por conta própria,
com muita investigação no meio.`,
  },

  /* ──────────────────────────────────────────────────────────────────────────
     HABILIDADES: Aparece quando digita "habilidades"
     Mostra suas hard skills (conhecimentos técnicos) em forma de tabela
     com barras de progresso.

     Formato de cada item: [nome da habilidade, nível de 0 a 10]
     - 0 = não sei nada
     - 5 = sei o básico
     - 10 = sei muito bem
     ────────────────────────────────────────────────────────────────────────── */
  habilidades: {
    lista: [
      ["Linux", 9],              // sei bastante, uso no dia a dia
      ["Hardware", 10],          // minha especialidade
      ["HTML/CSS", 8],           // sei fazer sites
      ["Redes", 6],              // conheço, mas tô aprendendo mais
      ["JavaScript", 5],         // básico/intermediário
      ["Banco de Dados", 4],     // sei o básico
      ["Lógica de Programação", 4], // tô estudando
    ],
  },

  /* ──────────────────────────────────────────────────────────────────────────
     PESSOAIS: Aparece quando digita "pessoais" ou "cat perfil.man"
     Mostra suas soft skills (como você trabalha, suas качества como pessoa).

     Formato: [nome da competência, descrição curta]
     ────────────────────────────────────────────────────────────────────────── */
  pessoais: {
    // Seu nome completo (aparece como título)
    nome: "Matheus Silva",

    // Uma frase que resume como você trabalha
    descricao: "Não copio comando pronto e saio andando. Quero saber o que tá acontecendo, qual é a causa real do problema e quanto cada solução vai me custar.",

    // Lista de competências comportamentais
    lista: [
      ["Investigação", "Separo sintoma de causa"],
      ["Autodidatismo", "Vou atrás do que eu não sei"],
      ["Persistência", "Se falhou, tento de outro jeito"],
      ["Atenção aos detalhes", "Percebo o que ninguém vê"],
      ["Pensamento crítico", "Questiono o porquê de tudo"],
    ],
  },

  /* ──────────────────────────────────────────────────────────────────────────
     INTERESSES: Aparece quando digita "interesses"
     Mostra as áreas que você quer seguir na carreira.
     Aparece em formato de "árvore de diretórios" (como o comando tree do Linux).

     Formato: [nome da área, comentário]
     ────────────────────────────────────────────────────────────────────────── */
  interesses: {
    lista: [
      ["Cibersegurança", "É pra onde eu quero ir"],
      ["Inteligência Artificial", "Aplicada à educação"],
      ["Linux", "Meu laboratório de testes"],
      ["Redes", "Infraestrutura e serviços"],
      ["Desenvolvimento Web", "HTML, CSS, JavaScript"],
    ],
  },

  /* ──────────────────────────────────────────────────────────────────────────
     TRAJETÓRIA: Aparece quando digita "log" ou "cat trajetoria.log"
     Uma linha do tempo da sua vida profissional/estudos.
     Mostra onde você está agora e para onde vai.

     Formato: [período, o que está acontecendo]
     ────────────────────────────────────────────────────────────────────────── */
  trajetoria: {
    lista: [
      ["Agora", "Tô terminando o técnico em informática junto com o 3º ano do ensino médio"],
      ["2027", "Quero entrar na faculdade de tecnologia"],
      ["Depois", "Carreira em cibersegurança, sistemas ou infraestrutura"],
    ],
  },

  /* ──────────────────────────────────────────────────────────────────────────
     MÚSICA: Información do player de áudio
     Quando digita "musica", toca essa música e mostra o nome dela.
     O arquivo de áudio fica em assets/firefly.mp3
     ────────────────────────────────────────────────────────────────────────── */
  musica: {
    nome: "Firefly",       // nome da música (aparece na barra de progresso)
    artista: "Lil Darkie", // nome do artista
  },

  /* ──────────────────────────────────────────────────────────────────────────
     CONTATO: Aparece quando digita "contato" ou "cat contato.txt"
     Links para as pessoas entrarem em contato com você.
     Os links são clicáveis (abrem email ou GitHub).
     ────────────────────────────────────────────────────────────────────────── */
  contato: {
    // Frase introdutória
    texto: "Quer falar comigo? Tô nesses lugares:",

    // Email (vira link mailto: quando clica)
    email: "thaolbz@icloud.com",

    // GitHub (vira link clicável, abre em nova aba)
    github: "github.com/thaolbz",
  },

  /* ──────────────────────────────────────────────────────────────────────────
     PROJETOS: Aparece quando digita "projetos"
     Como ainda não tem projetos para mostrar, deixa uma mensagem sincera.
     ────────────────────────────────────────────────────────────────────────── */
  projetos: {
    texto: `Ainda tô trabalhando nisso aqui. Em breve aparece coisa nova,
pode deixar. Enquanto isso, dá uma olhada no resto do terminal.`,
  },

  /* ──────────────────────────────────────────────────────────────────────────
     SEGREDOS (Easter Eggs): Comandos escondidos que não aparecem no "ajuda"
     São brincadeiras para quem explora o terminal.
     ────────────────────────────────────────────────────────────────────────── */
  segredos: {
    // Digita "btw" → responde "Uso Arch, aliás." (piada de usuário de Linux)
    btw: "Uso Arch, aliás.",

    // Digita "windows" → responde que não roda
    windows: "Aqui não roda não, meu amigo.",

    // Digita "gentoo" → brinca que demora para compilar
    gentoo: "Compilando... isso aqui demora. Vale a pena esperar.",
  },

  /* ──────────────────────────────────────────────────────────────────────────
     COMANDOS: Lista que aparece no "ajuda" e define a ordem do "passeio"

     Formato: [número, nome do comando, descrição]
     - número: ordem na lista (01, 02, 03...)
     - nome do comando: o que a pessoa digita
     - descrição: texto que aparece do lado

     A ORDEM IMPORTA: é a ordem que o passeio guiado vai seguir.
     ────────────────────────────────────────────────────────────────────────── */
  comandos: [
    ["01", "quem", "Quem sou eu"],
    ["02", "sobre", "Minha história"],
    ["03", "habilidades", "O que eu sei fazer"],
    ["04", "pessoais", "Como eu trabalho"],
    ["05", "interesses", "Pra onde eu quero ir"],
    ["06", "log", "Minha trajetória"],
    ["07", "projetos", "O que tô fazendo"],
    ["08", "musica", "O que tô ouvindo"],
    ["09", "contato", "Fala comigo"],
  ],

  /* ──────────────────────────────────────────────────────────────────────────
     ABERTURA (Boot): O que aparece quando o site carrega
     Simula a inicialização de um computador Linux.

     - linhas: texto que aparece linha por linha (efeito de digitação)
     - dica: mensagem final com sugestão do que fazer
     ────────────────────────────────────────────────────────────────────────── */
  abertura: {
    // Cada string vira uma linha na tela
    // "[  OK  ]" vira verde automaticamente (o JavaScript troca por <b>OK</b>)
    // Linha vazia ("") cria um espaço em branco
    linhas: [
      "Iniciando sessão do usuário matheus...",
      "[  OK  ] Montado /home/matheus/portfolio",
      "[  OK  ] Serviço de curiosidade iniciado",
      "[  OK  ] Ambiente de aprendizado alcançado",
      "[  OK  ] Serviço de informações do sistema iniciado",
      "[  OK  ] Serviço de appreciation do Hyprland iniciado",
      "[  OK  ] Montado /boot",
      "[  OK  ] Serviço de áudio iniciado: Firefly",
      "[  OK  ] Portfolio pronto",
      "",  // linha em branco para separar
    ],

    // Mensagem que aparece depois do boot, com comandos clicáveis
    // "passeio" e "ajuda" viram botões clicáveis automaticamente
    dica: `Começa por aqui: digite "passeio" pra eu te mostrar tudo,
ou "ajuda" se você quiser escolher o que ver.`,
  },
};
