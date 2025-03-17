# Reserva de Salas - Teste Técnico – Desenvolvedor Vue3, Quasar e Node.js (Express)

## Objetivo  
Criar um sistema de agendamento de salas de reunião para uma empresa, permitindo que os usuários façam login e reservem uma das três salas disponíveis. O sistema deve ter uma interface clara e intuitiva, além de uma API organizada e funcional.

## Sistema  
- O sistema foi dividido em duas pastas: **Backend**, para os componentes da API, e **Frontend**, para os componentes de interface. Cada uma delas está organizada em sua arquitetura padrão.  
- O **Backend** foi desenvolvido em Node.js e Express, conforme solicitado. Para o banco de dados, optei por utilizar o MongoDB, conectado ao Node via Prisma, por ser uma alternativa simples que atendeu às minhas necessidades.  
- O **Frontend** foi desenvolvido utilizando Vue3 e Quasar.  

## Instalação e Compilação  

- Para realizar a instalação do sistema, recomenda-se o uso do Node.js na versão **v18.20.4** (versão na qual o sistema foi desenvolvido) ou superior.  
- As instalações serão realizadas utilizando o gerenciador de pacotes padrão do Node.js (npm/npx).  

### Backend  
- Para a compilação do backend, é necessário adicionar o arquivo **.env** na pasta raiz do Backend (no mesmo nível do arquivo **package.json**). Por se tratar de um arquivo de configuração do banco de dados, ele foi enviado como anexo ao e-mail.  
- Para iniciar, utilize o comando de instalação na pasta do projeto do backend:  
```console
npm install
```

- Em seguida, execute o comando de inicialização do Prisma:
```console  
npx prisma generate
```

> Esse comando é necessário para criar o schema do Prisma e configurar as variáveis de ambiente.  
- Por fim, execute o comando para subir o servidor:
```console  
npm run dev
```


Se tudo ocorrer conforme o esperado, uma mensagem será exibida no console, indicando que o servidor foi iniciado com sucesso.  

### Frontend  
- Para executar o frontend, utilize o comando de instalação na pasta raiz do projeto:
```console  
npm install
```

- Em seguida, execute o comando do Quasar para iniciar a aplicação:
```console  
quasar dev
```

