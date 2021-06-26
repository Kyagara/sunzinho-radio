module.exports = {
    name: 'message',

    async execute(message, client) {
        if (!message.guild || message.author.bot) return

        const guild = client.servers.ensure(message.guild.id, {
            guildID: message.guild.id,
            prefix: process.env.PREFIX,
        })

        if (!message.content.startsWith(guild.prefix)) return

        const args = message.content
            .slice(guild.prefix.length)
            .trim()
            .split(/ +/)

        const command = args.shift().toLocaleLowerCase()

        if (!client.commands.has(command)) return

        const permissions = client.commands.get(command).permissions

        if (!message.member.permissions.has(permissions)) {
            return message.reply(
                'você não tem permissões suficientes para usar esse comando!',
            )
        }

        const cooldown = message.client.cooldown

        if (cooldown.has(message.author.id)) return

        await client.commands.get(command).execute(client, message, guild, args)

        cooldown.add(message.author.id)

        setTimeout(() => {
            cooldown.delete(message.author.id)
        }, 2000)
    },
}
