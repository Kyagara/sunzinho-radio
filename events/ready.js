const { greenBright, yellowBright } = require('chalk')
const GetVideoDetails = require('../helpers/getVideoDetails')
const ytdl = require('ytdl-core-discord')

module.exports = {
    name: 'ready',

    async execute(client) {
        client.radiosList.map(async (live) => {
            const radio = {
                broadcast: client.voice.createBroadcast(),
                live: await GetVideoDetails(live.url),
            }

            client.radios.set(live.genre, radio)
            client.genres.push(live.genre)

            console.log(greenBright(`Radio ${live.genre} adicionada.`))

            if (client.radios.size === client.radiosList.length) {
                console.log(greenBright('Iniciando rádios.'))

                StreamsRecursions()

                console.log(yellowBright('Rádios iniciadas.'))
            }
        })

        function StreamsRecursions() {
            console.log('Iniciando recursão.')

            const guilds = client.servers.fetchEverything()

            guilds.map(async (guild) => {
                if (guild.channelID && guild.genre) {
                    const channel = client.channels.cache
                        .filter((channel) => channel.type == 'voice')
                        .get(guild.channelID)

                    const connection = await channel.join()

                    const radio = client.radios.get(guild.genre)

                    connection.play(radio.broadcast, client.streamOptions)
                }
            })

            client.radiosList.map(async (live) => {
                const radio = client.radios.get(live.genre)

                radio.broadcast.play(
                    await ytdl(radio.live.videoURL, client.ytOptions),
                    client.streamOptions,
                )
            })

            setTimeout(StreamsRecursions, 3600000)
        }

        client.user.setActivity('música com o pessoal', {
            type: 'LISTENING',
        })

        console.log(yellowBright(`${client.user.tag} online.`))
    },
}
