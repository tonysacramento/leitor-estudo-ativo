# Leitor de Estudo Ativo

App web instalável (PWA) para estudar ouvindo: modo leitura estilo Kindle (páginas, temas sépia/escuro, fonte e margens ajustáveis, sumário e retomada de onde parou), leitura em voz alta com a frase em destaque, importação de PDF/TXT/Markdown com limpeza de cabeçalhos e rodapés, busca e revisão pelo **Método I-L-E** (Identificar, Localizar, Eliminar).

## Lista de arquivos
Selecione vários PDFs/TXTs de uma vez. Eles ficam numa lista lateral (salva no aparelho), cada um com a posição onde você parou; ao terminar um arquivo, a leitura segue para o próximo.

## Instalar
- **Android (Chrome):** abra o site e toque em **⬇ Instalar app** (ou ⋮ → *Instalar app*).
- **iPhone (Safari):** Compartilhar → *Adicionar à Tela de Início*.
- **Computador (Chrome/Edge):** ícone de instalar na barra de endereço. Depois de instalado, o app aparece em *Abrir com* para PDF e TXT.

## Pratique
Flashcards com revisão espaçada, correção de discursivas no Padrão Ouro (nota 0–100, 4 parágrafos, versão ideal) e podcast de 5–8 min gerado do material, salvo na lista de arquivos.

## Voz neural (tela apagada)
Em **Voz da leitura**, escolha uma voz "Neural". Ela é baixada uma vez (~60 MB), fica salva no aparelho e gera o áudio localmente, tocando como música: continua com a tela apagada e em outros apps, e funciona offline.

## Offline
Depois da primeira abertura, o app e o leitor de PDF (PDF.js) ficam salvos no aparelho. As vozes dependem do sistema; algumas vozes "online" do Chrome precisam de internet.

## Resumo e questões I-L-E
Na versão hospedada aqui, os botões geram um prompt pronto para colar no Claude. A geração automática dentro da página funciona na versão publicada no claude.ai.

## Publicar uma atualização
Altere os arquivos e mude `VERSION` em `sw.js` (ex.: `v3.0.1`) para os aparelhos baixarem a nova versão.
