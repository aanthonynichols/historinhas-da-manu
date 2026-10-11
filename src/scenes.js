// Narrative direction follows the final page order, including interleaved moments.
// Decoration is environmental only: the illustration owns every character.
import { sceneAnchors, sceneHotspots } from './scene-anchors.js';

const directions = {
  chapeuzinho: [
    ['Mamãe prepara a cesta de Chapeuzinho na cozinha, com morangos para a vovó.', 'hearth'],
    ['Chapeuzinho ajeita o pão e os morangos na cesta com a ajuda da mamãe.', 'hearth'],
    ['Chapeuzinho e mamãe percorrem o caminho da floresta acompanhadas por um passarinho.', 'breeze'],
    ['Chapeuzinho procura o passarinho que salta entre os galhos acima do caminho.', 'breeze'],
    ['Chapeuzinho observa uma borboleta pousada nas flores perto do caminho.', 'flutters'],
    ['Chapeuzinho e mamãe contam uma flor rosa e outra amarela no jardim.', 'flutters'],
    ['O lobo veste a touca da vovó na casinha enquanto ela está no jardim.', 'hearth'],
    ['O lobo olha suas orelhas no espelho da vovó com a touca na cabeça.', 'hearth'],
    ['Chapeuzinho e mamãe chegam à porta, onde encontram vovó e o lobo de touca.', 'warm'],
    ['Vovó abraça Chapeuzinho e recebe os morangos depois de tirar a touca do lobo.', 'warm'],
    ['Chapeuzinho, vovó, mamãe e o lobo compartilham o lanche à mesa.', 'hearth'],
    ['Chapeuzinho volta com mamãe pela floresta tranquila sob as primeiras estrelas.', 'nightstars']
  ],
  bela: [
    ['Bela lê entre as flores antes de visitar o castelo encantado com papai.', 'flutters'],
    ['Bela abre um livro ilustrado com árvores, rios e pássaros no jardim.', 'breeze'],
    ['Bela cumprimenta a Fera tímida no salão do castelo encantado.', 'warm'],
    ['A Fera acena com sua patinha para Bela, começando uma amizade no castelo.', 'warm'],
    ['Bela rega a rosa especial do jardim enquanto a Fera observa com cuidado.', 'flutters'],
    ['Bela e a Fera levam água e regam juntos a rosa no canteiro.', 'flutters'],
    ['Bela e a Fera dividem um lanche e livros numa mesa acolhedora do castelo.', 'hearth'],
    ['Bela e a Fera dançam passos pequenos e grandes pelo salão do castelo.', 'warm'],
    ['À noite, a rosa brilha enquanto a magia transforma a Fera em príncipe.', 'sparkles'],
    ['Bela reconhece o sorriso de seu amigo príncipe junto à rosa do jardim.', 'flutters'],
    ['Bela, o príncipe e papai cuidam das rosas no jardim do castelo.', 'breeze'],
    ['Os amigos guardam os livros e observam as estrelas pelas janelas do castelo.', 'nightstars']
  ],
  rapunzel: [
    ['Rapunzel olha o jardim pela janela da torre, com sua longa trança dourada.', 'clouds'],
    ['Rapunzel observa lá do alto o lago azul e o jardim abaixo da torre.', 'water'],
    ['Rapunzel canta na janela da torre para os passarinhos que se aproximam.', 'breeze'],
    ['Dois passarinhos cantam com Rapunzel junto à janela aberta da torre.', 'breeze'],
    ['Um jovem no jardim cumprimenta Rapunzel que sorri lá na janela.', 'flutters'],
    ['O amigo oferece uma flor caída do jardim para Rapunzel na torre.', 'flutters'],
    ['A longa trança de Rapunzel chega ao jardim, onde o amigo traz uma fita.', 'breeze'],
    ['Rapunzel prende um laço rosa na trança que balança junto à janela.', 'breeze'],
    ['Rapunzel abre a porta da torre e encontra a grama macia do jardim.', 'warm'],
    ['Rapunzel pisa na grama e roda devagar ao sol diante da torre.', 'breeze'],
    ['Rapunzel e o amigo passeiam entre flores e caminhos novos no jardim.', 'flutters'],
    ['Rapunzel e o amigo se despedem do passeio enquanto uma estrela ilumina a torre.', 'nightstars']
  ],
  porquinhos: [
    ['Os três porquinhos escolhem onde construir suas casinhas num terreno ensolarado.', 'breeze'],
    ['Os porquinhos levam cestas e martelinhos para começar as casas no jardim.', 'breeze'],
    ['O primeiro porquinho termina a casinha de palha com uma flor na janela.', 'breeze'],
    ['O porquinho coloca uma pequena porta na sua casinha de palha.', 'breeze'],
    ['Um porquinho constrói a casa de madeira enquanto o irmão trabalha nos tijolos.', 'breeze'],
    ['Os porquinhos encaixam gravetos e empilham tijolos nas duas casas em construção.', 'breeze'],
    ['O lobo sopra a palha e os gravetos enquanto os irmãos correm para a casa de tijolos.', 'wind'],
    ['Os três irmãos fecham a porta e se abraçam dentro da casinha de tijolos.', 'hearth'],
    ['Os três porquinhos ficam protegidos na casa firme enquanto o lobo sopra lá fora.', 'hearth'],
    ['Os porquinhos observam de perto os tijolos que formam as paredes resistentes.', 'hearth'],
    ['Porquinhos e lobo compartilham sopa quente depois de fazerem as pazes.', 'hearth'],
    ['Porquinhos e lobo reconstroem juntos as casinhas no jardim.', 'breeze']
  ],
  cinderela: [
    ['Cinderela cuida da casa e conversa com os passarinhos junto à janela.', 'hearth'],
    ['Passarinhos trazem uma fita para Cinderela, que agradece com carinho.', 'breeze'],
    ['A fada madrinha aparece no jardim com a varinha cercada de pequenas luzes.', 'sparkles'],
    ['Cinderela observa três luzinhas da varinha e a abóbora começando a mudar.', 'sparkles'],
    ['A fada apresenta a carruagem, o vestido azul e os sapatinhos brilhantes.', 'sparkles'],
    ['Cinderela acena pela janela da carruagem a caminho do castelo iluminado.', 'nightstars'],
    ['Cinderela e o príncipe dançam no salão do castelo entre convidados sorridentes.', 'warm'],
    ['Cinderela e o príncipe giram devagar no salão com estrelas visíveis pela janela.', 'nightstars'],
    ['À meia-noite, Cinderela corre pela escada e deixa um sapatinho para trás.', 'nightstars'],
    ['O príncipe chega à casa de Cinderela com o sapatinho enquanto os pássaros cantam.', 'breeze'],
    ['O sapatinho serve em Cinderela, que sorri para o convite de dançar outra vez.', 'warm'],
    ['Cinderela dança com os amigos e agradece à fada pela noite especial.', 'sparkles']
  ],
  branca: [
    ['Branca de Neve segue um coelhinho pelo caminho da floresta até a casinha.', 'breeze'],
    ['O coelhinho pula uma pedra e espera Branca de Neve entre as flores.', 'flutters'],
    ['Os sete amigos abrem a porta da casinha e dão boas-vindas a Branca de Neve.', 'warm'],
    ['Branca de Neve e os sete amigos preparam mais um lugar à mesa das tigelinhas.', 'hearth'],
    ['Branca de Neve conta os sete amigos de gorro reunidos na casinha.', 'hearth'],
    ['Branca de Neve bate palmas para os amigos que cantam enquanto cuidam da casa.', 'hearth'],
    ['Branca de Neve adormece após provar a maçã, com os amigos perto para cuidar dela.', 'warm'],
    ['Os amigos cobrem Branca de Neve com uma manta e esperam tranquilamente ao seu lado.', 'hearth'],
    ['Branca de Neve desperta diante do príncipe e dos sete amigos na luz da manhã.', 'warm'],
    ['Branca de Neve se espreguiça, e o coelhinho pula de alegria entre os amigos.', 'breeze'],
    ['Branca de Neve, príncipe, sete amigos e coelhinho fazem um piquenique no jardim.', 'flutters'],
    ['Branca de Neve e os amigos se abraçam na casinha depois de guardar as tigelinhas.', 'hearth']
  ]
};

export function sceneDirection(storyId, index, page = {}) {
  const direction = directions[storyId]?.[index] || [page.sceneAlt, page.sceneMotion?.profile];
  if (!direction[0] || !direction[1]) throw new Error(`Missing scene direction: ${storyId}/${index + 1}`);
  // Use distinct placements and rhythms per page; keep activity near the edges.
  return {
    sceneArt: `scene-${storyId}-${String(index + 1).padStart(2, '0')}`,
    sceneAlt: page.sceneAlt || direction[0],
    sceneAnchors: page.sceneAnchors || sceneAnchors[storyId]?.[index],
    sceneHotspots: page.sceneHotspots || sceneHotspots[storyId]?.[index + 1] || [],
    sceneMotion: {
      profile: page.sceneMotion?.profile || direction[1],
      origin: [18 + (index * 17) % 64, direction[1] === 'water' ? 86 : 16 + (index * 7) % 20],
      phase: (index * 1.3) % 7,
      direction: index % 2 ? -1 : 1
    }
  };
}

const profiles = new Set(['clouds', 'breeze', 'flutters', 'water', 'warm', 'hearth', 'sparkles', 'nightstars', 'wind']);

/** Insert inside .scene, after the image. Import scenes.css once with the app CSS. */
export function sceneMotionMarkup(page) {
  const motion = page.sceneMotion || {};
  if (!profiles.has(motion.profile)) return '';
  const profile = motion.profile;
  const origin = motion.origin || [50, 20];
  const x = Number(origin[0]) || 50;
  const y = Number(origin[1]) || 20;
  const phase = Number(motion.phase) || 0;
  const count = profile === 'water' ? 4 : profile === 'nightstars' || profile === 'sparkles' ? 6 : 3;
  const elements = Array.from({ length: count }, (_, i) => {
    const left = profile === 'water' ? 18 + i * 20 : 9 + (x + i * 23) % 82;
    const top = profile === 'water' ? 79 + i % 2 * 7 : profile === 'hearth' ? 74 + i * 4 : profile === 'clouds' ? 10 + i * 9 : 9 + (y + i * 11) % 39;
    return `<i class="scene-atmosphere-element" style="--scene-x:${left}%;--scene-y:${top}%;--scene-delay:-${(phase + i * 1.7).toFixed(1)}s;--scene-duration:${8 + i * 2}s;--scene-drift:${motion.direction === -1 ? '-' : ''}${12 + i * 6}px"></i>`;
  }).join('');
  return `<div class="scene-atmosphere scene-atmosphere--${profile}" aria-hidden="true">${elements}</div>`;
}
