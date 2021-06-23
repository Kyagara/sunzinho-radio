const { MessageEmbed } = require('discord.js')

function SimpleEmbed(title, fieldName, fieldValue, avatar) {
    return new MessageEmbed()
        .setTitle(title)
        .setColor(0xfcd34d)
        .addField(fieldName, fieldValue)
        .setThumbnail(avatar)
}

module.exports = SimpleEmbed
