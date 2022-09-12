
# Teste Refero

## Como executar o projeto
1. Clone o repositório
```
  git clone https://github.com/franconoronha/TesteRefero.git
  cd ./TesteRefero
```

2. Crie um schema vazio no MySQL ou utilize um já existente.
3. Crie um arquivo .env com base no exemplo disponível na pasta server para a conexão com o MySQL.
```
    DATABASE_URL="mysql://username:password@host:port/nomedobanco"
```

4.Execute os comandos
```
  npm run instalacao
  cd ./pet_shop
  npm run rodar-app
```

npm run instalacao irá instalar as dependências e criar as tabelas no banco
npm run rodar-app inicializará o servidor node e o frontend simultaneamente 

## Possíveis Melhoras

- Criar uma tabela de tipos (espécies) para ter escalabilidade (ex: adicionar hamsters)
- Pensei em utilizar o Tailwind CSS, porém não era tanta coisa então acabei fazendo na mão
- Também pensei em abrir uma modal do dono no clique para mostrar todos os seus pets, mas efetivamente basta buscar pelo seu nome