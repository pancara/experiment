var express = require('express');
var app = express();

app.configure(function () {
    var path = "app/";
    app.use(
        "/",
        express.static(path)
    );
});

app.listen(3000);