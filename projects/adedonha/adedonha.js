// usado para inputs do jogador
let readline = require('readline-sync');


// funcao para sortear a letra
function sortearletra() {
    //array com todas as letras do alfabeto
    const alfabeto = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'z'];

    // indice é um numero sorteado de 0 ate 25
    const indice = Math.floor(Math.random() * alfabeto.length);

    // aqui é retornado da funcao a letra sorteada
    return alfabeto[indice];
}

//variavel usada para salvar em qual rodada esta o jogo, setamos como 0 por que ela sera usada em arrays
let rodada = 0;

// variavel usada para salvar a pontuacao de cada rodada do jogo (por isso um array/lista/vetor) caso o jogador queira jogar varias veze
let pontuacao = [0];

// variavel usada para guardar todas as respostas do jogador em cada rodada do jogo (por isso um array/lista/vetor)
let linhaRodada = [];

//funcao usada para adicionar a pontuacao caso o jogador acerte a palavra
function adicionaPontuacao() {
    pontuacao[rodada] += 10; // pontuacao[rodada] por que pontuacao e um array como foi visto anteriormente
}


/** 
 * funcao para desenhar a tabela da adedonha
 * 
 * @param {string[]} categorias (todos os temas da adedonha)
 * @param {string[]} respostas (todas as respostas do jogador)
*/
function desenharTabelaAdedonha(categorias, respostas) {
    const tamanhoCelula = 15; // Tamanho fixo para células da tabela

    const pontosDaRodadaString = "| Pontos da rodada |"
    const linhaSeparadoraLength = (tamanhoCelula * categorias.length) + categorias.length + pontosDaRodadaString.length;

    /** 
     * funcao para desenhar a linha separadora
     * 
     * @param {number} linhaLength (tamanho da linha)
    */
    function desenharLinha(linhaLength) {
        let linha = "";
        for (let index = 0; index < linhaLength; index++) {
            linha = linha + "-";
        }
        console.log(linha);
    }

    // Função para desenhar uma célula da tabela
    function desenharCelula(conteudo) {
        // aqui padEnd não possui um segundo parametro, então nesse caso a string será prenchida com espaços vazios
        return `| ${conteudo.padEnd(tamanhoCelula - 1)}`;
    }

    // Desenhar cabeçalho com categorias
    desenharLinha(linhaSeparadoraLength);
    let cabecalho = categorias.map(categoria => desenharCelula(categoria)).join('');

    console.log(cabecalho + pontosDaRodadaString);
    desenharLinha(linhaSeparadoraLength);

    // Desenhar linha de respostas do jogador
    let linhaDaRodada = categorias.map((categoria, index) => desenharCelula(respostas[index])).join('');

    linhaRodada.push(linhaDaRodada)
    linhaRodada.forEach((linha, index) => {
        if (index > 0) {
            desenharLinha(linhaSeparadoraLength);
        }
        console.log(linha + `| ${pontuacao[index]}`.padEnd(19) + "|");
    })
    desenharLinha(linhaSeparadoraLength);
}


function solicitarRespostas(categorias, letra) {
    let respostas = [];

    categorias.forEach(categoria => {
        let resposta;
        let errou = true;
        do {
            console.clear();
            resposta = readline.question(`Digite um(a) ${categoria} que comece com a letra "${letra}": `);
            if (resposta) {
                if (resposta[0].toLowerCase() == letra) {
                    errou = false;
                    resposta = resposta.charAt(0).toUpperCase() + resposta.substring(1);
                    if (resposta.length > 1) {
                        adicionaPontuacao();
                    }
                }
            }
        } while (errou); // Garante que a resposta começa com a letra correta

        respostas.push(resposta);
    });

    return respostas;
}

const categoriasPreSelecionada = ["Nome", "Animal", "Fruta", "Cor", "Objeto"];
let customizar = false;
let resposta = readline.question("Voce deseja customizar os temas? (s/n): ");
let categoriaCustom = [];
let letra = sortearletra();
let jogarNovamente = false;


if (resposta[0].toLowerCase() === "s") {
    customizar = true;
}

do {
    jogarNovamente = false;
    if (customizar) {
        do {
            categoriaCustom.push(readline.question("Digite o nome da categoria: "));
            resposta = readline.question("Voce quer continuar adicionando? (s/n): ");
        } while (resposta.toLowerCase() === "s");

        console.clear();
        const respostasJogador = solicitarRespostas(categoriaCustom, letra);
        desenharTabelaAdedonha(categoriaCustom, respostasJogador);
        resposta = readline.question("Voce quer continuar jogando? (s/n): ");
        if (resposta[0].toLowerCase() === 's') {
            jogarNovamente = true;
        }
    } else {
        console.clear();
        const respostasJogador = solicitarRespostas(categoriasPreSelecionada, letra);
        desenharTabelaAdedonha(categoriasPreSelecionada, respostasJogador);
        resposta = readline.question("Voce quer continuar jogando? (s/n): ");
        if (resposta[0].toLowerCase() === 's') {
            jogarNovamente = true;
        }
    }
    letra = sortearletra();
    pontuacao.push(0);
    rodada++;
} while (jogarNovamente);