const { MessageEmbed } = require('discord.js')
const SimpleEmbed = require('../helpers/simpleEmbed')

module.exports = {
    name: 'play',
    permissions: 'ADMINISTRATOR',

    async execute(client, message, guild, args) {
        if (!args[0]) return message.reply('argumentos insuficientes.')

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

        const selectedGenre = args[0].toLocaleLowerCase()

        if (guild.genre == selectedGenre) return

        const genres = client.genres.join(' | ')

        if (!client.genres.includes(selectedGenre)) {
            return message.channel.send(
                SimpleEmbed(
                    ':x: Erro',
                    'Rádio inválida',
                    `Você não especificou uma rádio válida, adicione \`\`${genres}\`\` após o comando \`\`play\`\`.`,
                    client.user.avatarURL(),
                ),
            )
        }

        const channel = client.channels.cache
            .filter((channel) => channel.type == 'voice')
            .get(guild.channelID)

        const connection = await channel.join()

        const radio = client.radios.get(selectedGenre)

        connection.play(radio.broadcast, client.streamOptions)

        if (guild.genre) {
            client.servers.update(message.guild.id, {
                genre: selectedGenre,
            })
        } else {
            client.servers.ensure(message.guild.id, {
                genre: selectedGenre,
            })
        }

        message.channel.send(
            SimpleEmbed(
                `:musical_note: Tocando rádio ${selectedGenre}`,
                channel.name,
                `Rádio salva e tocando \`\`${selectedGenre}\`\` no canal de voz ${channel.name}!`,
                client.user.avatarURL(),
            ),
        )

        const video = radio.live

        const radioEmbed = new MessageEmbed()
            .setAuthor(video.channelName, video.channelAvatar, video.channelURL)
            .setTitle(`Este servidor está escutando:`)
            .setColor(0xfcd34d)
            .setThumbnail(client.user.avatarURL())
            .setImage(video.videoThumbnail)
            .addField(video.videoTitle, video.videoURL)

        return message.channel.send(radioEmbed)
    },
}
