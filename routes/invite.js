module.exports = {
    path: '/invite',
    code: `
    $send[200;json;$getdata[$default]
]
$if[$getdata[$default]==undefined;400;{
"error": "true"
"info": "$getdata[$default]"
}]
$request[https://discord.com/api/invite/$getQuery[code]]
    `
}
