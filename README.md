# Historinhas da Manu

Uma biblioteca de contos ilustrados, narrados e interativos para ler com crianças pequenas no iPad. Nasceu de um pai que queria um cantinho de histórias para a filha de 3 anos, sem anúncios, sem conta e sem internet obrigatória. Agora está aberta para qualquer família usar.

São **nove livros com doze páginas cada**: Chapeuzinho Vermelho, A Bela e a Fera, Rapunzel, Os Três Porquinhos, Cinderela, Branca de Neve, Pinóquio, Peter Pan e A Pequena Sereia. Cada página tem uma pintura em aquarela própria, o texto completo para o adulto ler e uma narração gravada em português do Brasil.

## O que tem dentro

- **Livros que se folheiam:** a página vira com o dedo ou pelos botões, com efeito de folha. O texto aparece ao lado da pintura, deitado ou em pé.
- **Descobertas em cada página:** tocar nos personagens e objetos faz sons e animações. Há um amigo escondido nas folhagens e um objeto que dá para arrastar.
- **Ouvir:** narração integral de cada página. "Ouvir ao passar a página" e "Contar o livro inteiro" deixam a história seguir sozinha, com a tela acesa.
- **Ateliê:** vinte desenhos com cenário completo para pintar com o dedo ou com a Apple Pencil. **Dar vida!** faz o desenho pintado andar, voar ou dançar pela tela.
- **Para quem lê junto:** ritmo da narração, letras maiores, modo noturno, animações tranquilas, música de fundo suave e favoritos com marcador de página.
- **Sem internet:** instalado na Tela de Início, o app guarda os livros no aparelho (cerca de 67 MB) e funciona offline.

Nada sai do aparelho: não há login, anúncio nem coleta de dados. Favoritos, progresso e pinturas ficam no armazenamento local do navegador.

## Usar no iPad

1. Publique sua cópia (veja abaixo) e abra o endereço HTTPS no Safari.
2. Toque em Compartilhar → **Adicionar à Tela de Início**.
3. Abra pelo ícone, entre em **Ajustes** e toque em **Guardar livros para usar sem internet**. Espere terminar.

## Rodar no computador

Requer Node.js 20 ou mais novo. Não há dependências para instalar.

```sh
npm run build
npm run check
npm start
```

Abra http://127.0.0.1:4173. Para testar no iPad pela mesma rede Wi-Fi, use `HOST=0.0.0.0 npm run dev` e abra o IP do computador na porta 4173. Leitura e pintura funcionam assim; instalar e usar offline exige HTTPS.

`npm run check` confere os nove livros, as 108 cenas, os 108 áudios e o vínculo de cada áudio com o texto exato da página, e confere também que o build corresponde às fontes.

## Publicar sua cópia

O caminho mais simples é o Cloudflare Pages, com plano gratuito. O passo a passo, incluindo a Function que faz a narração funcionar no Safari, está em [docs/DEPLOY-CLOUDFLARE.md](docs/DEPLOY-CLOUDFLARE.md).

## Como foi feito

- **Textos:** recontos próprios dos clássicos em domínio público, escritos para um adulto ler com uma criança de cerca de 3 anos, com suspense leve e final acolhedor. Os manuscritos completos estão em [docs/HISTORIAS.md](docs/HISTORIAS.md), as fontes em [docs/FONTES-CONTOS.md](docs/FONTES-CONTOS.md) e o guia de escrita em [skills/historias-infantis-3-anos/SKILL.md](skills/historias-infantis-3-anos/SKILL.md).
- **Ilustrações:** geradas com a ferramenta de imagem do ChatGPT e revisadas página a página. Detalhes em [docs/ILUSTRACOES.md](docs/ILUSTRACOES.md).
- **Narração:** voz feminina Aoede do Google Gemini (`gemini-3.8-live`), gravada em AAC. O app só toca arquivos prontos e não chama nenhuma API.
- **Código:** HTML, CSS e JavaScript puros, service worker para o modo offline e Web Audio para música e sons.

### Criar ou regravar uma história

1. Edite o texto em `src/story-manuscripts.js`.
2. Grave a narração com `scripts/gemini-narration.mjs`, usando a sua própria chave do Gemini. A chave é pedida no terminal e não é gravada em arquivo.
3. Promova os áudios com `scripts/promote-narration.mjs` e rode `npm run build && npm run check`.

O verificador recusa áudio cujo texto não bata com a página.

```sh
node scripts/gemini-narration.mjs --mode sample --story chapeuzinho --page 1 --sdk /caminho/para/@google/genai --output output/narration
node scripts/gemini-narration.mjs --mode batch --sdk /caminho/para/@google/genai --output output/narration
node scripts/promote-narration.mjs --staging output/narration --apply
```

## Licença

- **Código** (HTML, CSS, JavaScript, scripts e Function): [MIT](LICENSE).
- **Conteúdo** (textos das histórias, ilustrações, narrações e ícones): [Creative Commons BY-NC-SA 4.0](LICENSE-CONTEUDO.md). Use, adapte e compartilhe com sua família, sua escola ou sua comunidade, citando a origem e mantendo a mesma licença. Uso comercial não é permitido.

Os contos originais (Perrault, Grimm, Collodi, Barrie, Andersen) estão em domínio público; as adaptações e as ilustrações deste projeto seguem a licença de conteúdo acima.
