// Manuscritos integrais revisados para leitura compartilhada. As gravações usam o texto exato de cada página.
export const storyManuscripts = [
  {
    "id": "chapeuzinho",
    "title": "Chapeuzinho Vermelho",
    "short": "Chapeuzinho",
    "theme": "forest",
    "color": "#6e8267",
    "category": "Na floresta",
    "description": "Uma visita à vovó, um lobo que engana e um abraço seguro depois do susto.",
    "dedication": "Para chegar a um abraço, podemos caminhar de mãos dadas.",
    "cover": "chapeuzinho.png",
    "pages": [
      {
        "title": "Uma cesta para a vovó",
        "text": "Era uma vez uma menina que usava uma capinha vermelha até nos dias de sol. Por isso, todos a chamavam de Chapeuzinho Vermelho. Naquela manhã, mamãe contou que a vovó estava cansada e precisava descansar.\n— Quero levar um abraço para ela! — disse a menina.\nMamãe gostou da ideia. Na cozinha, pegou uma cesta e separou morangos bem vermelhinhos. Chapeuzinho se aproximou, na ponta dos pés, para espiar.\n— Vamos levar o lanche e o abraço. Eu vou com você.\nA menina sorriu. Já estava com vontade de chegar.",
        "object": "basket",
        "prompt": "Abra a cestinha",
        "reaction": "Os morangos vão viajar até a casa da vovó!",
        "effect": "open",
        "position": [
          45,
          73
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luzinha",
            "reaction": "Plim! Uma luzinha só para você.",
            "effect": "magic",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "chapeuzinho",
        "audio": "/audio/chapeuzinho-1.m4a",
        "sceneArt": "scene-chapeuzinho-01",
        "sceneAlt": "Mamãe prepara a cesta de Chapeuzinho na cozinha, com morangos para a vovó.",
        "sceneAnchors": {
          "main": [
            60,
            72
          ],
          "extras": [
            [
              82,
              37
            ],
            [
              35,
              27
            ]
          ],
          "hidden": [
            83,
            78
          ]
        },
        "sceneMotion": {
          "profile": "hearth",
          "origin": [
            18,
            16
          ],
          "phase": 0,
          "direction": 1
        }
      },
      {
        "title": "O pão também vai",
        "text": "Mamãe colocou um pão macio ao lado dos morangos. Chapeuzinho ajeitou um paninho por cima, para o lanche não cair pelo caminho. Depois segurou a alça com as duas mãos.\n— A vovó vai gostar deste morango grandão!\n— Vai gostar ainda mais de ver você — respondeu mamãe.\nA casa da vovó ficava depois da floresta, perto de um jardim. Elas iriam pela trilha conhecida, sempre juntas. Chapeuzinho vestiu a capinha, mamãe conferiu a cesta e as duas saíram. A porta fez um pequeno clique atrás delas. A visita tinha começado.",
        "object": "basket",
        "prompt": "Confira o lanche",
        "reaction": "Pão, morangos e um paninho: está tudo pronto!",
        "effect": "open",
        "position": [
          43,
          72
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "chapeuzinho",
        "audio": "/audio/chapeuzinho-2.m4a",
        "sceneArt": "scene-chapeuzinho-02",
        "sceneAlt": "Chapeuzinho ajeita o pão e os morangos na cesta com a ajuda da mamãe.",
        "sceneAnchors": {
          "main": [
            58,
            77
          ],
          "extras": [
            [
              83,
              30
            ],
            [
              17,
              56
            ]
          ],
          "hidden": [
            84,
            78
          ]
        },
        "sceneMotion": {
          "profile": "hearth",
          "origin": [
            35,
            23
          ],
          "phase": 1.3,
          "direction": -1
        }
      },
      {
        "title": "Pelo caminho da floresta",
        "text": "Na floresta, a trilha passava entre árvores altas. Chapeuzinho caminhava ao lado de mamãe, balançando a cesta só um pouquinho. Lá em cima, um passarinho cantou: piu, piu!\n— Será que ele também conhece a vovó?\nMamãe riu e apontou o próximo trecho do caminho. Elas ainda precisavam passar pelo jardim das flores.\nAtrás de uma árvore, um lobo viu a capinha e sentiu o cheiro do pão. Queria ficar com aquele lanche. Em vez de pedir, começou a pensar num jeito de enganar a menina. E saiu de seu esconderijo.",
        "object": "bird",
        "prompt": "Chame o passarinho",
        "reaction": "Piu, piu! Ele canta lá no alto da trilha.",
        "effect": "fly",
        "position": [
          66,
          38
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "chapeuzinho",
        "audio": "/audio/chapeuzinho-3.m4a",
        "sceneArt": "scene-chapeuzinho-03",
        "sceneAlt": "Chapeuzinho e mamãe percorrem o caminho da floresta acompanhadas por um passarinho.",
        "sceneAnchors": {
          "main": [
            70,
            35
          ],
          "extras": [
            [
              82,
              56
            ],
            [
              62,
              77
            ]
          ],
          "hidden": [
            18,
            77
          ]
        },
        "sceneMotion": {
          "profile": "breeze",
          "origin": [
            52,
            30
          ],
          "phase": 2.6,
          "direction": 1
        }
      },
      {
        "title": "Uma conversa no caminho",
        "text": "O passarinho pulou para outro galho. Chapeuzinho levantou o rosto para acompanhá-lo. Foi então que ouviu:\n— Bom dia! Aonde vai essa cesta?\nEra o lobo. Mamãe ficou junto da menina, que respondeu:\n— Vamos visitar a minha vovó, na casinha depois do jardim.\n— Sou amigo dela! — mentiu ele. — Ela adora as flores do jardim, logo ali.\nChapeuzinho gostou da ideia de levar uma flor. Mamãe apontou o jardim que ficava junto da trilha.\n— Podemos olhar, sem nos afastar.\nO lobo se despediu depressa. Enquanto elas continuavam devagar, ele tomou um atalho para chegar primeiro.",
        "object": "bird",
        "prompt": "Acompanhe o voo",
        "reaction": "O passarinho salta de galho em galho.",
        "effect": "fly",
        "position": [
          64,
          36
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luzinha",
            "reaction": "Plim! Uma luzinha só para você.",
            "effect": "magic",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "chapeuzinho",
        "audio": "/audio/chapeuzinho-4.m4a",
        "sceneArt": "scene-chapeuzinho-04",
        "sceneAlt": "Chapeuzinho procura o passarinho que salta entre os galhos acima do caminho.",
        "sceneAnchors": {
          "main": [
            78,
            31
          ],
          "extras": [
            [
              83,
              61
            ],
            [
              56,
              23
            ]
          ],
          "hidden": [
            84,
            78
          ]
        },
        "sceneMotion": {
          "profile": "breeze",
          "origin": [
            69,
            17
          ],
          "phase": 3.9000000000000004,
          "direction": -1
        }
      },
      {
        "title": "A borboleta e as flores",
        "text": "O jardim estava cheio de pequenas flores. Chapeuzinho parou diante de uma borboleta pousada numa pétala amarela. Abriu os braços de leve, como se também tivesse asas.\n— A vovó ia gostar de ver isso!\nMamãe se agachou ao seu lado. Elas observaram a borboleta beber nas flores e depois levantar voo. A menina pensou em levar um grande buquê, mas viu que muitas borboletas ainda precisavam daquele jardim.\n— Duas florzinhas já fazem um presente bonito — disse mamãe.\nChapeuzinho procurou uma rosa e uma amarela. Enquanto escolhia, o lobo corria à frente.",
        "object": "butterfly",
        "prompt": "Toque na borboleta",
        "reaction": "Ela deixou a flor e abriu as asas!",
        "effect": "fly",
        "position": [
          41,
          54
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "chapeuzinho",
        "audio": "/audio/chapeuzinho-5.m4a",
        "sceneArt": "scene-chapeuzinho-05",
        "sceneAlt": "Chapeuzinho observa uma borboleta pousada nas flores perto do caminho.",
        "sceneAnchors": {
          "main": [
            69,
            47
          ],
          "extras": [
            [
              79,
              27
            ],
            [
              76,
              76
            ]
          ],
          "hidden": [
            20,
            78
          ]
        },
        "sceneMotion": {
          "profile": "flutters",
          "origin": [
            22,
            24
          ],
          "phase": 5.2,
          "direction": 1
        }
      },
      {
        "title": "Duas flores, vamos seguir",
        "text": "Chapeuzinho encontrou as duas flores perto da trilha. Com a ajuda de mamãe, colheu uma rosa e uma amarela, deixando as outras para as borboletas.\n— Uma, duas! Uma de cada cor para a vovó.\nMamãe ajeitou as flores sobre o paninho da cesta. A menina segurou tudo com cuidado, para não amassar as pétalas.\n— Agora seguimos — disse mamãe. — A vovó está esperando nosso lanche.\nElas retomaram a caminhada. Depois da próxima curva, já veriam o telhado da casa. O lobo, porém, tinha chegado antes e encontrado a porta aberta.",
        "object": "flower",
        "prompt": "Veja a flor se abrir",
        "reaction": "Uma flor rosa e outra amarela para a vovó!",
        "effect": "bloom",
        "position": [
          41,
          76
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "chapeuzinho",
        "audio": "/audio/chapeuzinho-6.m4a",
        "sceneArt": "scene-chapeuzinho-06",
        "sceneAlt": "Chapeuzinho e mamãe contam uma flor rosa e outra amarela no jardim.",
        "sceneAnchors": {
          "main": [
            57,
            73
          ],
          "extras": [
            [
              82,
              27
            ],
            [
              22,
              67
            ]
          ],
          "hidden": [
            82,
            78
          ]
        },
        "sceneMotion": {
          "profile": "flutters",
          "origin": [
            39,
            31
          ],
          "phase": 6.5,
          "direction": -1
        }
      },
      {
        "title": "O plano do lobo",
        "text": "A vovó estava no jardim, regando suas plantas. O lobo passou pela porta aberta sem pedir licença e viu uma touca pendurada dentro da casa.\n— Com isso, posso fingir que sou a vovó — pensou.\nEle colocou a touca e procurou um lugar de onde pudesse chamar Chapeuzinho. Queria que ela deixasse a cesta e fosse embora sem perceber o engano. A vovó ouviu passos dentro de casa.\n— Quem está aí?\nO lobo ficou bem quieto. A vovó largou o regador e foi até a janela para descobrir quem tinha entrado.",
        "object": "wolf",
        "prompt": "Observe o lobo de touca",
        "reaction": "A touca é da vovó. O lobo está tentando enganar.",
        "effect": "wiggle",
        "position": [
          57,
          69
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luzinha",
            "reaction": "Plim! Uma luzinha só para você.",
            "effect": "magic",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "chapeuzinho",
        "audio": "/audio/chapeuzinho-7.m4a",
        "sceneArt": "scene-chapeuzinho-07",
        "sceneAlt": "O lobo veste a touca da vovó na casinha enquanto ela está no jardim.",
        "sceneAnchors": {
          "main": [
            51,
            62
          ],
          "extras": [
            [
              66,
              31
            ],
            [
              50,
              20
            ]
          ],
          "hidden": [
            83,
            78
          ]
        },
        "sceneMotion": {
          "profile": "hearth",
          "origin": [
            56,
            18
          ],
          "phase": 0.8000000000000007,
          "direction": 1
        }
      },
      {
        "title": "Uma voz que não era dela",
        "text": "Diante do espelho, o lobo puxou a touca para esconder as orelhas. Tentou falar fininho:\n— Entre, minha netinha. Deixe a cesta aqui!\nMas sua voz saía grossa, e suas orelhas continuavam aparecendo. Ele tentou de novo. Queria parecer a vovó antes que a menina chegasse.\nDo lado de fora, a vovó viu o lobo pela janela. Não entrou sozinha. Caminhou pelo jardim até a frente da casa, onde poderia chamar mamãe.\nNesse instante, ouviu passinhos na trilha. Chapeuzinho e mamãe vinham trazendo a cesta. A vovó apressou o passo para encontrá-las.",
        "object": "wolf",
        "prompt": "Observe as orelhas",
        "reaction": "As orelhas continuam aparecendo por baixo da touca.",
        "effect": "wiggle",
        "position": [
          52,
          63
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "chapeuzinho",
        "audio": "/audio/chapeuzinho-8.m4a",
        "sceneArt": "scene-chapeuzinho-08",
        "sceneAlt": "O lobo olha suas orelhas no espelho da vovó com a touca na cabeça.",
        "sceneAnchors": {
          "main": [
            80,
            76
          ],
          "extras": [
            [
              18,
              32
            ],
            [
              82,
              47
            ]
          ],
          "hidden": [
            20,
            78
          ]
        },
        "sceneMotion": {
          "profile": "hearth",
          "origin": [
            73,
            25
          ],
          "phase": 2.0999999999999996,
          "direction": -1
        }
      },
      {
        "title": "Toc, toc! Quem está aí?",
        "text": "Chapeuzinho bateu à porta: toc, toc!\n— Vovó, chegamos!\nO lobo apareceu com a touca e falou naquela voz esquisita:\n— Deixe a cesta comigo, minha netinha.\nChapeuzinho ficou pertinho de mamãe.\n— Vovó, que orelhas grandes! E que olhos grandes! Sua boca também está diferente!\nAntes que o lobo respondesse, a verdadeira vovó chegou do jardim.\n— Chapeuzinho, estou aqui!\nMamãe segurou a mão da menina. Agora todas tinham entendido o engano. O lobo tentou alcançar a cesta, mas mamãe a puxou para junto delas.\n— Pare! Você não vai pegar nosso lanche — disse ela.",
        "object": "door",
        "prompt": "Toque na portinha",
        "reaction": "Toc, toc! Mamãe está ao lado de Chapeuzinho.",
        "effect": "open",
        "position": [
          74,
          62
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "chapeuzinho",
        "audio": "/audio/chapeuzinho-9.m4a",
        "sceneArt": "scene-chapeuzinho-09",
        "sceneAlt": "Chapeuzinho e mamãe chegam à porta, onde encontram vovó e o lobo de touca.",
        "sceneAnchors": {
          "main": [
            52,
            49
          ],
          "extras": [
            [
              24,
              25
            ],
            [
              83,
              75
            ]
          ],
          "hidden": [
            46,
            78
          ]
        },
        "sceneMotion": {
          "profile": "warm",
          "origin": [
            26,
            32
          ],
          "phase": 3.4000000000000004,
          "direction": 1
        }
      },
      {
        "title": "O abraço de verdade",
        "text": "A vovó ficou ao lado de mamãe e estendeu a mão.\n— Devolva minha touca e saia da minha casa.\nO lobo olhou para uma, olhou para a outra. Seu plano tinha falhado. Tirou a touca, entregou à vovó e saiu pela trilha. Mamãe esperou até vê-lo ir embora; então fechou a porta.\nSó depois a vovó abraçou Chapeuzinho. A menina encostou o rosto naquele abraço conhecido.\n— Ele fingiu que era você!\n— Você percebeu e ficou perto de mamãe. Agora estamos juntas.\nChapeuzinho abriu a cesta. Os morangos e as duas flores continuavam lá.",
        "object": "basket",
        "prompt": "Mostre o presente à vovó",
        "reaction": "Os morangos chegaram, junto com duas florzinhas!",
        "effect": "open",
        "position": [
          52,
          74
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luzinha",
            "reaction": "Plim! Uma luzinha só para você.",
            "effect": "magic",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "chapeuzinho",
        "audio": "/audio/chapeuzinho-10.m4a",
        "sceneArt": "scene-chapeuzinho-10",
        "sceneAlt": "Vovó abraça Chapeuzinho e recebe os morangos depois de tirar a touca do lobo.",
        "sceneAnchors": {
          "main": [
            73,
            73
          ],
          "extras": [
            [
              20,
              28
            ],
            [
              82,
              28
            ]
          ],
          "hidden": [
            22,
            78
          ]
        },
        "sceneMotion": {
          "profile": "warm",
          "origin": [
            43,
            19
          ],
          "phase": 4.700000000000001,
          "direction": -1
        }
      },
      {
        "title": "Lanche na casa segura",
        "text": "A vovó pôs as flores num copinho com água. Mamãe cortou o pão, e Chapeuzinho escolheu um morango para cada uma. Sentaram à mesa, com a porta fechada e o lobo bem longe dali.\nA menina contou da borboleta e do passarinho. Aos poucos, o susto foi ficando pequeno, pequeno.\n— Eu queria trazer um abraço — disse ela.\n— E trouxe! — respondeu a vovó, abrindo os braços outra vez.\nChapeuzinho se aconchegou no colo dela. Depois comeram o lanche devagar, ouvindo o jardim pela janela. A visita podia continuar em paz.",
        "object": "heart",
        "prompt": "Toque no coração",
        "reaction": "Um abraço da vovó deixa o susto pequenininho.",
        "effect": "hearts",
        "position": [
          52,
          56
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "chapeuzinho",
        "audio": "/audio/chapeuzinho-11.m4a",
        "sceneArt": "scene-chapeuzinho-11",
        "sceneAlt": "Chapeuzinho, mamãe e vovó compartilham o lanche à mesa, depois que o lobo foi embora.",
        "sceneAnchors": {
          "main": [
            63,
            72
          ],
          "extras": [
            [
              82,
              27
            ],
            [
              20,
              76
            ]
          ],
          "hidden": [
            83,
            78
          ]
        },
        "sceneMotion": {
          "profile": "hearth",
          "origin": [
            60,
            26
          ],
          "phase": 6,
          "direction": 1
        }
      },
      {
        "title": "De volta, de mãos dadas",
        "text": "Quando o céu começou a escurecer, mamãe guardou o paninho na cesta. Chapeuzinho deu um beijo na vovó e prometeu voltar para outra visita.\n— As flores ficam comigo — disse a vovó. — Assim lembro do nosso lanche.\nA menina saiu de mãos dadas com mamãe. Na floresta, as primeiras estrelas apareceram entre os galhos. O passarinho já descansava em seu ninho, e a trilha conhecida levava direto para casa.\nChapeuzinho caminhou mais pertinho de mamãe.\n— Hoje aconteceu tanta coisa!\nMamãe apertou sua mão com carinho. Em casa, esperavam um banho morno e a caminha.",
        "object": "star",
        "prompt": "Acenda a estrelinha",
        "reaction": "Uma estrelinha acompanha o caminho de volta.",
        "effect": "magic",
        "position": [
          64,
          30
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "chapeuzinho",
        "audio": "/audio/chapeuzinho-12.m4a",
        "sceneArt": "scene-chapeuzinho-12",
        "sceneAlt": "Chapeuzinho volta com mamãe pela floresta tranquila sob as primeiras estrelas.",
        "sceneAnchors": {
          "main": [
            76,
            25
          ],
          "extras": [
            [
              62,
              39
            ],
            [
              78,
              74
            ]
          ],
          "hidden": [
            20,
            78
          ]
        },
        "sceneMotion": {
          "profile": "nightstars",
          "origin": [
            77,
            33
          ],
          "phase": 0.3000000000000007,
          "direction": -1
        }
      }
    ]
  },
  {
    "id": "bela",
    "title": "A Bela e a Fera",
    "short": "Bela e a Fera",
    "theme": "rose",
    "color": "#9b7180",
    "category": "Um pouco de magia",
    "description": "Bela ajuda o pai, conhece a Fera e escolhe uma amizade que transforma o castelo.",
    "dedication": "Para Manu, que aprende a cuidar e pode escolher seus próprios caminhos.",
    "cover": "bela.png",
    "pages": [
      {
        "title": "O pedido de Bela",
        "text": "Bela morava com o pai numa casa cercada de flores. Ela gostava de abrir um livro no jardim e ler em voz alta enquanto ele arrumava as malas para suas viagens.\n— Vou à cidade vender meus tecidos. Que presente você gostaria de ganhar? — perguntou o pai.\nBela pensou nas rosas que ainda não tinham florescido em casa.\n— Uma rosa, se encontrar pelo caminho.\nO pai beijou sua testa e partiu. Bela ficou com a tia, cuidando do canteiro e esperando a volta dele. Naquela tarde, escolheu um livro cheio de jardins.",
        "object": "book",
        "prompt": "Toque no livrinho",
        "reaction": "Era uma vez… um livro cheio de descobertas!",
        "effect": "open",
        "position": [
          47,
          73
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luzinha",
            "reaction": "Plim! Uma luzinha só para você.",
            "effect": "magic",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "bela",
        "audio": "/audio/bela-1.m4a",
        "sceneArt": "scene-bela-01",
        "sceneAlt": "Bela lê entre as flores antes de visitar o castelo encantado com papai.",
        "sceneAnchors": {
          "main": [
            68,
            72
          ],
          "extras": [
            [
              62,
              22
            ],
            [
              81,
              42
            ]
          ],
          "hidden": [
            15,
            70
          ]
        },
        "sceneMotion": {
          "profile": "flutters",
          "origin": [
            18,
            16
          ],
          "phase": 0,
          "direction": 1
        }
      },
      {
        "title": "A rosa e o castelo",
        "text": "Dias depois, uma borboleta passou pelo livro aberto. Bela lia quando o pai voltou, cansado e preocupado. Numa tempestade, tinha encontrado abrigo num castelo. Antes de sair, colhera uma rosa do jardim para ela. Então aparecera o dono, chamado Fera.\n— Ficou furioso e mandou que eu voltasse para morar lá. Não quer deixar ninguém tocar nas suas rosas — contou o pai.\nBela fechou o livro. Aquilo não era justo.\n— Vamos conversar com ele. Você pode devolver a rosa, mas não precisa perder sua casa.\nNa manhã seguinte, seguiram juntos pelo caminho indicado pelo pai, levando a flor e um lanche.",
        "object": "butterfly",
        "prompt": "Leve a borboleta para passear",
        "reaction": "A borboleta encontrou uma nova aventura!",
        "effect": "fly",
        "position": [
          37,
          49
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "bela",
        "audio": "/audio/bela-2.m4a",
        "sceneArt": "scene-bela-02",
        "sceneAlt": "Bela abre um livro ilustrado com árvores, rios e pássaros no jardim.",
        "sceneAnchors": {
          "main": [
            72,
            30
          ],
          "extras": [
            [
              48,
              19
            ],
            [
              86,
              66
            ]
          ],
          "hidden": [
            16,
            77
          ]
        },
        "sceneMotion": {
          "profile": "breeze",
          "origin": [
            35,
            23
          ],
          "phase": 1.3,
          "direction": -1
        }
      },
      {
        "title": "Uma conversa difícil",
        "text": "O castelo apareceu entre as árvores. Bela e o pai bateram à porta. A Fera abriu: era grande, coberta de pelos e estava de braços cruzados.\n— Trouxe sua rosa — disse o pai.\nA Fera resmungou que ele devia ficar. Bela sentiu um frio na barriga, mas falou com firmeza:\n— Meu pai errou ao colher sem pedir. Ele veio devolver. Prender alguém não conserta uma flor.\nA Fera olhou a rosa, depois o rosto assustado do visitante. Ninguém tinha falado com ela daquele jeito. Descruzou os braços e ficou em silêncio, pensando no que ouvira.",
        "object": "beast",
        "prompt": "Toque na Fera",
        "reaction": "A Fera parou para ouvir Bela.",
        "effect": "wiggle",
        "position": [
          65,
          62
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "bela",
        "audio": "/audio/bela-3.m4a",
        "sceneArt": "scene-bela-03",
        "sceneAlt": "Bela cumprimenta a Fera tímida no salão do castelo encantado.",
        "sceneAnchors": {
          "main": [
            55,
            75
          ],
          "extras": [
            [
              58,
              20
            ],
            [
              91,
              88
            ]
          ],
          "hidden": [
            52,
            44
          ]
        },
        "sceneMotion": {
          "profile": "warm",
          "origin": [
            52,
            30
          ],
          "phase": 2.6,
          "direction": 1
        }
      },
      {
        "title": "A porta fica aberta",
        "text": "Por fim, a Fera afastou-se da passagem.\n— Vocês podem ir. Eu não devia ter ameaçado seu pai. Desculpem.\nBela viu que a porta estava aberta de verdade. O pai podia voltar para casa. Antes de partir, os dois aceitaram água e um pouco de descanso.\nA Fera contou que cuidava sozinha de um jardim enorme e não sabia pedir ajuda.\n— Posso voltar amanhã para cuidar das plantas, se você conversar sem gritar — ofereceu Bela.\nA Fera acenou com sua pata grande.\n— Vou tentar.\nBela voltou para casa com o pai. No dia seguinte, ele a acompanhou ao jardim.",
        "object": "beast",
        "prompt": "Ajude a Fera a dizer olá",
        "reaction": "A Fera acenou e manteve a porta aberta.",
        "effect": "wiggle",
        "position": [
          61,
          62
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luzinha",
            "reaction": "Plim! Uma luzinha só para você.",
            "effect": "magic",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "bela",
        "audio": "/audio/bela-4.m4a",
        "sceneArt": "scene-bela-04",
        "sceneAlt": "A Fera acena com sua patinha para Bela, começando uma amizade no castelo.",
        "sceneAnchors": {
          "main": [
            14,
            56
          ],
          "extras": [
            [
              16,
              24
            ],
            [
              54,
              18
            ]
          ],
          "hidden": [
            16,
            79
          ]
        },
        "sceneMotion": {
          "profile": "warm",
          "origin": [
            69,
            17
          ],
          "phase": 3.9000000000000004,
          "direction": -1
        }
      },
      {
        "title": "A rosa do encantamento",
        "text": "O pai deixou Bela no portão e combinou buscá-la ao fim da tarde. A Fera mostrou uma roseira diferente. Mesmo sem vento, uma de suas rosas tremia e soltava um brilho fraquinho.\n— Eu era um príncipe. Uma feiticeira lançou um encantamento quando eu mandava em todos sem ouvir ninguém — explicou.\nA magia terminaria quando ele aprendesse a respeitar as pessoas e alguém escolhesse sua amizade livremente.\nBela pegou o regador.\n— Você precisa ouvir quando eu disser não. E eu vou para casa quando quiser.\nA Fera concordou. Os dois olharam a terra seca e decidiram cuidar primeiro da roseira.",
        "object": "rose",
        "prompt": "Toque na rosinha",
        "reaction": "A rosa balançou com um brilho bem fraquinho.",
        "effect": "bloom",
        "position": [
          48,
          62
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "bela",
        "audio": "/audio/bela-5.m4a",
        "sceneArt": "scene-bela-05",
        "sceneAlt": "Bela rega a rosa especial do jardim enquanto a Fera observa com cuidado.",
        "sceneAnchors": {
          "main": [
            49,
            77
          ],
          "extras": [
            [
              14,
              26
            ],
            [
              84,
              82
            ]
          ],
          "hidden": [
            51,
            42
          ]
        },
        "sceneMotion": {
          "profile": "flutters",
          "origin": [
            22,
            24
          ],
          "phase": 5.2,
          "direction": 1
        }
      },
      {
        "title": "Aprender a cuidar",
        "text": "Bela trouxe água, e a Fera carregou um balde. Quis despejar tudo de uma vez, mas parou quando ela levantou a mão.\n— Devagar. A terra precisa beber aos pouquinhos.\nEle esperou, inclinou o balde e deixou cair um fio de água. Ploc, ploc! Um passarinho pousou perto. Antes, a Fera teria espantado o visitante. Agora, colocou uma tigelinha para ele também beber.\nQuando Bela cansou, ele buscou um banco sem pedir que continuasse trabalhando.\nÀ tarde, o pai chegou. A Fera devolveu o regador e agradeceu a visita. Bela prometeu voltar porque tinha gostado daquele dia.",
        "object": "drop",
        "prompt": "Regue a rosinha",
        "reaction": "Ploc! A rosa ficou feliz com a água.",
        "effect": "splash",
        "position": [
          50,
          65
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "bela",
        "audio": "/audio/bela-6.m4a",
        "sceneArt": "scene-bela-06",
        "sceneAlt": "Bela e a Fera levam água e regam juntos a rosa no canteiro.",
        "sceneAnchors": {
          "main": [
            80,
            68
          ],
          "extras": [
            [
              49,
              20
            ],
            [
              54,
              80
            ]
          ],
          "hidden": [
            14,
            72
          ]
        },
        "sceneMotion": {
          "profile": "flutters",
          "origin": [
            39,
            31
          ],
          "phase": 6.5,
          "direction": -1
        }
      },
      {
        "title": "O lanche e a saudade",
        "text": "Nas visitas seguintes, Bela e a Fera passaram a ler depois de cuidar das plantas. Ele ouvia até o fim e perguntava antes de escolher outro livro. Dividiam pão, fruta e chá, numa mesa perto da janela.\nCerta tarde, a tia de Bela veio buscá-la. O pai estava com febre e precisava descansar.\nBela pousou a xícara.\n— Vou cuidar dele.\nA Fera sentiu tristeza, mas buscou o casaco dela e preparou uma cesta de comida.\n— Leve isto. E fique em casa quanto precisar.\nBela agradeceu. Partiu com a tia, levando a cesta pelo mesmo caminho que já conhecia.",
        "object": "cup",
        "prompt": "Toque na xícara",
        "reaction": "Tim, tim! Um chazinho entre amigos.",
        "effect": "wiggle",
        "position": [
          60,
          72
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luzinha",
            "reaction": "Plim! Uma luzinha só para você.",
            "effect": "magic",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "bela",
        "audio": "/audio/bela-7.m4a",
        "sceneArt": "scene-bela-07",
        "sceneAlt": "Bela e a Fera dividem um lanche e livros numa mesa acolhedora do castelo.",
        "sceneAnchors": {
          "main": [
            57,
            78
          ],
          "extras": [
            [
              17,
              21
            ],
            [
              87,
              18
            ]
          ],
          "hidden": [
            16,
            55
          ]
        },
        "sceneMotion": {
          "profile": "hearth",
          "origin": [
            56,
            18
          ],
          "phase": 0.8000000000000007,
          "direction": 1
        }
      },
      {
        "title": "A volta de Bela",
        "text": "Em casa, Bela ajudou a tia a levar água e sopa ao pai. Depois de alguns dias, ele já conseguia passear no quintal. Bela contou que queria visitar seu amigo.\n— Vá tranquila. Estou melhor — disse ele.\nQuando ela voltou ao castelo, encontrou a Fera cuidando das roseiras e da tigelinha do passarinho.\n— Você continuou! — disse, contente.\nEle sorriu. Mais tarde, Bela cantarolou no salão e convidou o amigo para uma dança. A Fera deu um passo grande demais, parou e esperou por ela. Tentaram de novo, rindo. Perto da janela, a rosa começou a brilhar.",
        "object": "beast",
        "prompt": "Faça a Fera dançar",
        "reaction": "Um passinho para cá, outro para lá!",
        "effect": "hop",
        "position": [
          61,
          65
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "bela",
        "audio": "/audio/bela-8.m4a",
        "sceneArt": "scene-bela-08",
        "sceneAlt": "Bela e a Fera dançam passos pequenos e grandes pelo salão do castelo.",
        "sceneAnchors": {
          "main": [
            15,
            73
          ],
          "extras": [
            [
              24,
              19
            ],
            [
              84,
              76
            ]
          ],
          "hidden": [
            83,
            57
          ]
        },
        "sceneMotion": {
          "profile": "warm",
          "origin": [
            73,
            25
          ],
          "phase": 2.0999999999999996,
          "direction": -1
        }
      },
      {
        "title": "Quando a magia se desfez",
        "text": "A luz da rosa cresceu e iluminou o salão. A Fera tentou esconder as patas, surpresa com as pequenas faíscas que dançavam ao redor delas.\nBela ficou por perto.\n— Sou sua amiga porque quero. Você aprendeu a ouvir e deixou que eu voltasse para o meu pai.\nUm vento macio percorreu o castelo. Os pelos da Fera desapareceram, e no lugar dela surgiu um jovem príncipe. Ele olhou as mãos, depois Bela.\n— O encantamento acabou!\nEla reconheceu a voz do amigo. A rosa parou de brilhar, mas continuou aberta. Lá fora, o passarinho cantou, como se também tivesse uma notícia.",
        "object": "star",
        "prompt": "Toque na estrelinha",
        "reaction": "Plim! A magia se desfez e iluminou o castelo.",
        "effect": "magic",
        "position": [
          57,
          35
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "bela",
        "audio": "/audio/bela-9.m4a",
        "sceneArt": "scene-bela-09",
        "sceneAlt": "À noite, a rosa brilha enquanto a magia transforma a Fera em príncipe.",
        "sceneAnchors": {
          "main": [
            76,
            27
          ],
          "extras": [
            [
              14,
              28
            ],
            [
              87,
              77
            ]
          ],
          "hidden": [
            69,
            63
          ]
        },
        "sceneMotion": {
          "profile": "sparkles",
          "origin": [
            26,
            32
          ],
          "phase": 3.4000000000000004,
          "direction": 1
        }
      },
      {
        "title": "O amigo junto à roseira",
        "text": "Na manhã seguinte, Bela e o príncipe foram ver a rosa. Ele ainda se surpreendia com suas mãos pequenas. Pegou o regador, esperou Bela mostrar a quantidade de água e molhou a terra devagar.\nEla sorriu. Era o mesmo cuidado que tinha visto antes da transformação.\n— Quero convidar seu pai para vir aqui — disse ele. — Quero recebê-lo bem desta vez e pedir desculpas de novo, olhando nos olhos dele.\nBela concordou e levou o convite para casa. Contou sobre a luz, a dança e o amigo que continuava cuidando das plantas.\nO pai escutou tudo. Agora podia visitar o castelo sem medo e sair quando quisesse.",
        "object": "rose",
        "prompt": "Faça a rosa florescer",
        "reaction": "O jardim guardou o carinho dos amigos.",
        "effect": "bloom",
        "position": [
          45,
          67
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luzinha",
            "reaction": "Plim! Uma luzinha só para você.",
            "effect": "magic",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "bela",
        "audio": "/audio/bela-10.m4a",
        "sceneArt": "scene-bela-10",
        "sceneAlt": "Bela reconhece o sorriso de seu amigo príncipe junto à rosa do jardim.",
        "sceneAnchors": {
          "main": [
            17,
            70
          ],
          "extras": [
            [
              29,
              24
            ],
            [
              86,
              22
            ]
          ],
          "hidden": [
            86,
            79
          ]
        },
        "sceneMotion": {
          "profile": "flutters",
          "origin": [
            43,
            19
          ],
          "phase": 4.700000000000001,
          "direction": -1
        }
      },
      {
        "title": "Um encontro no jardim",
        "text": "No domingo, Bela voltou com o pai e a tia. O príncipe os recebeu no portão aberto e pediu desculpas pela ameaça que fizera.\n— Foi errado. Vocês são bem-vindos, mas escolhem quando visitar e quando ir embora.\nO pai agradeceu. Também pediu desculpas por ter colhido a rosa sem permissão.\nDepois, os três prepararam um canteiro, enquanto a tia arrumava o lanche. Bela plantou uma muda; o pai firmou a terra; o príncipe trouxe água.\nQuando terminaram, ele ofereceu uma rosa do jardim. Desta vez, era um presente. Bela entregou a flor ao pai, e os dois sorriram.",
        "object": "flower",
        "prompt": "Toque na flor",
        "reaction": "O novo canteiro ficou pronto para crescer.",
        "effect": "bloom",
        "position": [
          46,
          72
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "bela",
        "audio": "/audio/bela-11.m4a",
        "sceneArt": "scene-bela-11",
        "sceneAlt": "Bela, o príncipe e papai cuidam das rosas no jardim do castelo.",
        "sceneAnchors": {
          "main": [
            70,
            56
          ],
          "extras": [
            [
              74,
              22
            ],
            [
              88,
              49
            ]
          ],
          "hidden": [
            86,
            80
          ]
        },
        "sceneMotion": {
          "profile": "breeze",
          "origin": [
            60,
            26
          ],
          "phase": 6,
          "direction": 1
        }
      },
      {
        "title": "Uma história antes de voltar",
        "text": "Depois do lanche, o pai e a tia sentaram perto da janela. Bela abriu seu livro favorito e leu para todos. O príncipe escutou sem interromper, mesmo quando quis fazer uma pergunta.\nAs primeiras estrelas apareceram, e Bela fechou o livro. Era hora de voltar para casa.\n— Domingo podemos ler o próximo capítulo — combinou com o amigo.\nEle acompanhou os visitantes até o portão e entregou o casaco que ela esquecera na cadeira. Bela olhou para o jardim uma última vez. A rosa balançava tranquila. Na estrada, segurou a mão do pai e começou a contar a história outra vez.",
        "object": "star",
        "prompt": "Acenda a luz do castelo",
        "reaction": "Boa noite! Amanhã tem mais uma aventura.",
        "effect": "magic",
        "position": [
          64,
          30
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "bela",
        "audio": "/audio/bela-12.m4a",
        "sceneArt": "scene-bela-12",
        "sceneAlt": "Os amigos guardam os livros e observam as estrelas pelas janelas do castelo.",
        "sceneAnchors": {
          "main": [
            72,
            26
          ],
          "extras": [
            [
              14,
              23
            ],
            [
              86,
              54
            ]
          ],
          "hidden": [
            86,
            70
          ]
        },
        "sceneMotion": {
          "profile": "nightstars",
          "origin": [
            77,
            33
          ],
          "phase": 0.3000000000000007,
          "direction": -1
        }
      }
    ]
  },
  {
    "id": "rapunzel",
    "title": "Rapunzel",
    "short": "Rapunzel",
    "theme": "lavender",
    "color": "#8b7a9a",
    "category": "Um pouco de magia",
    "description": "Presa numa torre pela bruxa, Rapunzel usa sua voz para pedir ajuda e conquistar a liberdade.",
    "dedication": "Para Manu, que merece ser ouvida e encontrar mãos amigas pelo caminho.",
    "cover": "rapunzel.png",
    "pages": [
      {
        "title": "Rapunzel e a torre",
        "text": "No meio de um jardim havia uma torre alta. Na janela morava Rapunzel, uma moça de cabelos tão compridos que sua trança chegava até o jardim quando ela a soltava pela janela. Ela queria caminhar entre as árvores e sentir a grama nos pés.\nMas uma bruxa a mantinha presa ali. A bruxa queria ter só para si a companhia de Rapunzel e trancava a porta no fim da escada.\n— Você fica aqui — dizia, guardando a chave.\nRapunzel tentara pedir para sair. A resposta era sempre não. Então ia à janela, de onde podia ver um pedacinho do mundo.",
        "object": "window",
        "prompt": "Toque na janelinha",
        "reaction": "Bom dia, Rapunzel! A janela se abriu.",
        "effect": "open",
        "position": [
          55,
          36
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luzinha",
            "reaction": "Plim! Uma luzinha só para você.",
            "effect": "magic",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "rapunzel",
        "audio": "/audio/rapunzel-1.m4a",
        "sceneArt": "scene-rapunzel-01",
        "sceneAlt": "Rapunzel olha o jardim pela janela da torre, com sua longa trança dourada.",
        "sceneAnchors": {
          "main": [
            75,
            34
          ],
          "extras": [
            [
              20,
              25
            ],
            [
              75,
              75
            ]
          ],
          "hidden": [
            20,
            65
          ]
        },
        "sceneMotion": {
          "profile": "clouds",
          "origin": [
            18,
            16
          ],
          "phase": 0,
          "direction": 1
        }
      },
      {
        "title": "O jardim tão perto",
        "text": "Uma borboleta passou voando pela janela. Rapunzel acompanhou seu caminho: por cima das flores, entre duas árvores, até o lago azul.\n— Eu queria passear assim também — sussurrou.\nDesceu a escada mais uma vez. Puxou a porta, empurrou devagar e chamou. Nada. A chave continuava com a bruxa, que tinha saído para buscar comida.\nRapunzel voltou ao quarto. Não conseguia abrir a porta sozinha, mas ainda podia usar sua voz. Alguém que passasse pelo jardim talvez escutasse.\nEla afastou a cortina, respirou fundo e começou a cantar uma canção que havia inventado para os passarinhos.",
        "object": "butterfly",
        "prompt": "Faça a borboleta passear",
        "reaction": "A borboleta foi visitar o jardim lá embaixo.",
        "effect": "fly",
        "position": [
          39,
          58
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "rapunzel",
        "audio": "/audio/rapunzel-2.m4a",
        "sceneArt": "scene-rapunzel-02",
        "sceneAlt": "Rapunzel observa lá do alto o lago azul e o jardim abaixo da torre.",
        "sceneAnchors": {
          "main": [
            75,
            35
          ],
          "extras": [
            [
              48,
              20
            ],
            [
              85,
              75
            ]
          ],
          "hidden": [
            48,
            78
          ]
        },
        "sceneMotion": {
          "profile": "water",
          "origin": [
            35,
            86
          ],
          "phase": 1.3,
          "direction": -1
        }
      },
      {
        "title": "A canção da janela",
        "text": "Rapunzel cantou sobre um caminho, uma flor e um lago que ainda queria conhecer. Sua voz saiu pela janela e desceu pela torre. Logo, um passarinho pousou na beirada.\n— Você pode ir e voltar — disse ela, olhando suas asas.\nO pássaro respondeu com um piu bem fininho. Rapunzel cantou novamente. A música a ajudava a espantar a tristeza enquanto pensava num jeito de pedir ajuda.\nQuando a bruxa chegou, chamou do jardim:\n— Rapunzel, solte sua trança!\nA bruxa guardava a porta sempre trancada e exigia entrar pela janela. Por isso, subia pela longa trança. Antes de dormir, Rapunzel deixou a cortina aberta.",
        "object": "bird",
        "prompt": "Toque no passarinho",
        "reaction": "Piu, piu! Uma canção só para você.",
        "effect": "fly",
        "position": [
          72,
          41
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "rapunzel",
        "audio": "/audio/rapunzel-3.m4a",
        "sceneArt": "scene-rapunzel-03",
        "sceneAlt": "Rapunzel canta na janela da torre para os passarinhos que se aproximam.",
        "sceneAnchors": {
          "main": [
            78,
            25
          ],
          "extras": [
            [
              18,
              23
            ],
            [
              86,
              79
            ]
          ],
          "hidden": [
            63,
            76
          ]
        },
        "sceneMotion": {
          "profile": "breeze",
          "origin": [
            52,
            30
          ],
          "phase": 2.6,
          "direction": 1
        }
      },
      {
        "title": "Vozes que atravessam o jardim",
        "text": "Na manhã seguinte, a bruxa desceu pela trança e foi embora, levando a chave da porta. Rapunzel esperou seus passos se afastarem. Depois chamou os passarinhos com a canção do dia anterior.\nUm cantou fino. O outro respondeu baixinho. Ela acompanhou os dois e acrescentou palavras novas:\n— Estou aqui na torre. Quero sair para passear.\nCantou sem pressa, para que cada palavra chegasse ao jardim. Os pássaros voavam de galho em galho, e a voz de Rapunzel seguia com eles.\nDo outro lado das árvores, um jovem que vinha pela trilha parou para escutar.",
        "object": "bird",
        "prompt": "Cante com o passarinho",
        "reaction": "Piu, piu, piu! Que canção alegre!",
        "effect": "fly",
        "position": [
          72,
          42
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luzinha",
            "reaction": "Plim! Uma luzinha só para você.",
            "effect": "magic",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "rapunzel",
        "audio": "/audio/rapunzel-4.m4a",
        "sceneArt": "scene-rapunzel-04",
        "sceneAlt": "Dois passarinhos cantam com Rapunzel junto à janela aberta da torre.",
        "sceneAnchors": {
          "main": [
            78,
            65
          ],
          "extras": [
            [
              83,
              25
            ],
            [
              17,
              22
            ]
          ],
          "hidden": [
            15,
            65
          ]
        },
        "sceneMotion": {
          "profile": "breeze",
          "origin": [
            69,
            17
          ],
          "phase": 3.9000000000000004,
          "direction": -1
        }
      },
      {
        "title": "Um amigo escuta",
        "text": "O jovem se chamava Tomás e morava na aldeia próxima. Tinha ido buscar sementes para o jardim de Dona Rosa, que cuidava dos caminhos e ajudava quem precisava. Ao ouvir a canção, aproximou-se da torre.\n— Olá! Eu sou Tomás. Você está pedindo ajuda?\nRapunzel apresentou-se e contou sobre a porta trancada e a chave que a bruxa levava consigo.\nTomás procurou uma entrada no jardim. Encontrou a porta, mas não conseguiu abri-la.\n— Vou procurar ajuda na aldeia — disse.\nRapunzel sentiu o peito ficar mais leve. Alguém tinha escutado, acreditado nela e parado para ajudar.",
        "object": "flower",
        "prompt": "Toque nas florzinhas",
        "reaction": "As flores dançaram para dar boas-vindas.",
        "effect": "bloom",
        "position": [
          43,
          78
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "rapunzel",
        "audio": "/audio/rapunzel-5.m4a",
        "sceneArt": "scene-rapunzel-05",
        "sceneAlt": "Um jovem no jardim cumprimenta Rapunzel que sorri lá na janela.",
        "sceneAnchors": {
          "main": [
            60,
            75
          ],
          "extras": [
            [
              65,
              25
            ],
            [
              15,
              75
            ]
          ],
          "hidden": [
            15,
            43
          ]
        },
        "sceneMotion": {
          "profile": "flutters",
          "origin": [
            22,
            24
          ],
          "phase": 5.2,
          "direction": 1
        }
      },
      {
        "title": "Uma flor e uma promessa",
        "text": "Antes de seguir para a aldeia, Tomás encontrou uma flor caída entre as folhas. Mostrou-a a Rapunzel.\n— Quer um pedacinho do jardim?\nEla pegou uma cestinha e prendeu a alça à ponta da trança. Baixou os cabelos pela janela, e Tomás colocou a flor dentro. Depois, Rapunzel puxou a cesta devagar e sentiu o perfume.\n— Obrigada. Eu quero muito poder escolher quando sair.\n— Vou contar tudo a Dona Rosa. Amanhã volto com ela.\nTomás seguiu pela trilha. Rapunzel pôs a flor num copinho de água. Quando a bruxa retornou, ela guardou a cestinha e ficou esperando a manhã.",
        "object": "flower",
        "prompt": "Abra a flor de presente",
        "reaction": "Uma flor bonita para a Rapunzel!",
        "effect": "bloom",
        "position": [
          44,
          68
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "rapunzel",
        "audio": "/audio/rapunzel-6.m4a",
        "sceneArt": "scene-rapunzel-06",
        "sceneAlt": "O amigo oferece uma flor caída do jardim para Rapunzel na torre.",
        "sceneAnchors": {
          "main": [
            57,
            27
          ],
          "extras": [
            [
              83,
              18
            ],
            [
              15,
              74
            ]
          ],
          "hidden": [
            55,
            78
          ]
        },
        "sceneMotion": {
          "profile": "flutters",
          "origin": [
            39,
            31
          ],
          "phase": 6.5,
          "direction": -1
        }
      },
      {
        "title": "Uma fita para a trança",
        "text": "Logo cedo, Rapunzel viu Tomás chegar. Ele trazia uma fita cor-de-rosa. Dona Rosa vinha atrás, acompanhada de dois ajudantes da aldeia. A bruxa saíra para buscar comida.\nTomás chamou baixinho. Rapunzel apareceu na janela e soltou a trança, sem deixar ninguém subir.\n— A fita é para prender os fios que estão escapando — explicou o amigo.\nEle colocou o presente na cestinha. Rapunzel recolheu a trança e começou a arrumá-la. Lá embaixo, Dona Rosa examinou a porta trancada.\n— Vamos ajudar você a sair por esta porta — disse.\nRapunzel ouviu e apertou a fita nas mãos, contente por ter companhia.",
        "object": "braid",
        "prompt": "Toque na trança",
        "reaction": "Um laço bonito para a trança dourada!",
        "effect": "wiggle",
        "position": [
          58,
          59
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luzinha",
            "reaction": "Plim! Uma luzinha só para você.",
            "effect": "magic",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "rapunzel",
        "audio": "/audio/rapunzel-7.m4a",
        "sceneArt": "scene-rapunzel-07",
        "sceneAlt": "A longa trança de Rapunzel chega ao jardim, onde o amigo traz uma fita.",
        "sceneAnchors": {
          "main": [
            28,
            68
          ],
          "extras": [
            [
              80,
              23
            ],
            [
              83,
              58
            ]
          ],
          "hidden": [
            15,
            44
          ]
        },
        "sceneMotion": {
          "profile": "breeze",
          "origin": [
            56,
            18
          ],
          "phase": 0.8000000000000007,
          "direction": 1
        }
      },
      {
        "title": "A bruxa precisa abrir",
        "text": "Rapunzel terminou o laço na trança quando a bruxa voltou pela trilha. Dona Rosa chamou, e ela escondeu a chave na mão.\n— Rapunzel não vai sair! — reclamou.\nDona Rosa ficou junto da porta, com os ajudantes ao lado.\n— Ela pediu ajuda. Você não pode mantê-la presa. Abra a porta.\nA bruxa olhou o grupo. Não conseguiria afastar todos como tinha afastado Rapunzel sozinha. Resmungando, entregou a chave. Dona Rosa destrancou a porta e ficou ali, guardando a passagem.\nNa janela, Rapunzel viu o laço balançar ao vento. Então ouviu o chamado:\n— Pode descer. Estamos esperando você.",
        "object": "braid",
        "prompt": "Balance a trança",
        "reaction": "Para cá, para lá! O laço está prontinho.",
        "effect": "wiggle",
        "position": [
          55,
          62
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "rapunzel",
        "audio": "/audio/rapunzel-8.m4a",
        "sceneArt": "scene-rapunzel-08",
        "sceneAlt": "Rapunzel prende um laço rosa na trança que balança junto à janela.",
        "sceneAnchors": {
          "main": [
            65,
            76
          ],
          "extras": [
            [
              83,
              35
            ],
            [
              15,
              44
            ]
          ],
          "hidden": [
            15,
            77
          ]
        },
        "sceneMotion": {
          "profile": "breeze",
          "origin": [
            73,
            25
          ],
          "phase": 2.0999999999999996,
          "direction": -1
        }
      },
      {
        "title": "A porta se abre para Rapunzel",
        "text": "Rapunzel juntou a trança nos braços e desceu a escada. Desta vez, encontrou a porta aberta. Dona Rosa estava de um lado; Tomás, do outro. Ninguém mandou que ela voltasse para cima.\nRapunzel deu um passo, depois outro. A luz do jardim chegou ao seu rosto, e ela soltou um longo suspiro.\nA bruxa tentou reclamar de novo. Dona Rosa impediu que se aproximasse e mandou que deixasse a torre. Os ajudantes acompanharam sua saída pelo caminho da floresta.\nRapunzel olhou a passagem livre. Depois de tanto esperar, podia ir até o lago que enxergava da janela.",
        "object": "door",
        "prompt": "Toque na portinha",
        "reaction": "A porta abriu. Vamos passear!",
        "effect": "open",
        "position": [
          51,
          73
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "rapunzel",
        "audio": "/audio/rapunzel-9.m4a",
        "sceneArt": "scene-rapunzel-09",
        "sceneAlt": "Rapunzel abre a porta da torre e encontra a grama macia do jardim.",
        "sceneAnchors": {
          "main": [
            53,
            63
          ],
          "extras": [
            [
              83,
              25
            ],
            [
              84,
              69
            ]
          ],
          "hidden": [
            18,
            24
          ]
        },
        "sceneMotion": {
          "profile": "warm",
          "origin": [
            26,
            32
          ],
          "phase": 3.4000000000000004,
          "direction": 1
        }
      },
      {
        "title": "A grama de pertinho",
        "text": "Mas antes do lago vinha a grama! Rapunzel tirou os sapatos e encostou os pés no chão. As pontinhas verdes fizeram cócegas.\n— É fofinha mesmo! — disse, rindo.\nTomás esperou enquanto ela dava pequenos passos. Dona Rosa ficou perto do portão, cuidando para que a bruxa não voltasse.\nRapunzel olhou para cima. O céu parecia enorme visto dali. Sentiu o sol nos braços, ouviu folhas mexendo e rodou devagar, segurando a trança para não tropeçar.\nQuando parou, reconheceu a borboleta que passava pela janela. Agora podia acompanhá-la pelo jardim. Tomás mostrou o começo da trilha que levava ao lago.",
        "object": "sun",
        "prompt": "Chame o sol para o passeio",
        "reaction": "O sol aqueceu o jardim da Rapunzel.",
        "effect": "glow",
        "position": [
          66,
          24
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luzinha",
            "reaction": "Plim! Uma luzinha só para você.",
            "effect": "magic",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "rapunzel",
        "audio": "/audio/rapunzel-10.m4a",
        "sceneArt": "scene-rapunzel-10",
        "sceneAlt": "Rapunzel pisa na grama e roda devagar ao sol diante da torre.",
        "sceneAnchors": {
          "main": [
            80,
            20
          ],
          "extras": [
            [
              27,
              27
            ],
            [
              20,
              59
            ]
          ],
          "hidden": [
            85,
            77
          ]
        },
        "sceneMotion": {
          "profile": "breeze",
          "origin": [
            43,
            19
          ],
          "phase": 4.700000000000001,
          "direction": -1
        }
      },
      {
        "title": "Até o lago azul",
        "text": "Os dois seguiram pela trilha. Rapunzel parou para olhar uma joaninha, cheirar uma flor e tocar a casca de uma árvore. Não precisava descobrir tudo correndo.\nPerto do lago, viu seu reflexo na água. O laço rosa estava um pouco torto. Tomás apontou, e eles riram.\nNa volta, Dona Rosa contou que os ajudantes tinham trocado a fechadura usada pela bruxa. Agora Rapunzel podia abrir e fechar a porta sozinha, por dentro. Rapunzel também teria companhia na aldeia, sempre que desejasse.\nEla escolheu passar aquela primeira noite no seu quarto conhecido. Antes, queria tomar um lanche com os novos amigos, no jardim.",
        "object": "butterfly",
        "prompt": "Toque na borboleta",
        "reaction": "Voa, borboleta! O mundo é bonito.",
        "effect": "fly",
        "position": [
          67,
          54
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "rapunzel",
        "audio": "/audio/rapunzel-11.m4a",
        "sceneArt": "scene-rapunzel-11",
        "sceneAlt": "Rapunzel e o amigo passeiam entre flores e caminhos novos no jardim.",
        "sceneAnchors": {
          "main": [
            44,
            39
          ],
          "extras": [
            [
              85,
              25
            ],
            [
              83,
              77
            ]
          ],
          "hidden": [
            18,
            62
          ]
        },
        "sceneMotion": {
          "profile": "flutters",
          "origin": [
            60,
            26
          ],
          "phase": 6,
          "direction": 1
        }
      },
      {
        "title": "Uma janela, uma porta e o amanhã",
        "text": "Depois do lanche, Rapunzel levou a flor do copinho para seu quarto. Dona Rosa ficaria no cômodo ao lado naquela noite, e a porta podia abrir a qualquer hora. A bruxa tinha partido e não voltaria a mandar ali.\nTomás despediu-se do jardim.\n— Amanhã podemos conhecer a aldeia.\n— Quero ver onde você mora — respondeu Rapunzel.\nUma estrela apareceu sobre as árvores. Rapunzel olhou o lago, a trilha e a porta que agora podia usar. Cantou baixinho a mesma canção da janela, mas mudou o final: o caminho que antes imaginava já guardava as marcas de seus próprios passos.",
        "object": "star",
        "prompt": "Acenda a estrela da torre",
        "reaction": "Boa noite, Rapunzel. Até amanhã!",
        "effect": "magic",
        "position": [
          61,
          25
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "rapunzel",
        "audio": "/audio/rapunzel-12.m4a",
        "sceneArt": "scene-rapunzel-12",
        "sceneAlt": "Rapunzel e o amigo se despedem do passeio enquanto uma estrela ilumina a torre.",
        "sceneAnchors": {
          "main": [
            77,
            23
          ],
          "extras": [
            [
              63,
              47
            ],
            [
              15,
              27
            ]
          ],
          "hidden": [
            81,
            78
          ]
        },
        "sceneMotion": {
          "profile": "nightstars",
          "origin": [
            77,
            33
          ],
          "phase": 0.3000000000000007,
          "direction": -1
        }
      }
    ]
  },
  {
    "id": "porquinhos",
    "title": "Os Três Porquinhos",
    "short": "Os Três Porquinhos",
    "theme": "sunshine",
    "color": "#ac8752",
    "category": "Bichinhos e amigos",
    "description": "Três irmãos constroem suas casas e encontram proteção quando o lobo sopra.",
    "dedication": "Para os irmãos que abrem a porta e ajudam a recomeçar.",
    "cover": "porquinhos.png",
    "pages": [
      {
        "title": "Três irmãos, três casinhas",
        "text": "Era uma vez três porquinhos que queriam construir suas próprias casas. Eram irmãos e gostavam de ficar perto uns dos outros. Escolheram um terreno ensolarado, com espaço para três portas e um jardim no meio.\nO primeiro irmão queria terminar depressa para brincar. O segundo queria uma casa bonita, com janela. O terceiro queria paredes bem firmes, porque um lobo costumava rondar aquela região.\n— Vamos morar perto — combinaram. — Se alguém precisar, basta chamar.\nEntão olharam o terreno e escolheram onde cada casa ficaria. No dia seguinte, começariam a trabalhar.",
        "object": "pig",
        "prompt": "Toque nos porquinhos",
        "reaction": "Um, dois, três irmãos escolhendo seu lugar!",
        "effect": "wiggle",
        "position": [
          50,
          70
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luzinha",
            "reaction": "Plim! Uma luzinha só para você.",
            "effect": "magic",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "porquinhos",
        "audio": "/audio/porquinhos-1.m4a",
        "sceneArt": "scene-porquinhos-01",
        "sceneAlt": "Os três porquinhos escolhem onde construir suas casinhas num terreno ensolarado.",
        "sceneAnchors": {
          "main": [
            52,
            80
          ],
          "extras": [
            [
              55,
              22
            ],
            [
              83,
              33
            ]
          ],
          "hidden": [
            18,
            75
          ]
        },
        "sceneMotion": {
          "profile": "breeze",
          "origin": [
            18,
            16
          ],
          "phase": 0,
          "direction": 1
        }
      },
      {
        "title": "Materiais para começar",
        "text": "No dia seguinte, os três chegaram com cestas, ferramentas e muita vontade de construir. O primeiro trouxe palha. Era leve, fácil de carregar e parecia bastante para uma casinha.\nO segundo juntou gravetos e pedaços de madeira.\n— Vou encaixar tudo com meu martelo.\nO terceiro trouxe tijolos e massa para uni-los.\n— A minha vai demorar mais. Quero que aguente um vento forte.\nEles colocaram os materiais nos lugares escolhidos. O primeiro abriu a cesta de palha e começou logo. Enquanto os irmãos separavam madeira e tijolos, suas paredes já estavam subindo.",
        "object": "pig",
        "prompt": "Chame os três irmãos",
        "reaction": "Oinc, oinc! Os materiais chegaram para a construção.",
        "effect": "hop",
        "position": [
          49,
          73
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "porquinhos",
        "audio": "/audio/porquinhos-2.m4a",
        "sceneArt": "scene-porquinhos-02",
        "sceneAlt": "Os porquinhos levam cestas e martelinhos para começar as casas no jardim.",
        "sceneAnchors": {
          "main": [
            52,
            78
          ],
          "extras": [
            [
              53,
              19
            ],
            [
              20,
              80
            ]
          ],
          "hidden": [
            79,
            79
          ]
        },
        "sceneMotion": {
          "profile": "breeze",
          "origin": [
            35,
            23
          ],
          "phase": 1.3,
          "direction": -1
        }
      },
      {
        "title": "A casa de palha fica pronta",
        "text": "O primeiro porquinho amarrou a palha em pequenos montes e montou suas paredes. Cobriu a casinha com um telhado leve. Trabalhou depressa e, antes dos irmãos, já estava quase pronto.\n— Olhem minha casa!\nPara deixá-la bonita, colocou uma flor na janela. Depois deu uma volta, admirando seu trabalho. Uma brisa passou: shhh! A palha balançou um pouquinho.\nO porquinho segurou o telhado até o vento parar.\n— Falta só a porta — pensou. — Depois posso brincar.\nPegou a pequena porta que tinha separado e chamou os irmãos para ver como ela ficaria.",
        "object": "straw",
        "prompt": "Toque na casa de palha",
        "reaction": "Uma flor enfeita a janela da casinha.",
        "effect": "open",
        "position": [
          39,
          59
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "porquinhos",
        "audio": "/audio/porquinhos-3.m4a",
        "sceneArt": "scene-porquinhos-03",
        "sceneAlt": "O primeiro porquinho termina a casinha de palha com uma flor na janela.",
        "sceneAnchors": {
          "main": [
            60,
            78
          ],
          "extras": [
            [
              65,
              24
            ],
            [
              18,
              78
            ]
          ],
          "hidden": [
            85,
            76
          ]
        },
        "sceneMotion": {
          "profile": "breeze",
          "origin": [
            52,
            30
          ],
          "phase": 2.6,
          "direction": 1
        }
      },
      {
        "title": "Uma porta bem pequenina",
        "text": "O porquinho encaixou a portinha na casa de palha. Abriu, fechou e bateu do lado de fora: toc, toc! Estava contente por ter uma entrada só sua.\nO segundo irmão veio olhar.\n— Ficou bonita. Mas será que a palha aguenta o sopro do lobo?\nO primeiro apertou mais uma amarra no telhado.\n— Acho que sim.\nNão tinha certeza. Mesmo assim, guardou as ferramentas e foi descansar. O segundo voltou ao seu monte de madeira. Queria terminar antes de escurecer. Ao lado dele, o terceiro continuava empilhando os tijolos com cuidado.",
        "object": "straw",
        "prompt": "Ajude a montar a casinha",
        "reaction": "A pequena porta se encaixa na casa de palha.",
        "effect": "build",
        "position": [
          38,
          58
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luzinha",
            "reaction": "Plim! Uma luzinha só para você.",
            "effect": "magic",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "porquinhos",
        "audio": "/audio/porquinhos-4.m4a",
        "sceneArt": "scene-porquinhos-04",
        "sceneAlt": "O porquinho coloca uma pequena porta na sua casinha de palha.",
        "sceneAnchors": {
          "main": [
            80,
            69
          ],
          "extras": [
            [
              73,
              25
            ],
            [
              26,
              19
            ]
          ],
          "hidden": [
            24,
            78
          ]
        },
        "sceneMotion": {
          "profile": "breeze",
          "origin": [
            69,
            17
          ],
          "phase": 3.9000000000000004,
          "direction": -1
        }
      },
      {
        "title": "A vez da madeira",
        "text": "Toc, toc, toc! O segundo porquinho prendia os pedaços de madeira. Fez uma parede, depois outra, deixando um espaço para a janela. Seu irmão dos tijolos trabalhava ali perto, sem correr.\n— Já vou terminar! — anunciou o segundo.\n— Estou colocando massa entre os tijolos — respondeu o terceiro. — É isso que segura as paredes.\nO segundo olhou para os gravetos da própria casa. Alguns eram grossos; outros, bem fininhos. Escolheu os mais fortes para perto da porta. Queria uma entrada firme. Depois chamou o primeiro irmão para ajudá-lo a encaixar o último pedaço.",
        "object": "wood",
        "prompt": "Toque na casa de madeira",
        "reaction": "Toc, toc! A casa ganha uma entrada.",
        "effect": "open",
        "position": [
          55,
          57
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "porquinhos",
        "audio": "/audio/porquinhos-5.m4a",
        "sceneArt": "scene-porquinhos-05",
        "sceneAlt": "Um porquinho constrói a casa de madeira enquanto o irmão trabalha nos tijolos.",
        "sceneAnchors": {
          "main": [
            36,
            80
          ],
          "extras": [
            [
              71,
              23
            ],
            [
              15,
              80
            ]
          ],
          "hidden": [
            76,
            79
          ]
        },
        "sceneMotion": {
          "profile": "breeze",
          "origin": [
            22,
            24
          ],
          "phase": 5.2,
          "direction": 1
        }
      },
      {
        "title": "A última parede",
        "text": "O primeiro porquinho segurou a madeira enquanto o segundo batia o martelinho. Toc, toc! A última parede ficou no lugar. Os dois comemoraram e foram olhar a casa do terceiro.\nEle ainda empilhava tijolos, um de cada vez. Os irmãos ajudaram a levar o que faltava. Quando o sol já estava baixo, a casa ganhou telhado e uma porta forte.\n— Agora também terminei — disse o terceiro.\nCada irmão foi para sua casa, pertinho dos outros. Mal tinham guardado as ferramentas quando ouviram passos pesados no terreno. O lobo estava chegando, e vinha direto para a casinha de palha.",
        "object": "wood",
        "prompt": "Ajude a encaixar a madeira",
        "reaction": "Mais um pedaço no lugar! Os irmãos trabalham juntos.",
        "effect": "build",
        "position": [
          55,
          58
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "porquinhos",
        "audio": "/audio/porquinhos-6.m4a",
        "sceneArt": "scene-porquinhos-06",
        "sceneAlt": "Os porquinhos encaixam gravetos e empilham tijolos nas duas casas em construção.",
        "sceneAnchors": {
          "main": [
            79,
            73
          ],
          "extras": [
            [
              55,
              20
            ],
            [
              17,
              64
            ]
          ],
          "hidden": [
            15,
            80
          ]
        },
        "sceneMotion": {
          "profile": "breeze",
          "origin": [
            39,
            31
          ],
          "phase": 6.5,
          "direction": -1
        }
      },
      {
        "title": "O sopro do lobo",
        "text": "O lobo bateu na casa de palha.\n— Abra, porquinho! Quero pegar você!\n— Não vou abrir!\nO lobo encheu o peito e soprou: fuuuu! A palha se soltou, e a casinha caiu. O porquinho escapou pela abertura dos fundos e correu para o irmão da madeira.\nO lobo foi atrás. Bateu de novo, ouviu outro “não” e soprou ainda mais forte. Os gravetos começaram a cair. Os dois irmãos saíram pelo outro lado antes que o telhado viesse abaixo.\nSem parar para pegar suas coisas, correram até a casa de tijolos.\n— Irmão, abra! Precisamos de ajuda!",
        "object": "wind",
        "prompt": "Toque na nuvenzinha",
        "reaction": "Fuuu! A palha e os gravetos voam com o sopro.",
        "effect": "wind",
        "position": [
          48,
          35
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luzinha",
            "reaction": "Plim! Uma luzinha só para você.",
            "effect": "magic",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "porquinhos",
        "audio": "/audio/porquinhos-7.m4a",
        "sceneArt": "scene-porquinhos-07",
        "sceneAlt": "O lobo sopra a palha e os gravetos enquanto os irmãos correm para a casa de tijolos.",
        "sceneAnchors": {
          "main": [
            53,
            23
          ],
          "extras": [
            [
              85,
              23
            ],
            [
              24,
              24
            ]
          ],
          "hidden": [
            14,
            77
          ]
        },
        "sceneMotion": {
          "profile": "wind",
          "origin": [
            56,
            18
          ],
          "phase": 0.8000000000000007,
          "direction": 1
        }
      },
      {
        "title": "Uma porta para os irmãos",
        "text": "O terceiro porquinho ouviu o chamado e abriu depressa.\n— Entrem, os dois!\nOs irmãos passaram pela porta. Ele fechou, encaixou a tranca e conferiu se os três estavam lá dentro. Só então se abraçaram. O primeiro tremia um pouquinho; o segundo respirava bem rápido.\n— Nossas casas caíram — contou o primeiro.\n— Vocês chegaram aqui. Vamos ficar juntos — disse o terceiro.\nDo lado de fora, o lobo bateu na porta.\n— Abram para mim!\nOs três se afastaram da entrada.\n— Não! — responderam juntos.\nO lobo arrastou os pés até a frente da casa. Ia tentar seu sopro outra vez.",
        "object": "door",
        "prompt": "Abra para os irmãos entrarem",
        "reaction": "Entrem depressa! Aqui há lugar para os três.",
        "effect": "open",
        "position": [
          65,
          66
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "porquinhos",
        "audio": "/audio/porquinhos-8.m4a",
        "sceneArt": "scene-porquinhos-08",
        "sceneAlt": "Os três irmãos fecham a porta e se abraçam dentro da casinha de tijolos.",
        "sceneAnchors": {
          "main": [
            80,
            26
          ],
          "extras": [
            [
              43,
              23
            ],
            [
              24,
              73
            ]
          ],
          "hidden": [
            83,
            79
          ]
        },
        "sceneMotion": {
          "profile": "hearth",
          "origin": [
            73,
            25
          ],
          "phase": 2.0999999999999996,
          "direction": -1
        }
      },
      {
        "title": "A casa que ficou firme",
        "text": "O lobo encheu o peito. Soprou uma vez: fuuu! Soprou duas vezes: fuuuu! As folhas voaram pelo jardim, mas a casa de tijolos não caiu.\nLá dentro, os porquinhos ouviam o vento e ficavam longe da porta. O terceiro encostou a mão na parede.\n— Está firme. A tranca também está no lugar.\nOs outros respiraram mais devagar. O lobo tentou um último sopro, tão comprido que ficou sem fôlego. Precisou se sentar no chão para descansar.\nDepois levantou, empurrou a porta e viu que ela também resistia. Nenhum dos irmãos iria abrir. Ele não conseguiria entrar.",
        "object": "brick",
        "prompt": "Toque na casa de tijolos",
        "reaction": "As paredes continuam firmes. Os irmãos estão protegidos.",
        "effect": "glow",
        "position": [
          68,
          58
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "porquinhos",
        "audio": "/audio/porquinhos-9.m4a",
        "sceneArt": "scene-porquinhos-09",
        "sceneAlt": "Os três porquinhos ficam protegidos na casa firme enquanto o lobo sopra lá fora.",
        "sceneAnchors": {
          "main": [
            54,
            75
          ],
          "extras": [
            [
              79,
              22
            ],
            [
              18,
              77
            ]
          ],
          "hidden": [
            35,
            78
          ]
        },
        "sceneMotion": {
          "profile": "hearth",
          "origin": [
            26,
            32
          ],
          "phase": 3.4000000000000004,
          "direction": 1
        }
      },
      {
        "title": "O lobo vai embora",
        "text": "Cansado de soprar, o lobo resmungou e se afastou. Os porquinhos ficaram dentro de casa, ouvindo seus passos sumirem pela trilha. Esperaram mais um pouco e espiaram pela janela. O jardim estava vazio.\n— Ele foi embora — disse o segundo.\nO primeiro passou a mão pelos tijolos.\n— Cada pedacinho ajudou a proteger a gente.\nO terceiro mostrou a massa entre as paredes e a tranca firme da porta. Depois os três conferiram a casa juntos.\nOs irmãos ainda precisavam de abrigo, pois tinham perdido suas casinhas.\n— Podem dormir aqui comigo — ofereceu o terceiro. — Há espaço para nós três.",
        "object": "brick",
        "prompt": "Observe a casa bem firme",
        "reaction": "Tijolos unidos e uma porta forte protegeram os três.",
        "effect": "build",
        "position": [
          68,
          58
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luzinha",
            "reaction": "Plim! Uma luzinha só para você.",
            "effect": "magic",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "porquinhos",
        "audio": "/audio/porquinhos-10.m4a",
        "sceneArt": "scene-porquinhos-10",
        "sceneAlt": "Os porquinhos observam de perto os tijolos que formam as paredes resistentes.",
        "sceneAnchors": {
          "main": [
            55,
            20
          ],
          "extras": [
            [
              20,
              20
            ],
            [
              82,
              18
            ]
          ],
          "hidden": [
            15,
            72
          ]
        },
        "sceneMotion": {
          "profile": "hearth",
          "origin": [
            43,
            19
          ],
          "phase": 4.700000000000001,
          "direction": -1
        }
      },
      {
        "title": "Sopa para aquecer",
        "text": "Os três porquinhos lavaram as mãos e prepararam uma sopa. O primeiro trouxe as tigelas; o segundo colocou água na panela; o terceiro mexeu os legumes. Quando ficou pronta, sentaram juntos para comer.\nO cheirinho gostoso ocupou a cozinha. Com cada colherada, o susto foi ficando menor.\n— Obrigado por abrir a porta — disse o primeiro.\n— E por nos deixar ficar — completou o segundo.\n— Vocês são meus irmãos — respondeu o terceiro.\nDepois do jantar, combinaram reconstruir as duas casas com tijolos. Naquela noite, dormiriam ali, protegidos, enquanto o lobo seguia para bem longe do terreno.",
        "object": "cup",
        "prompt": "Toque na tigelinha",
        "reaction": "Uma sopa quentinha para os três irmãos!",
        "effect": "hearts",
        "position": [
          53,
          75
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "porquinhos",
        "audio": "/audio/porquinhos-11.m4a",
        "sceneArt": "scene-porquinhos-11",
        "sceneAlt": "Os três porquinhos compartilham uma sopa quentinha na casa de tijolos, após a partida do lobo.",
        "sceneAnchors": {
          "main": [
            67,
            80
          ],
          "extras": [
            [
              26,
              18
            ],
            [
              49,
              68
            ]
          ],
          "hidden": [
            18,
            79
          ]
        },
        "sceneMotion": {
          "profile": "hearth",
          "origin": [
            60,
            26
          ],
          "phase": 6,
          "direction": 1
        }
      },
      {
        "title": "Casas novas, irmãos por perto",
        "text": "Na manhã seguinte, os irmãos foram juntos ao jardim. A casa de tijolos continuava firme. Juntaram a palha espalhada e os gravetos caídos, deixando o terreno livre para recomeçar.\nDessa vez, ninguém quis correr. Um levava os tijolos, outro preparava a massa e o terceiro ajudava a levantar as paredes. Levaram vários dias, descansando e brincando entre uma tarefa e outra.\nQuando as duas casas novas ficaram prontas, cada porquinho ganhou sua porta forte. As três casinhas continuaram bem perto.\nAo anoitecer, acenderam as luzes e se despediram pelas janelas.\n— Boa noite, irmão!\n— Até amanhã!",
        "object": "heart",
        "prompt": "Espalhe carinho entre os irmãos",
        "reaction": "Três casinhas firmes e três irmãos pertinho uns dos outros.",
        "effect": "hearts",
        "position": [
          51,
          50
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "porquinhos",
        "audio": "/audio/porquinhos-12.m4a",
        "sceneArt": "scene-porquinhos-12",
        "sceneAlt": "Os três irmãos constroem juntos uma casa de tijolos no jardim, com materiais e ferramentas.",
        "sceneAnchors": {
          "main": [
            33,
            23
          ],
          "extras": [
            [
              66,
              18
            ],
            [
              50,
              77
            ]
          ],
          "hidden": [
            86,
            80
          ]
        },
        "sceneMotion": {
          "profile": "breeze",
          "origin": [
            77,
            33
          ],
          "phase": 0.3000000000000007,
          "direction": -1
        }
      }
    ]
  },
  {
    "id": "cinderela",
    "title": "Cinderela",
    "short": "Cinderela",
    "theme": "moonlight",
    "color": "#6f8f9d",
    "category": "Um pouco de magia",
    "description": "Impedida de ir ao baile, Cinderela recebe ajuda, perde um sapatinho e encontra uma vida em que pode escolher.",
    "dedication": "Um pouquinho de sonho cabe em todos os nossos dias.",
    "cover": "cinderela.png",
    "pages": [
      {
        "title": "Um convite para o baile",
        "text": "Cinderela morava com a madrasta e duas irmãs numa casa perto do castelo. Ela gostava de cantar e de conversar com os passarinhos da janela. Mas a madrasta deixava todo o trabalho para ela. Enquanto as irmãs passeavam, Cinderela varria, lavava e arrumava. Um dia, chegou um convite: haveria um baile no castelo! Todas as moças do reino podiam ir. Cinderela segurou a vassoura e sorriu.\n— Eu também quero dançar!\nA madrasta respondeu:\n— Primeiro, termine todas as tarefas.\nCinderela começou bem cedo, pensando na música que ouviria.",
        "object": "bird",
        "prompt": "Chame o passarinho da janela",
        "reaction": "Piu, piu! O passarinho acompanha a canção de Cinderela.",
        "effect": "fly",
        "position": [
          38,
          40
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luzinha",
            "reaction": "Plim! Uma luzinha só para você.",
            "effect": "magic",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "cinderela",
        "audio": "/audio/cinderela-1.m4a",
        "sceneArt": "scene-cinderela-01",
        "sceneAlt": "Cinderela cuida da casa e conversa com os passarinhos junto à janela.",
        "sceneAnchors": {
          "main": [
            81,
            25
          ],
          "extras": [
            [
              20,
              29
            ],
            [
              62,
              76
            ]
          ],
          "hidden": [
            85,
            57
          ]
        },
        "sceneMotion": {
          "profile": "hearth",
          "origin": [
            18,
            16
          ],
          "phase": 0,
          "direction": 1
        }
      },
      {
        "title": "A fitinha e a porta fechada",
        "text": "Quando terminou de limpar a casa, Cinderela pegou um vestido antigo e procurou uma fita para enfeitá-lo. Dois passarinhos trouxeram uma fitinha que estava caída no jardim.\n— Obrigada! Agora posso me arrumar.\nMas as irmãs chamaram Cinderela para ajudá-las com os próprios vestidos. Uma queria o laço; a outra, os sapatos. A madrasta inventou mais uma tarefa. Quando Cinderela voltou ao seu vestido, elas já estavam saindo.\n— Você vai ficar aqui — disse a madrasta.\nCinderela pediu para ir, mas a porta se fechou. Com a fita na mão, ela foi para o jardim.",
        "object": "butterfly",
        "prompt": "Toque na borboleta perto da fita",
        "reaction": "A borboleta passa devagar pelo jardim de Cinderela.",
        "effect": "fly",
        "position": [
          41,
          47
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "cinderela",
        "audio": "/audio/cinderela-2.m4a",
        "sceneArt": "scene-cinderela-02",
        "sceneAlt": "Passarinhos trazem uma fita para Cinderela, que agradece com carinho.",
        "sceneAnchors": {
          "main": [
            81,
            64
          ],
          "extras": [
            [
              80,
              18
            ],
            [
              38,
              78
            ]
          ],
          "hidden": [
            64,
            82
          ]
        },
        "sceneMotion": {
          "profile": "breeze",
          "origin": [
            35,
            23
          ],
          "phase": 1.3,
          "direction": -1
        }
      },
      {
        "title": "Alguém escutou Cinderela",
        "text": "Cinderela sentou num banco do jardim. Tinha trabalhado tanto, e mesmo assim não a deixaram ir. Seus olhos se encheram de lágrimas.\n— Eu só queria uma noite para dançar — falou baixinho.\nUma luz apareceu perto das flores. Era sua fada madrinha, com uma varinha na mão.\n— Eu ouvi você, Cinderela. O que fizeram foi injusto. Você também recebeu o convite.\nA fada se sentou ao lado dela e esperou até que respirasse mais calma.\n— Vamos preparar sua ida ao baile. Você quer?\nCinderela enxugou o rosto e respondeu que sim. A fada olhou para uma abóbora.",
        "object": "wand",
        "prompt": "Toque na varinha da fada",
        "reaction": "Plim! A fada prepara uma ajuda para Cinderela.",
        "effect": "magic",
        "position": [
          52,
          51
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "cinderela",
        "audio": "/audio/cinderela-3.m4a",
        "sceneArt": "scene-cinderela-03",
        "sceneAlt": "A fada madrinha aparece no jardim com a varinha cercada de pequenas luzes.",
        "sceneAnchors": {
          "main": [
            48,
            31
          ],
          "extras": [
            [
              81,
              24
            ],
            [
              20,
              43
            ]
          ],
          "hidden": [
            82,
            71
          ]
        },
        "sceneMotion": {
          "profile": "sparkles",
          "origin": [
            52,
            30
          ],
          "phase": 2.6,
          "direction": 1
        }
      },
      {
        "title": "A abóbora começa a mudar",
        "text": "A abóbora era redonda, pesada e tinha um cabinho torto. Cinderela ajudou a fada a colocá-la no meio do jardim.\n— É com ela que vou ao castelo? — perguntou, surpresa.\n— Veja o que acontece — respondeu a fada.\nEla levantou a varinha. Uma luz brilhou perto do cabinho; outra desceu pela casca; a terceira rodou bem devagar. Plim, plim, plim! A abóbora começou a crescer. Apareceram desenhos dourados, uma janelinha e o começo de uma roda. Cinderela deu um passo para trás, deixando espaço. Seus olhos acompanharam cada mudança, até a roda ficar inteira.",
        "object": "wand",
        "prompt": "Toque na varinha brilhante",
        "reaction": "Plim, plim, plim! A abóbora continua se transformando.",
        "effect": "magic",
        "position": [
          56,
          52
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luzinha",
            "reaction": "Plim! Uma luzinha só para você.",
            "effect": "magic",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "cinderela",
        "audio": "/audio/cinderela-4.m4a",
        "sceneArt": "scene-cinderela-04",
        "sceneAlt": "Cinderela observa três luzinhas da varinha e a abóbora começando a mudar.",
        "sceneAnchors": {
          "main": [
            47,
            30
          ],
          "extras": [
            [
              36,
              12
            ],
            [
              86,
              43
            ]
          ],
          "hidden": [
            15,
            77
          ]
        },
        "sceneMotion": {
          "profile": "sparkles",
          "origin": [
            69,
            17
          ],
          "phase": 3.9000000000000004,
          "direction": -1
        }
      },
      {
        "title": "Tudo pronto, antes da meia-noite",
        "text": "A abóbora terminou de se transformar numa carruagem. Quatro cavalos apareceram diante dela, e um cocheiro abriu a porta. Então a fada tocou o vestido de Cinderela: ele ficou azul, leve e pronto para dançar. Nos pés, surgiram dois sapatinhos de cristal.\n— Agora posso ir! — Cinderela exclamou.\nA fada sorriu, mas explicou com cuidado:\n— A magia termina à meia-noite. Quando o relógio começar a bater doze vezes, volte para casa. A carruagem será abóbora outra vez, e seu vestido voltará a ser o de antes. Os sapatinhos continuarão com você.\nCinderela prometeu lembrar e entrou na carruagem.",
        "object": "carriage",
        "prompt": "Toque na carruagem pronta",
        "reaction": "As rodas estão prontas para levar Cinderela ao baile.",
        "effect": "roll",
        "position": [
          63,
          69
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "cinderela",
        "audio": "/audio/cinderela-5.m4a",
        "sceneArt": "scene-cinderela-05",
        "sceneAlt": "A fada apresenta a carruagem, o vestido azul e os sapatinhos brilhantes.",
        "sceneAnchors": {
          "main": [
            73,
            78
          ],
          "extras": [
            [
              61,
              18
            ],
            [
              16,
              72
            ]
          ],
          "hidden": [
            86,
            28
          ]
        },
        "sceneMotion": {
          "profile": "sparkles",
          "origin": [
            22,
            24
          ],
          "phase": 5.2,
          "direction": 1
        }
      },
      {
        "title": "O caminho até o castelo",
        "text": "Toc, toc, toc! As rodas passaram pelas pedras do caminho. Cinderela espiou pela janelinha. Nunca tinha visto a estrada à noite daquele jeito: as árvores pareciam quietinhas, e as luzes do castelo cresciam lá adiante. Ela acenou para um passarinho pousado num galho.\n— Estou indo! — disse, quase cantando.\nO cocheiro levou a carruagem até a entrada e ajudou Cinderela a descer.\n— Ficarei por aqui para a volta.\nEla agradeceu. Do outro lado da porta vinha uma música alegre. Cinderela ajeitou a fita que guardara consigo, respirou fundo e entrou no salão.",
        "object": "carriage",
        "prompt": "Faça a carruagem seguir o caminho",
        "reaction": "Toc, toc! As rodas chegam à entrada do castelo.",
        "effect": "roll",
        "position": [
          61,
          68
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "cinderela",
        "audio": "/audio/cinderela-6.m4a",
        "sceneArt": "scene-cinderela-06",
        "sceneAlt": "Cinderela acena pela janela da carruagem a caminho do castelo iluminado.",
        "sceneAnchors": {
          "main": [
            54,
            80
          ],
          "extras": [
            [
              56,
              24
            ],
            [
              80,
              79
            ]
          ],
          "hidden": [
            85,
            53
          ]
        },
        "sceneMotion": {
          "profile": "nightstars",
          "origin": [
            39,
            31
          ],
          "phase": 6.5,
          "direction": -1
        }
      },
      {
        "title": "O convite para dançar",
        "text": "O salão estava cheio de gente, luzes e música. Cinderela viu a madrasta e as irmãs entre os convidados, mas elas não a reconheceram naquele vestido. Ela ficou um instante perto da porta, sem saber onde pôr as mãos. Então o príncipe se aproximou.\n— Você gostaria de dançar comigo?\nCinderela olhou para o espaço onde os pares rodavam.\n— Gostaria. Faz tempo que não danço.\n— Podemos começar devagar.\nEla aceitou a mão que ele ofereceu. Um passinho para cá, outro para lá. Logo os ombros ficaram menos tensos, e Cinderela começou a sorrir ao som da música.",
        "object": "star",
        "prompt": "Toque nas estrelas do salão",
        "reaction": "As luzinhas acompanham os primeiros passos da dança.",
        "effect": "magic",
        "position": [
          59,
          31
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luzinha",
            "reaction": "Plim! Uma luzinha só para você.",
            "effect": "magic",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "cinderela",
        "audio": "/audio/cinderela-7.m4a",
        "sceneArt": "scene-cinderela-07",
        "sceneAlt": "Cinderela e o príncipe dançam no salão do castelo entre convidados sorridentes.",
        "sceneAnchors": {
          "main": [
            79,
            18
          ],
          "extras": [
            [
              18,
              67
            ],
            [
              78,
              74
            ]
          ],
          "hidden": [
            26,
            18
          ]
        },
        "sceneMotion": {
          "profile": "warm",
          "origin": [
            56,
            18
          ],
          "phase": 0.8000000000000007,
          "direction": 1
        }
      },
      {
        "title": "Uma conversa entre as músicas",
        "text": "Depois da primeira música, o príncipe e Cinderela continuaram conversando. Ela contou que gostava de cantar e que conhecia os passarinhos perto de sua casa. Ele contou que, às vezes, também ficava sem jeito nas festas.\n— Então podemos ficar sem jeito juntos! — ela disse, rindo.\nVeio outra música, mais suave. Eles rodaram perto da janela, por onde se viam as estrelas. Cinderela estava tão contente que perdeu a conta das canções. Então enxergou o relógio do salão. O ponteiro se aproximava do alto.\nEla lembrou do aviso da fada. Precisava encontrar o cocheiro antes que a magia terminasse.",
        "object": "star",
        "prompt": "Faça as estrelas brilharem",
        "reaction": "As estrelas aparecem pela janela enquanto a música toca.",
        "effect": "magic",
        "position": [
          63,
          31
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "cinderela",
        "audio": "/audio/cinderela-8.m4a",
        "sceneArt": "scene-cinderela-08",
        "sceneAlt": "Cinderela e o príncipe giram devagar no salão com estrelas visíveis pela janela.",
        "sceneAnchors": {
          "main": [
            75,
            22
          ],
          "extras": [
            [
              17,
              37
            ],
            [
              85,
              68
            ]
          ],
          "hidden": [
            25,
            77
          ]
        },
        "sceneMotion": {
          "profile": "nightstars",
          "origin": [
            73,
            25
          ],
          "phase": 2.0999999999999996,
          "direction": -1
        }
      },
      {
        "title": "O sapatinho na escada",
        "text": "Dong! O relógio começou a bater meia-noite.\n— Preciso ir! — disse Cinderela.\nEla agradeceu a dança e correu para a saída. O príncipe foi atrás para se despedir, mas ela já descia a escada. Um sapatinho escapou do seu pé. Cinderela tentou voltar, ouviu outra badalada e seguiu até a carruagem.\nO cocheiro partiu depressa. Perto de casa, a última badalada soou: a carruagem virou abóbora, e o vestido voltou a ser simples. Cinderela entrou levando o sapatinho que restara.\nNo castelo, o príncipe encontrou o outro na escada. Queria devolvê-lo e reencontrar a moça com quem tinha conversado.",
        "object": "slipper",
        "prompt": "Toque no sapatinho da escada",
        "reaction": "O cristal brilha no degrau onde Cinderela passou.",
        "effect": "glow",
        "position": [
          47,
          78
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "cinderela",
        "audio": "/audio/cinderela-9.m4a",
        "sceneArt": "scene-cinderela-09",
        "sceneAlt": "À meia-noite, Cinderela corre pela escada e deixa um sapatinho para trás.",
        "sceneAnchors": {
          "main": [
            40,
            80
          ],
          "extras": [
            [
              81,
              25
            ],
            [
              15,
              48
            ]
          ],
          "hidden": [
            49,
            22
          ]
        },
        "sceneMotion": {
          "profile": "nightstars",
          "origin": [
            26,
            32
          ],
          "phase": 3.4000000000000004,
          "direction": 1
        }
      },
      {
        "title": "A busca chega à casa",
        "text": "Na manhã seguinte, o príncipe começou a visitar as casas com um ajudante e o sapatinho. Perguntava pela moça que saíra do baile à meia-noite. Muitas pessoas tentaram calçá-lo, mas ele não serviu. Por fim, chegaram à casa de Cinderela.\nAs duas irmãs experimentaram primeiro. O sapatinho ficou pequeno para uma e apertado para a outra.\n— Aqui não mora mais ninguém que tenha ido ao baile — disse a madrasta.\nMas Cinderela ouviu a conversa da cozinha e veio até a porta. Os passarinhos cantavam junto à janela.\n— Eu também quero experimentar — pediu.\nO príncipe se virou para ouvir sua voz.",
        "object": "slipper",
        "prompt": "Toque no sapatinho trazido pelo príncipe",
        "reaction": "O sapatinho está pronto para Cinderela experimentar.",
        "effect": "glow",
        "position": [
          46,
          74
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luzinha",
            "reaction": "Plim! Uma luzinha só para você.",
            "effect": "magic",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "cinderela",
        "audio": "/audio/cinderela-10.m4a",
        "sceneArt": "scene-cinderela-10",
        "sceneAlt": "O príncipe chega à casa de Cinderela com o sapatinho enquanto os pássaros cantam.",
        "sceneAnchors": {
          "main": [
            45,
            60
          ],
          "extras": [
            [
              84,
              22
            ],
            [
              15,
              21
            ]
          ],
          "hidden": [
            15,
            76
          ]
        },
        "sceneMotion": {
          "profile": "breeze",
          "origin": [
            43,
            19
          ],
          "phase": 4.700000000000001,
          "direction": -1
        }
      },
      {
        "title": "Cinderela pode escolher",
        "text": "O príncipe reconheceu a voz de Cinderela.\n— Você me contou dos passarinhos!\nA madrasta tentou fazê-la voltar à cozinha, mas ele pediu que a deixassem falar. Cinderela se sentou e calçou o sapatinho. Serviu direitinho! Depois mostrou o outro, que guardara desde a noite do baile.\n— Era eu — disse. — Precisei sair por causa da magia.\nO príncipe ouviu a história toda, inclusive as tarefas e a porta fechada.\n— Você gostaria de voltar ao castelo? Lá ninguém vai impedir você de sair ou de descansar.\nCinderela pensou e aceitou. Desta vez, a decisão era dela. A madrasta e as irmãs não podiam barrar sua saída.",
        "object": "heart",
        "prompt": "Toque no coração perto de Cinderela",
        "reaction": "Cinderela pode falar, ser ouvida e fazer sua escolha.",
        "effect": "hearts",
        "position": [
          53,
          50
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "cinderela",
        "audio": "/audio/cinderela-11.m4a",
        "sceneArt": "scene-cinderela-11",
        "sceneAlt": "O sapatinho serve em Cinderela, que sorri para o convite de dançar outra vez.",
        "sceneAnchors": {
          "main": [
            52,
            52
          ],
          "extras": [
            [
              43,
              19
            ],
            [
              16,
              58
            ]
          ],
          "hidden": [
            28,
            82
          ]
        },
        "sceneMotion": {
          "profile": "warm",
          "origin": [
            60,
            26
          ],
          "phase": 6,
          "direction": 1
        }
      },
      {
        "title": "Uma casa e uma nova dança",
        "text": "Cinderela foi morar no castelo, onde tinha um quarto tranquilo e tempo para cantar, passear e descansar. Com o passar dos dias, ela e o príncipe se conheceram melhor. Gostavam de conversar e continuaram dançando juntos. A madrasta e as irmãs ficaram na antiga casa, cuidando das próprias tarefas.\nNa primeira festa de Cinderela, a fada madrinha chegou pelo jardim. Ela recebeu um abraço demorado.\n— Obrigada por me escutar naquela noite.\nO sapatinho ficou guardado numa caixinha, junto da fita. Quando a música começou, Cinderela chamou seus amigos. Pela janela aberta, os passarinhos acompanharam a dança com um piu, piu bem alegre.",
        "object": "wand",
        "prompt": "Toque na varinha da fada convidada",
        "reaction": "Plim! A fada chegou para celebrar com Cinderela e os amigos.",
        "effect": "magic",
        "position": [
          57,
          41
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "cinderela",
        "audio": "/audio/cinderela-12.m4a",
        "sceneArt": "scene-cinderela-12",
        "sceneAlt": "Cinderela dança com os amigos e agradece à fada pela noite especial.",
        "sceneAnchors": {
          "main": [
            58,
            30
          ],
          "extras": [
            [
              80,
              23
            ],
            [
              17,
              29
            ]
          ],
          "hidden": [
            78,
            74
          ]
        },
        "sceneMotion": {
          "profile": "sparkles",
          "origin": [
            77,
            33
          ],
          "phase": 0.3000000000000007,
          "direction": -1
        }
      }
    ]
  },
  {
    "id": "branca",
    "title": "Branca de Neve",
    "short": "Branca de Neve",
    "theme": "apple",
    "color": "#829773",
    "category": "Na floresta",
    "description": "Branca de Neve encontra abrigo com sete anões e enfrenta o engano da rainha com ajuda dos novos amigos.",
    "dedication": "Sempre existe espaço para mais um amigo.",
    "cover": "branca.png",
    "pages": [
      {
        "title": "Um caminho para se proteger",
        "text": "Branca de Neve caminhava pela floresta, procurando um lugar seguro. Ela morava num castelo com sua madrasta, a rainha. A rainha tinha um espelho mágico e perguntava todos os dias quem era a mais bonita. Quando ele respondeu “Branca de Neve”, ela ficou cheia de inveja. Queria todas as atenções para si e mandou a moça embora.\nBranca saiu triste, levando um pão e uma manta. Não sabia onde dormiria. Então um coelhinho apareceu no caminho, mexendo o nariz. Ela seguiu na mesma direção e, entre as árvores, viu o telhado de uma casinha.",
        "object": "rabbit",
        "prompt": "Toque no coelhinho do caminho",
        "reaction": "O coelhinho pula pela trilha perto de Branca de Neve.",
        "effect": "hop",
        "position": [
          36,
          78
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luzinha",
            "reaction": "Plim! Uma luzinha só para você.",
            "effect": "magic",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "branca",
        "audio": "/audio/branca-1.m4a",
        "sceneArt": "scene-branca-01",
        "sceneAlt": "Branca de Neve segue um coelhinho pelo caminho da floresta até a casinha.",
        "sceneAnchors": {
          "main": [
            55,
            74
          ],
          "extras": [
            [
              59,
              25
            ],
            [
              18,
              75
            ]
          ],
          "hidden": [
            83,
            30
          ]
        },
        "sceneMotion": {
          "profile": "breeze",
          "origin": [
            18,
            16
          ],
          "phase": 0,
          "direction": 1
        }
      },
      {
        "title": "A casinha depois da árvore",
        "text": "O coelhinho pulou uma pedra e parou entre as flores. Branca de Neve foi devagar para não tropeçar. Estava cansada de caminhar e precisava beber água.\n— Espere um pouquinho — disse ao coelho, que mexeu as orelhas.\nDepois de uma árvore grande, a casinha apareceu inteira. Tinha uma chaminé, janelas baixas e um caminho de pedrinhas. Saía um cheiro de sopa lá de dentro. Branca parou diante do portão. Talvez alguém pudesse ajudá-la, mas não queria entrar sem pedir. Ajeitou a manta no braço, aproximou-se da porta e bateu três vezes.\nToc, toc, toc! Ela esperou uma resposta.",
        "object": "rabbit",
        "prompt": "Ajude o coelhinho a pular",
        "reaction": "Um pulinho sobre a pedra! A casinha está perto.",
        "effect": "hop",
        "position": [
          37,
          75
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "branca",
        "audio": "/audio/branca-2.m4a",
        "sceneArt": "scene-branca-02",
        "sceneAlt": "O coelhinho pula uma pedra e espera Branca de Neve entre as flores.",
        "sceneAnchors": {
          "main": [
            79,
            72
          ],
          "extras": [
            [
              61,
              20
            ],
            [
              16,
              75
            ]
          ],
          "hidden": [
            53,
            80
          ]
        },
        "sceneMotion": {
          "profile": "flutters",
          "origin": [
            35,
            23
          ],
          "phase": 1.3,
          "direction": -1
        }
      },
      {
        "title": "Sete anões abrem a porta",
        "text": "A porta se abriu, e apareceu um homem pequeno de gorro vermelho. Atrás dele vieram outros seis. Eram sete anões, que moravam juntos e trabalhavam numa mina da floresta.\n— Boa tarde. Você precisa de ajuda? — perguntou o primeiro.\nBranca de Neve explicou que vinha do castelo e não tinha onde ficar.\n— Estou com sede. Posso descansar um pouco?\nEles abriram espaço, trouxeram água e puxaram uma cadeira. Um deles pegou a manta para guardá-la num lugar seco.\n— Pode entrar. Vamos conversar e ver como ajudar.\nBranca bebeu devagar. Pela primeira vez naquele dia, seus pés e seu coração puderam descansar.",
        "object": "door",
        "prompt": "Toque na portinha da casa",
        "reaction": "A porta abre para Branca descansar e pedir ajuda.",
        "effect": "open",
        "position": [
          68,
          60
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "branca",
        "audio": "/audio/branca-3.m4a",
        "sceneArt": "scene-branca-03",
        "sceneAlt": "Os sete amigos abrem a porta da casinha e dão boas-vindas a Branca de Neve.",
        "sceneAnchors": {
          "main": [
            78,
            69
          ],
          "extras": [
            [
              20,
              28
            ],
            [
              17,
              74
            ]
          ],
          "hidden": [
            59,
            18
          ]
        },
        "sceneMotion": {
          "profile": "warm",
          "origin": [
            52,
            30
          ],
          "phase": 2.6,
          "direction": 1
        }
      },
      {
        "title": "Mais um lugar à mesa",
        "text": "A sopa já estava pronta. Na mesa havia sete tigelinhas, sete colheres e sete cadeiras. Um dos anões buscou mais uma tigela; outro aproximou um banquinho. Branca de Neve agradeceu e contou o que acontecera no castelo.\n— Não entendo por que a rainha me mandou embora. Eu não fiz nada contra ela.\nOs amigos escutaram até o fim.\n— Você não tem culpa da inveja dela — disseram. — Pode ficar aqui enquanto precisar.\nA sopa quentinha ajudou a acalmar sua barriga. Depois de comer, Branca perguntou como poderia colaborar com a casa. Queria conhecer melhor aqueles sete novos amigos.",
        "object": "cup",
        "prompt": "Toque na tigelinha nova",
        "reaction": "Há sopa e um lugar à mesa para Branca de Neve.",
        "effect": "wiggle",
        "position": [
          59,
          71
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luzinha",
            "reaction": "Plim! Uma luzinha só para você.",
            "effect": "magic",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "branca",
        "audio": "/audio/branca-4.m4a",
        "sceneArt": "scene-branca-04",
        "sceneAlt": "Branca de Neve e os sete amigos preparam mais um lugar à mesa das tigelinhas.",
        "sceneAnchors": {
          "main": [
            50,
            65
          ],
          "extras": [
            [
              19,
              22
            ],
            [
              65,
              20
            ]
          ],
          "hidden": [
            81,
            77
          ]
        },
        "sceneMotion": {
          "profile": "hearth",
          "origin": [
            69,
            17
          ],
          "phase": 3.9000000000000004,
          "direction": -1
        }
      },
      {
        "title": "Uma casa para dividir",
        "text": "Os anões se apresentaram, um por vez. Um gostava de contar histórias; outro cuidava da horta; um terceiro consertava cadeiras. Os outros também tinham coisas de que gostavam. Branca de Neve foi olhando os rostos e contando: um, dois, três, quatro, cinco, seis, sete.\n— Eu sei costurar e gosto de cuidar das flores — contou.\nEles combinaram de dividir as tarefas e prepararam um cantinho para ela dormir. Antes de apagar a luz, falaram da rainha e do príncipe vizinho.\n— Ele guarda um sino de prata que desperta quem adormece por encantamento — contou um anão. — Já ajudou outros amigos da floresta.\n— Se ela procurar você, vamos ajudar. Quando estivermos na mina, espere nossa volta antes de receber uma visita desconhecida.\nBranca concordou e colocou sua manta na cama.",
        "object": "dwarf",
        "prompt": "Toque em um dos sete anões",
        "reaction": "Cada amigo tem seu jeito e uma tarefa na casa.",
        "effect": "wiggle",
        "position": [
          49,
          69
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "branca",
        "audio": "/audio/branca-5.m4a",
        "sceneArt": "scene-branca-05",
        "sceneAlt": "Branca de Neve conta os sete amigos de gorro reunidos na casinha.",
        "sceneAnchors": {
          "main": [
            55,
            80
          ],
          "extras": [
            [
              51,
              18
            ],
            [
              16,
              76
            ]
          ],
          "hidden": [
            77,
            22
          ]
        },
        "sceneMotion": {
          "profile": "hearth",
          "origin": [
            22,
            24
          ],
          "phase": 5.2,
          "direction": 1
        }
      },
      {
        "title": "A rainha descobre o refúgio",
        "text": "Nos dias seguintes, Branca de Neve conheceu a horta e os caminhos perto da casa. À tarde, todos arrumavam as coisas juntos. Os anões cantavam, e ela marcava a música com palmas. O coelhinho aparecia na janela, como se também quisesse escutar.\nMas, no castelo, a rainha voltou a consultar o espelho. Ele respondeu que Branca continuava sendo a mais bonita, mesmo na floresta. A rainha ficou irritada: queria ser a única a receber elogios. Em vez de deixá-la em paz, decidiu procurá-la. Preparou uma maçã com um feitiço de sono e escolheu uma roupa para esconder quem era.",
        "object": "dwarf",
        "prompt": "Faça o anão acompanhar a canção",
        "reaction": "Lá, lá, lá! Branca e os amigos cantam enquanto arrumam a casa.",
        "effect": "hop",
        "position": [
          50,
          70
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "branca",
        "audio": "/audio/branca-6.m4a",
        "sceneArt": "scene-branca-06",
        "sceneAlt": "Branca de Neve bate palmas para os amigos que cantam enquanto cuidam da casa.",
        "sceneAnchors": {
          "main": [
            64,
            78
          ],
          "extras": [
            [
              17,
              18
            ],
            [
              17,
              72
            ]
          ],
          "hidden": [
            88,
            82
          ]
        },
        "sceneMotion": {
          "profile": "hearth",
          "origin": [
            39,
            31
          ],
          "phase": 6.5,
          "direction": -1
        }
      },
      {
        "title": "A maçã e o engano",
        "text": "Na manhã seguinte, os anões foram para a mina. A rainha, disfarçada de vendedora, chegou ao jardim com um cesto de maçãs. Branca falou pela janela que esperaria os amigos.\n— Eles encomendaram estas frutas — mentiu a visitante. — Esta aqui é para você.\nParecia conhecer os anões, e Branca acreditou. Recebeu a maçã pela janela e deu uma mordida. Logo seus olhos ficaram pesados. Sentou-se e adormeceu: era um sono mágico.\nA rainha foi embora. Ao voltarem, os sete amigos encontraram Branca dormindo, com a maçã caída perto da mão.",
        "object": "apple",
        "prompt": "Toque na maçã caída",
        "reaction": "Uma luz aparece na maçã que os amigos encontraram.",
        "effect": "glow",
        "position": [
          62,
          69
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luzinha",
            "reaction": "Plim! Uma luzinha só para você.",
            "effect": "magic",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "branca",
        "audio": "/audio/branca-7.m4a",
        "sceneArt": "scene-branca-07",
        "sceneAlt": "Branca de Neve adormece após provar a maçã, com os amigos perto para cuidar dela.",
        "sceneAnchors": {
          "main": [
            72,
            63
          ],
          "extras": [
            [
              45,
              11
            ],
            [
              91,
              12
            ]
          ],
          "hidden": [
            50,
            82
          ]
        },
        "sceneMotion": {
          "profile": "warm",
          "origin": [
            56,
            18
          ],
          "phase": 0.8000000000000007,
          "direction": 1
        }
      },
      {
        "title": "Os amigos procuram ajuda",
        "text": "Os anões chamaram Branca de Neve, mas ela não acordou. Viram a maçã e entenderam que não era um sono comum. Cobriram a amiga com uma manta e ficaram perto dela.\n— Precisamos de alguém que conheça encantamentos — disse um deles.\nOutro lembrou da conversa sobre o príncipe e seu sino de prata.\n— Ele já sabe ajudar!\n— Vou buscá-lo. Vocês cuidam dela.\nO anão partiu pela estrada, enquanto os outros mantinham a casa tranquila. Quando chegou ao castelo, contou tudo ao príncipe. Ele reconheceu o feitiço da maçã e pegou o pequeno sino de prata. Os dois voltaram sem demora.",
        "object": "star",
        "prompt": "Acenda uma luz suave",
        "reaction": "Uma luz baixinha acompanha os amigos que cuidam de Branca.",
        "effect": "magic",
        "position": [
          61,
          30
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "branca",
        "audio": "/audio/branca-8.m4a",
        "sceneArt": "scene-branca-08",
        "sceneAlt": "Os amigos cobrem Branca de Neve com uma manta e esperam tranquilamente ao seu lado.",
        "sceneAnchors": {
          "main": [
            54,
            18
          ],
          "extras": [
            [
              83,
              20
            ],
            [
              16,
              64
            ]
          ],
          "hidden": [
            69,
            78
          ]
        },
        "sceneMotion": {
          "profile": "hearth",
          "origin": [
            73,
            25
          ],
          "phase": 2.0999999999999996,
          "direction": -1
        }
      },
      {
        "title": "O sino desfaz o feitiço",
        "text": "Ao amanhecer, o príncipe chegou com o anão que fora buscá-lo. Os outros seis abriram a porta e mostraram onde Branca de Neve dormia.\n— Este sino pode desfazer o feitiço — explicou ele.\nTodos se aproximaram, deixando espaço ao redor da cama. O príncipe balançou o sino de prata. Dim, dim, dim! O som delicado encheu a casa. Branca mexeu os dedos, respirou fundo e abriu os olhos.\n— Onde estão meus amigos?\n— Aqui! — responderam os sete.\nEla reconheceu cada rosto e sorriu. O príncipe guardou o sino. A magia tinha terminado, e Branca já conseguia se sentar e conversar.",
        "object": "sun",
        "prompt": "Toque no sol da manhã",
        "reaction": "A manhã clareia a casinha enquanto Branca de Neve desperta.",
        "effect": "glow",
        "position": [
          65,
          22
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "branca",
        "audio": "/audio/branca-9.m4a",
        "sceneArt": "scene-branca-09",
        "sceneAlt": "O príncipe toca um pequeno sino de prata, e Branca de Neve desperta diante dos sete amigos.",
        "sceneAnchors": {
          "main": [
            64,
            19
          ],
          "extras": [
            [
              42,
              11
            ],
            [
              15,
              72
            ]
          ],
          "hidden": [
            60,
            82
          ]
        },
        "sceneMotion": {
          "profile": "warm",
          "origin": [
            26,
            32
          ],
          "phase": 3.4000000000000004,
          "direction": 1
        }
      },
      {
        "title": "A rainha não pode voltar",
        "text": "Branca de Neve espreguiçou os braços e contou sobre a vendedora que dizia conhecer os anões. O príncipe escutou e prometeu investigar. Levou a maçã aos guardas, que seguiram as pegadas até o castelo da rainha. Lá encontraram o cesto e suas poções. O espelho confirmou o engano.\nOs guardas guardaram as poções e impediram a rainha de voltar à floresta para fazer mal. Ela deixou de governar e já não podia mandar em Branca.\nQuando a notícia chegou à casinha, Branca soltou um suspiro de alívio. O coelho deu um pulo perto da janela. Agora podiam preparar um lanche no jardim.",
        "object": "rabbit",
        "prompt": "Dê um pulinho com o coelho",
        "reaction": "Pula, pula! Branca está acordada e cercada de amigos.",
        "effect": "hop",
        "position": [
          38,
          76
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luzinha",
            "reaction": "Plim! Uma luzinha só para você.",
            "effect": "magic",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "branca",
        "audio": "/audio/branca-10.m4a",
        "sceneArt": "scene-branca-10",
        "sceneAlt": "Branca de Neve se espreguiça, e o coelhinho pula de alegria entre os amigos.",
        "sceneAnchors": {
          "main": [
            64,
            78
          ],
          "extras": [
            [
              77,
              18
            ],
            [
              44,
              25
            ]
          ],
          "hidden": [
            84,
            78
          ]
        },
        "sceneMotion": {
          "profile": "breeze",
          "origin": [
            43,
            19
          ],
          "phase": 4.700000000000001,
          "direction": -1
        }
      },
      {
        "title": "O piquenique no jardim",
        "text": "Os amigos levaram uma toalha para o jardim. Branca colocou pão e frutas numa cesta; os anões trouxeram água e suas tigelinhas. O príncipe também ficou para o lanche. Sentaram juntos debaixo da árvore, e o coelho chegou bem perto, farejando a grama.\n— Quero continuar morando aqui — disse Branca. — Gosto desta casa e da vida que fazemos juntos.\nOs sete ficaram contentes. Combinaram novas tarefas e passeios, agora com mais calma. Branca agradeceu a quem buscara ajuda e a quem ficara ao seu lado. Depois, repartiram o pão. Ela comeu devagar, ouvindo uma história engraçada sobre a horta.",
        "object": "basket",
        "prompt": "Abra a cestinha do piquenique",
        "reaction": "Pão e frutas para dividir no jardim da casinha.",
        "effect": "open",
        "position": [
          51,
          79
        ],
        "extras": [
          {
            "object": "butterfly",
            "name": "Brinque com a borboleta",
            "reaction": "A borboleta voou para te dar um olá!",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "bird",
        "art": "branca",
        "audio": "/audio/branca-11.m4a",
        "sceneArt": "scene-branca-11",
        "sceneAlt": "Branca de Neve, príncipe, sete amigos e coelhinho fazem um piquenique no jardim.",
        "sceneAnchors": {
          "main": [
            49,
            74
          ],
          "extras": [
            [
              52,
              20
            ],
            [
              29,
              80
            ]
          ],
          "hidden": [
            82,
            20
          ]
        },
        "sceneMotion": {
          "profile": "flutters",
          "origin": [
            60,
            26
          ],
          "phase": 6,
          "direction": 1
        }
      },
      {
        "title": "O lugar de Branca de Neve",
        "text": "Quando o piquenique terminou, todos levaram as tigelinhas para dentro. O príncipe se despediu, prometendo visitar os amigos outro dia. Branca de Neve lavou uma tigela, um anão enxugou, e outro guardou na prateleira. Agora eram oito lugares à mesa.\nAntes de dormir, Branca recebeu um abraço dos amigos. Pela janela, viu o coelhinho encolhido perto das flores: aquele mesmo que encontrara no caminho.\nEla ajeitou sua manta e se deitou. O barulho das árvores já não parecia tão estranho. Na casa, ouvia passos conhecidos e uma canção baixinha. Branca fechou os olhos, tranquila. De manhã, cuidariam juntos das flores da horta.",
        "object": "heart",
        "prompt": "Toque no coração da casinha",
        "reaction": "Um abraço para Branca e seus sete amigos, antes de dormir.",
        "effect": "hearts",
        "position": [
          50,
          56
        ],
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              12,
              19
            ]
          },
          {
            "object": "flower",
            "name": "Abra as florzinhas",
            "reaction": "Mais uma flor abriu no jardim!",
            "effect": "bloom",
            "position": [
              12,
              82
            ]
          }
        ],
        "hidden": "rabbit",
        "art": "branca",
        "audio": "/audio/branca-12.m4a",
        "sceneArt": "scene-branca-12",
        "sceneAlt": "Branca de Neve e os amigos se abraçam na casinha depois de guardar as tigelinhas.",
        "sceneAnchors": {
          "main": [
            86,
            50
          ],
          "extras": [
            [
              68,
              13
            ],
            [
              17,
              69
            ]
          ],
          "hidden": [
            82,
            79
          ]
        },
        "sceneMotion": {
          "profile": "hearth",
          "origin": [
            77,
            33
          ],
          "phase": 0.3000000000000007,
          "direction": -1
        }
      }
    ]
  },
  {
    "id": "pinoquio",
    "title": "Pinóquio",
    "short": "Pinóquio",
    "theme": "sunshine",
    "color": "#c77a43",
    "category": "Um pouco de magia",
    "description": "Um boneco de madeira descobre como contar a verdade, pedir ajuda e cuidar de quem ama, numa aventura que o leva até o mar.",
    "dedication": "Para Manu, que descobre o mundo com perguntas e um coração cheio de carinho.",
    "cover": "scene-pinoquio-01.webp",
    "pages": [
      {
        "title": "Uma voz na oficina",
        "text": "Na oficina de Gepeto, um pedaço de madeira deu uma risadinha. O carpinteiro parou, escutou e sorriu. Com mãos cuidadosas, fez uma cabeça, dois braços e duas pernas. Assim nasceu Pinóquio! O boneco espichou os pés e abraçou Gepeto, que passou a ser seu pai. À noite, enquanto dividiam uma sopa, Pinóquio perguntou: — Será que um dia posso ser um menino? — Você já é meu filho — respondeu Gepeto. — E temos muita coisa para descobrir juntos. Pinóquio encostou a cabeça de madeira no ombro dele.",
        "object": "heart",
        "prompt": "Faça o abraço brilhar",
        "reaction": "Gepeto e Pinóquio já são uma família.",
        "effect": "hearts",
        "sceneAlt": "Gepeto acolhe o pequeno boneco Pinóquio junto à bancada da oficina iluminada.",
        "sceneAnchors": {
          "main": [
            29,
            83
          ],
          "extras": [
            [
              89,
              20
            ],
            [
              87,
              86
            ]
          ],
          "hidden": [
            6,
            90
          ]
        },
        "sceneMotion": {
          "profile": "hearth"
        },
        "art": "scene-pinoquio-01",
        "position": [
          16,
          76
        ]
      },
      {
        "title": "O livro e o tambor",
        "text": "Na manhã seguinte, Gepeto vendeu seu casaco para comprar um livro de escola. Pinóquio apertou o presente contra o peito. Queria aprender a ler histórias para o pai! Mas, no caminho, ouviu um tambor: tum, tum, tum. Havia um teatro de bonecos na praça. Ele parou para olhar, depois quis entrar. Como não tinha dinheiro, trocou o livro por um ingresso. A música era bonita, mas o abraço no livro fez falta. Quando as cortinas se abriram, Pinóquio pensou em Gepeto esperando por ele em casa.",
        "object": "book",
        "prompt": "Abra o livrinho de Pinóquio",
        "reaction": "Cada página guarda uma descoberta.",
        "effect": "open",
        "sceneAlt": "Pinóquio olha o teatro na praça, segurando o livro antes de trocá-lo pelo ingresso.",
        "sceneAnchors": {
          "main": [
            76,
            84
          ],
          "extras": [
            [
              89,
              23
            ],
            [
              85,
              58
            ]
          ],
          "hidden": [
            7,
            91
          ]
        },
        "sceneMotion": {
          "profile": "breeze"
        },
        "art": "scene-pinoquio-02",
        "position": [
          14,
          80
        ]
      },
      {
        "title": "Uma chance de consertar",
        "text": "Os bonecos do palco viram Pinóquio e chamaram: — Venha dançar com a gente! Ele rodopiou, bateu os pezinhos e fez a plateia sorrir. Depois, contou ao dono do teatro que tinha vendido seu livro. — Meu pai ficou sem casaco para comprá-lo — disse, baixinho. O homem ouviu e lhe deu cinco moedas pelo espetáculo. Agora Pinóquio podia comprar outro livro e ajudar Gepeto! Guardou as moedas numa bolsinha, agradeceu e saiu depressa. Seu coração estava mais leve: havia encontrado um jeito de reparar o que fizera.",
        "object": "star",
        "prompt": "Faça brilhar a estrela do teatro",
        "reaction": "Uma dança e uma nova chance!",
        "effect": "magic",
        "sceneAlt": "Pinóquio dança no palco com duas marionetes, diante das cortinas do pequeno teatro.",
        "sceneAnchors": {
          "main": [
            64,
            20
          ],
          "extras": [
            [
              87,
              85
            ],
            [
              26,
              89
            ]
          ],
          "hidden": [
            5,
            93
          ]
        },
        "sceneMotion": {
          "profile": "warm"
        },
        "art": "scene-pinoquio-03",
        "position": [
          15,
          23
        ]
      },
      {
        "title": "As moedas que não brotaram",
        "text": "Na rua, uma raposa e um gato ouviram o tilintar das moedas. Eles queriam ficar com o dinheiro e inventaram uma promessa: — Plante suas moedas no campo. Amanhã haverá uma árvore cheia delas! Pinóquio imaginou muitos livros e um casaco quentinho para Gepeto. Seguiu os dois, enterrou a bolsinha e foi buscar água. Quando voltou, a terra estava remexida. A raposa, o gato e as moedas tinham sumido. Pinóquio sentou no caminho e chorou. Queria ajudar seu pai, mas tinha acreditado em quem queria enganá-lo.",
        "object": "flower",
        "prompt": "Veja a flor do caminho",
        "reaction": "A flor cresce com água e cuidado.",
        "effect": "bloom",
        "sceneAlt": "Pinóquio encontra a terra remexida no campo e percebe que sua bolsinha desapareceu.",
        "sceneAnchors": {
          "main": [
            85,
            85
          ],
          "extras": [
            [
              84,
              22
            ],
            [
              65,
              86
            ]
          ],
          "hidden": [
            7,
            92
          ]
        },
        "sceneMotion": {
          "profile": "breeze"
        },
        "art": "scene-pinoquio-04",
        "position": [
          14,
          83
        ]
      },
      {
        "title": "Uma verdade comprida",
        "text": "Uma fada de cabelos azuis encontrou Pinóquio chorando e o levou para descansar. Ela vira o livro que ele levava para a escola e as moedas que o dono do teatro lhe dera. — Onde está seu livro? — perguntou com calma. Com medo de decepcioná-la, ele respondeu: — Eu perdi no caminho. Seu nariz cresceu um pouquinho. — E as moedas? — Não recebi moeda nenhuma! O nariz ficou comprido, comprido. Pinóquio cobriu o rosto. A fada sentou perto: — Você pode me contar o que aconteceu. Ele respirou e contou tudo, do teatro ao campo. A fada escutou sem rir. Quando terminou, seu nariz voltou ao tamanho de antes.",
        "object": "wand",
        "prompt": "Toque na luzinha da fada",
        "reaction": "Respire devagar. Pode contar.",
        "effect": "magic",
        "sceneAlt": "A fada ouve Pinóquio com gentileza enquanto seu nariz de madeira está comprido.",
        "sceneAnchors": {
          "main": [
            58,
            21
          ],
          "extras": [
            [
              89,
              22
            ],
            [
              87,
              84
            ]
          ],
          "hidden": [
            7,
            90
          ]
        },
        "sceneMotion": {
          "profile": "sparkles"
        },
        "art": "scene-pinoquio-05",
        "position": [
          14,
          24
        ]
      },
      {
        "title": "A oficina vazia",
        "text": "— Posso consertar tudo de uma vez? — perguntou Pinóquio. — Podemos começar pelo próximo passo — respondeu a fada. Ela lhe deu pão para a viagem e explicou o caminho de casa. Pinóquio decidiu contar a verdade a Gepeto e juntar dinheiro para outro livro. Mas, na oficina, encontrou a cadeira vazia. Uma vizinha veio avisar: — Seu pai saiu para procurar você. Achou que tinha seguido os artistas até o porto. Pinóquio olhou a manta dobrada por Gepeto. Sentiu saudade e pediu à vizinha que o acompanhasse até o mar.",
        "object": "door",
        "prompt": "Toque na porta da oficina",
        "reaction": "Vamos procurar Gepeto juntos.",
        "effect": "open",
        "sceneAlt": "Pinóquio chega à oficina e olha a cadeira vazia de Gepeto, com a manta dobrada.",
        "sceneAnchors": {
          "main": [
            10,
            54
          ],
          "extras": [
            [
              88,
              24
            ],
            [
              87,
              87
            ]
          ],
          "hidden": [
            7,
            90
          ]
        },
        "sceneMotion": {
          "profile": "hearth"
        },
        "art": "scene-pinoquio-06",
        "position": [
          14,
          77
        ]
      },
      {
        "title": "Papai está no mar",
        "text": "No porto, um pescador apontou para o horizonte. Gepeto tinha saído num barquinho, procurando notícias do filho. Pinóquio esperou na praia com a vizinha. Então viu, ao longe, o avental azul do pai! Uma onda levantou o barco, e um peixe enorme apareceu. Glup! Barco e Gepeto desapareceram em sua boca. O pescador preparou uma corda para ajudar. Pinóquio correu pela água rasa, chamando o pai. Outra onda o levou mais longe. O grande peixe abriu a boca novamente, e Pinóquio escorregou para dentro, agarrado a uma tábua.",
        "object": "drop",
        "prompt": "Toque na gotinha do mar",
        "reaction": "Chuá! A água faz círculos.",
        "effect": "splash",
        "sceneAlt": "Pinóquio procura Gepeto na praia enquanto um grande peixe e o barquinho aparecem ao longe.",
        "sceneAnchors": {
          "main": [
            30,
            85
          ],
          "extras": [
            [
              12,
              18
            ],
            [
              84,
              86
            ]
          ],
          "hidden": [
            7,
            91
          ]
        },
        "sceneMotion": {
          "profile": "water"
        },
        "art": "scene-pinoquio-07",
        "position": [
          14,
          80
        ]
      },
      {
        "title": "Uma luz lá dentro",
        "text": "Lá dentro estava escuro, mas Pinóquio viu uma luzinha. — Papai? — chamou. Perto do barquinho, Gepeto segurava uma lanterna. Tinha ficado abrigado entre as tábuas que o peixe engolira. Os dois correram para um abraço tão apertado que a madeira fez creque! Pinóquio contou o que acontecera e pediu desculpa por não ter voltado. — Que bom ouvir sua voz — disse Gepeto. — Agora vamos sair daqui juntos. Encostaram o ouvido nas paredes do peixe. Um atum também estava preso ali e ouviu a conversa. — A boca se abre quando ele dorme — contou. Logo a passagem ficou entreaberta, com cheirinho de mar.",
        "object": "heart",
        "prompt": "Toque no coração do reencontro",
        "reaction": "Um abraço bem apertado!",
        "effect": "hearts",
        "sceneAlt": "Pinóquio e Gepeto se abraçam junto ao barquinho e à lanterna dentro do grande peixe.",
        "sceneAnchors": {
          "main": [
            84,
            81
          ],
          "extras": [
            [
              12,
              18
            ],
            [
              88,
              20
            ]
          ],
          "hidden": [
            7,
            90
          ]
        },
        "sceneMotion": {
          "profile": "warm"
        },
        "art": "scene-pinoquio-08",
        "position": [
          14,
          77
        ]
      },
      {
        "title": "Uma saída de mansinho",
        "text": "Pinóquio olhou a abertura e teve uma ideia. — Eu flutuo, papai. A madeira me ajuda! Gepeto juntou duas tábuas do barco, e o filho segurou a ponta da corda. Devagarinho, empurraram a jangada até a boca aberta. Ploft! Caíram na água sob as estrelas. Gepeto ficou nas tábuas, enquanto Pinóquio batia os pés para levá-los à praia. Mas a areia ainda estava longe. O atum saiu junto e nadou perto da jangada. Quando viu Gepeto cansado, aproximou-se. — Segurem minha cauda — ofereceu. Quando o atum começou a guiar a jangada, Pinóquio subiu ao lado de Gepeto. Juntos, seguiram rumo às luzes do porto.",
        "object": "star",
        "prompt": "Faça a estrela brilhar no caminho",
        "reaction": "Uma luzinha aponta a praia.",
        "effect": "magic",
        "sceneAlt": "Pinóquio e Gepeto seguem seguros na pequena jangada guiada pelo atum, sob as estrelas.",
        "sceneAnchors": {
          "main": [
            58,
            20
          ],
          "extras": [
            [
              88,
              22
            ],
            [
              87,
              86
            ]
          ],
          "hidden": [
            7,
            91
          ]
        },
        "sceneMotion": {
          "profile": "nightstars"
        },
        "art": "scene-pinoquio-09",
        "position": [
          14,
          24
        ]
      },
      {
        "title": "Pés firmes na areia",
        "text": "O pescador e a vizinha estavam esperando com a corda e duas mantas. Quando a jangada chegou, ajudaram Gepeto a pisar na areia. Pinóquio agradeceu ao atum, que fez um mergulho brilhante e voltou para o mar. Depois se enroscou com o pai numa manta. Gepeto estava cansado e tossia um pouco. — Vamos descansar em casa — disse o filho. Os vizinhos os acompanharam pelo caminho. Na oficina, Pinóquio acendeu a lamparina com ajuda, trouxe água e ficou pertinho. Dessa vez, Gepeto não precisou esperar sozinho pelo abraço da noite.",
        "object": "bird",
        "prompt": "Toque no passarinho da praia",
        "reaction": "Ele canta: chegaram, chegaram!",
        "effect": "fly",
        "sceneAlt": "Pinóquio e Gepeto voltam de mãos dadas pela praia, com a pequena jangada ao fundo.",
        "sceneAnchors": {
          "main": [
            89,
            83
          ],
          "extras": [
            [
              14,
              24
            ],
            [
              88,
              24
            ]
          ],
          "hidden": [
            7,
            91
          ]
        },
        "sceneMotion": {
          "profile": "water"
        },
        "art": "scene-pinoquio-10",
        "position": [
          14,
          25
        ]
      },
      {
        "title": "Um cuidado de cada vez",
        "text": "Nos dias seguintes, Pinóquio ajudou a fazer sopa, guardou as ferramentas e levou leite para Gepeto descansar. Um jardineiro lhe deu algumas moedas por regar as plantas com ele. A vizinha ajudou a comprar um livro novo, e Pinóquio voltou à escola. Aprendeu devagar, perguntando quando não entendia. À tarde, lia uma palavra para o pai: — Ca-sa! Gepeto sorria e ganhava forças. Quando Pinóquio soube que a fada estava doente, mandou flores com a vizinha. Ela o tinha cuidado; agora ele também queria saber se ela precisava de ajuda.",
        "object": "book",
        "prompt": "Abra o novo livro",
        "reaction": "Uma palavra, outra palavra… uma história!",
        "effect": "open",
        "sceneAlt": "Pinóquio rega as flores do jardim, ajudando a juntar moedas para seu novo livro.",
        "sceneAnchors": {
          "main": [
            85,
            86
          ],
          "extras": [
            [
              91,
              24
            ],
            [
              29,
              85
            ]
          ],
          "hidden": [
            7,
            91
          ]
        },
        "sceneMotion": {
          "profile": "hearth"
        },
        "art": "scene-pinoquio-11",
        "position": [
          14,
          78
        ]
      },
      {
        "title": "O mesmo abraço",
        "text": "Naquela noite, Pinóquio sonhou com a fada. Ela já estava melhor e agradeceu pelas flores. — Você tem cuidado de muita gente — disse, tocando seu ombro com uma luz suave. De manhã, ele abriu os olhos e sentiu as mãos quentinhas. Seus braços eram de menino! Correu ao espelho, depois ao pai. Gepeto abriu os braços antes mesmo de ouvir a novidade. Pinóquio pulou no colo dele e riu. Na mesa esperavam o livro e dois pratos de pão. Seu grande desejo tinha acontecido, e o abraço continuava sendo o mesmo.",
        "object": "heart",
        "prompt": "Toque no coração de Pinóquio",
        "reaction": "O amor cabe num abraço.",
        "effect": "hearts",
        "sceneAlt": "Pinóquio transformado em menino abraça Gepeto na oficina, com o livro e o café da manhã à mesa.",
        "sceneAnchors": {
          "main": [
            29,
            85
          ],
          "extras": [
            [
              89,
              22
            ],
            [
              86,
              84
            ]
          ],
          "hidden": [
            7,
            91
          ]
        },
        "sceneMotion": {
          "profile": "warm"
        },
        "art": "scene-pinoquio-12",
        "position": [
          14,
          76
        ]
      }
    ]
  },
  {
    "id": "peter-pan",
    "title": "Peter Pan",
    "short": "Uma aventura na Terra do Nunca",
    "theme": "forest",
    "color": "#6c8e70",
    "category": "Um pouco de magia",
    "description": "Wendy e seus irmãos seguem Peter Pan até a Terra do Nunca, ajudam os amigos a escapar de Gancho e voltam para o abraço da mamãe.",
    "dedication": "Para Manu, que encontra mundos inteiros numa história e aconchego no abraço da mamãe.",
    "cover": "scene-peter-pan-01.webp",
    "pages": [
      {
        "title": "Uma visita de luz",
        "text": "Wendy gostava de contar histórias para seus irmãos, João e Miguel. Naquela noite, os três estavam no quarto, já de pijama, quando uma luz pequenininha apareceu perto da janela.\n— Sou Sininho! — anunciou uma fadinha de asas brilhantes.\nAtrás dela veio um menino chamado Peter Pan. Ele procurava uma coisa muito estranha: sua própria sombra!\nA sombra tinha ficado presa atrás da cortina numa visita anterior. Agora escapava pelo chão, comprida e apressada. Peter tentava alcançá-la, mas ela sempre deslizava. Wendy saiu da cama para ajudar aquele visitante atrapalhado.",
        "object": "window",
        "prompt": "Veja a luz na janela",
        "reaction": "Sininho chegou com Peter Pan!",
        "effect": "magic",
        "sceneAlt": "Peter e Sininho aparecem no quarto de Wendy, João e Miguel, com a sombra solta no chão.",
        "sceneAnchors": {
          "main": [
            63,
            19
          ],
          "extras": [
            [
              47,
              12
            ],
            [
              28,
              86
            ]
          ],
          "hidden": [
            80,
            74
          ]
        },
        "sceneMotion": {
          "profile": "nightstars"
        },
        "art": "scene-peter-pan-01",
        "position": [
          50,
          53
        ]
      },
      {
        "title": "A sombra encontra seus pés",
        "text": "— Espere um pouquinho — pediu Wendy.\nEla segurou a pontinha da sombra e a costurou aos pés de Peter com uma linha de faz de conta. A sombra se ajeitou, finalmente. Quando Peter levantou o braço, ela levantou também!\n— Você resolveu! Venha conhecer a Terra do Nunca. Lá moram meus amigos, os Meninos Perdidos.\nJoão ajeitou os óculos. Miguel abraçou seu ursinho.\n— Podemos ir juntos? — perguntou Wendy.\nPeter concordou. Sininho espalhou um brilho dourado, e o quarto começou a parecer uma página de sonho. A aventura acontecia no mundo da imaginação.",
        "object": "star",
        "prompt": "Faça a estrela brilhar",
        "reaction": "A sombra acompanha Peter outra vez.",
        "effect": "magic",
        "sceneAlt": "Wendy ajuda Peter a prender a sombra; os irmãos observam e Sininho espalha luz.",
        "sceneAnchors": {
          "main": [
            64,
            28
          ],
          "extras": [
            [
              48,
              79
            ],
            [
              39,
              67
            ]
          ],
          "hidden": [
            15,
            75
          ]
        },
        "sceneMotion": {
          "profile": "sparkles"
        },
        "art": "scene-peter-pan-02",
        "position": [
          50,
          53
        ]
      },
      {
        "title": "Um caminho entre as nuvens",
        "text": "No voo daquela história, o pó de fada brilhava como poeira de estrela. Peter seguia na frente. Wendy ia perto de João e Miguel, e Sininho fazia uma luzinha para ninguém se perder.\nA cidade ficou pequenininha sob as nuvens. Depois veio o mar, azul e imenso, com ilhas que pareciam folhas boiando.\nMiguel sentiu um friozinho na barriga.\n— Estou aqui — disse Wendy, segurando sua mão.\nEles passaram por uma nuvem macia. Do outro lado, apareceu uma ilha de árvores altas e praias claras. Peter abriu um sorriso: tinham chegado à Terra do Nunca.",
        "object": "wind",
        "prompt": "Acompanhe a nuvem",
        "reaction": "A ilha apareceu depois das nuvens!",
        "effect": "fly",
        "sceneAlt": "Os quatro voam juntos num céu de sonho em direção à ilha, guiados por Sininho.",
        "sceneAnchors": {
          "main": [
            75,
            66
          ],
          "extras": [
            [
              50,
              12
            ],
            [
              88,
              45
            ]
          ],
          "hidden": [
            12,
            77
          ]
        },
        "sceneMotion": {
          "profile": "clouds"
        },
        "art": "scene-peter-pan-03",
        "position": [
          50,
          53
        ]
      },
      {
        "title": "Os amigos da árvore",
        "text": "Na ilha, os Meninos Perdidos esperavam perto de uma árvore enorme. Eram crianças que moravam com Peter numa casa escondida entre as raízes. Ao ver os visitantes, correram para abrir a portinha.\n— Temos lugar para todo mundo!\nWendy contou uma história enquanto João e Miguel conheceram os brinquedos. Peter mostrou uma estrela de madeira que marcava o caminho de volta à praia.\nMas, longe dali, um navio se aproximava. Seu capitão era Gancho, um pirata que queria mandar na ilha. Ao ouvir as risadas, decidiu capturar os amigos de Peter e acabar com a brincadeira.",
        "object": "star",
        "prompt": "Toque na estrela de madeira",
        "reaction": "Ela marca o caminho até a praia.",
        "effect": "wiggle",
        "sceneAlt": "As crianças recebem Wendy e os irmãos na casa da árvore; um navio distante anuncia Gancho.",
        "sceneAnchors": {
          "main": [
            87,
            19
          ],
          "extras": [
            [
              48,
              12
            ],
            [
              60,
              10
            ]
          ],
          "hidden": [
            46,
            82
          ]
        },
        "sceneMotion": {
          "profile": "breeze"
        },
        "art": "scene-peter-pan-04",
        "position": [
          50,
          53
        ]
      },
      {
        "title": "O capitão se aproxima",
        "text": "Gancho chegou à praia com dois piratas e apontou para a casa escondida.\n— Vou levar essas crianças para meu navio. Peter terá de fazer o que eu mandar!\nEle usava um chapéu largo e tinha um gancho arredondado no lugar de uma das mãos. Falava bravo, mas parou ao ouvir um som: tic-tac, tic-tac.\nUm crocodilo nadava perto da areia. Tinha engolido um relógio, e o relógio continuava batendo dentro da barriga! Gancho temia aquele som. Mandou os piratas esperar, enquanto o crocodilo passava devagar. A demora deu tempo para Sininho avistar o navio.",
        "object": "drop",
        "prompt": "Observe a água",
        "reaction": "Tic-tac! Um crocodilo passa ao longe.",
        "effect": "splash",
        "sceneAlt": "Gancho e dois piratas na praia; o crocodilo nada distante e Sininho observa de cima.",
        "sceneAnchors": {
          "main": [
            82,
            56
          ],
          "extras": [
            [
              24,
              18
            ],
            [
              46,
              54
            ]
          ],
          "hidden": [
            15,
            78
          ]
        },
        "sceneMotion": {
          "profile": "water"
        },
        "art": "scene-peter-pan-05",
        "position": [
          50,
          53
        ]
      },
      {
        "title": "Uma porta fechada",
        "text": "Sininho voou até Peter, que buscava frutas na outra ponta da floresta.\n— Os piratas chegaram! Vamos avisar nossos amigos!\nEnquanto eles voltavam, Gancho cercou a casa. Os piratas levaram Wendy, João, Miguel e os Meninos Perdidos para o navio. Todos ficaram juntos numa pequena cabine, com a porta fechada por fora.\nMiguel começou a chorar. Wendy se sentou ao lado dele.\n— Vamos pedir ajuda. Ninguém vai ficar sozinho.\nJoão encontrou uma janelinha. Por ela, viu a luz de Sininho chegando. Bateu de leve no vidro. A fadinha ouviu e chamou Peter.",
        "object": "door",
        "prompt": "Toque na portinha",
        "reaction": "Os amigos estão juntos e a ajuda chegou.",
        "effect": "open",
        "sceneAlt": "Wendy acolhe Miguel na cabine com João e os Meninos Perdidos, enquanto Sininho surge à janela.",
        "sceneAnchors": {
          "main": [
            47,
            24
          ],
          "extras": [
            [
              72,
              12
            ],
            [
              64,
              86
            ]
          ],
          "hidden": [
            11,
            82
          ]
        },
        "sceneMotion": {
          "profile": "warm"
        },
        "art": "scene-peter-pan-06",
        "position": [
          50,
          53
        ]
      },
      {
        "title": "O plano de Peter",
        "text": "Peter se agachou atrás de um barril no convés. Sininho tinha visto uma chave pendurada no casaco de Gancho. Com ela, poderiam abrir a cabine.\n— Eu distraio o capitão — cochichou Peter. — Você leva a chave para Wendy.\nEntão apareceu junto ao mastro.\n— Deixe meus amigos irem embora, Gancho! Eles não querem ficar aqui.\n— Só quando você obedecer! — respondeu o capitão, caminhando até ele.\nPeter recuou para o outro lado do mastro, mantendo distância. Gancho o seguiu, tão ocupado em dar ordens que não percebeu Sininho descer bem pertinho de seu bolso.",
        "object": "wand",
        "prompt": "Siga a luz de Sininho",
        "reaction": "Ela procura a chave da cabine.",
        "effect": "magic",
        "sceneAlt": "Peter distrai Gancho junto ao mastro enquanto Sininho aproxima-se da chave.",
        "sceneAnchors": {
          "main": [
            52,
            43
          ],
          "extras": [
            [
              66,
              61
            ],
            [
              37,
              58
            ]
          ],
          "hidden": [
            15,
            75
          ]
        },
        "sceneMotion": {
          "profile": "breeze"
        },
        "art": "scene-peter-pan-07",
        "position": [
          50,
          53
        ]
      },
      {
        "title": "Uma chave pequenininha",
        "text": "Sininho puxou a chave com as duas mãos. Era pesada para uma fadinha! Ela bateu as asas depressa, atravessou o convés e alcançou a janelinha da cabine.\nJoão estendeu a mão e recebeu a chave. Wendy encontrou a fechadura pelo lado de dentro. Colocou a chave, girou devagar e ouviu: clique!\nA porta se abriu. Os Meninos Perdidos olharam para o corredor, mas Wendy pediu que esperassem.\n— Vamos juntos. João fica na frente, eu fico perto de Miguel.\nEles seguiram a luz de Sininho até o convés. Agora precisavam encontrar Peter e sair do navio antes que Gancho percebesse.",
        "object": "window",
        "prompt": "Procure a luz na janela",
        "reaction": "Sininho trouxe a chave para os amigos!",
        "effect": "magic",
        "sceneAlt": "João recebe de Sininho a chave pela janela; Wendy e os outros preparam a saída.",
        "sceneAnchors": {
          "main": [
            79,
            63
          ],
          "extras": [
            [
              75,
              39
            ],
            [
              85,
              27
            ]
          ],
          "hidden": [
            12,
            70
          ]
        },
        "sceneMotion": {
          "profile": "sparkles"
        },
        "art": "scene-peter-pan-08",
        "position": [
          50,
          53
        ]
      },
      {
        "title": "Tic-tac, bem pertinho",
        "text": "Gancho viu a porta aberta e ficou vermelho de raiva.\n— Voltem para a cabine!\nPeter correu para junto dos amigos. Wendy segurou Miguel, João chamou os Meninos Perdidos, e todos se reuniram perto da escada do convés.\nFoi então que o mar respondeu: tic-tac, tic-tac.\nO crocodilo estava passando ao lado do navio! Gancho reconheceu o som e esqueceu suas ordens. Pediu um bote do lado oposto ao crocodilo. Os piratas remariam até outra enseada, para longe do tic-tac.\nEnquanto o capitão olhava para a água, Sininho espalhou seu brilho sobre as crianças. Peter sabia o caminho.",
        "object": "drop",
        "prompt": "Faça a água brilhar",
        "reaction": "Tic-tac! Gancho vai embora em seu bote.",
        "effect": "splash",
        "sceneAlt": "Crianças reunidas junto a Peter e Sininho; Gancho prepara um bote ao ouvir o crocodilo.",
        "sceneAnchors": {
          "main": [
            82,
            46
          ],
          "extras": [
            [
              32,
              18
            ],
            [
              61,
              63
            ]
          ],
          "hidden": [
            15,
            77
          ]
        },
        "sceneMotion": {
          "profile": "water"
        },
        "art": "scene-peter-pan-09",
        "position": [
          50,
          53
        ]
      },
      {
        "title": "Longe do navio",
        "text": "Com a magia daquela aventura, os amigos levantaram voo e chegaram à praia. Um por um, pousaram na areia macia. Wendy contou as crianças: João, Miguel e todos os Meninos Perdidos estavam ali.\nLá no mar, o bote de Gancho seguiu com os piratas para outra enseada. O crocodilo seguiu por outro caminho, e seu tic-tac ficou baixinho. A ameaça tinha terminado.\nPeter soltou o ar e deu um sorriso aliviado.\n— Conseguimos juntos!\nMiguel encostou em Wendy.\n— Agora eu quero a mamãe.\nWendy também estava com saudade. Contou a Peter que os três irmãos precisavam voltar para o próprio quarto.",
        "object": "heart",
        "prompt": "Toque no coração",
        "reaction": "Todos chegaram à praia. Agora vem a volta para casa.",
        "effect": "hearts",
        "sceneAlt": "Grupo reunido em segurança na areia, navio e bote afastados, Wendy acolhe Miguel.",
        "sceneAnchors": {
          "main": [
            80,
            78
          ],
          "extras": [
            [
              58,
              10
            ],
            [
              88,
              39
            ]
          ],
          "hidden": [
            18,
            82
          ]
        },
        "sceneMotion": {
          "profile": "warm"
        },
        "art": "scene-peter-pan-10",
        "position": [
          50,
          53
        ]
      },
      {
        "title": "A promessa de voltar",
        "text": "Os Meninos Perdidos acompanharam os irmãos até a estrela de madeira, perto da árvore. Tinham gostado da história de Wendy e queriam ouvir muitas outras.\n— Conto mais quando vier visitar — prometeu ela.\nPeter abraçou seus amigos. Eles ficariam na casa entre as raízes, juntos, enquanto ele e Sininho levavam os visitantes de volta. Já preparavam um lanche e uma roda de histórias para quando Peter retornasse.\nJoão acenou. Miguel mandou um beijo.\nO brilho de fada apareceu novamente. Os três irmãos seguiram Peter pelo céu de sonho, com o coração contente e uma saudade boa da mamãe.",
        "object": "star",
        "prompt": "Acenda a estrela do caminho",
        "reaction": "Peter acompanha os irmãos até em casa.",
        "effect": "magic",
        "sceneAlt": "Despedida carinhosa dos Meninos Perdidos junto à árvore e à estrela de madeira.",
        "sceneAnchors": {
          "main": [
            40,
            27
          ],
          "extras": [
            [
              92,
              12
            ],
            [
              80,
              16
            ]
          ],
          "hidden": [
            38,
            82
          ]
        },
        "sceneMotion": {
          "profile": "nightstars"
        },
        "art": "scene-peter-pan-11",
        "position": [
          50,
          53
        ]
      },
      {
        "title": "O abraço que esperava",
        "text": "O quarto estava quentinho quando Wendy, João e Miguel chegaram. Mamãe esperava perto das camas. Abriu os braços, e os três correram para aquele abraço conhecido.\n— Voltamos! — disse Wendy, contando da ilha, dos amigos e da chave.\nPeter sorriu da janela. Prometeu levar notícias dos Meninos Perdidos e voltou com Sininho para cuidar da casa na árvore.\nMamãe ajeitou os cobertores. João guardou os óculos, Miguel deitou com seu ursinho, e Wendy fechou os olhos.\nA aventura havia encontrado um final: os amigos seguros, o pirata longe e cada irmão em sua caminha, pertinho da mamãe.",
        "object": "book",
        "prompt": "Feche o livro com carinho",
        "reaction": "A aventura terminou num abraço da mamãe.",
        "effect": "open",
        "sceneAlt": "Mamãe abraça os três filhos no quarto; Peter e Sininho despedem-se na janela.",
        "sceneAnchors": {
          "main": [
            62,
            64
          ],
          "extras": [
            [
              31,
              46
            ],
            [
              45,
              11
            ]
          ],
          "hidden": [
            86,
            77
          ]
        },
        "sceneMotion": {
          "profile": "warm"
        },
        "art": "scene-peter-pan-12",
        "position": [
          50,
          53
        ]
      }
    ]
  },
  {
    "id": "pequena-sereia",
    "title": "A Pequena Sereia",
    "short": "Pequena Sereia",
    "theme": "ocean",
    "color": "#69aebc",
    "category": "Um pouco de magia",
    "description": "Marina conhece a terra, enfrenta uma promessa enganadora e encontra o caminho de volta com sua voz e sua família.",
    "dedication": "Para Manu, que tem tantas histórias bonitas para contar.",
    "cover": "scene-pequena-sereia-01.webp",
    "pages": [
      {
        "title": "Um palácio de conchas",
        "text": "Lá no fundo do mar, onde a água parecia um céu azul, vivia a pequena sereia Marina. Seu pai era o rei daquele lugar, e sua avó conhecia histórias de muitos mares. Marina adorava cantar entre os jardins de coral. Mas, quando a avó contava sobre árvores, sinos e pássaros, ela escutava bem quietinha.\n— Quero conhecer a terra!\nA avó sorriu e lhe deu uma conchinha branca.\n— Se precisar de mim, bata nela três vezes perto da praia.\nMarina guardou a concha. No dia seguinte, faria seu primeiro passeio até a superfície.",
        "object": "castle",
        "prompt": "Toque no palácio de conchas.",
        "reaction": "O palácio brilha no fundo do mar!",
        "effect": "glow",
        "sceneAlt": "Marina, seu pai rei e sua avó no jardim do palácio de conchas; a avó entrega uma conchinha branca.",
        "sceneAnchors": {
          "main": [
            68,
            22
          ],
          "extras": [
            [
              12,
              75
            ],
            [
              85,
              60
            ]
          ],
          "hidden": [
            88,
            80
          ]
        },
        "sceneMotion": {
          "profile": "water"
        },
        "art": "scene-pequena-sereia-01",
        "position": [
          19,
          82
        ],
        "hidden": "fish",
        "surpriseLabel": "Descubra o peixinho escondido entre as plantas",
        "extras": [
          {
            "object": "drop",
            "name": "Faça bolhinhas",
            "reaction": "Blub, blub! As bolhinhas sobem.",
            "effect": "fly",
            "position": [
              20,
              30
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luz do mar",
            "reaction": "Uma luzinha brilhou no mar!",
            "effect": "magic",
            "position": [
              80,
              24
            ]
          }
        ]
      },
      {
        "title": "Luzes sobre as ondas",
        "text": "Marina subiu devagar, seguindo as bolhinhas. Quando pôs a cabeça para fora, sentiu o vento fazer cócegas em seu nariz. Perto dali, um navio brilhava com lanternas. No convés, um príncipe de cabelos castanhos ria com os marinheiros. Havia música, pão quentinho e bandeirinhas coloridas.\nMarina ficou atrás de uma pedra, ouvindo aquela festa tão diferente das festas do mar. Queria perguntar o nome de cada coisa.\nEntão o vento mudou. Uma bandeira bateu com força, e o céu ganhou nuvens escuras. Os marinheiros começaram a recolher as velas.",
        "object": "star",
        "prompt": "Toque na luz do navio.",
        "reaction": "As lanternas dançam sobre a água!",
        "effect": "glow",
        "sceneAlt": "Marina observa de trás de uma pedra um navio com lanternas e um príncipe no convés.",
        "sceneAnchors": {
          "main": [
            87,
            27
          ],
          "extras": [
            [
              80,
              82
            ],
            [
              45,
              14
            ]
          ],
          "hidden": [
            12,
            80
          ]
        },
        "sceneMotion": {
          "profile": "nightstars"
        },
        "art": "scene-pequena-sereia-02",
        "position": [
          79,
          82
        ],
        "hidden": "fish",
        "surpriseLabel": "Descubra o peixinho escondido entre as plantas",
        "extras": [
          {
            "object": "drop",
            "name": "Toque na gotinha do mar",
            "reaction": "Plic! Uma gotinha do mar brilhou.",
            "effect": "magic",
            "position": [
              20,
              30
            ]
          },
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              80,
              24
            ]
          }
        ]
      },
      {
        "title": "Uma ajuda no mar",
        "text": "O navio balançou: de um lado, do outro. Uma onda grande molhou o convés, e o príncipe escorregou para a água. Marina sentiu um susto, mas viu uma tábua boiando bem perto dele. Nadou depressa e empurrou a tábua até suas mãos.\n— Segure firme! Eu conheço o caminho!\nCom a força da cauda, ela o levou até uma praia protegida. O príncipe estava cansado. Marina cantou baixinho enquanto esperavam ajuda.\nQuando dois marinheiros chegaram correndo, ela voltou ao mar. Da água, viu o príncipe levantar a mão. Ele estava seguro.",
        "object": "drop",
        "prompt": "Toque na onda da praia.",
        "reaction": "A onda chega mansinha à areia.",
        "effect": "splash",
        "sceneAlt": "Marina ajuda o príncipe a segurar uma tábua na água e o conduz à praia protegida.",
        "sceneAnchors": {
          "main": [
            82,
            66
          ],
          "extras": [
            [
              19,
              33
            ],
            [
              60,
              12
            ]
          ],
          "hidden": [
            12,
            80
          ]
        },
        "sceneMotion": {
          "profile": "water"
        },
        "art": "scene-pequena-sereia-03",
        "position": [
          19,
          82
        ],
        "hidden": "fish",
        "surpriseLabel": "Descubra o peixinho escondido entre as plantas",
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              20,
              30
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luz do mar",
            "reaction": "Uma luzinha brilhou no mar!",
            "effect": "magic",
            "position": [
              80,
              24
            ]
          }
        ]
      },
      {
        "title": "Uma promessa apressada",
        "text": "Em casa, Marina contou tudo ao pai e à avó. Eles a abraçaram, felizes porque ela e o príncipe estavam bem.\nMesmo assim, Marina pensava na praia. Queria caminhar entre as árvores e contar ao príncipe quem o havia ajudado. Numa tarde, ouviu uma voz atrás dos corais:\n— Posso lhe dar pernas.\nEra a bruxa do mar, com seu manto violeta.\n— Mas preciso da sua voz para guardar numa concha.\nMarina hesitou.\n— Vou ficar sem cantar?\n— Só por um passeio. Vai ser fácil — respondeu a bruxa, escondendo os nós de um cordão.",
        "object": "door",
        "prompt": "Toque na entrada entre os corais.",
        "reaction": "Uma passagem aparece entre os corais.",
        "effect": "open",
        "sceneAlt": "A bruxa marinha de manto violeta oferece a Marina uma concha dourada e esconde um cordão atrás dela.",
        "sceneAnchors": {
          "main": [
            88,
            27
          ],
          "extras": [
            [
              18,
              18
            ],
            [
              68,
              80
            ]
          ],
          "hidden": [
            12,
            80
          ]
        },
        "sceneMotion": {
          "profile": "water"
        },
        "art": "scene-pequena-sereia-04",
        "position": [
          79,
          82
        ],
        "hidden": "fish",
        "surpriseLabel": "Descubra o peixinho escondido entre as plantas",
        "extras": [
          {
            "object": "drop",
            "name": "Faça bolhinhas",
            "reaction": "Blub, blub! As bolhinhas sobem.",
            "effect": "fly",
            "position": [
              20,
              30
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luz do mar",
            "reaction": "Uma luzinha brilhou no mar!",
            "effect": "magic",
            "position": [
              80,
              24
            ]
          }
        ]
      },
      {
        "title": "A voz na concha",
        "text": "A bruxa mostrou uma poção azul e uma concha dourada.\n— Amanhã, antes de o sol se esconder, você poderá devolver as pernas e voltar a ser sereia.\nMarina aceitou, pensando que logo estaria em casa. Cantou uma nota, e sua voz entrou na concha como uma luz pequenina. A bruxa fechou a tampa e apertou três nós no cordão.\nSó então Marina tentou perguntar como desfazer o acordo. Nenhum som saiu.\nA bruxa escondeu a concha no manto.\n— Primeiro, seu passeio!\nMarina segurou a poção. O silêncio já parecia bem maior do que ela imaginara.",
        "object": "wand",
        "prompt": "Toque no brilho da concha.",
        "reaction": "Uma luz pequenina brilha na concha.",
        "effect": "magic",
        "sceneAlt": "Uma nota luminosa sai da boca de Marina e entra na concha dourada segurada pela bruxa.",
        "sceneAnchors": {
          "main": [
            87,
            73
          ],
          "extras": [
            [
              42,
              58
            ],
            [
              50,
              18
            ]
          ],
          "hidden": [
            44,
            82
          ]
        },
        "sceneMotion": {
          "profile": "sparkles"
        },
        "art": "scene-pequena-sereia-05",
        "position": [
          19,
          82
        ],
        "hidden": "fish",
        "surpriseLabel": "Descubra o peixinho escondido entre as plantas",
        "extras": [
          {
            "object": "drop",
            "name": "Faça bolhinhas",
            "reaction": "Blub, blub! As bolhinhas sobem.",
            "effect": "fly",
            "position": [
              20,
              30
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luz do mar",
            "reaction": "Uma luzinha brilhou no mar!",
            "effect": "magic",
            "position": [
              80,
              24
            ]
          }
        ]
      },
      {
        "title": "Os primeiros passos",
        "text": "Na beirinha da praia, Marina tomou a poção. Sentiu um formigamento percorrer a cauda. Ela virou duas pernas com pés pequeninos, e a magia lhe deu um vestido azul-claro. Ela tentou levantar, mas suas pernas ainda não sabiam o caminho.\nO príncipe chegou com uma manta de linho.\n— Você precisa de ajuda?\nMarina assentiu. Ele lhe ofereceu o braço, sem puxar nem apressar. Primeiro veio um passinho. Depois, outro. A areia era macia e quentinha.\nMarina quis rir bem alto. Seu rosto sorriu, mas sua voz continuava guardada longe dali.",
        "object": "sun",
        "prompt": "Toque no sol da praia.",
        "reaction": "O sol aquece a areia dos primeiros passos.",
        "effect": "glow",
        "sceneAlt": "Marina, agora com pernas e vestido turquesa claro, dá um primeiro passo com o apoio do príncipe na praia.",
        "sceneAnchors": {
          "main": [
            18,
            30
          ],
          "extras": [
            [
              13,
              60
            ],
            [
              88,
              75
            ]
          ],
          "hidden": [
            12,
            80
          ]
        },
        "sceneMotion": {
          "profile": "warm"
        },
        "art": "scene-pequena-sereia-06",
        "position": [
          79,
          82
        ],
        "hidden": "fish",
        "surpriseLabel": "Descubra o peixinho escondido entre as plantas",
        "extras": [
          {
            "object": "drop",
            "name": "Toque na gotinha do mar",
            "reaction": "Plic! Uma gotinha do mar brilhou.",
            "effect": "magic",
            "position": [
              20,
              30
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luz do mar",
            "reaction": "Uma luzinha brilhou no mar!",
            "effect": "magic",
            "position": [
              80,
              24
            ]
          }
        ]
      },
      {
        "title": "Coisas para contar",
        "text": "O príncipe levou Marina ao jardim do castelo. Ela cheirou uma flor, tocou a casca de uma árvore e ficou olhando um passarinho pular no galho. Quanta coisa nova!\nNa hora do lanche, quis pedir água. Apontou para um copo, mas o príncipe trouxe pão. Marina balançou a cabeça e tentou de novo. Dessa vez, ele entendeu.\n— Água! Já vou buscar.\nEla agradeceu com um sorriso. Ainda queria contar sobre o resgate e sobre sua casa. Tinha tantas palavras por dentro! Quando ouviu música no jardim, sentiu muita falta de cantar.",
        "object": "bird",
        "prompt": "Toque no passarinho do jardim.",
        "reaction": "O passarinho canta entre os galhos.",
        "effect": "fly",
        "sceneAlt": "Marina aponta para um copo no jardim do castelo; o príncipe escuta com atenção, e um passarinho canta numa árvore.",
        "sceneAnchors": {
          "main": [
            24,
            30
          ],
          "extras": [
            [
              14,
              50
            ],
            [
              88,
              27
            ]
          ],
          "hidden": [
            88,
            80
          ]
        },
        "sceneMotion": {
          "profile": "breeze"
        },
        "art": "scene-pequena-sereia-07",
        "position": [
          19,
          82
        ],
        "hidden": "fish",
        "surpriseLabel": "Descubra o peixinho escondido entre as plantas",
        "extras": [
          {
            "object": "drop",
            "name": "Toque na gotinha da fonte",
            "reaction": "Plic! A fonte espirrou uma gotinha.",
            "effect": "magic",
            "position": [
              20,
              30
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luz do mar",
            "reaction": "Uma luzinha brilhou no mar!",
            "effect": "magic",
            "position": [
              80,
              24
            ]
          }
        ]
      },
      {
        "title": "Um recado na areia",
        "text": "Ao entardecer, Marina voltou à praia com o príncipe. Sentou perto da água e desenhou na areia: uma sereia, um navio e uma tábua.\nO príncipe olhou os desenhos e depois olhou para ela.\n— Foi você que me ajudou!\nMarina assentiu, emocionada. Então desenhou outra sereia, com cabelos compridos, e um palácio. Apontou para o mar e levou a mão ao coração.\n— Sua família mora lá? Você quer voltar?\nEla assentiu outra vez. Tirou a conchinha branca do bolso e bateu nela três vezes: toc, toc, toc. Ficaram esperando juntos à beira da água.",
        "object": "heart",
        "prompt": "Toque no coração perto do mar.",
        "reaction": "Um carinho atravessa a praia e o mar.",
        "effect": "hearts",
        "sceneAlt": "Marina desenha uma sereia e um navio na areia, mostrando ao príncipe, com a conchinha branca na mão.",
        "sceneAnchors": {
          "main": [
            84,
            76
          ],
          "extras": [
            [
              17,
              39
            ],
            [
              86,
              19
            ]
          ],
          "hidden": [
            12,
            80
          ]
        },
        "sceneMotion": {
          "profile": "water"
        },
        "art": "scene-pequena-sereia-08",
        "position": [
          79,
          82
        ],
        "hidden": "fish",
        "surpriseLabel": "Descubra o peixinho escondido entre as plantas",
        "extras": [
          {
            "object": "drop",
            "name": "Toque na gotinha do mar",
            "reaction": "Plic! Uma gotinha do mar brilhou.",
            "effect": "magic",
            "position": [
              20,
              30
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luz do mar",
            "reaction": "Uma luzinha brilhou no mar!",
            "effect": "magic",
            "position": [
              80,
              24
            ]
          }
        ]
      },
      {
        "title": "A avó conhece os nós",
        "text": "A avó apareceu entre as ondas. Marina correu até a beirinha, e as duas se abraçaram. Com desenhos e gestos, contou o que tinha acontecido.\nA avó viu a marca azul da poção no copinho que Marina guardara.\n— Conheço esse feitiço. Para voltar, precisamos abrir os três nós da concha onde está sua voz. Antes do pôr do sol de amanhã.\nMarina respirou mais tranquila. Não precisaria resolver tudo sozinha.\nA avó chamou o pai para perto da praia. O príncipe ficou com Marina, e a avó mandou chamar a bruxa para um encontro na praia ao amanhecer. Marina descansou abrigada, perto dos amigos.",
        "object": "book",
        "prompt": "Toque no livro dos feitiços.",
        "reaction": "A história antiga mostra três nós para abrir.",
        "effect": "open",
        "sceneAlt": "A avó abraça Marina à beira da água enquanto o príncipe observa e o pai rei se aproxima entre as ondas.",
        "sceneAnchors": {
          "main": [
            82,
            77
          ],
          "extras": [
            [
              12,
              45
            ],
            [
              85,
              18
            ]
          ],
          "hidden": [
            12,
            80
          ]
        },
        "sceneMotion": {
          "profile": "water"
        },
        "art": "scene-pequena-sereia-09",
        "position": [
          19,
          82
        ],
        "hidden": "fish",
        "surpriseLabel": "Descubra o peixinho escondido entre as plantas",
        "extras": [
          {
            "object": "drop",
            "name": "Toque na gotinha do mar",
            "reaction": "Plic! Uma gotinha do mar brilhou.",
            "effect": "magic",
            "position": [
              20,
              30
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luz do mar",
            "reaction": "Uma luzinha brilhou no mar!",
            "effect": "magic",
            "position": [
              80,
              24
            ]
          }
        ]
      },
      {
        "title": "Marina escolhe voltar",
        "text": "Atendendo ao chamado, a bruxa apareceu numa pedra perto da praia, trazendo a concha dourada.\n— Quer a voz? Então me dê a coroa do seu pai!\nMarina apertou as mãos. Aquilo não fazia parte do acordo. A avó respondeu:\n— Você prometeu que ela poderia devolver as pernas. Mostre a concha.\nA bruxa mostrou a concha, esperando receber a coroa. Marina viu o cordão e pegou a pontinha.\n— Devolva! — reclamou a bruxa, tentando alcançá-la.\nO pai e a avó ficaram na frente.\n— A voz é de Marina. Você vai cumprir a promessa.\nO príncipe aproximou uma lanterna. Protegida pelos amigos, Marina segurou a concha e começou a soltar os nós.",
        "object": "star",
        "prompt": "Toque na lanterna dos amigos.",
        "reaction": "A luz ajuda Marina a enxergar o cordão.",
        "effect": "glow",
        "sceneAlt": "Marina segura a concha dourada diante da bruxa; o príncipe ilumina o cordão, e pai e avó acompanham da água.",
        "sceneAnchors": {
          "main": [
            56,
            80
          ],
          "extras": [
            [
              40,
              87
            ],
            [
              90,
              10
            ]
          ],
          "hidden": [
            12,
            80
          ]
        },
        "sceneMotion": {
          "profile": "warm"
        },
        "art": "scene-pequena-sereia-10",
        "position": [
          79,
          82
        ],
        "hidden": "fish",
        "surpriseLabel": "Descubra o peixinho escondido entre as plantas",
        "extras": [
          {
            "object": "drop",
            "name": "Toque na gotinha do mar",
            "reaction": "Plic! Uma gotinha do mar brilhou.",
            "effect": "magic",
            "position": [
              20,
              30
            ]
          },
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              80,
              24
            ]
          }
        ]
      },
      {
        "title": "O canto volta ao mar",
        "text": "O primeiro nó estava apertado. Marina tentou, parou e tentou de novo. A avó mostrou a pontinha certa. O segundo cedeu devagar. No terceiro, Marina quase desistiu, mas o príncipe segurou a concha para ela usar as duas mãos.\nPuxou com cuidado. Pronto!\nA tampa se abriu, e a luz voltou para sua boca.\n— Eu quero minha voz e minha cauda! — disse Marina.\nA água brilhou em volta de seus pés. As pernas viraram uma cauda turquesa, e ela nadou até o abraço do pai. A bruxa recolheu o manto e foi embora, sem levar voz nem coroa.",
        "object": "drop",
        "prompt": "Toque na água brilhante.",
        "reaction": "A cauda turquesa volta numa dança de bolhinhas!",
        "effect": "splash",
        "sceneAlt": "Marina, novamente sereia com cauda turquesa, canta na água e é acolhida pelo pai e pela avó; a concha está aberta.",
        "sceneAnchors": {
          "main": [
            47,
            80
          ],
          "extras": [
            [
              45,
              18
            ],
            [
              64,
              13
            ]
          ],
          "hidden": [
            64,
            82
          ]
        },
        "sceneMotion": {
          "profile": "sparkles"
        },
        "art": "scene-pequena-sereia-11",
        "position": [
          19,
          82
        ],
        "hidden": "fish",
        "surpriseLabel": "Descubra o peixinho escondido entre as plantas",
        "extras": [
          {
            "object": "bird",
            "name": "Chame o passarinho",
            "reaction": "Piu, piu! O passarinho respondeu.",
            "effect": "fly",
            "position": [
              20,
              30
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luz do mar",
            "reaction": "Uma luzinha brilhou no mar!",
            "effect": "magic",
            "position": [
              80,
              24
            ]
          }
        ]
      },
      {
        "title": "Dois mundos, um abraço",
        "text": "Naquela noite, o palácio do mar recebeu Marina com um abraço demorado. Ela contou tudo, sem precisar desenhar. Depois cantou uma canção para a avó, e o pai acompanhou batendo palmas devagar.\nMarina ainda queria conhecer árvores e ouvir sinos. Agora faria passeios pela costa com sua família, sem entregar sua voz.\nAlguns dias depois, o príncipe levou flores à praia. Marina apareceu entre as ondas, com o pai e a avó. Eles conversaram, riram e dividiram histórias até o céu ficar cor-de-rosa.\nQuando voltou para casa, Marina ia cantando. Sua voz, seu sonho e sua família viajavam juntos.",
        "object": "flower",
        "prompt": "Toque nas flores da praia.",
        "reaction": "Flores e ondas celebram esse encontro.",
        "effect": "bloom",
        "sceneAlt": "Marina, pai e avó conversam do mar com o príncipe na praia, que traz flores, sob um céu cor-de-rosa.",
        "sceneAnchors": {
          "main": [
            55,
            80
          ],
          "extras": [
            [
              38,
              20
            ],
            [
              87,
              22
            ]
          ],
          "hidden": [
            12,
            80
          ]
        },
        "sceneMotion": {
          "profile": "warm"
        },
        "art": "scene-pequena-sereia-12",
        "position": [
          79,
          82
        ],
        "hidden": "fish",
        "surpriseLabel": "Descubra o peixinho escondido entre as plantas",
        "extras": [
          {
            "object": "drop",
            "name": "Toque na gotinha do mar",
            "reaction": "Plic! Uma gotinha do mar brilhou.",
            "effect": "magic",
            "position": [
              20,
              30
            ]
          },
          {
            "object": "star",
            "name": "Acenda uma luz do mar",
            "reaction": "Uma luzinha brilhou no mar!",
            "effect": "magic",
            "position": [
              80,
              24
            ]
          }
        ]
      }
    ]
  }
];
