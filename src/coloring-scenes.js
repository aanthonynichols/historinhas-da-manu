// Each sheet has its own complete paintable setting. Geometry uses the shared 120×120 space.
export const coloringScenes = {
  "borboleta": {
    "id": "borboleta",
    "label": "Jardim da borboleta",
    "hint": "Pinte a borboleta, o sol e as flores.",
    "kind": "garden",
    "frame": {
      "x": 22,
      "y": 31,
      "width": 78,
      "height": 78
    },
    "parts": [
      {
        "id": "sol",
        "name": "Sol",
        "path": "M26 18A9 9 0 1 1 8 18A9 9 0 1 1 26 18Z",
        "details": "M28 18L30 18 M24.78 25.78L26.19 27.19 M17 29L17 31 M9.22 25.78L7.81 27.19 M6 18L4 18 M9.22 10.22L7.81 8.81 M17 7L17 5 M24.78 10.22L26.19 8.81",
        "pivot": [
          17,
          18
        ],
        "motion": "sun",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 4,
          "y": 5,
          "width": 26,
          "height": 26
        }
      },
      {
        "id": "nuvem",
        "name": "Nuvem fofinha",
        "path": "M85 28C80 28 81 18 88 18C86 9 100 8 102 17C111 14 116 28 109 28Z",
        "details": "",
        "pivot": [
          97.5,
          19.5
        ],
        "motion": "cloud",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 81,
          "y": 10,
          "width": 33,
          "height": 19
        }
      },
      {
        "id": "flor-esquerda",
        "name": "Flor do jardim",
        "path": "M13 99.8H15V107.8H13ZM14 103.8Q6.8 95.8 6.8 103.0Q11.6 107 14 103.8ZM16.4 95.16Q14 105.8 11.6 95.16Q1.18 98.4 9.2 91Q1.18 83.6 11.6 86.84Q14 76.2 16.4 86.84Q26.82 83.6 18.8 91Q26.82 98.4 16.4 95.16Z",
        "details": "M17.04 91A3.04 3.04 0 1 1 10.96 91A3.04 3.04 0 1 1 17.04 91Z",
        "pivot": [
          14,
          107.8
        ],
        "motion": "flower",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 4.4,
          "y": 81.4,
          "width": 19.2,
          "height": 26.4
        }
      },
      {
        "id": "flor-direita",
        "name": "Flor do jardim",
        "path": "M105 97.9H107V106.9H105ZM106 102.4Q97.9 93.4 97.9 101.5Q103.3 106 106 102.4ZM108.7 92.68Q106 104.65 103.3 92.68Q91.58 96.33 100.6 88Q91.58 79.67 103.3 83.32Q106 71.35 108.7 83.32Q120.42 79.67 111.4 88Q120.42 96.33 108.7 92.68Z",
        "details": "M109.42 88A3.42 3.42 0 1 1 102.58 88A3.42 3.42 0 1 1 109.42 88Z",
        "pivot": [
          106,
          106.9
        ],
        "motion": "flower",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 95.2,
          "y": 77.2,
          "width": 21.599999999999998,
          "height": 29.7
        }
      },
      {
        "id": "arbusto",
        "name": "Arbusto",
        "path": "M99.5 109.5C92 104 101.75 99 107 103.55C111.5 99 122 104 114.5 109.5Z",
        "details": "",
        "pivot": [
          107,
          109.5
        ],
        "motion": "sway",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 95.75,
          "y": 100.4,
          "width": 22.5,
          "height": 9.799999999999999
        }
      },
      {
        "id": "chao",
        "name": "Grama",
        "path": "M0 113Q7 110 14 113C14 110 12 107 11 105C17 106 18 109 18 112C18 108 20 105 22 103C23 107 22 110 21 113C24 110 26 108 29 108C28 112 26 114 25 115Q39 111 49 113C49 110 47 107 46 105C52 106 53 109 53 112C53 108 55 105 57 103C58 107 57 110 56 113C59 110 61 108 64 108C63 112 61 114 60 115Q77 111 87 113C87 110 85 107 84 105C90 106 91 109 91 112C91 108 93 105 95 103C96 107 95 110 94 113C97 110 99 108 102 108C101 112 99 114 98 115Q110 110 120 113V120H0Z",
        "details": "M7 117L9 115M37 118L39 115M74 117L76 114M110 118L112 115",
        "pivot": [
          60,
          116
        ],
        "motion": "grass",
        "fill": "#fffefa",
        "foreground": true,
        "bounds": {
          "x": 0,
          "y": 103,
          "width": 120,
          "height": 17
        }
      }
    ]
  },
  "bola": {
    "id": "bola",
    "label": "Um dia de brincar",
    "hint": "Pinte a bola e o parquinho ensolarado.",
    "kind": "playground",
    "frame": {
      "x": 22,
      "y": 31,
      "width": 78,
      "height": 78
    },
    "parts": [
      {
        "id": "sol",
        "name": "Sol",
        "path": "M26 18A9 9 0 1 1 8 18A9 9 0 1 1 26 18Z",
        "details": "M28 18L30 18 M24.78 25.78L26.19 27.19 M17 29L17 31 M9.22 25.78L7.81 27.19 M6 18L4 18 M9.22 10.22L7.81 8.81 M17 7L17 5 M24.78 10.22L26.19 8.81",
        "pivot": [
          17,
          18
        ],
        "motion": "sun",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 4,
          "y": 5,
          "width": 26,
          "height": 26
        }
      },
      {
        "id": "nuvem",
        "name": "Nuvem fofinha",
        "path": "M85 28C80 28 81 18 88 18C86 9 100 8 102 17C111 14 116 28 109 28Z",
        "details": "",
        "pivot": [
          97.5,
          19.5
        ],
        "motion": "cloud",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 81,
          "y": 10,
          "width": 33,
          "height": 19
        }
      },
      {
        "id": "arvore",
        "name": "Árvore",
        "path": "M101 74H105V101H101ZM103 36C83 36 84 65 94 64C91 80 115 80 112 64C122 65 123 36 103 36Z",
        "details": "M103 76V94M103 84l-5 -5",
        "pivot": [
          103,
          101
        ],
        "motion": "sway",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 86,
          "y": 36,
          "width": 34,
          "height": 65
        }
      },
      {
        "id": "bloquinhos",
        "name": "Bloquinhos de brincar",
        "path": "M4 87H15V98H4ZM15 91H25V102H15ZM8 76H19V87H8Z",
        "details": "M7 90l3 5l3 -5M18 94h4M12 79v5",
        "pivot": [
          13,
          100
        ],
        "motion": "bob",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 4,
          "y": 76,
          "width": 21,
          "height": 26
        }
      },
      {
        "id": "chao",
        "name": "Grama",
        "path": "M0 113Q7 110 14 113C14 110 12 107 11 105C17 106 18 109 18 112C18 108 20 105 22 103C23 107 22 110 21 113C24 110 26 108 29 108C28 112 26 114 25 115Q39 111 49 113C49 110 47 107 46 105C52 106 53 109 53 112C53 108 55 105 57 103C58 107 57 110 56 113C59 110 61 108 64 108C63 112 61 114 60 115Q77 111 87 113C87 110 85 107 84 105C90 106 91 109 91 112C91 108 93 105 95 103C96 107 95 110 94 113C97 110 99 108 102 108C101 112 99 114 98 115Q110 110 120 113V120H0Z",
        "details": "M7 117L9 115M37 118L39 115M74 117L76 114M110 118L112 115",
        "pivot": [
          60,
          116
        ],
        "motion": "still",
        "fill": "#fffefa",
        "foreground": true,
        "bounds": {
          "x": 0,
          "y": 103,
          "width": 120,
          "height": 17
        }
      }
    ]
  },
  "flor": {
    "id": "flor",
    "label": "A flor do nosso jardim",
    "hint": "Pinte sua flor, a nuvem e o regador.",
    "kind": "garden",
    "frame": {
      "x": 25,
      "y": 29,
      "width": 72,
      "height": 81
    },
    "parts": [
      {
        "id": "sol",
        "name": "Sol",
        "path": "M26 18A9 9 0 1 1 8 18A9 9 0 1 1 26 18Z",
        "details": "M28 18L30 18 M24.78 25.78L26.19 27.19 M17 29L17 31 M9.22 25.78L7.81 27.19 M6 18L4 18 M9.22 10.22L7.81 8.81 M17 7L17 5 M24.78 10.22L26.19 8.81",
        "pivot": [
          17,
          18
        ],
        "motion": "sun",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 4,
          "y": 5,
          "width": 26,
          "height": 26
        }
      },
      {
        "id": "nuvem",
        "name": "Nuvem fofinha",
        "path": "M85 28C80 28 81 18 88 18C86 9 100 8 102 17C111 14 116 28 109 28Z",
        "details": "",
        "pivot": [
          97.5,
          19.5
        ],
        "motion": "cloud",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 81,
          "y": 10,
          "width": 33,
          "height": 19
        }
      },
      {
        "id": "regador",
        "name": "Regador",
        "path": "M4 89H22L23 104H5ZM22 91Q35 87 35 97Q34 103 24 101ZM5 94L1 86L4 83L12 94Z",
        "details": "M7 89Q7 82 18 85M8 98h9",
        "pivot": [
          16,
          104
        ],
        "motion": "bob",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 1,
          "y": 83,
          "width": 34,
          "height": 21
        }
      },
      {
        "id": "florzinha",
        "name": "Flor do jardim",
        "path": "M104 102.7H106V109.7H104ZM105 106.2Q98.7 99.2 98.7 105.5Q102.9 109 105 106.2ZM107.1 98.64Q105 107.95 102.9 98.64Q93.78 101.48 100.8 95Q93.78 88.53 102.9 91.36Q105 82.05 107.1 91.36Q116.22 88.52 109.2 95Q116.22 101.47 107.1 98.64Z",
        "details": "M107.66 95A2.66 2.66 0 1 1 102.34 95A2.66 2.66 0 1 1 107.66 95Z",
        "pivot": [
          105,
          109.7
        ],
        "motion": "flower",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 96.6,
          "y": 86.6,
          "width": 16.8,
          "height": 23.099999999999998
        }
      },
      {
        "id": "chao",
        "name": "Grama",
        "path": "M0 113Q7 110 14 113C14 110 12 107 11 105C17 106 18 109 18 112C18 108 20 105 22 103C23 107 22 110 21 113C24 110 26 108 29 108C28 112 26 114 25 115Q39 111 49 113C49 110 47 107 46 105C52 106 53 109 53 112C53 108 55 105 57 103C58 107 57 110 56 113C59 110 61 108 64 108C63 112 61 114 60 115Q77 111 87 113C87 110 85 107 84 105C90 106 91 109 91 112C91 108 93 105 95 103C96 107 95 110 94 113C97 110 99 108 102 108C101 112 99 114 98 115Q110 110 120 113V120H0Z",
        "details": "M7 117L9 115M37 118L39 115M74 117L76 114M110 118L112 115",
        "pivot": [
          60,
          116
        ],
        "motion": "grass",
        "fill": "#fffefa",
        "foreground": true,
        "bounds": {
          "x": 0,
          "y": 103,
          "width": 120,
          "height": 17
        }
      }
    ]
  },
  "estrela": {
    "id": "estrela",
    "label": "Um céu de sonhos",
    "hint": "Pinte a estrela, a lua e as nuvens.",
    "kind": "night",
    "frame": {
      "x": 22,
      "y": 31,
      "width": 78,
      "height": 78
    },
    "parts": [
      {
        "id": "lua",
        "name": "Lua",
        "path": "M24 11A12 12 0 1 0 27 33Q11.6 24 24 11Z",
        "details": "",
        "pivot": [
          20,
          23
        ],
        "motion": "glow",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 8,
          "y": 11,
          "width": 24,
          "height": 24
        }
      },
      {
        "id": "estrela-alta",
        "name": "Estrelinha",
        "path": "M94 8L95.89 12.39L100.66 12.84L97.06 16L98.11 20.66L94 18.22L89.89 20.66L90.94 16L87.34 12.84L92.11 12.39Z",
        "details": "",
        "pivot": [
          94,
          15
        ],
        "motion": "star",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 87,
          "y": 8,
          "width": 14,
          "height": 14
        }
      },
      {
        "id": "estrela-lateral",
        "name": "Estrelinha",
        "path": "M108 38L109.62 41.77L113.71 42.15L110.62 44.85L111.53 48.85L108 46.76L104.47 48.85L105.38 44.85L102.29 42.15L106.38 41.77Z",
        "details": "",
        "pivot": [
          108,
          44
        ],
        "motion": "star",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 102,
          "y": 38,
          "width": 12,
          "height": 12
        }
      },
      {
        "id": "estrela-baixa",
        "name": "Estrelinha",
        "path": "M13 59L14.35 62.14L17.76 62.45L15.19 64.71L15.94 68.05L13 66.3L10.06 68.05L10.81 64.71L8.24 62.45L11.65 62.14Z",
        "details": "",
        "pivot": [
          13,
          64
        ],
        "motion": "star",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 8,
          "y": 59,
          "width": 10,
          "height": 10
        }
      },
      {
        "id": "nuvem",
        "name": "Nuvem fofinha",
        "path": "M87 101C82 101 83 94 90 94C88 85 102 84 104 93C111 90 116 101 109 101Z",
        "details": "",
        "pivot": [
          98.5,
          94.0
        ],
        "motion": "cloud",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 83,
          "y": 86,
          "width": 31,
          "height": 16
        }
      },
      {
        "id": "chao",
        "name": "Colina dos sonhos",
        "path": "M0 115Q15 110 29 115Q44 118 59 114Q75 111 90 115Q107 113 120 116V120H0Z",
        "details": "",
        "pivot": [
          60,
          116
        ],
        "motion": "still",
        "fill": "#fffefa",
        "foreground": true,
        "bounds": {
          "x": 0,
          "y": 110,
          "width": 120,
          "height": 10
        }
      }
    ]
  },
  "peixinho": {
    "id": "peixinho",
    "label": "Lá no fundo do mar",
    "hint": "Pinte o peixinho, as algas e as bolhinhas.",
    "kind": "underwater",
    "frame": {
      "x": 21,
      "y": 33,
      "width": 82,
      "height": 73
    },
    "parts": [
      {
        "id": "agua",
        "name": "Ondinhas",
        "path": "M0 5Q15 15 30 7Q45 0 60 8Q75 15 90 7Q105 0 120 8V18Q105 10 90 18Q75 25 60 17Q45 9 30 17Q15 25 0 17Z",
        "details": "",
        "pivot": [
          60,
          12
        ],
        "motion": "water",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 0,
          "y": 3,
          "width": 120,
          "height": 22
        }
      },
      {
        "id": "alga-esquerda",
        "name": "Alga comprida",
        "path": "M9 110C-2 88 20 85 11 67C4 52 12 39 15 36C13 52 24 59 21 72C18 87 9 97 15 110Z",
        "details": "M12 107Q8 89 17 78",
        "pivot": [
          12,
          110
        ],
        "motion": "sway",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 4,
          "y": 36,
          "width": 18,
          "height": 74
        }
      },
      {
        "id": "alga-direita",
        "name": "Alga ondulada",
        "path": "M108 109C117 91 103 82 110 68Q115 57 116 46C120 58 114 69 115 79C119 91 120 101 113 109Z",
        "details": "",
        "pivot": [
          111,
          109
        ],
        "motion": "sway",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 106,
          "y": 46,
          "width": 14,
          "height": 63
        }
      },
      {
        "id": "bolhas",
        "name": "Bolhinhas",
        "path": "M41 26A6 6 0 1 1 29 26A6 6 0 1 1 41 26ZM69 20A4 4 0 1 1 61 20A4 4 0 1 1 69 20ZM96 33A5 5 0 1 1 86 33A5 5 0 1 1 96 33Z",
        "details": "",
        "pivot": [
          62,
          25
        ],
        "motion": "bob",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 29,
          "y": 16,
          "width": 67,
          "height": 22
        }
      },
      {
        "id": "chao",
        "name": "Areia macia",
        "path": "M0 112Q15 107 29 112Q44 115 59 111Q75 108 90 112Q107 110 120 113V120H0Z",
        "details": "M12 116h2M43 118h2M96 116h3",
        "pivot": [
          60,
          116
        ],
        "motion": "still",
        "fill": "#fffefa",
        "foreground": true,
        "bounds": {
          "x": 0,
          "y": 107,
          "width": 120,
          "height": 13
        }
      }
    ]
  },
  "coracao": {
    "id": "coracao",
    "label": "Um jardim de carinho",
    "hint": "Pinte o coração e seu jardim de carinho.",
    "kind": "garden",
    "frame": {
      "x": 22,
      "y": 33,
      "width": 78,
      "height": 76
    },
    "parts": [
      {
        "id": "sol",
        "name": "Sol",
        "path": "M23 19A8 8 0 1 1 7 19A8 8 0 1 1 23 19Z",
        "details": "M25 19L27 19 M22.07 26.07L23.49 27.49 M15 29L15 31 M7.93 26.07L6.51 27.49 M5 19L3 19 M7.93 11.93L6.51 10.51 M15 9L15 7 M22.07 11.93L23.49 10.51",
        "pivot": [
          15,
          19
        ],
        "motion": "sun",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 3,
          "y": 7,
          "width": 24,
          "height": 24
        }
      },
      {
        "id": "nuvem",
        "name": "Nuvem fofinha",
        "path": "M87 28C82 28 83 18 90 18C88 9 102 8 104 17C111 14 116 28 109 28Z",
        "details": "",
        "pivot": [
          98.5,
          19.5
        ],
        "motion": "cloud",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 83,
          "y": 10,
          "width": 31,
          "height": 19
        }
      },
      {
        "id": "arco-iris",
        "name": "Arco-íris",
        "path": "M31 32C34 3 83 3 88 32H80C76 14 43 14 39 32Z",
        "details": "M35 32C40 9 80 9 84 32",
        "pivot": [
          60,
          32
        ],
        "motion": "glow",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 31,
          "y": 10,
          "width": 57,
          "height": 22
        }
      },
      {
        "id": "flor-esquerda",
        "name": "Flor do jardim",
        "path": "M13 104.8H15V112.8H13ZM14 108.8Q6.8 100.8 6.8 108.0Q11.6 112 14 108.8ZM16.4 100.16Q14 110.8 11.6 100.16Q1.18 103.4 9.2 96Q1.18 88.6 11.6 91.84Q14 81.2 16.4 91.84Q26.82 88.6 18.8 96Q26.82 103.4 16.4 100.16Z",
        "details": "M17.04 96A3.04 3.04 0 1 1 10.96 96A3.04 3.04 0 1 1 17.04 96Z",
        "pivot": [
          14,
          112.8
        ],
        "motion": "flower",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 4.4,
          "y": 86.4,
          "width": 19.2,
          "height": 26.4
        }
      },
      {
        "id": "flor-direita",
        "name": "Flor do jardim",
        "path": "M107 104.8H109V112.8H107ZM108 108.8Q100.8 100.8 100.8 108.0Q105.6 112 108 108.8ZM110.4 100.16Q108 110.8 105.6 100.16Q95.18 103.4 103.2 96Q95.18 88.6 105.6 91.84Q108 81.2 110.4 91.84Q120.82 88.6 112.8 96Q120.82 103.4 110.4 100.16Z",
        "details": "M111.04 96A3.04 3.04 0 1 1 104.96 96A3.04 3.04 0 1 1 111.04 96Z",
        "pivot": [
          108,
          112.8
        ],
        "motion": "flower",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 98.4,
          "y": 86.4,
          "width": 19.2,
          "height": 26.4
        }
      },
      {
        "id": "chao",
        "name": "Grama",
        "path": "M0 113Q7 110 14 113C14 110 12 107 11 105C17 106 18 109 18 112C18 108 20 105 22 103C23 107 22 110 21 113C24 110 26 108 29 108C28 112 26 114 25 115Q39 111 49 113C49 110 47 107 46 105C52 106 53 109 53 112C53 108 55 105 57 103C58 107 57 110 56 113C59 110 61 108 64 108C63 112 61 114 60 115Q77 111 87 113C87 110 85 107 84 105C90 106 91 109 91 112C91 108 93 105 95 103C96 107 95 110 94 113C97 110 99 108 102 108C101 112 99 114 98 115Q110 110 120 113V120H0Z",
        "details": "M7 117L9 115M37 118L39 115M74 117L76 114M110 118L112 115",
        "pivot": [
          60,
          116
        ],
        "motion": "grass",
        "fill": "#fffefa",
        "foreground": true,
        "bounds": {
          "x": 0,
          "y": 103,
          "width": 120,
          "height": 17
        }
      }
    ]
  },
  "abelhinha": {
    "id": "abelhinha",
    "label": "O passeio da abelhinha",
    "hint": "Pinte a abelhinha e as flores que ela visita.",
    "kind": "garden",
    "frame": {
      "x": 22,
      "y": 31,
      "width": 78,
      "height": 78
    },
    "parts": [
      {
        "id": "sol",
        "name": "Sol",
        "path": "M26 18A9 9 0 1 1 8 18A9 9 0 1 1 26 18Z",
        "details": "M28 18L30 18 M24.78 25.78L26.19 27.19 M17 29L17 31 M9.22 25.78L7.81 27.19 M6 18L4 18 M9.22 10.22L7.81 8.81 M17 7L17 5 M24.78 10.22L26.19 8.81",
        "pivot": [
          17,
          18
        ],
        "motion": "sun",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 4,
          "y": 5,
          "width": 26,
          "height": 26
        }
      },
      {
        "id": "nuvem",
        "name": "Nuvem fofinha",
        "path": "M85 28C80 28 81 18 88 18C86 9 100 8 102 17C111 14 116 28 109 28Z",
        "details": "",
        "pivot": [
          97.5,
          19.5
        ],
        "motion": "cloud",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 81,
          "y": 10,
          "width": 33,
          "height": 19
        }
      },
      {
        "id": "flor-esquerda",
        "name": "Flor do jardim",
        "path": "M12 97.9H14V106.9H12ZM13 102.4Q4.9 93.4 4.9 101.5Q10.3 106 13 102.4ZM15.7 92.68Q13 104.65 10.3 92.68Q-1.42 96.33 7.6 88Q-1.42 79.67 10.3 83.32Q13 71.35 15.7 83.32Q27.42 79.67 18.4 88Q27.42 96.33 15.7 92.68Z",
        "details": "M16.42 88A3.42 3.42 0 1 1 9.58 88A3.42 3.42 0 1 1 16.42 88Z",
        "pivot": [
          13,
          106.9
        ],
        "motion": "flower",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 2.200000000000001,
          "y": 77.2,
          "width": 21.599999999999998,
          "height": 29.7
        }
      },
      {
        "id": "flor-direita",
        "name": "Flor do jardim",
        "path": "M104 100.9H106V109.9H104ZM105 105.4Q96.9 96.4 96.9 104.5Q102.3 109 105 105.4ZM107.7 95.68Q105 107.65 102.3 95.68Q90.58 99.33 99.6 91Q90.58 82.67 102.3 86.32Q105 74.35 107.7 86.32Q119.42 82.67 110.4 91Q119.42 99.33 107.7 95.68Z",
        "details": "M108.42 91A3.42 3.42 0 1 1 101.58 91A3.42 3.42 0 1 1 108.42 91Z",
        "pivot": [
          105,
          109.9
        ],
        "motion": "flower",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 94.2,
          "y": 80.2,
          "width": 21.599999999999998,
          "height": 29.7
        }
      },
      {
        "id": "colmeia",
        "name": "Colmeia fofinha",
        "path": "M5 59Q7 41 17 41Q27 41 29 59Q31 67 17 68Q3 67 5 59Z",
        "details": "M6 51H28M5 58H29M12 67V60Q17 53 22 60V67",
        "pivot": [
          17,
          54
        ],
        "motion": "bob",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 4,
          "y": 41,
          "width": 26,
          "height": 27
        }
      },
      {
        "id": "chao",
        "name": "Grama",
        "path": "M0 113Q7 110 14 113C14 110 12 107 11 105C17 106 18 109 18 112C18 108 20 105 22 103C23 107 22 110 21 113C24 110 26 108 29 108C28 112 26 114 25 115Q39 111 49 113C49 110 47 107 46 105C52 106 53 109 53 112C53 108 55 105 57 103C58 107 57 110 56 113C59 110 61 108 64 108C63 112 61 114 60 115Q77 111 87 113C87 110 85 107 84 105C90 106 91 109 91 112C91 108 93 105 95 103C96 107 95 110 94 113C97 110 99 108 102 108C101 112 99 114 98 115Q110 110 120 113V120H0Z",
        "details": "M7 117L9 115M37 118L39 115M74 117L76 114M110 118L112 115",
        "pivot": [
          60,
          116
        ],
        "motion": "grass",
        "fill": "#fffefa",
        "foreground": true,
        "bounds": {
          "x": 0,
          "y": 103,
          "width": 120,
          "height": 17
        }
      }
    ]
  },
  "passarinho": {
    "id": "passarinho",
    "label": "Piu-piu no pomar",
    "hint": "Pinte o passarinho e a árvore do pomar.",
    "kind": "garden",
    "frame": {
      "x": 22,
      "y": 31,
      "width": 78,
      "height": 78
    },
    "parts": [
      {
        "id": "sol",
        "name": "Sol",
        "path": "M25 18A8 8 0 1 1 9 18A8 8 0 1 1 25 18Z",
        "details": "M27 18L29 18 M24.07 25.07L25.49 26.49 M17 28L17 30 M9.93 25.07L8.51 26.49 M7 18L5 18 M9.93 10.93L8.51 9.51 M17 8L17 6 M24.07 10.93L25.49 9.51",
        "pivot": [
          17,
          18
        ],
        "motion": "sun",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 5,
          "y": 6,
          "width": 24,
          "height": 24
        }
      },
      {
        "id": "nuvem",
        "name": "Nuvem fofinha",
        "path": "M85 28C80 28 81 18 88 18C86 9 100 8 102 17C111 14 116 28 109 28Z",
        "details": "",
        "pivot": [
          97.5,
          19.5
        ],
        "motion": "cloud",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 81,
          "y": 10,
          "width": 33,
          "height": 19
        }
      },
      {
        "id": "arvore",
        "name": "Árvore",
        "path": "M15 75H19V102H15ZM17 37C-3 37 -2 66 8 65C5 81 29 81 26 65C36 66 37 37 17 37Z",
        "details": "M17 77V95M17 85l-5 -5",
        "pivot": [
          17,
          102
        ],
        "motion": "sway",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 0,
          "y": 37,
          "width": 34,
          "height": 65
        }
      },
      {
        "id": "galho",
        "name": "Galho do pomar",
        "path": "M20 101Q65 106 110 99L113 103Q65 111 19 106Z",
        "details": "M91 102L99 93M38 105L31 97",
        "pivot": [
          61,
          105
        ],
        "motion": "sway",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 19,
          "y": 99,
          "width": 94,
          "height": 12
        }
      },
      {
        "id": "florzinha",
        "name": "Flor do jardim",
        "path": "M105 98.7H107V105.7H105ZM106 102.2Q99.7 95.2 99.7 101.5Q103.9 105 106 102.2ZM108.1 94.64Q106 103.95 103.9 94.64Q94.78 97.48 101.8 91Q94.78 84.53 103.9 87.36Q106 78.05 108.1 87.36Q117.22 84.52 110.2 91Q117.22 97.47 108.1 94.64Z",
        "details": "M108.66 91A2.66 2.66 0 1 1 103.34 91A2.66 2.66 0 1 1 108.66 91Z",
        "pivot": [
          106,
          105.7
        ],
        "motion": "flower",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 97.6,
          "y": 82.6,
          "width": 16.8,
          "height": 23.099999999999998
        }
      },
      {
        "id": "chao",
        "name": "Grama",
        "path": "M0 113Q7 110 14 113C14 110 12 107 11 105C17 106 18 109 18 112C18 108 20 105 22 103C23 107 22 110 21 113C24 110 26 108 29 108C28 112 26 114 25 115Q39 111 49 113C49 110 47 107 46 105C52 106 53 109 53 112C53 108 55 105 57 103C58 107 57 110 56 113C59 110 61 108 64 108C63 112 61 114 60 115Q77 111 87 113C87 110 85 107 84 105C90 106 91 109 91 112C91 108 93 105 95 103C96 107 95 110 94 113C97 110 99 108 102 108C101 112 99 114 98 115Q110 110 120 113V120H0Z",
        "details": "M7 117L9 115M37 118L39 115M74 117L76 114M110 118L112 115",
        "pivot": [
          60,
          116
        ],
        "motion": "grass",
        "fill": "#fffefa",
        "foreground": true,
        "bounds": {
          "x": 0,
          "y": 103,
          "width": 120,
          "height": 17
        }
      }
    ]
  },
  "foguete": {
    "id": "foguete",
    "label": "Uma viagem entre estrelas",
    "hint": "Pinte o foguete, a lua e as estrelas.",
    "kind": "space",
    "frame": {
      "x": 26,
      "y": 21,
      "width": 68,
      "height": 89
    },
    "parts": [
      {
        "id": "lua",
        "name": "Lua",
        "path": "M20 16A11 11 0 1 0 23 36Q8.3 28 20 16Z",
        "details": "",
        "pivot": [
          16,
          27
        ],
        "motion": "glow",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 5,
          "y": 16,
          "width": 22,
          "height": 22
        }
      },
      {
        "id": "estrela-alta",
        "name": "Estrelinha",
        "path": "M95 8L96.89 12.39L101.66 12.84L98.06 16L99.11 20.66L95 18.22L90.89 20.66L91.94 16L88.34 12.84L93.11 12.39Z",
        "details": "",
        "pivot": [
          95,
          15
        ],
        "motion": "star",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 88,
          "y": 8,
          "width": 14,
          "height": 14
        }
      },
      {
        "id": "estrela-direita",
        "name": "Estrelinha",
        "path": "M107 46L108.89 50.39L113.66 50.84L110.06 54L111.11 58.66L107 56.22L102.89 58.66L103.94 54L100.34 50.84L105.11 50.39Z",
        "details": "",
        "pivot": [
          107,
          53
        ],
        "motion": "star",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 100,
          "y": 46,
          "width": 14,
          "height": 14
        }
      },
      {
        "id": "estrela-esquerda",
        "name": "Estrelinha",
        "path": "M14 67L15.62 70.77L19.71 71.15L16.62 73.85L17.53 77.85L14 75.76L10.47 77.85L11.38 73.85L8.29 71.15L12.38 70.77Z",
        "details": "",
        "pivot": [
          14,
          73
        ],
        "motion": "star",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 8,
          "y": 67,
          "width": 12,
          "height": 12
        }
      },
      {
        "id": "planeta",
        "name": "Planeta com anel",
        "path": "M113 91A12 8 0 1 1 89 91A12 8 0 1 1 113 91ZM85 92Q100 80 117 89Q109 102 85 97Z",
        "details": "M108 91A7 5 0 1 1 94 91A7 5 0 1 1 108 91Z",
        "pivot": [
          101,
          92
        ],
        "motion": "bob",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 85,
          "y": 83,
          "width": 32,
          "height": 19
        }
      },
      {
        "id": "chao",
        "name": "Chão da lua",
        "path": "M0 116Q15 111 29 116Q44 119 59 115Q75 112 90 116Q107 114 120 117V120H0Z",
        "details": "",
        "pivot": [
          60,
          116
        ],
        "motion": "still",
        "fill": "#fffefa",
        "foreground": true,
        "bounds": {
          "x": 0,
          "y": 111,
          "width": 120,
          "height": 9
        }
      }
    ]
  },
  "pipa": {
    "id": "pipa",
    "label": "A pipa no ventinho",
    "hint": "Pinte a pipa, o sol e as nuvens.",
    "kind": "meadow",
    "frame": {
      "x": 23,
      "y": 29,
      "width": 77,
      "height": 80
    },
    "parts": [
      {
        "id": "sol",
        "name": "Sol",
        "path": "M26 18A9 9 0 1 1 8 18A9 9 0 1 1 26 18Z",
        "details": "M28 18L30 18 M24.78 25.78L26.19 27.19 M17 29L17 31 M9.22 25.78L7.81 27.19 M6 18L4 18 M9.22 10.22L7.81 8.81 M17 7L17 5 M24.78 10.22L26.19 8.81",
        "pivot": [
          17,
          18
        ],
        "motion": "sun",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 4,
          "y": 5,
          "width": 26,
          "height": 26
        }
      },
      {
        "id": "nuvem",
        "name": "Nuvem fofinha",
        "path": "M85 28C80 28 81 18 88 18C86 9 100 8 102 17C111 14 116 28 109 28Z",
        "details": "",
        "pivot": [
          97.5,
          19.5
        ],
        "motion": "cloud",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 81,
          "y": 10,
          "width": 33,
          "height": 19
        }
      },
      {
        "id": "nuvem-baixa",
        "name": "Nuvem fofinha",
        "path": "M7 69C2 69 3 62 10 62C8 53 22 52 24 61C25 58 30 69 23 69Z",
        "details": "",
        "pivot": [
          15.5,
          62.0
        ],
        "motion": "cloud",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 3,
          "y": 54,
          "width": 25,
          "height": 16
        }
      },
      {
        "id": "arvore",
        "name": "Árvore",
        "path": "M101 83H105V110H101ZM103 45C83 45 84 74 94 73C91 89 115 89 112 73C122 74 123 45 103 45Z",
        "details": "M103 85V103M103 93l-5 -5",
        "pivot": [
          103,
          110
        ],
        "motion": "sway",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 86,
          "y": 45,
          "width": 34,
          "height": 65
        }
      },
      {
        "id": "florzinha",
        "name": "Flor do jardim",
        "path": "M13 104.8H15V112.8H13ZM14 108.8Q6.8 100.8 6.8 108.0Q11.6 112 14 108.8ZM16.4 100.16Q14 110.8 11.6 100.16Q1.18 103.4 9.2 96Q1.18 88.6 11.6 91.84Q14 81.2 16.4 91.84Q26.82 88.6 18.8 96Q26.82 103.4 16.4 100.16Z",
        "details": "M17.04 96A3.04 3.04 0 1 1 10.96 96A3.04 3.04 0 1 1 17.04 96Z",
        "pivot": [
          14,
          112.8
        ],
        "motion": "flower",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 4.4,
          "y": 86.4,
          "width": 19.2,
          "height": 26.4
        }
      },
      {
        "id": "chao",
        "name": "Grama",
        "path": "M0 113Q7 110 14 113C14 110 12 107 11 105C17 106 18 109 18 112C18 108 20 105 22 103C23 107 22 110 21 113C24 110 26 108 29 108C28 112 26 114 25 115Q39 111 49 113C49 110 47 107 46 105C52 106 53 109 53 112C53 108 55 105 57 103C58 107 57 110 56 113C59 110 61 108 64 108C63 112 61 114 60 115Q77 111 87 113C87 110 85 107 84 105C90 106 91 109 91 112C91 108 93 105 95 103C96 107 95 110 94 113C97 110 99 108 102 108C101 112 99 114 98 115Q110 110 120 113V120H0Z",
        "details": "M7 117L9 115M37 118L39 115M74 117L76 114M110 118L112 115",
        "pivot": [
          60,
          116
        ],
        "motion": "grass",
        "fill": "#fffefa",
        "foreground": true,
        "bounds": {
          "x": 0,
          "y": 103,
          "width": 120,
          "height": 17
        }
      }
    ]
  },
  "tartaruguinha": {
    "id": "tartaruguinha",
    "label": "Um passeio perto do lago",
    "hint": "Pinte a tartaruguinha, a flor e o laguinho.",
    "kind": "garden",
    "frame": {
      "x": 21,
      "y": 33,
      "width": 82,
      "height": 75
    },
    "parts": [
      {
        "id": "sol",
        "name": "Sol",
        "path": "M26 18A9 9 0 1 1 8 18A9 9 0 1 1 26 18Z",
        "details": "M28 18L30 18 M24.78 25.78L26.19 27.19 M17 29L17 31 M9.22 25.78L7.81 27.19 M6 18L4 18 M9.22 10.22L7.81 8.81 M17 7L17 5 M24.78 10.22L26.19 8.81",
        "pivot": [
          17,
          18
        ],
        "motion": "sun",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 4,
          "y": 5,
          "width": 26,
          "height": 26
        }
      },
      {
        "id": "nuvem",
        "name": "Nuvem fofinha",
        "path": "M85 28C80 28 81 18 88 18C86 9 100 8 102 17C111 14 116 28 109 28Z",
        "details": "",
        "pivot": [
          97.5,
          19.5
        ],
        "motion": "cloud",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 81,
          "y": 10,
          "width": 33,
          "height": 19
        }
      },
      {
        "id": "florzinha",
        "name": "Flor do jardim",
        "path": "M105 99.9H107V108.9H105ZM106 104.4Q97.9 95.4 97.9 103.5Q103.3 108 106 104.4ZM108.7 94.68Q106 106.65 103.3 94.68Q91.58 98.33 100.6 90Q91.58 81.67 103.3 85.32Q106 73.35 108.7 85.32Q120.42 81.67 111.4 90Q120.42 98.33 108.7 94.68Z",
        "details": "M109.42 90A3.42 3.42 0 1 1 102.58 90A3.42 3.42 0 1 1 109.42 90Z",
        "pivot": [
          106,
          108.9
        ],
        "motion": "flower",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 95.2,
          "y": 79.2,
          "width": 21.599999999999998,
          "height": 29.7
        }
      },
      {
        "id": "laguinho",
        "name": "Laguinho",
        "path": "M37 105A17 7 0 1 1 3 105A17 7 0 1 1 37 105Z",
        "details": "M9.8 105Q15.75 102 21.7 105M21.7 108h7.65",
        "pivot": [
          20,
          105
        ],
        "motion": "water",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 3,
          "y": 98,
          "width": 34,
          "height": 14
        }
      },
      {
        "id": "chao",
        "name": "Grama",
        "path": "M0 113Q7 110 14 113C14 110 12 107 11 105C17 106 18 109 18 112C18 108 20 105 22 103C23 107 22 110 21 113C24 110 26 108 29 108C28 112 26 114 25 115Q39 111 49 113C49 110 47 107 46 105C52 106 53 109 53 112C53 108 55 105 57 103C58 107 57 110 56 113C59 110 61 108 64 108C63 112 61 114 60 115Q77 111 87 113C87 110 85 107 84 105C90 106 91 109 91 112C91 108 93 105 95 103C96 107 95 110 94 113C97 110 99 108 102 108C101 112 99 114 98 115Q110 110 120 113V120H0Z",
        "details": "M7 117L9 115M37 118L39 115M74 117L76 114M110 118L112 115",
        "pivot": [
          60,
          116
        ],
        "motion": "grass",
        "fill": "#fffefa",
        "foreground": true,
        "bounds": {
          "x": 0,
          "y": 103,
          "width": 120,
          "height": 17
        }
      }
    ]
  },
  "caracol": {
    "id": "caracol",
    "label": "Devagarinho no jardim",
    "hint": "Pinte o caracol, o cogumelo e a folha.",
    "kind": "garden",
    "frame": {
      "x": 22,
      "y": 31,
      "width": 78,
      "height": 78
    },
    "parts": [
      {
        "id": "sol",
        "name": "Sol",
        "path": "M26 18A9 9 0 1 1 8 18A9 9 0 1 1 26 18Z",
        "details": "M28 18L30 18 M24.78 25.78L26.19 27.19 M17 29L17 31 M9.22 25.78L7.81 27.19 M6 18L4 18 M9.22 10.22L7.81 8.81 M17 7L17 5 M24.78 10.22L26.19 8.81",
        "pivot": [
          17,
          18
        ],
        "motion": "sun",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 4,
          "y": 5,
          "width": 26,
          "height": 26
        }
      },
      {
        "id": "nuvem",
        "name": "Nuvem fofinha",
        "path": "M85 28C80 28 81 18 88 18C86 9 100 8 102 17C111 14 116 28 109 28Z",
        "details": "",
        "pivot": [
          97.5,
          19.5
        ],
        "motion": "cloud",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 81,
          "y": 10,
          "width": 33,
          "height": 19
        }
      },
      {
        "id": "cogumelo",
        "name": "Cogumelo",
        "path": "M10 91H16L17 106H9ZM2 91Q2 74 13 74Q24 74 24 91Z",
        "details": "M11.5 86A2.5 2.5 0 1 1 6.5 86A2.5 2.5 0 1 1 11.5 86ZM19.8 83A2.8 2.8 0 1 1 14.2 83A2.8 2.8 0 1 1 19.8 83Z",
        "pivot": [
          13,
          106
        ],
        "motion": "bob",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 2,
          "y": 74,
          "width": 22,
          "height": 32
        }
      },
      {
        "id": "folha",
        "name": "Folha grande",
        "path": "M101 103Q85 87 111 72Q121 93 101 103Z",
        "details": "M101 103Q106 90 111 77",
        "pivot": [
          101,
          103
        ],
        "motion": "sway",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 91,
          "y": 72,
          "width": 25,
          "height": 31
        }
      },
      {
        "id": "gotinha",
        "name": "Gotinha de orvalho",
        "path": "M101 48Q87 62 101 68Q115 62 101 48Z",
        "details": "M97 59Q95 63 100 64",
        "pivot": [
          101,
          59
        ],
        "motion": "bob",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 93,
          "y": 48,
          "width": 16,
          "height": 20
        }
      },
      {
        "id": "chao",
        "name": "Grama",
        "path": "M0 113Q7 110 14 113C14 110 12 107 11 105C17 106 18 109 18 112C18 108 20 105 22 103C23 107 22 110 21 113C24 110 26 108 29 108C28 112 26 114 25 115Q39 111 49 113C49 110 47 107 46 105C52 106 53 109 53 112C53 108 55 105 57 103C58 107 57 110 56 113C59 110 61 108 64 108C63 112 61 114 60 115Q77 111 87 113C87 110 85 107 84 105C90 106 91 109 91 112C91 108 93 105 95 103C96 107 95 110 94 113C97 110 99 108 102 108C101 112 99 114 98 115Q110 110 120 113V120H0Z",
        "details": "M7 117L9 115M37 118L39 115M74 117L76 114M110 118L112 115",
        "pivot": [
          60,
          116
        ],
        "motion": "grass",
        "fill": "#fffefa",
        "foreground": true,
        "bounds": {
          "x": 0,
          "y": 103,
          "width": 120,
          "height": 17
        }
      }
    ]
  },
  "boneca": {
    "id": "boneca",
    "label": "O quarto de brincar",
    "hint": "Pinte a boneca e os brinquedos do seu quarto.",
    "kind": "room",
    "frame": {
      "x": 25,
      "y": 26,
      "width": 73,
      "height": 82
    },
    "parts": [
      {
        "id": "janela",
        "name": "Janela",
        "path": "M5 10Q5 7 8 7H28Q31 7 31 10V37Q31 40 28 40H8Q5 40 5 37Z",
        "details": "M18 7V40M5 23H31M9 13Q14 9 15 14",
        "pivot": [
          18,
          23
        ],
        "motion": "glow",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 5,
          "y": 7,
          "width": 26,
          "height": 33
        }
      },
      {
        "id": "prateleira",
        "name": "Prateleira de brinquedos",
        "path": "M83 33H116V37H83ZM87 20H97V32H87ZM103 23H113V32H103Z",
        "details": "M88 23h8M105 26h6M87 37V41M113 37V41",
        "pivot": [
          99,
          34
        ],
        "motion": "still",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 83,
          "y": 20,
          "width": 33,
          "height": 17
        }
      },
      {
        "id": "bloquinhos",
        "name": "Bloquinhos de brincar",
        "path": "M4 88H15V99H4ZM15 92H25V103H15ZM8 77H19V88H8Z",
        "details": "M7 91l3 5l3 -5M18 95h4M12 80v5",
        "pivot": [
          13,
          101
        ],
        "motion": "bob",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 4,
          "y": 77,
          "width": 21,
          "height": 26
        }
      },
      {
        "id": "almofada",
        "name": "Almofada",
        "path": "M101 83Q109 80 116 85L117 102Q110 106 101 102Z",
        "details": "M104 88Q110 85 114 88M104 100Q110 103 114 100",
        "pivot": [
          109,
          101
        ],
        "motion": "bob",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 100,
          "y": 81,
          "width": 18,
          "height": 25
        }
      },
      {
        "id": "tapete",
        "name": "Tapete fofinho",
        "path": "M106 108A46 7 0 1 1 14 108A46 7 0 1 1 106 108Z",
        "details": "M22 108Q60 117 98 108",
        "pivot": [
          60,
          108
        ],
        "motion": "still",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 14,
          "y": 101,
          "width": 92,
          "height": 14
        }
      },
      {
        "id": "chao",
        "name": "Chão do quarto",
        "path": "M0 116Q15 111 29 116Q44 119 59 115Q75 112 90 116Q107 114 120 117V120H0Z",
        "details": "",
        "pivot": [
          60,
          116
        ],
        "motion": "still",
        "fill": "#fffefa",
        "foreground": true,
        "bounds": {
          "x": 0,
          "y": 111,
          "width": 120,
          "height": 9
        }
      }
    ]
  },
  "princesa": {
    "id": "princesa",
    "label": "O jardim da princesa",
    "hint": "Pinte a princesa, o castelinho e a fonte.",
    "kind": "garden",
    "frame": {
      "x": 24,
      "y": 31,
      "width": 73,
      "height": 80
    },
    "parts": [
      {
        "id": "sol",
        "name": "Sol",
        "path": "M25 17A8 8 0 1 1 9 17A8 8 0 1 1 25 17Z",
        "details": "M27 17L29 17 M24.07 24.07L25.49 25.49 M17 27L17 29 M9.93 24.07L8.51 25.49 M7 17L5 17 M9.93 9.93L8.51 8.51 M17 7L17 5 M24.07 9.93L25.49 8.51",
        "pivot": [
          17,
          17
        ],
        "motion": "sun",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 5,
          "y": 5,
          "width": 24,
          "height": 24
        }
      },
      {
        "id": "castelinho",
        "name": "Castelinho ao longe",
        "path": "M89.1 40V27.25L94.2 21.3L99.3 27.25V34.05H102.7V27.25L107.8 21.3L112.9 27.25V40Z",
        "details": "M89.1 27.25H99.3M102.7 27.25H112.9M98.45 40V35.75Q101 31.5 103.55 35.75V40M93.35 33.2v-4M107.8 33.2v-4",
        "pivot": [
          101,
          40
        ],
        "motion": "still",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 89.1,
          "y": 21.3,
          "width": 23.8,
          "height": 18.7
        }
      },
      {
        "id": "nuvem",
        "name": "Nuvem fofinha",
        "path": "M44 21C39 21 40 13 47 13C45 4 59 3 61 12C67 9 72 21 65 21Z",
        "details": "",
        "pivot": [
          55.0,
          13.5
        ],
        "motion": "cloud",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 40,
          "y": 5,
          "width": 30,
          "height": 17
        }
      },
      {
        "id": "fonte",
        "name": "Fonte do jardim",
        "path": "M5 101Q4 110 18 110Q32 110 31 101ZM15 100V89H21V100ZM7 87Q18 97 29 87ZM16 84Q18 80 20 84L18 71Z",
        "details": "M9 103Q18 106 27 103",
        "pivot": [
          18,
          109
        ],
        "motion": "water",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 4,
          "y": 71,
          "width": 28,
          "height": 39
        }
      },
      {
        "id": "florzinha",
        "name": "Flor do jardim",
        "path": "M105 103.8H107V111.8H105ZM106 107.8Q98.8 99.8 98.8 107.0Q103.6 111 106 107.8ZM108.4 99.16Q106 109.8 103.6 99.16Q93.18 102.4 101.2 95Q93.18 87.6 103.6 90.84Q106 80.2 108.4 90.84Q118.82 87.6 110.8 95Q118.82 102.4 108.4 99.16Z",
        "details": "M109.04 95A3.04 3.04 0 1 1 102.96 95A3.04 3.04 0 1 1 109.04 95Z",
        "pivot": [
          106,
          111.8
        ],
        "motion": "flower",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 96.4,
          "y": 85.4,
          "width": 19.2,
          "height": 26.4
        }
      },
      {
        "id": "chao",
        "name": "Grama",
        "path": "M0 113Q7 110 14 113C14 110 12 107 11 105C17 106 18 109 18 112C18 108 20 105 22 103C23 107 22 110 21 113C24 110 26 108 29 108C28 112 26 114 25 115Q39 111 49 113C49 110 47 107 46 105C52 106 53 109 53 112C53 108 55 105 57 103C58 107 57 110 56 113C59 110 61 108 64 108C63 112 61 114 60 115Q77 111 87 113C87 110 85 107 84 105C90 106 91 109 91 112C91 108 93 105 95 103C96 107 95 110 94 113C97 110 99 108 102 108C101 112 99 114 98 115Q110 110 120 113V120H0Z",
        "details": "M7 117L9 115M37 118L39 115M74 117L76 114M110 118L112 115",
        "pivot": [
          60,
          116
        ],
        "motion": "grass",
        "fill": "#fffefa",
        "foreground": true,
        "bounds": {
          "x": 0,
          "y": 103,
          "width": 120,
          "height": 17
        }
      }
    ]
  },
  "ponei": {
    "id": "ponei",
    "label": "O campo do pônei",
    "hint": "Pinte o pônei, a cerquinha e as flores.",
    "kind": "meadow",
    "frame": {
      "x": 21,
      "y": 31,
      "width": 80,
      "height": 79
    },
    "parts": [
      {
        "id": "sol",
        "name": "Sol",
        "path": "M26 18A9 9 0 1 1 8 18A9 9 0 1 1 26 18Z",
        "details": "M28 18L30 18 M24.78 25.78L26.19 27.19 M17 29L17 31 M9.22 25.78L7.81 27.19 M6 18L4 18 M9.22 10.22L7.81 8.81 M17 7L17 5 M24.78 10.22L26.19 8.81",
        "pivot": [
          17,
          18
        ],
        "motion": "sun",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 4,
          "y": 5,
          "width": 26,
          "height": 26
        }
      },
      {
        "id": "nuvem",
        "name": "Nuvem fofinha",
        "path": "M85 28C80 28 81 18 88 18C86 9 100 8 102 17C111 14 116 28 109 28Z",
        "details": "",
        "pivot": [
          97.5,
          19.5
        ],
        "motion": "cloud",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 81,
          "y": 10,
          "width": 33,
          "height": 19
        }
      },
      {
        "id": "cerca",
        "name": "Cerquinha",
        "path": "M1 94H119V98H1ZM4 86L8 82L12 86V108H4ZM108 86L112 82L116 86V108H108Z",
        "details": "M1 96H119",
        "pivot": [
          60,
          107
        ],
        "motion": "still",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 1,
          "y": 82,
          "width": 118,
          "height": 26
        }
      },
      {
        "id": "flor-esquerda",
        "name": "Flor do jardim",
        "path": "M12 103.7H14V110.7H12ZM13 107.2Q6.7 100.2 6.7 106.5Q10.9 110 13 107.2ZM15.1 99.64Q13 108.95 10.9 99.64Q1.78 102.48 8.8 96Q1.78 89.53 10.9 92.36Q13 83.05 15.1 92.36Q24.22 89.52 17.2 96Q24.22 102.47 15.1 99.64Z",
        "details": "M15.66 96A2.66 2.66 0 1 1 10.34 96A2.66 2.66 0 1 1 15.66 96Z",
        "pivot": [
          13,
          110.7
        ],
        "motion": "flower",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 4.6,
          "y": 87.6,
          "width": 16.8,
          "height": 23.099999999999998
        }
      },
      {
        "id": "flor-direita",
        "name": "Flor do jardim",
        "path": "M104 103.7H106V110.7H104ZM105 107.2Q98.7 100.2 98.7 106.5Q102.9 110 105 107.2ZM107.1 99.64Q105 108.95 102.9 99.64Q93.78 102.48 100.8 96Q93.78 89.53 102.9 92.36Q105 83.05 107.1 92.36Q116.22 89.52 109.2 96Q116.22 102.47 107.1 99.64Z",
        "details": "M107.66 96A2.66 2.66 0 1 1 102.34 96A2.66 2.66 0 1 1 107.66 96Z",
        "pivot": [
          105,
          110.7
        ],
        "motion": "flower",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 96.6,
          "y": 87.6,
          "width": 16.8,
          "height": 23.099999999999998
        }
      },
      {
        "id": "chao",
        "name": "Grama",
        "path": "M0 113Q7 110 14 113C14 110 12 107 11 105C17 106 18 109 18 112C18 108 20 105 22 103C23 107 22 110 21 113C24 110 26 108 29 108C28 112 26 114 25 115Q39 111 49 113C49 110 47 107 46 105C52 106 53 109 53 112C53 108 55 105 57 103C58 107 57 110 56 113C59 110 61 108 64 108C63 112 61 114 60 115Q77 111 87 113C87 110 85 107 84 105C90 106 91 109 91 112C91 108 93 105 95 103C96 107 95 110 94 113C97 110 99 108 102 108C101 112 99 114 98 115Q110 110 120 113V120H0Z",
        "details": "M7 117L9 115M37 118L39 115M74 117L76 114M110 118L112 115",
        "pivot": [
          60,
          116
        ],
        "motion": "grass",
        "fill": "#fffefa",
        "foreground": true,
        "bounds": {
          "x": 0,
          "y": 103,
          "width": 120,
          "height": 17
        }
      }
    ]
  },
  "bebe": {
    "id": "bebe",
    "label": "Um quarto cheio de carinho",
    "hint": "Pinte o bebê, o móbile e os brinquedos.",
    "kind": "room",
    "frame": {
      "x": 25,
      "y": 35,
      "width": 73,
      "height": 74
    },
    "parts": [
      {
        "id": "janela",
        "name": "Janela",
        "path": "M5 10Q5 7 8 7H28Q31 7 31 10V37Q31 40 28 40H8Q5 40 5 37Z",
        "details": "M18 7V40M5 23H31M9 13Q14 9 15 14",
        "pivot": [
          18,
          23
        ],
        "motion": "glow",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 5,
          "y": 7,
          "width": 26,
          "height": 33
        }
      },
      {
        "id": "mobile",
        "name": "Móbile de estrelinhas",
        "path": "M50 8Q67 0 86 9L85 11Q67 4 51 10ZM50 17L53 22L59 23L55 27L56 33L50 30L44 33L45 27L41 23L47 22ZM86 17Q75 28 87 32Q93 28 86 17Z",
        "details": "M68 0V6M50 9V17M86 10V17",
        "pivot": [
          68,
          6
        ],
        "motion": "sway",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 41,
          "y": 3,
          "width": 52,
          "height": 30
        }
      },
      {
        "id": "bloquinhos",
        "name": "Bloquinhos de brincar",
        "path": "M4 90H15V101H4ZM15 94H25V105H15ZM8 79H19V90H8Z",
        "details": "M7 93l3 5l3 -5M18 97h4M12 82v5",
        "pivot": [
          13,
          103
        ],
        "motion": "bob",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 4,
          "y": 79,
          "width": 21,
          "height": 26
        }
      },
      {
        "id": "abajur",
        "name": "Abajur",
        "path": "M102 41H111L118 60H95ZM105 60H108V86H105ZM98 86H115V89H98Z",
        "details": "M98 60H115",
        "pivot": [
          106,
          88
        ],
        "motion": "glow",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 95,
          "y": 41,
          "width": 23,
          "height": 48
        }
      },
      {
        "id": "tapete",
        "name": "Tapete fofinho",
        "path": "M106 108A46 7 0 1 1 14 108A46 7 0 1 1 106 108Z",
        "details": "M22 108Q60 117 98 108",
        "pivot": [
          60,
          108
        ],
        "motion": "still",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 14,
          "y": 101,
          "width": 92,
          "height": 14
        }
      },
      {
        "id": "chao",
        "name": "Chão do quarto",
        "path": "M0 116Q15 111 29 116Q44 119 59 115Q75 112 90 116Q107 114 120 117V120H0Z",
        "details": "",
        "pivot": [
          60,
          116
        ],
        "motion": "still",
        "fill": "#fffefa",
        "foreground": true,
        "bounds": {
          "x": 0,
          "y": 111,
          "width": 120,
          "height": 9
        }
      }
    ]
  },
  "ursinho": {
    "id": "ursinho",
    "label": "O piquenique do ursinho",
    "hint": "Pinte o ursinho e seu piquenique na floresta.",
    "kind": "woodland",
    "frame": {
      "x": 25,
      "y": 29,
      "width": 72,
      "height": 80
    },
    "parts": [
      {
        "id": "sol",
        "name": "Sol",
        "path": "M53 15A8 8 0 1 1 37 15A8 8 0 1 1 53 15Z",
        "details": "M55 15L57 15 M52.07 22.07L53.49 23.49 M45 25L45 27 M37.93 22.07L36.51 23.49 M35 15L33 15 M37.93 7.93L36.51 6.51 M45 5L45 3 M52.07 7.93L53.49 6.51",
        "pivot": [
          45,
          15
        ],
        "motion": "sun",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 33,
          "y": 3,
          "width": 24,
          "height": 24
        }
      },
      {
        "id": "arvore",
        "name": "Árvore",
        "path": "M15 68H19V95H15ZM17 30C-3 30 -2 59 8 58C5 74 29 74 26 58C36 59 37 30 17 30Z",
        "details": "M17 70V88M17 78l-5 -5",
        "pivot": [
          17,
          95
        ],
        "motion": "sway",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 0,
          "y": 30,
          "width": 34,
          "height": 65
        }
      },
      {
        "id": "arbusto",
        "name": "Arbusto",
        "path": "M96.5 102.5C88 94 99.05 83 105 91.45C110.1 83 122 94 113.5 102.5Z",
        "details": "",
        "pivot": [
          105,
          102.5
        ],
        "motion": "sway",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 92.25,
          "y": 85.6,
          "width": 25.5,
          "height": 18.2
        }
      },
      {
        "id": "cesta",
        "name": "Cesta de piquenique",
        "path": "M94 96H115L113 108H96ZM97 96V91Q104 82 112 91V96Z",
        "details": "M96 100H114M100 96V107M108 96V107",
        "pivot": [
          105,
          106
        ],
        "motion": "bob",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 94,
          "y": 86,
          "width": 21,
          "height": 22
        }
      },
      {
        "id": "toalha",
        "name": "Toalha de piquenique",
        "path": "M28 102L86 101L96 113H18Z",
        "details": "M23 108H91M38 102L33 113M55 102V113M74 101L79 113",
        "pivot": [
          57,
          108
        ],
        "motion": "still",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 18,
          "y": 101,
          "width": 78,
          "height": 12
        }
      },
      {
        "id": "chao",
        "name": "Grama",
        "path": "M0 113Q7 110 14 113C14 110 12 107 11 105C17 106 18 109 18 112C18 108 20 105 22 103C23 107 22 110 21 113C24 110 26 108 29 108C28 112 26 114 25 115Q39 111 49 113C49 110 47 107 46 105C52 106 53 109 53 112C53 108 55 105 57 103C58 107 57 110 56 113C59 110 61 108 64 108C63 112 61 114 60 115Q77 111 87 113C87 110 85 107 84 105C90 106 91 109 91 112C91 108 93 105 95 103C96 107 95 110 94 113C97 110 99 108 102 108C101 112 99 114 98 115Q110 110 120 113V120H0Z",
        "details": "M7 117L9 115M37 118L39 115M74 117L76 114M110 118L112 115",
        "pivot": [
          60,
          116
        ],
        "motion": "grass",
        "fill": "#fffefa",
        "foreground": true,
        "bounds": {
          "x": 0,
          "y": 103,
          "width": 120,
          "height": 17
        }
      }
    ]
  },
  "gatinho": {
    "id": "gatinho",
    "label": "O cantinho do gatinho",
    "hint": "Pinte o gatinho, a cestinha e a flor.",
    "kind": "garden",
    "frame": {
      "x": 23,
      "y": 29,
      "width": 77,
      "height": 81
    },
    "parts": [
      {
        "id": "sol",
        "name": "Sol",
        "path": "M26 18A9 9 0 1 1 8 18A9 9 0 1 1 26 18Z",
        "details": "M28 18L30 18 M24.78 25.78L26.19 27.19 M17 29L17 31 M9.22 25.78L7.81 27.19 M6 18L4 18 M9.22 10.22L7.81 8.81 M17 7L17 5 M24.78 10.22L26.19 8.81",
        "pivot": [
          17,
          18
        ],
        "motion": "sun",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 4,
          "y": 5,
          "width": 26,
          "height": 26
        }
      },
      {
        "id": "nuvem",
        "name": "Nuvem fofinha",
        "path": "M85 28C80 28 81 18 88 18C86 9 100 8 102 17C111 14 116 28 109 28Z",
        "details": "",
        "pivot": [
          97.5,
          19.5
        ],
        "motion": "cloud",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 81,
          "y": 10,
          "width": 33,
          "height": 19
        }
      },
      {
        "id": "cestinha",
        "name": "Cestinha do gatinho",
        "path": "M2 94H27L24 109H5ZM5 94V88Q14 77 24 88V94Z",
        "details": "M4 99H25M9 95V108M18 95V108",
        "pivot": [
          14,
          107
        ],
        "motion": "bob",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 2,
          "y": 82,
          "width": 25,
          "height": 27
        }
      },
      {
        "id": "florzinha",
        "name": "Flor do jardim",
        "path": "M106 104.8H108V112.8H106ZM107 108.8Q99.8 100.8 99.8 108.0Q104.6 112 107 108.8ZM109.4 100.16Q107 110.8 104.6 100.16Q94.18 103.4 102.2 96Q94.18 88.6 104.6 91.84Q107 81.2 109.4 91.84Q119.82 88.6 111.8 96Q119.82 103.4 109.4 100.16Z",
        "details": "M110.04 96A3.04 3.04 0 1 1 103.96 96A3.04 3.04 0 1 1 110.04 96Z",
        "pivot": [
          107,
          112.8
        ],
        "motion": "flower",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 97.4,
          "y": 86.4,
          "width": 19.2,
          "height": 26.4
        }
      },
      {
        "id": "novelo",
        "name": "Novelo de lã",
        "path": "M116 65A10 10 0 1 1 96 65A10 10 0 1 1 116 65Z",
        "details": "M99 59Q110 60 113 69M97 66Q107 64 112 72M102 57Q100 69 109 73M106 74Q105 79 117 77",
        "pivot": [
          106,
          65
        ],
        "motion": "bob",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 96,
          "y": 55,
          "width": 22,
          "height": 24
        }
      },
      {
        "id": "chao",
        "name": "Grama",
        "path": "M0 113Q7 110 14 113C14 110 12 107 11 105C17 106 18 109 18 112C18 108 20 105 22 103C23 107 22 110 21 113C24 110 26 108 29 108C28 112 26 114 25 115Q39 111 49 113C49 110 47 107 46 105C52 106 53 109 53 112C53 108 55 105 57 103C58 107 57 110 56 113C59 110 61 108 64 108C63 112 61 114 60 115Q77 111 87 113C87 110 85 107 84 105C90 106 91 109 91 112C91 108 93 105 95 103C96 107 95 110 94 113C97 110 99 108 102 108C101 112 99 114 98 115Q110 110 120 113V120H0Z",
        "details": "M7 117L9 115M37 118L39 115M74 117L76 114M110 118L112 115",
        "pivot": [
          60,
          116
        ],
        "motion": "grass",
        "fill": "#fffefa",
        "foreground": true,
        "bounds": {
          "x": 0,
          "y": 103,
          "width": 120,
          "height": 17
        }
      }
    ]
  },
  "cachorrinho": {
    "id": "cachorrinho",
    "label": "O quintal do cachorrinho",
    "hint": "Pinte o cachorrinho, a casinha e a bola.",
    "kind": "garden",
    "frame": {
      "x": 25,
      "y": 31,
      "width": 72,
      "height": 79
    },
    "parts": [
      {
        "id": "sol",
        "name": "Sol",
        "path": "M26 18A9 9 0 1 1 8 18A9 9 0 1 1 26 18Z",
        "details": "M28 18L30 18 M24.78 25.78L26.19 27.19 M17 29L17 31 M9.22 25.78L7.81 27.19 M6 18L4 18 M9.22 10.22L7.81 8.81 M17 7L17 5 M24.78 10.22L26.19 8.81",
        "pivot": [
          17,
          18
        ],
        "motion": "sun",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 4,
          "y": 5,
          "width": 26,
          "height": 26
        }
      },
      {
        "id": "nuvem",
        "name": "Nuvem fofinha",
        "path": "M85 28C80 28 81 18 88 18C86 9 100 8 102 17C111 14 116 28 109 28Z",
        "details": "",
        "pivot": [
          97.5,
          19.5
        ],
        "motion": "cloud",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 81,
          "y": 10,
          "width": 33,
          "height": 19
        }
      },
      {
        "id": "casinha",
        "name": "Casinha do cachorro",
        "path": "M2 95V77L15 65L29 77V95ZM0 78L15 62L31 78L28 81L15 69L3 81Z",
        "details": "M10 95V86Q15 77 21 86V95M13 74h4",
        "pivot": [
          15,
          95
        ],
        "motion": "still",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 0,
          "y": 62,
          "width": 31,
          "height": 33
        }
      },
      {
        "id": "bolinha",
        "name": "Bolinha do quintal",
        "path": "M114 101A9 9 0 1 1 96 101A9 9 0 1 1 114 101Z",
        "details": "M96 101H114M105 92Q99 101 105 110M105 92Q111 101 105 110",
        "pivot": [
          105,
          101
        ],
        "motion": "bob",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 96,
          "y": 92,
          "width": 18,
          "height": 18
        }
      },
      {
        "id": "arbusto",
        "name": "Arbusto",
        "path": "M102.0 78.5C96 71 103.8 62 108 69.15C111.6 62 120 71 114.0 78.5Z",
        "details": "",
        "pivot": [
          108,
          78.5
        ],
        "motion": "sway",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 99.0,
          "y": 64.2,
          "width": 18.0,
          "height": 15.399999999999999
        }
      },
      {
        "id": "chao",
        "name": "Grama",
        "path": "M0 113Q7 110 14 113C14 110 12 107 11 105C17 106 18 109 18 112C18 108 20 105 22 103C23 107 22 110 21 113C24 110 26 108 29 108C28 112 26 114 25 115Q39 111 49 113C49 110 47 107 46 105C52 106 53 109 53 112C53 108 55 105 57 103C58 107 57 110 56 113C59 110 61 108 64 108C63 112 61 114 60 115Q77 111 87 113C87 110 85 107 84 105C90 106 91 109 91 112C91 108 93 105 95 103C96 107 95 110 94 113C97 110 99 108 102 108C101 112 99 114 98 115Q110 110 120 113V120H0Z",
        "details": "M7 117L9 115M37 118L39 115M74 117L76 114M110 118L112 115",
        "pivot": [
          60,
          116
        ],
        "motion": "grass",
        "fill": "#fffefa",
        "foreground": true,
        "bounds": {
          "x": 0,
          "y": 103,
          "width": 120,
          "height": 17
        }
      }
    ]
  },
  "castelo": {
    "id": "castelo",
    "label": "Um castelo de magia",
    "hint": "Pinte o castelo, a fonte e as estrelas mágicas.",
    "kind": "garden",
    "frame": {
      "x": 25,
      "y": 28,
      "width": 71,
      "height": 82
    },
    "parts": [
      {
        "id": "nuvem",
        "name": "Nuvem fofinha",
        "path": "M8 27C3 27 4 19 11 19C9 10 23 9 25 18C29 15 34 27 27 27Z",
        "details": "",
        "pivot": [
          18.0,
          19.5
        ],
        "motion": "cloud",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 4,
          "y": 11,
          "width": 28,
          "height": 17
        }
      },
      {
        "id": "estrela-magica",
        "name": "Estrelinha",
        "path": "M98 8L100.43 13.65L106.56 14.22L101.94 18.28L103.29 24.28L98 21.14L92.71 24.28L94.06 18.28L89.44 14.22L95.57 13.65Z",
        "details": "",
        "pivot": [
          98,
          17
        ],
        "motion": "star",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 89,
          "y": 8,
          "width": 18,
          "height": 18
        }
      },
      {
        "id": "estrelinha",
        "name": "Estrelinha",
        "path": "M18 49L19.35 52.14L22.76 52.45L20.19 54.71L20.94 58.05L18 56.3L15.06 58.05L15.81 54.71L13.24 52.45L16.65 52.14Z",
        "details": "",
        "pivot": [
          18,
          54
        ],
        "motion": "star",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 13,
          "y": 49,
          "width": 10,
          "height": 10
        }
      },
      {
        "id": "fonte",
        "name": "Fonte do jardim",
        "path": "M5 101Q4 110 18 110Q32 110 31 101ZM15 100V89H21V100ZM7 87Q18 97 29 87ZM16 84Q18 80 20 84L18 71Z",
        "details": "M9 103Q18 106 27 103",
        "pivot": [
          18,
          109
        ],
        "motion": "water",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 4,
          "y": 71,
          "width": 28,
          "height": 39
        }
      },
      {
        "id": "florzinha",
        "name": "Flor do jardim",
        "path": "M105 104.8H107V112.8H105ZM106 108.8Q98.8 100.8 98.8 108.0Q103.6 112 106 108.8ZM108.4 100.16Q106 110.8 103.6 100.16Q93.18 103.4 101.2 96Q93.18 88.6 103.6 91.84Q106 81.2 108.4 91.84Q118.82 88.6 110.8 96Q118.82 103.4 108.4 100.16Z",
        "details": "M109.04 96A3.04 3.04 0 1 1 102.96 96A3.04 3.04 0 1 1 109.04 96Z",
        "pivot": [
          106,
          112.8
        ],
        "motion": "flower",
        "fill": "#fffefa",
        "foreground": false,
        "bounds": {
          "x": 96.4,
          "y": 86.4,
          "width": 19.2,
          "height": 26.4
        }
      },
      {
        "id": "chao",
        "name": "Grama",
        "path": "M0 113Q7 110 14 113C14 110 12 107 11 105C17 106 18 109 18 112C18 108 20 105 22 103C23 107 22 110 21 113C24 110 26 108 29 108C28 112 26 114 25 115Q39 111 49 113C49 110 47 107 46 105C52 106 53 109 53 112C53 108 55 105 57 103C58 107 57 110 56 113C59 110 61 108 64 108C63 112 61 114 60 115Q77 111 87 113C87 110 85 107 84 105C90 106 91 109 91 112C91 108 93 105 95 103C96 107 95 110 94 113C97 110 99 108 102 108C101 112 99 114 98 115Q110 110 120 113V120H0Z",
        "details": "M7 117L9 115M37 118L39 115M74 117L76 114M110 118L112 115",
        "pivot": [
          60,
          116
        ],
        "motion": "grass",
        "fill": "#fffefa",
        "foreground": true,
        "bounds": {
          "x": 0,
          "y": 103,
          "width": 120,
          "height": 17
        }
      }
    ]
  }
};
