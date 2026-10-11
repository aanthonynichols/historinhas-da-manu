# Ilustrações da biblioteca

O leitor tem **108 cenas em WebP**, uma por página, doze para cada um dos nove livros (`public/assets/scene-<livro>-<01..12>.webp`, 1536 × 1024). Cada cena mostra o acontecimento daquela página. Foram geradas com a ferramenta de imagem do ChatGPT e revisadas uma a uma; as PNG geradas pelo ChatGPT mantêm a assinatura de proveniência C2PA.

Direção comum: ilustração infantil acolhedora em aquarela, papel com textura suave, luz quente, cores delicadas, personagens simpáticos e expressivos, sem cenas assustadoras, com espaço para os objetos tocáveis.

## Arquivos de apoio

| Arquivo | Uso |
| --- | --- |
| `chapeuzinho.png`, `bela.png`, `rapunzel.png`, `porquinhos.png`, `cinderela.png`, `branca.png` | Pinturas de origem das capas dos contos clássicos. |
| `capa-<livro>.webp` | Capas exibidas na biblioteca (1024 × 683), derivadas das pinturas de origem ou da primeira cena. |
| `hero-biblioteca.webp` | Pintura do topo da biblioteca, derivada de `bela.png`. |
| `sprites-pony.png`, `sprites-characters.png`, `sprites-objects.png`, `sprite-fish.png` | Atlas dos personagens e objetos tocáveis; as versões `.webp` têm as mesmas dimensões, porque `src/art.js` recorta por pixel. |
| `app-icon*.png`, `favicon.svg` | Ícone do aplicativo (livro aberto). |

## Como funcionam nas páginas

A pintura de fundo é estática e usa `object-fit: contain`. Os objetos e personagens tocáveis são recortes dos atlas, posicionados em porcentagem da pintura (`sceneAnchors` em cada página de `src/story-manuscripts.js`) e reposicionados pelo retângulo visível da imagem em `src/scene-layout.js`. Nas páginas em que o comando cita um personagem pintado, há também um alvo transparente sobre ele (`sceneHotspots` em `src/scene-anchors.js`).

Para trocar uma cena, mantenha o nome e as dimensões do arquivo e rode `npm run build && npm run check`: o verificador recusa cenas repetidas, tamanhos diferentes ou arquivos que não decodificam.
