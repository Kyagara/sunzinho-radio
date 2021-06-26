const { greenBright } = require('chalk')

module.exports = {
    name: 'guildCreate',

    execute(guild, client) {
        client.servers.ensure(guild.id, {
            guildID: guild.id,
            prefix: process.env.PREFIX,
        })

        console.log(
            greenBright(`Guilda ${guild.name}-(${guild.id}) adicionada.`),
        )
    },
}
