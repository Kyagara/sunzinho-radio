const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'help',
    permissions: 'SEND_MESSAGES',

    async execute(client, message, guild, args) {
        let radio = ''
        let channel = ''
        const genres = client.genres.join(' | ')

        if (guild.channelID) {
            channel = `<#${guild.channelID}>`
        } else {
            channel = '``Nenhum``'
        }

        if (guild.genre) {
            radio = guild.genre
        } else {
            radio = 'Nenhuma'
        }

        const embed = new MessageEmbed()
            .setTitle(`:notepad_spiral: Comandos disponíveis:`)
            .setDescription(
                `Prefixo atual: \`\`${guild.prefix}\`\` | Canal atual: ${channel} | Rádio atual: \`\`${radio}\`\``,
            )
            .setColor(0xfcd34d)
            .setThumbnail(client.user.avatarURL())
            .addFields([
                {
                    name: 'join',
                    value:
                        'Conecta e salva um canal de voz como sala de rádio.',
                },
                {
                    name: 'prefix <prefixo>',
                    value:
                        'Muda o prefixo padrão para o prefixo especificado na mensagem.',
                },
                {
                    name: 'play <genero>',
                    value: `Adiciona a rádio especificada para ser tocada. Rádios disponíveis: \`\`${genres}\`\``,
                },
                {
                    name: 'radio',
                    value: 'Informações sobre a rádio selecionada atualmente.',
                },
            ])

        return message.channel.send(embed)
    },
}
