/*
 *
 * @licstart  The following is the entire license notice for the
 *  JavaScript code in this page.
 *
 * Copyright (C) 2018 Jaume Fuster i Claris
 *
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */

// "Thus, programs must be written for people to read, and only incidentally for machines to execute."

// ---------- CONFIGURATION ----------

// div.innerHTML : {a.innerHTML : a.href}
var sites = {
			"Youtube": {
				"GDQ"			: "https://www.youtube.com/user/gamesdonequick/videos",
				"Ahoy"				: "https://www.youtube.com/user/XboxAhoy/videos",
				"Joseph Anderson"			: "https://www.youtube.com/channel/UCyhnYIvIKK_--PiJXCMKxQQ/videos",
				"Mister Metokur"				: "https://www.youtube.com/channel/UCfYbb7nga6-icsFWWgS-kWw/videos",
				"SovietWomble"			: "https://www.youtube.com/user/SovietWomble/videos",
				"Middle Earth"			: "https://www.youtube.com/playlist?list=PLesZst-z4ywbra_EUrjRR9WkeFdmabw_1",
				"Tagg Vods"			: "https://www.youtube.com/channel/UCDk8PJoNRa3L7xOrzEUkYig/playlists"
			},
			"Subs": {
				"Home"			: "https://old.reddit.com",
				"Steam"			: "https://old.reddit.com/r/Steam/",
				"FFXIV"				: "https://old.reddit.com/r/ffxiv/",
				"Vermintide"			: "https://old.reddit.com/r/Vermintide/",
				"Firefox"				: "https://old.reddit.com/r/firefox/",
				"Factorio"			: "https://old.reddit.com/r/factorio/",
				"UAS"			: "https://old.reddit.com/r/unintentionalASMR/"
			},
			"Chan": {
				"/a/"				: "https://boards.4chan.org/a/catalog",
				"/b/"			: "https://boards.4chan.org/b/catalog",
				"/c/"				: "https://boards.4chan.org/c/catalog",
				"/g/"			: "https://boards.4chan.org/g/catalog",
				"/v/"				: "https://boards.4chan.org/v/catalog",
				"/w/"			: "https://boards.4chan.org/w/catalog",
				"/wg"			: "https://boards.4chan.org/wg/catalog"
			},
			"FFXIV": {
				"XIVDB"				: "http://xivdb.com/",
				"FFGuild"			: "http://www.ffxivguild.com/",
				"Garland Data"				: "https://www.garlandtools.org/db/",
				"Garland Bell"		: "https://www.garlandtools.org/bell/",
				"Angler"	: "http://ff14angler.com/",
				"Gardening"			: "http://www.ffxivgardening.com/"
			},
			"Wikis": {
				"Hollow Knight"	: "http://hollowknight.wikia.com/wiki/Hollow_Knight_Wiki",
			},
			"Utilities": {
				"Steam Wallet"		: "https://store.steampowered.com/steamaccount/addfunds",
				"SourceForge Speedtest"			: "https://sourceforge.net/speedtest/?source=sfnet_header",
				"Down for everyone or just me"				: "http://downforeveryoneorjustme.com/",
				"Is Steam Down?"				: "https://www.issteamdown.com/",
				"SteamStat"	: "https://steamstat.us/",
				"What's my IP"			: "http://www.whatsmyip.org/"
			},
			"Booru": {
				"Gelbooru"		: "https://gelbooru.com/",
				"Sankaku"			: "https://chan.sankakucomplex.com/",
				"Zerochan"				: "https://www.zerochan.net/",
				"TBIB"				: "http://tbib.org/",
				"VectorBooru"		: "http://vector.booru.org/",
			},
			"Twitter": {
				"MisterAntiBully"		: "https://twitter.com/misterantibully?lang=en&lang=en",
			},
			"ImageIndex": {
				"IQDB"				: "https://iqdb.org/",
				"Tineye"			: "https://www.tineye.com/",
				"Google Image"				: "https://images.google.co.uk/",
				"ImageRaider"		: "https://www.imageraider.com/",
				"Yandex"	: "https://yandex.com/",
			},
			"Games": { // To find the game ID check the url in the store page or the community page
				"FFXIV"				: "steam://run/39210",
				"TF2"			: "steam://run/440",
				"Factorio"				: "steam://run/427520",
				"Momentum"		: "steam://run/669270",
				"Warhammer: Vermintide 2"			: "steam://run/552500",
				"Terraria"			: "steam://run/105600"
			},
			"Twitch": {
				"Shroud"				: "https://www.twitch.tv/shroud",
				"GDQ"			: "https://www.twitch.tv/gamesdonequick",
				"Soviet Womble"				: "https://www.twitch.tv/sovietwomble",
				"Quebec"		: "https://www.twitch.tv/longlivequebec",
			},
			"-": {
				"-"				: "-",
			},
		};

var search = "http://google.com/search";		// The search engine
var query  = "q";							// The query variable name for the search engine

// ---------- BUILD PAGE ----------
function matchLinks(regex = "") {
	p = document.getElementById("links");
	while (p.firstChild) {
		p.removeChild(p.firstChild);
	}
	match = new RegExp(regex ? regex : ".", "i");
	firstmatch = 0;
	for (i = 0; i < Object.keys(sites).length; i++) {
		matches = false;
		sn = Object.keys(sites)[i];
		section = document.createElement("div");
		section.id = sn;
		section.innerHTML = sn;
		section.className = "section";
		inner = document.createElement("div");
		for (l = 0; l < Object.keys(sites[sn]).length; l++) {
			ln = Object.keys(sites[sn])[l];
			if (match.test(ln)) {
				link = document.createElement("a");
				link.href = sites[sn][ln];
				link.innerHTML = ln;
				if (!firstmatch++ && regex != "") {
					link.className = "selected";
					document.getElementById("action").action = sites[sn][ln];
					document.getElementById("action").children[0].removeAttribute("name");
				}
				inner.appendChild(link);
				matches = true;
			}
		}
		if (!firstmatch || regex == "") {
			document.getElementById("action").action = search;
			document.getElementById("action").children[0].name = query;
		}
		section.appendChild(inner);
		matches ? p.appendChild(section) : false;
	}
	document.getElementById("main").style.height = document.getElementById("main").children[0].offsetHeight+"px";
}

window.onload = function() {
matchLinks();

document.getElementById("action").action = search;
document.getElementById("action").children[0].name = query;
}
