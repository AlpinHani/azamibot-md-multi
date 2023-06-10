import fetch from 'node-fetch'
import xa from 'xfarr-api'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text) throw `Example: ${usedPrefix + command} Sia Unstopable`
	if (text.includes('http://') || text.includes('https://')) {
		if (!text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))) return m.reply(`Invalid Youtube URL.`)
		try {
			let res = await fetch(`https://api.lolhuman.xyz/api/ytvideo?apikey=${apilol}&url=${text}`)
			let anu = await res.json()
			if (anu.status != '200') throw Error()
			anu = anu.result
			let txt = `📌 *${anu.title}*\n\n`
			txt += `🪶 *Author :* ${anu.uploader}\n`
			txt += `⌚ *Duration :* ${anu.duration}\n`
			txt += `👁️ *Views :* ${anu.view}\n`
			txt += `🌀 *Url :* https://youtu.be/${anu.id}`
			await conn.sendMsg(m.chat, { image: { url: anu.thumbnail }, caption: txt }, { quoted: m })
		} catch (e) {
			console.log(e)
			try {
				let res = await fetch(`https://api.lolhuman.xyz/api/ytvideo2?apikey=${apilol}&url=${text}`)
				let anu = await res.json()
				if (anu.status != '200') throw Error()
				anu = anu.result
				let txt = `📌 *${anu.title}*\n`
				await conn.sendMsg(m.chat, { image: { url: anu.thumbnail }, caption: txt }, { quoted: m })
			} catch (e) {
				console.log(e)
				try {
					let anu = await xa.downloader.youtube(text)
					let txt = `📌 *${anu.title}*\n\n`
					txt += `🪶 *Author :* ${anu.author}\n`
					txt += `👁️ *Username :* ${anu.username}\n`
					txt += `🌀 *Url :* https://youtu.be/${anu.thumbnail.split('/')[4]}`
					await conn.sendMsg(m.chat, { image: { url: anu.thumbnail }, caption: txt }, { quoted: m })
				} catch (e) {
					console.log(e)
					m.reply(`Tidak ditemukan hasil.`)
				}
			}
		}
	} else {
		try {
			let res = await fetch(`https://api.lolhuman.xyz/api/ytplay?apikey=${apilol}&query=${encodeURIComponent(text)}`)
			let anu = await res.json()
			if (anu.status != '200') throw Error()
			anu = anu.result
			let txt = `📌 *${anu.title}*\n\n`
			txt += `🪶 *Author :* ${anu.uploader}\n`
			txt += `⌚ *Duration :* ${anu.duration}\n`
			txt += `👁️ *Views :* ${anu.view}\n`
			txt += `🌀 *Url :* https://youtu.be/${anu.id}`
			await conn.sendMsg(m.chat, { image: { url: anu.thumbnail }, caption: txt }, { quoted: m })
		} catch (e) {
			console.log(e)
			try {
				let res = await fetch(`https://api.lolhuman.xyz/api/ytplay2?apikey=${apilol}&query=${encodeURIComponent(text)}`)
				let anu = await res.json()
				if (anu.status != '200') throw Error()
				anu = anu.result
				let txt = `📌 *${anu.title}*\n`
				txt += `🌀 *Url :* https://youtu.be/${anu.thumbnail.split('/')[4]}`
				await conn.sendMsg(m.chat, { image: { url: anu.thumbnail }, caption: txt }, { quoted: m })
			} catch (e) {
				console.log(e)
				m.reply(`Tidak ditemukan hasil.`)
			}
		}
	}
}

handler.menudownload = ['ytplay <teks> / <url>']
handler.tagsdownload = ['search']
handler.command = /^(play|(play)?yt(play|dl)?)$/i

export default handler