
<div style="display: flex; align-items: center; justify-content: flex-start;">
	<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB Logo" width="80" height="80"/>
	<h1 style="margin-left: 16px;">MongoDB Project </h1>
</div>


O **MongoDB Project** é uma plataforma acadêmica de streaming educacional destinada à promoção do aprendizado, desenvolvimento de competências e difusão do conhecimento. Este projeto foi concebido para a disciplina de Banco de Dados 2025.1. O sistema permite que estudantes acessem videoaulas, interajam com instrutores, realizem comentários, recebam certificados digitais e acompanhem seu progresso em múltiplos cursos e disciplinas. A solução foi desenvolvida com foco em inovação pedagógica, gestão de conteúdos, análise de desempenho e integração de recursos didáticos, visando apoiar instituições, educadores e aprendizes em ambientes de aprendizagem modernos e colaborativos.

---

## 🗂️ Estrutura do Projeto


```
├── app.js              # Arquivo principal do servidor Node.js
├── config/             # Configurações gerais do projeto (ex: conexão com banco)
├── controllers/        # Lógica das rotas e regras de negócio (User, Student, Instructor)
├── database/           # Inicialização e configuração do MongoDB
├── models/             # Modelos das entidades do banco (User, Course, etc)
├── scripts/            # Scripts utilitários
│   ├── queries/        # Consultas e relatórios avançados
│   └── seeders/        # Scripts para popular o banco com dados fictícios
├── dist/               # Arquivos compilados (JavaScript gerado pelo TypeScript)
├── package.json        # Gerenciamento de dependências e scripts do projeto
├── tsconfig.json       # Configuração do compilador TypeScript
├── requirements.txt    # Dependências Python (se necessário)
├── README.md           # Documentação do projeto
```

---

## 🛠️ Bibliotecas e Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **MongoDB** & **Mongoose**
- **Express.js**
- **JavaScript**

---

<div align="center">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" width="50" height="50"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" width="50" height="50"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" width="50" height="50"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express.js" width="50" height="50"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" width="50" height="50"/>
</div>

---

## 🚀 Instalação

1. Clone o repositório:
	```bash
	git clone https://github.com/arllindosp/MongoDB-project.git
	```
2. No diretório principal do projeto, instale as dependências:
	```bash
	npm install
	npm install mongoose typescript ts-node
	```
3. Baixe e instale o MongoDB Compass e o mongosh pelo site oficial:
	- [MongoDB Compass](https://www.mongodb.com/products/compass)
	- [mongosh](https://www.mongodb.com/try/download/shell)
	Após descompactar o mongosh, adicione o caminho da pasta (path) do executável ao Windows para poder usar o comando no terminal.
4. Abra o MongoDB Compass, clique em "Nova Conexão" e crie uma conexão com o nome que preferir.
5. Copie a string de conexão gerada por essa conexão.
6. Navegue até o arquivo `database/mongo.ts` no diretório do projeto e ajuste a configuração do banco de dados, colando a string de conexão no local destacado no código. Por exemplo:

	```ts
	// database/mongo.ts
	import mongoose from 'mongoose';

	const uri = 'COLE_AQUI_SUA_STRING_DE_CONEXAO'; // <--- Substitua por sua string

	mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
	```

---

## 🏃 Como rodar

> ⚠️ **Atenção:** Certifique-se de que o MongoDB Compass está aberto e a conexão está estabelecida antes de rodar o projeto!

1. No diretório raiz do projeto, compile o TypeScript:
	 ```bash
	 npx tsc
	 ```
2. Ainda no diretório principal, popule o banco de dados com dados fictícios:
	 ```bash
	 node dist/scripts/seeders/seedAll.js
	 ```
3. Execute o núcleo do sistema para visualizar um resumo das estatísticas do banco de dados:
	 ```bash
	 node app.js
	 ```
4. Para executar consultas e relatórios, utilize os comandos abaixo no diretório principal:
	 - Consulta de transações:
		 ```bash
		 node dist/scripts/queries/consultaTransacoes.js
		 ```
		 > Exibe todas as transações realizadas no sistema.
	 - Query avançada:
		 ```bash
		 node dist/scripts/queries/queryAvancada.js
		 ```
		 > Relatórios avançados, estatísticas de alunos, cursos e áreas de conhecimento.
	 - Query de tópicos demo:
		 ```bash
		 node dist/scripts/queries/queryTopicsDemo.js
		 ```
		 > Demonstração de tópicos e agrupamentos de cursos.
	 - Query 1:
		 ```bash
		 node dist/scripts/queries/query1.js
		 ```
		 > Consulta personalizada 1 (ver código para detalhes).
	 - Query 2:
		 ```bash
		 node dist/scripts/queries/query2.js
		 ```
		 > Consulta personalizada 2 (ver código para detalhes).
	 - Query 3:
		 ```bash
		 node dist/scripts/queries/query3.js
		 ```
		 > Consulta personalizada 3 (ver código para detalhes).

---

## ✨ Funcionalidades Principais

- Cadastro e autenticação de usuários, alunos e instrutores
- Criação e gerenciamento de cursos, playlists e aulas
- Comentários em cursos e aulas
- Progresso do aluno em cada curso
- Certificados digitais
- Carrinho de compras e transações
- Relatórios e queries avançadas

---

## 🛠️ Scripts Úteis

- Popular banco: `node dist/scripts/seeders/seedAll.js`
- Consultas: `node dist/scripts/queries/consultaTransacoes.js`, `queryAvancada.js`, etc.

---



## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se livre para abrir issues e pull requests.

---

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo LICENSE para mais detalhes.
