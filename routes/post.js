module.exports = {
    path: '/invite',
    code: `
    $send[200;json;$getdata[$default]
]
$request[$getQuery[link];{
    method: 'POST',
    data: '$getquery[data]'
}]
$if[$stringStartsWith[$getquery[link];https://google.com;otherwhitelistedurl]==false;400;{
   error: "api is not whitelisted (rake wants that)"
}
   
    `
}
