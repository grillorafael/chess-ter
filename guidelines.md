# Guideline de implementação do jogo

## Classe Game
Responsável por exibir a interface gráfica corretamente, dado um retorno de organização atual da classe Board.

## Classe Board
Responsável por controlar as jogadas e os turnos de jogadores.

Para cada jogo, o Board deve ser iniciado sendo passados os dois jogadores, branco e preto.

Cabe ao Board no início de cada jogo instanciar todas as peças, além de colocar cada peça em seu lugar, e controlar
onde está cada uma delas, ele deverá poder retornar e definir a organização atual das peças para que os jogadores
automáticos possam trabalhar em cima das jogadas.

Na vez de cada jogador, será chamada uma função específica, da api de jogador, informando que é a sua vez de jogar,
a jogada acaba quando um jogador confirmar um movimento.

A classe board deverá disponibilizar ainda outros dois métodos, um para marcar posicoes específicas do board (a fim de
indicar quais são as jogadas possiveis para o jogador humano) e outro para conferir se uma posição está disponível ou
se tem alguma peça (caso positivo: qual) naquela posição.


Estado de jogo: em alguns momentos, o jogador pode avisar um estado de jogo (Xeque), este estado pode ser consultado a
qualquer momento por qualquer jogador, retornando as peças, posicoes e jogadores envolvidos.

Por ultimo, o Board deve guardar quais peças já sairam do jogo e quais ainda estão no jogo.


## Classe Piece
A classe base de peça deve ```implementar``` a estrutura que uma peça deve ter. Essa estrutura contempla retornar todas
as posições possíveis de jogadas (a serem validadas pelo Board), o jogador dono dessa peça, e possivelmente (Somente no
caso do rei, se o roque é possivel).

Cada classe herdada da classe Piece deve implementar a sua estratégia de jogadas, e somente o rei deve implementar o
roque.


## Classe Player
O jogador deve poder ter uma cor, que ele deve guardar até o final da partida. Um jogador deve conhecer suas
peças, mas interagir apenas com o board, pedindo informações e movimentacoes referentes a cada peça. Dessa forma, toda
a logica de movimentação deve ser feita pelo Board, o jogador apenas escolhe qual peça mover.

## Classe AutoPlayer
A classe AutoPLayer deve jogar automaticamente baseada em sua politica de IA, utilizando apenas os metodos fornecidos
por Player.



## Classe HumanPlayer
A classe HumanPlayer deve implementar toda a lógica necssária para a interaçao humana, assim como interagir com o Board
para ajudar o jogador no que for necessário.