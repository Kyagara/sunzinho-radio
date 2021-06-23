const SimpleEmbed = require('../helpers/simpleEmbed')

module.exports = {
    name: 'join',
    permissions: 'ADMINISTRATOR',

    async execute(client, message, guild, args) {
        const channel = message.member.voice

        if (!channel.channel) {
            return message.reply('você não está conectado em um canal de voz!')
        }

        const connection = await channel.channel.join()

        if (guild.genre) {
            const radio = client.radios.get(guild.genre)

            connection.play(radio.broadcast, client.streamOptions)
        }

        if (guild.channelID == channel.channelID) return

        if (guild.channelID) {
            client.servers.update(message.guild.id, {
                channelID: channel.channelID,
            })
        } else {
            client.servers.ensure(message.guild.id, {
                channelID: channel.channelID,
            })
        }

        const genres = client.genres.join(' | ')

        return message.channel.send(
            SimpleEmbed(
                ':loud_sound: Canal de voz salvo',
                channel.channel.name,
                `Canal de voz \`\`${channel.channel.name}\`\` foi salvo! Use o comando \`\`play ${genres}\`\` para adicionar uma rádio.`,
                client.user.avatarURL(),
            ),
        )
    },
}
