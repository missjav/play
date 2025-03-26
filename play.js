function getParameterByName(name) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const ConfiguracionCanales = {
    "rbulltv": {
        url: "https://dms.redbull.tv/v5/destination/rbtv/linear-borb/personal_computer/http/id/en/playlist.m3u8",
    },
    "spotv": {
        url: "https://cempedak-cdn-fly.mncnow.id/live/eds/SPOTV-HD/sa_dash_vmx/SPOTV-HD.mpd",
        k1: "57d2ac9210cfbca3596cc679a01c8b29",
        k2: "d5e35c0f39c76adf24853d7ea18c71e7"
    }
};

window.loadPlayer = function () {
    var id = getParameterByName('id');
    var config = ConfiguracionCanales[id];

    if (config && config.url) {
        var sources = [];

        if (config.url.includes('.m3u8')) {
            sources.push({ file: config.url });
        }

        if (config.url.includes('.mpd')) {
            var source = { file: config.url };

            if (config.k1 && config.k2) {
                source.drm = {
                    "clearkey": {
                        "keyId": config.k1,
                        "key": config.k2
                    }
                };
            }

            sources.push(source);
        }

        jwplayer("player").setup({
            playlist: [{ sources: sources }],
            autostart: true,
            width: "100%",
            height: "100%",
            stretching: "exactfit",
            aspectratio: "16:9",
            logo: {
                file: 'https://cdn.jsdelivr.net/gh/missjav/warehouse@main/img/useetv.png',
                link: '',
                position: 'bottom-left'
            }
        });
    } else {
        console.error("Konfigurasi tidak ditemukan atau URL tidak valid.");
    }
};
