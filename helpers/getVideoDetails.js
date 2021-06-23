const { getBasicInfo } = require('ytdl-core')

async function GetVideoDetails(url) {
    const { videoDetails } = await getBasicInfo(url)

    const video = {
        videoTitle: videoDetails.title,
        videoURL: videoDetails.video_url,
        videoThumbnail:
            videoDetails.thumbnails[videoDetails.thumbnails.length - 1].url,
        channelURL: videoDetails.author.channel_url,
        channelName: videoDetails.author.name,
        channelAvatar:
            videoDetails.author.thumbnails[
                videoDetails.author.thumbnails.length - 1
            ].url,
    }

    return video
}

module.exports = GetVideoDetails
