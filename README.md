# Rádio #SUNzinho

<div align="center">
    <a href="https://discord.gg/c8Y5QFy4Qa">
        <img src="https://discordapp.com/api/guilds/656272932758356008/embed.png" alt="Discord #SUN Community" />
    </a>
</div>

<div align='center'>
    <a href='https://sunesports.com.br'>
        <img src='https://sunesports.com.br/sun.svg' alt='Logo da SUN' />
    </a>
</div>

Nesse repositório se encontra o bot de rádio do Discord [#SUN Community](https://discord.gg/c8Y5QFy4Qa), o Discord para a comunidade da Sunlight Esports.

Esse bot foi criado para servir seu propósito de maneira fácil e sem dor de cabeça para a pessoa que apenas quer ter uma rádio tocando de fundo no seu Discord. A SUN não precisa de muitas rádios e por isso o bot já está configurado com rádios de Lofi ([Lofi Girl](https://www.youtube.com/watch?v=5qap5aO4i9A)) e Progressive House ([Monstercat Silk](https://www.youtube.com/watch?v=d8Oc90QevaI)), porém é fácil trocar, remover e adicionar mais rádios. Para evitar conflito com outros bots ele também conta com um comando que altera e salva um prefixo especificado.

`sunzinho-radio` funciona da seguinte forma:

-   Ele irá verificar se há salas já adicionadas no banco de dados
-   Caso exista alguma sala, ele irá se conectar nela (limite de uma sala de voz por Guilda)
-   Ele irá verificar a rádio que está relacionada ao canal conectado
-   Ele irá efetuar o procedimento de baixar -> converter (caso necessário) -> transmitir para o canal de voz

A VMs da Oracle usadas para hospedar os bots da SUN costumam fechar a conexão de voz e nenhuma mensagem de erro ser transmitida no terminal e por isso a stream feita pelo `ytdl-core-discord` é refeita toda hora.

## Permissões

`sunzinho-radio` precisa das seguintes permissões para funcionar:

-   `Ver canais` - usado para ver canais de texto e voz, não incluindo canais privados.
-   `Conectar` - usado para se conectar à um canal de voz.
-   `Falar` - usado para tocar a rádio do canal de voz.

E dessas permissões para melhorar o uso do bot:

> Essas permissões não são necessárias porém ajudam bastante pois elas são usadas como forma de fazer comentários sobre os comandos utilizados.

-   `Mandar mensagens` - usado como forma de se comunicar com o usuário.
-   `Inserir links` - usado para incorporar links em mensagens para apresentar melhor informações.

## Comandos

`sunzinho-radio` conta com os seguintes comandos:

-   `help`: Exibe uma lista de comandos disponíveis e configurações atuais.
-   `prefix`: Muda o prefixo padrão para o prefixo especificado.
-   `join`: Conecta no canal de voz do usuário e o salva no banco de dados.
-   `play`: Adiciona a rádio especificada para ser tocada.
-   `radio`: Informações sobre a rádio selecionada atualmente.
