/**
 * =============================================================================
 * CONFIG.JS - Configurações Personalizáveis
 * =============================================================================
 * 
 * Este arquivo permite personalizar o comportamento do terminal sem
 * precisar editar o código principal.
 * 
 * Para usar: Inclua este arquivo ANTES de main.js no index.html
 * 
 * @author Matheus Silva (thaolbz)
 * @version 1.0
 */

// =============================================================================
// CONFIGURAÇÕES DE TEMA
// =============================================================================

const CONFIG = {
  // Nome do usuário (aparece no prompt)
  user: "matheus",
  
  // Hostname (aparece no prompt)
  hostname: "cecon",
  
  // Prompt padrão
  prompt: "matheus@cecon:~$",
  
  // Título da janela
  windowTitle: "matheus@cecon — bash — 80×24",
  
  // =========================================================================
  // CONFIGURAÇÕES DE ANIMAÇÃO
  // =========================================================================
  
  // Velocidade de digitação (ms por caractere)
  typeSpeed: {
    min: 24,
    max: 60,
  },
  
  // Velocidade do boot (ms por linha)
  bootSpeed: {
    min: 70,
    max: 130,
  },
  
  // Velocidade do passeio (ms entre seções)
  passeioSpeed: {
    sectionDelay: 450,
    contentDelay: 650,
  },
  
  // =========================================================================
  // CONFIGURAÇÕES DE ÁUDIO
  // =========================================================================
  
  // Arquivo de áudio padrão
  audioFile: "assets/firefly.mp3",
  
  // Volume padrão (0.0 a 1.0)
  defaultVolume: 0.5,
  
  // =========================================================================
  // CONFIGURAÇÕES DE EXIBIÇÃO
  // =========================================================================
  
  // Número de colunas padrão para o título
  defaultCols: 80,
  
  // Número de linhas padrão para o título
  defaultRows: 24,
  
  // =========================================================================
  // CONFIGURAÇÕES DE ACESSIBILIDADE
  // =========================================================================
  
  // Respeitar prefers-reduced-motion
  respectReducedMotion: true,
  
  // =========================================================================
  // COMANDOS PERSONALIZADOS
  // =========================================================================
  // Adicione comandos personalizados aqui
  // Formato: nomeDoComando: function(args) { ... }
  customCommands: {
    // Exemplo:
    // olá() {
    //   print("Olá, mundo!");
    // },
  },
};

// =============================================================================
// NÃO EDITE ABAIXO DESTA LINHA
// =============================================================================

// Exporta configuração para ser usada em main.js
if (typeof window !== 'undefined') {
  window.PORTFOLIO_CONFIG = CONFIG;
}
