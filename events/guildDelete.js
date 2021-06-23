const { greenBright } = require('chalk')

module.exports = {
    name: 'guildDelete',

    execute(guild, client) {
        client.servers.delete(guild.id)

        console.log(greenBright(`Guilda ${guild.name}-(${guild.id}) removida.`))
    },
}
