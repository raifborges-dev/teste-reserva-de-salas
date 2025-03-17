# Reserva de Salas - Teste Técnico – Desenvolvedor Vue3, Quasar e Node.js (Express)

## Objetivo
Criar um sistema de agendamento de salas de reunião para uma empresa, permitindo que os usuários façam login e reservem uma das três salas disponíveis. O sistema deve ter uma interface clara e intuitiva, além de uma API organizada e funcional.

## Sistema
O sistema foi dividido em duas pastas, Backend para os componentes da API e Frontend para os componentes de interface, cada uma delas está dividido em sua arquitetura padrão.
O Backend foi desenvolvido em Node.js e Express como solicitado, para o banco, resolvi usar o MongoDB, conectado ao Node via Prisma, por ser uma alternativa fácil que supria a minha demanda.
O Frontend foi desenvolvido usando Vue3 e Quasar.


## Instalação e Compilação

Para realizar a instalação do sistema é recomendado o node v18.20.4 (Versão a qual o sistema foi desenvolvido) ou maior. 
As instalações serão feitas utilizando o gerenciador de pacotes padrão do node (npm, npx).

**Backend**
Para a compilação do backend é necessário adicionar o arquivo .env na pasta raiz Backend (Na mesma camada em que o arquivo package.json), por se tratar de um arquivo de configurações de banco, ele foi enviado anexado ao e-mail.
Para iniciar, iremos utilizar o comando de instalação na pasta do projeto de backend; -> npm install
Depois o comando de inicialização do Prisma; -> npx prisma generate
(Esse comando é necessário para criar o schema do Prisma e setar as variáveis do ambiente)
E por último o comando para subir o servidor. -> npm run dev
Se tudo correr como previsto, no console, haverá uma mensagem avisando que o servidor foi iniciado.

**FrontEnd**
Para rodar o front, utilizaremos o comando de instalação na pasta raiz do projeto front; -> npm install
Depois o comando do Quasar para iniciar a aplicação. -> quasar dev
