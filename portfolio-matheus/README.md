# Portfolio Terminal

> Portfolio interativo com estética de terminal Linux, desenvolvido com HTML, CSS e JavaScript puro.

## Estrutura

```
portfolio-terminal/
├── index.html          # Página principal
├── README.md           # Documentação
├── .gitignore          # Arquivos ignorados pelo Git
├── css/
│   ├── style.css       # Estilos (tema fósforo verde, efeito CRT)
│   └── fonts/
│       └── terminus-400.woff
├── js/
│   ├── conteudo.js     # Conteúdo do portfolio (textos, habilidades, etc.)
│   ├── main.js         # Lógica do terminal
│   └── config.js       # Configurações opcionais
└── assets/
    ├── cover.png
    ├── firefly.mp3     # Música de fundo
    ├── wallpaper.jpg
    └── wallpaper-thumb.jpg
```

## Características

- **Interface de terminal** com barra de título, prompt e cursor piscante
- **Tema fósforo verde** com efeito CRT (scanlines, vinheta, flicker)
- **Comandos clicáveis** — não precisa saber digitar, basta clicar
- **Passeio guiado** automático (`passeio`)
- **Reprodutor de áudio** integrado
- **Sistema de arquivos simulado** (`ls`, `cat`)
- **Responsivo** e com suporte a `prefers-reduced-motion`

## Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `ajuda` | Lista todos os comandos (clicáveis) |
| `quem` | Apresentação pessoal |
| `sobre` | Perfil detalhado |
| `habilidades` | Competências técnicas com barras de progresso |
| `pessoais` | Competências comportamentais |
| `interesses` | Áreas de atuação |
| `log` | Trajetória profissional |
| `projetos` | Portfólio de projetos |
| `musica` | Reproduz/pausa música de fundo |
| `contato` | Informações de contato |
| `passeio` | Apresentação guiada automática |
| `limpar` | Limpa a tela |
| `ls` | Lista arquivos disponíveis |
| `cat <arquivo>` | Lê um arquivo |

## Como Usar

1. Abra `index.html` em qualquer navegador moderno
2. **Opção 1**: Digite comandos no terminal
3. **Opção 2**: Clique nos comandos exibidos (mais fácil para iniciantes)
4. **Opção 3**: Digite `passeio` para uma apresentação automática

### Atalhos de Teclado

| Tecla | Função |
|-------|--------|
| `Enter` | Executa comando / interrompe passeio |
| `↑` `↓` | Navega no histórico |
| `Tab` | Autocompleta comando |
| `Ctrl+C` | Cancela input atual |

## Personalização

Edite `js/conteudo.js` para modificar:
- Textos de apresentação
- Habilidades e níveis
- Informações de contato
- Mensagens de boot

## Tecnologias

- HTML5 semântico
- CSS3 (variáveis, animações, backdrop-filter)
- JavaScript ES6+ (vanilla, sem frameworks)

---

**Autor**: Matheus Silva
**GitHub**: [github.com/thaolbz](https://github.com/thaolbz)
**Email**: thaolbz@icloud.com
