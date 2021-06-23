const { MessageEmbed } = require('discord.js')
const SimpleEmbed = require('../helpers/simpleEmbed')

module.exports = {
    name: 'radio',
    permissions: 'SEND_MESSAGES',

    async execute(client, message, guild, args) {
        if (!guild.channelID) {
            return message.channel.send(
                SimpleEmbed(
                    ':x: Erro',
                    'Canal de voz não encontrado',
                    'Você ainda não adicionou um canal de voz usando o comando ``join``.',
                    client.user.avatarURL(),
                ),
            )
        }

        if (!guild.genre) {
            const channel = client.channels.cache
                .filter((channel) => channel.type == 'voice')
                .get(guild.channelID)

            return message.channel.send(
                SimpleEmbed(
                    ':x: Erro',
                    'Rádio não encontrada',
                    `Você ainda não adicionou uma rádio para ser tocada no canal de voz \`\`${channel.name}\`\`.`,
                    client.user.avatarURL(),
                ),
            )
        }

        const radio = client.radios.get(guild.genre)
        const video = radio.live

        const embed = new MessageEmbed()
            .setAuthor(video.channelName, video.channelAvatar, video.channelURL)
            .setTitle(`Este servidor está escutando:`)
            .setColor(0xfcd34d)
            .setThumbnail(client.user.avatarURL())
            .setImage(video.videoThumbnail)
            .addField(video.videoTitle, video.videoURL)

        return message.channel.send(embed)
    },
}
