# Problema a ser resolvido

## Descrição

Suponha que você seja do time de desenvolvimento de uma empresa em ascensão de vendas
online de roupas, pela grande diversidade de modelos e estampas de roupas, existe uma grande
variedade de clientes que vai aumentando cada dia mais, como por exemplo Geeks e Nerds,
Minimalistas, Atletas, Esportistas, etc.

Por conta desse cenário, surge a necessidade de pesquisa de satisfação do cliente para cada
público específico, e a necessidade de salvar os registros de respostas a essas pesquisas
realizadas; É aí que você entrará em ação e criará uma solução para atender essa demanda

## Casos de uso (Endpoint's)
1. Criar uma pesquisa de satisfação
o Validar os dados enviados para gerar uma nova pesquisa.
o Salvar as perguntas da pesquisa em um banco de dados.
o Todas as pesquisas de satisfação devem ter ao menos as seguintes perguntas: Públicoalvo, Quantidade de estrelas e e-mail para contato.
2. Atualizar uma pesquisa de satisfação
o Validar se a pesquisa que irá ser atualizada, ainda não existe na base.
o Salvar uma data de atualização.
3. Preencher uma pesquisa de satisfação.
o Validar se os dados enviados correspondem as perguntas cadastradas na pesquisa.
o Salvar o preenchimento.
4. Listar os preenchimentos pelo Público-alvo.
o Poder escolher se quer ordenar pela Quantidade de estrelas de forma crescente ou
decrescente.