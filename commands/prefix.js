const SimpleEmbed = require('../helpers/simpleEmbed')

module.exports = {
    name: 'prefix',
    permissions: 'ADMINISTRATOR',

    async execute(client, message, guild, args) {
        if (!args[0]) {
            return message.reply('argumentos insuficientes.')
        }

        const selectedPrefix = args[0]

        if (selectedPrefix === guild.prefix) return

        client.servers.update(message.guild.id, {
            prefix: selectedPrefix,
        })

        return message.channel.send(
            SimpleEmbed(
                `:pushpin: Prefixo trocado`,
                `${message.author.username} trocou o prefixo`,
                `O prefixo desta guilda foi atualizado para \`\`${selectedPrefix}\`\`!`,
                client.user.avatarURL(),
            ),
        )
    },
}
