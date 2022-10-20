module.exports = {
    path: '/invite',
    code: `
    $send[200;json;$getdata[$default]
]
$if[$getdata[$default]==undefined;400;{
"error": "true"
"info": "Host IP got rate limited by Cloudflare"
}]
$request[https://discord.com/api/invite/$getQuery[code]]
    `
}
