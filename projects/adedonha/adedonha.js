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

// variavel usada para salvar a pontuacao de cada rodada do jogo (por isso um array/lista/vetor) caso o jogador queira jogar varias vezez, iniciado em 0 na primeira posicao por que a pontuacao do jogador comeca em 0
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

    // variavel para guardar e reutilizar mais facilmente a string de Pontos da Rodada que fica na tabela
    const pontosDaRodadaString = "| Pontos da rodada |";


    // variavel number que usamos com uma formula para calcular quantas vezes sera repetido o caracter "-" simplificando o codigo
    const linhaSeparadoraLength = (tamanhoCelula * categorias.length) + categorias.length + pontosDaRodadaString.length;

    // variavel para receber todos os "-" numa unica string, foi usado a variavel acima linhaSeparadoraLength e essa variavel linhaSeparadora para que o tamanho seja variavel e nao fixo, no caso do jogador decidir customizar os temas por exemplo, o tamanho da linha tambem irá mudar, com essa solucao o tamanho da linha se adequara automaticamente
    let linhaSeparatora = "";

    // aqui esta acontecendo o loop para a variavel linhaSeparadora receber as quantidades de "-" corretas
    for (let index = 0; index < linhaSeparadoraLength; index++) {
        linhaSeparatora = linhaSeparatora + "-";
    }

    // funcao para desenhar a linha na tela
    function desenharLinha() {
        console.log(linhaSeparatora);
    }

    // Função para desenhar uma célula da tabela que é onde fica o nome dos temas e as respostas do jogador
    function desenharCelula(conteudo) {

        // aqui linha recebe inicialmente um | + o conteudo seja ele o nome do tema ou a respota do jogador, tanto faz
        let linha = `| ${conteudo}`;

        // aqui linha vai rebendo espacos vazios ate o tamanho da celula, para que fique um espacamento
        for (let index = conteudo.length; index < tamanhoCelula - 1; index++) {
            //aqui linha recebe os espacos vazios
            linha = linha + " ";
        }
        return linha;
    }

    // desenhando linha separadora
    desenharLinha();

    // aqui foi declarado a variavel que recebe todo o cabecalho da adedonha onde está os temas, foi utilizado um map em categorias que itera por todo o conteudo de categorias e retorna um novo array
    // map é uma funcao dos arrays para iterar cada conteudo/indice do array podendo altera-los, depende do caso, e no final retorna um novo array, por isso que foi atribuido a variavel cabecalho, que na verdade e uma string por conta do .join('')
    // o join() é uma funcao dos arrays que une todos eles e no meio coloca o que esta no primeiro parametro da funcao que nesse caso é uma string vazia: "", assim todo o conteudo do array junta e se torna uma string só
    let cabecalho = categorias.map(categoria => desenharCelula(categoria)).join('');

    // Desenhar cabeçalho com categorias + a coluna de pontos da rodada
    console.log(cabecalho + pontosDaRodadaString);

    // desenhando linha separadora
    desenharLinha();

    // aqui foi declarado a variavel que recebe a linha da adedonha onde está as respostas do jogador, foi utilizado um map em respostas que itera por todo o conteudo de respostas e retorna um novo array 
    let linhaDaRodada = respostas.map((resposta) => desenharCelula(resposta)).join('');


    // aqui o array linhaRodada que recebe todas as linhas de respotas de todas as rodadas do jogador, adiciona em sua colecao mais uma linha de rodada
    linhaRodada.push(linhaDaRodada)

    // aqui usamos o forEach para iterar todo o conteudo de linhaRodada, assim possibilitando printa-las na tela
    // o forEach nesse caso está recebendo dois parametros
    // no primeiro parametro (linha) esta o conteudo de fato do momento da iteracao
    // no segundo parametro (index) esta o indice do conteudo de linhaRodada
    linhaRodada.forEach((linha, index) => {

        // aqui usamos uma verificacao de que se index for maior que 0, ou seja se no momento da iteracao estiver acima da primeira rodada do jogo, é printado na tela mais uma linha separadora para separar cada linha da rodada
        if (index > 0) {
            // desenhando linha separadora
            desenharLinha();
        }

        // aqui declaramos uma variavel pontuacaoString para guardar a string mais facilmente
        let pontuacaoString = `| ${pontuacao[index]}`

        // aqui foi a linha da rodada foi concatenado a pontuacaoString
        linha = linha + pontuacaoString;

        // aqui usamos um for para adicionar espacamentos no final do numero da pontuacao e fechar com o "|"
        for (let i = pontuacaoString.length; i < pontosDaRodadaString.length; i++) {

            // aqui linha vai recebendo os espacamentos
            linha = linha + " ";

            // aqui verifica se i esta no final da sua interacao e assim adicionado o "|" ao final
            if (i == pontosDaRodadaString.length - 2) {
                linha = linha + "|";
            }
        }
        // aqui e printado a linha
        console.log(linha)

        // aqui mostra como seria feito usando o padEnd, mas preferimos fazer da forma tradicional para praticar a logica de programacao
        // console.log(linha + `| ${pontuacao[index]}`.padEnd(pontosDaRodadaString.length - 2) + "|");
    })

    // desenhando linha separadora
    desenharLinha();
}


/** 
 * funcao para solicitar as respostas do usuario
 * 
 * @param {string[]} categorias (todos os temas da adedonha)
 * @param {string} letra (a letra sorteada)
*/
function solicitarRespostas(categorias, letra) {
    // aqui e declarado um array para receber as respostas do jogador
    let respostas = [];

    // aqui foi usado um forEach para iterar cada tema da adedonha
    categorias.forEach(categoria => {
        // variavel para guardar a resposta digitada pelo jogador, usando o readline
        let resposta;
        // aqui foi declarado uma variavel para ser utilizada dentro do dowhile, ja foi declarada como true, neste momento ja estamos considerando que o usuario errou
        let errou = true;
        do {
            // para limpar o terminal
            console.clear();

            // aqui pegando a respota do jogador
            resposta = readline.question(`Digite um(a) ${categoria} que comece com a letra "${letra}": `);

            // aqui esta sendo verificado se resposta tem algum valor, por que acontecia de que quando o usuario apenas apertava enter, a variavel resposta ficava undefined assim logo depois lancado um erro e travando o programa, entao aqui dessa forma isso nao acontece
            if (resposta) {
                // respota tendo algum valor aqui e verificado se a primeira letra da resposta é igual a letra sorteada, caso sim...
                if (resposta[0].toLowerCase() === letra) {
                    // errou se torna false e o while pode agora ser interrompido
                    errou = false;

                    // aqui alteramos resposta para que a sua primeira letra fique em maiusculo
                    resposta = resposta.charAt(0).toUpperCase() + resposta.substring(1);

                    // aqui é o que adiciona a pontuacao a resposta do usuario, caso o usuario tenha escrito mais de uma letra, é considerado que a sua palavra é valida, fizemos dessa forma por que nao seria possivel pelo codigo simplesmente verificar se uma palavra existe ou nao, precisariamos de um banco de dados, api, lib, mas preferimos fazer dessa forma
                    if (resposta.length > 1) {
                        adicionaPontuacao();
                    }
                }
            }
        } while (errou);
        // aqui respostas recebe a nova resposta do jogador
        respostas.push(resposta);
    });

    return respostas;
}

// aqui fica o array de categorias
let categorias = ["Nome", "Animal", "Fruta", "Cor", "Objeto"];

// variavel para verificar se o usuario deseja alterar os temas
let customizar = false;

// aqui pegando a respota do jogador
let resposta = readline.question("Voce deseja customizar os temas? (s/n): ");

// aqui é sorteado a letra
let letra = sortearletra();

// variavel para verificar se o jogador deseja continuar jogando
let jogarNovamente = false;

// aqui se a primeira letra do usuario for "s", entendesse que o usuario deseja customizar os temas
if (resposta[0].toLowerCase() === "s") {
    customizar = true;
}

// se customizar for true, o array de categorias é resetado
if (customizar) {
    categorias = [];
}

// aqui declaramos uma funcao para indicar o iniciamento do jogo
function startGame() {
    // aqui utilizamos um dowhile para o sistema de jogar novamente
    do {
        // aqui se customizar for true e for a primeira rodada do jogo, o usuario tera que adicionar os seus proprios temas para jogar
        if (customizar && rodada == 0) {
            do {
                // aqui categorias recebe os temas digitados pelo jogador
                categorias.push(readline.question("Digite o nome da categoria: "));
                // aqui pega a respota do usuario
                resposta = readline.question("Voce quer continuar adicionando? (s/n): ");
            } while (resposta.toLowerCase() === "s");
        }
        // limpa o terminal
        console.clear();
        // aqui e declarado uma variavel que guarda todas as respotas do jogador naquela rodada especifica
        let respostasJogador = solicitarRespostas(categorias, letra);

        // aqui é chamada a funcao de desenhar a tabela inteira
        desenharTabelaAdedonha(categorias, respostasJogador);

        // aqui pega a respota do usuario
        resposta = readline.question("Voce quer continuar jogando? (s/n): ");

        // aqui se a primeira letra do usuario for "s", entendesse que o usuario deseja continuar jogando
        if (resposta[0].toLowerCase() === 's') {
            jogarNovamente = true;
        }

        // aqui a letra é sorteada novamente
        letra = sortearletra();

        // aqui pontuacao recebe um novo valor no próximo indice, caso nao faça isso, dará um erro ao tentar atribuir um valor ao indice dessa forma: pontuacao[1] = 0 por exemplo
        pontuacao.push(0);

        // aqui vai para proxima rodada, acrescentando 1 a variavel rodada
        rodada++;
    } while (jogarNovamente);
}

// aqui a funcao de iniciar o jogo é chamada
startGame();