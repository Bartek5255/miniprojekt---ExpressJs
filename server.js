
var express = require("express")
var app = express()
const PORT = 3000;
var path = require("path")
var bodyParser = require("body-parser")
var tab = [
    { id: 1, name: "Ja", password: "1234", age: "10", uczen: "checked", sex: "man" },
]
var ids = 2
var log = false
function access(login, password) {
    for (var i = 0; i < tab.length; i++) {
        if (tab[i].name == login) {
            if (tab[i].password == password) {
                return true
            } else {
                return false
            }
        }

    }
    return false
}
function logAvailable(login) {
    for (var i = 0; i < tab.length; i++) {
        if (tab[i].name == login) {
            return false
        }
    }
    return true
}
function table() {
    tabela = `<tr><th>Users</th></tr>`
    for (var i = 0; i < tab.length; i++) {
        if (tab[i].uczen == "checked") {
            check = `<input type="checkbox" checked onclick="return false;"`
        } else {
            check = `<input type="checkbox" accept="no" onclick="return false;"`
        }
        tabela = tabela + `<tr>
                            <td>id: ${tab[i].id}</td>
                            <td>user: ${tab[i].name}</td>
                            <td>password: ${tab[i].password}</td>
                            <td>student: ${check}</td>
                            <td>age: ${tab[i].age}</td>
                            <td>sex: ${tab[i].sex}</td>
                        </tr>`
    }
}
function idSorted() {
    tab.sort(function (x, y) {
        return parseFloat(x.id) - parseFloat(y.id)
    })
    table()
}
function sex() {
    woman = `<tr><th>Woman</th></tr>`
    man = `<tr><th>Man</th></tr>`
    for (var i = 0; i < tab.length; i++) {
        if (tab[i].sex == "man") {
            man = man + `<tr>
                            <td>id: ${tab[i].id}</td>
                            <td>sex: ${tab[i].sex}</td>
                        </tr>`
        } else if (tab[i].sex == "woman") {
            woman = woman + `<tr>
                                <td>id: ${tab[i].id}</td>
                                <td>sex: ${tab[i].sex}</td>
                            </tr>`
        }
    }
}
function sortUp() {
    tab.sort(function (x, y) {
        return parseFloat(x.age) - parseFloat(y.age)
    })
    table()
}
function sortDown() {
    tab.sort(function (x, y) {
        return parseFloat(y.age) - parseFloat(x.age)
    })
    table()
}

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/index.html"))
})
app.get("/style", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/css/style.css"))
})
app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/login.html"))
})
app.get("/register", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/register.html"))
})
app.post("/register", function (req, res) {
    if (logAvailable(req.body.name) == true) {
        tab.push({ id: ids, name: req.body.name, password: req.body.password, age: req.body.age, uczen: req.body.uczen, sex: req.body.sex })
        ids = ids + 1
        console.log(tab)
        res.send(`<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Miniprojekcik</title>
            <link rel="stylesheet" href="/style">
            <link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
        </head>
        
        <body>
            <div id="menu">
                <a href="/">Main</a>
                <a href="/register">Register</a>
                <a href="/login">Login</a>
                <a href="/admin">Admin</a>
            </div>
            <h1>Poprawnie zarejestrowano użytkownika ${req.body.name}</h1>
        </body>
        
        </html>`)
    } else {
        res.send(`<!DOCTYPE html>
        <html>
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Logowanie</title>
            <link rel="stylesheet" href="/style">
            <link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
        </head>
        
        <body>
            <div id="menu">
                <a href="/">Main</a>
                <a href="/register">Register</a>
                <a href="/login">Login</a>
                <a href="/admin">Admin</a>
            </div>
            <div style="padding: 100px 0 0 250px;">
                <div id="login-box">
                    <H2>Register</H2>
                    <br>
                    <p>Login is taken</p>
                    <form action="/register" method="POST">
                        <div id="login-box-name" style="margin-top:20px;">Name:</div>
                        <div id="login-box-field" style="margin-top:20px;"><input name="name" class="form-login"
                                title="Username" size="30" maxlength="2048" onchange="this.submit()" /></div>
                        <div id="login-box-name">Password:</div>
                        <div id="login-box-field"><input name="password" type="password" class="form-login" title="Password"
                                size="30" maxlength="2048" onchange="this.submit()" /></div>
                        <div id="login-box-name">Age:</div>
                        <select name="age" id="login-box-field" class="form-login" onchange="this.submit()">
                            <option value="0">select</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                        </select>
                        <br>
                        <span class="login-box-options">Uczeń</span><input type="checkbox" name="uczen" value="checked"
                            onchange="this.submit()"></span>
                        <br>
                        <div id="login-box-name">Sex:</div>
                        <div id="login-box-field"></div>man<input type="radio" name="sex" id="man" value="man"
                            onchange="this.submit()">woman <input type="radio" name="sex" id="woman" value="woman"
                            onchange="this.submit()">
                        <br>
                        <br>
                        <button style="margin-left:90px; width:103px; height:42px;">Register</button>
                    </form>
                </div>
            </div>
        </body>
        
        </html>`)
    }
})
app.post("/login", function (req, res) {
    if (access(req.body.login, req.body.password) == true) {
        res.redirect("/admin")
        log = true
    } else {
        res.send(`<!DOCTYPE html>
        <html>
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Logowanie</title>
            <link rel="stylesheet" href="/style">
            <link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
        </head>
        
        <body>
            <div id="menu">
                <a href="/">Main</a>
                <a href="/register">Register</a>
                <a href="/login">Login</a>
                <a href="/admin">Admin</a>
            </div>
            <div style="padding: 100px 0 0 250px;">
                <div id="login-box">
                    <H2>Login</H2>
                    <br>
                    <br>
                    <form action="/login" method="POST">
                        <div id="login-box-name" style="margin-top:20px;">Name:</div>
                        <div id="login-box-field" style="margin-top:20px;"><input name="name" class="form-login"
                                title="Username" size="30" maxlength="2048" onchange="this.submit()" /></div>
                        <div id="login-box-name">Password:</div>
                        <div id="login-box-field"><input name="password" type="password" class="form-login" title="Password"
                                size="30" maxlength="2048" onchange="this.submit()" /></div>
                        <br>
                        <p>Wrong Name or Password</p>
                        <br>
                        <button style="margin-left:90px; width:103px; height:42px;">Login</button>
                    </form>
                </div>
            </div>
        </body>
        
        </html>`)
    }

})
app.get("/admin", function (req, res) {
    if (log) {
        res.sendFile(path.join(__dirname + "/static/adminloged.html"))
    } else {
        res.sendFile(path.join(__dirname + "/static/admin.html"))
    }
})
app.get("/logout", function (req, res) {
    res.redirect("/")
    log = false
})
app.get("/show", function (req, res) {
    if (log) {
        idSorted()
        res.send(`<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Miniprojekcik</title>
        <link rel="stylesheet" href="/style">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
    </head>
    
    <body>
        <div id="menu" style="background-color: orange;">
            <a href="/">Main</a>
            <a href="/logout">Logout</a>
            <a href="/admin">Admin</a>
        </div>
        <div id="menu2">
            <a href="/sort">Sort</a>
            <a href="/gender">Gender</a>
            <a href="/show">Show</a>
        </div>
        <h1 id="loggedh1">Show</h1>
        <table>
            ${tabela}
        <table>
    </body>
    
    </html>`)
    } else {
        res.sendFile(path.join(__dirname + "/static/admin.html"))
    }
})
app.get("/gender", function (req, res) {
    if (log) {
        sex()
        res.send(`<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Miniprojekcik</title>
            <link rel="stylesheet" href="/style">
            <link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
        </head>
        
        <body>
            <div id="menu" style="background-color: orange;">
                <a href="/">Main</a>
                <a href="/logout">Logout</a>
                <a href="/admin">Admin</a>
            </div>
            <div id="menu2">
                <a href="/sort">Sort</a>
                <a href="/gender">Gender</a>
                <a href="/show">Show</a>
            </div>
            <h1 id="loggedh1">Gender</h1>
            <table>
                ${woman}
            <td style="border: none"></td>
                ${man}
            <table>
        </body>
        
        </html>`)
    } else {
        res.sendFile(path.join(__dirname + "/static/admin.html"))

    }
})
app.get("/sort", function (req, res) {
    if (log) {
        idSorted()
        res.send(`<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Miniprojekcik</title>
            <link rel="stylesheet" href="/style">
            <link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
        </head>
        
        <body>
            <div id="menu" style="background-color: orange;">
                <a href="/">Main</a>
                <a href="/logout">Logout</a>
                <a href="/admin">Admin</a>
            </div>
            <div id="menu2">
                <a href="/sort">Sort</a>
                <a href="/gender">Gender</a>
                <a href="/show">Show</a>
            </div>
            <h1 id="loggedh1">Sort</h1>
            <form action="/sort" method="post" onchange="this.submit()">
                <input type="radio" cless="sort" name="sort" value="up"> Sorting Up
                <input type="radio" cless="sort" name="sort" value="down"> Sorting Down
            </form>
            <br>
            <br>
            <table>
                ${tabela}
            <table>
        </body>
        
        </html>`)
    } else {
        res.sendFile(path.join(__dirname + "/static/admin.html"))
    }
})
app.post("/sort", function (req, res) {
    if (req.body.sort == "up") {
        sortUp()
        res.send(`<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Miniprojekcik</title>
            <link rel="stylesheet" href="/style">
            <link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
        </head>
        
        <body>
            <div id="menu" style="background-color: orange;">
                <a href="/">Main</a>
                <a href="/logout">Logout</a>
                <a href="/admin">Admin</a>
            </div>
            <div id="menu2">
                <a href="/sort">Sort</a>
                <a href="/gender">Gender</a>
                <a href="/show">Show</a>
            </div>
            <h1 id="loggedh1">Sort</h1>
            <form action="/sort" method="post" onchange="this.submit()">
                <input type="radio" cless="sort" name="sort" value="up" checked> Sorting Up
                <input type="radio" cless="sort" name="sort" value="down"> Sorting Down
            </form>
            <br>
            <br>
            <table>
                ${tabela}
            <table>
        </body>
        
        </html>`)
    } else {
        sortDown()
        res.send(`<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Miniprojekcik</title>
            <link rel="stylesheet" href="/style">
            <link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
        </head>
        
        <body>
            <div id="menu" style="background-color: orange;">
                <a href="/">Main</a>
                <a href="/logout">Logout</a>
                <a href="/admin">Admin</a>
            </div>
            <div id="menu2">
                <a href="/sort">Sort</a>
                <a href="/gender">Gender</a>
                <a href="/show">Show</a>
            </div>
            <h1 id="loggedh1">Sort</h1>
            <form action="/sort" method="post" onchange="this.submit()">
                <input type="radio" cless="sort" name="sort" value="up"> Sorting Up
                <input type="radio" cless="sort" name="sort" value="down" checked> Sorting Down
            </form>
            <br>
            <br>
            <table>
                ${tabela}
            <table>
        </body>
        
        </html>`)
    }
})


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

