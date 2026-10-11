# Publicar no Cloudflare Pages

O app é um site estático em `dist/` mais uma Function de áudio em `functions/`. Qualquer conta gratuita do Cloudflare Pages serve. Você não precisa de chave nem de credencial dentro do projeto: o Wrangler usa o login da sua própria conta.

## Primeira publicação

```sh
cd historinhas-da-manu          # rode tudo de dentro da pasta do projeto
npm run build
npm run check
npx wrangler login
npx wrangler pages project create <nome-do-seu-projeto> --production-branch main
npx wrangler pages deploy dist --project-name <nome-do-seu-projeto> --branch main
```

Rode o deploy **de dentro da pasta do projeto**. O Wrangler empacota `functions/` do diretório atual, não de `dist/`; rodado de outra pasta, o site sobe sem a Function de áudio. A saída precisa mostrar `Uploading Functions bundle`. `public/_routes.json` limita a Function a `/audio/*`; o resto do site continua estático.

## Por que existe a Function de áudio

O Safari do iPad pede a narração em pedaços (cabeçalho `Range`) e só toca o áudio se receber `206 Partial Content`. O Pages responde `200` com o arquivo inteiro. A Function `functions/audio/[name].js` devolve o `206` correto. Depois de instalado, o service worker também monta o `206` a partir do cache, o que vale para o modo offline.

Confira depois do deploy:

```sh
curl -s -D - -o /dev/null -H 'Range: bytes=0-1' https://<seu-endereco>/audio/chapeuzinho-1.m4a
```

O esperado é `206`, com `content-range: bytes 0-1/<tamanho>` e `content-length: 2`. Uma resposta `200` significa que a Function não subiu.

Para testar antes de publicar, sem rede: `npx wrangler pages dev dist --port 4313`, também de dentro da pasta do projeto.

## Outros serviços

Netlify, Vercel ou qualquer servidor estático funcionam para leitura e pintura. A narração na primeira visita pelo Safari depende de o servidor responder `206` a pedidos `Range`. Muitos servidores fazem isso sozinhos; o `scripts/serve.mjs` local também faz. HTTPS é obrigatório para instalar o app na Tela de Início e usar sem internet.

## Atualizações e livros guardados

Os livros baixados em **Guardar livros para usar sem internet** ficam no cache estável `historinhas-manu:livros`, separado do núcleo versionado `historinhas-manu:nucleo:<versão>`. Uma publicação nova não apaga o que já foi guardado. Cada item guardado leva a revisão (hash) listada em `offline-assets.json`: se um arquivo mudar com o mesmo nome, ele sai do cache e volta no próximo download.

Entre uma versão e a seguinte, não remova nem renomeie um arquivo que a versão anterior usa. O app aberto continua com o código antigo até voltar à biblioteca.

## Voltar para uma versão anterior

O painel do Cloudflare Pages lista cada deploy e permite promover um deploy anterior a produção (**Deployments → … → Rollback to this deployment**). Também dá para publicar de novo o `dist/` reconstruído de um commit anterior. Depois, repita a conferência do áudio acima.
