require('dotenv').config()
const { readdir } = require('fs')
const { greenBright } = require('chalk')
const { Client, Collection } = require('discord.js')
const Enmap = require('enmap')

const client = new Client()

client.commands = new Collection()
client.cooldown = new Set()
client.servers = new Enmap('servers')

client.radios = new Collection()
client.radiosList = require('./radios.json')
client.genres = new Array()

// Opções do ytdl-core-discord
client.ytOptions = {
    highWaterMark: 1 << 100,
}

// Opções do Broadcast
client.streamOptions = {
    type: 'opus',
    volume: false,
    plp: 25,
    bitrate: 48,
    highWaterMark: 1 << 100,
}

readdir('./events/', (e, files) => {
    if (e) return console.error(e)

    files.forEach((file) => {
        const event = require(`./events/${file}`)

        client.on(event.name, (...args) => event.execute(...args, client))
    })

    console.log(greenBright('Eventos carregados.'))
})

readdir('./commands/', (e, files) => {
    if (e) return console.error(e)

    files.forEach((file) => {
        const command = require(`./commands/${file}`)

        client.commands.set(command.name, command)
    })

    console.log(greenBright('Comandos carregados.'))
})

client.login(process.env.DISCORD_TOKEN)
