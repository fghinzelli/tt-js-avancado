"use strict";
var conts = {
    base: "http://demo8141468.mockable.io"
}

// Classe Usuario

function Usuario($nome, $telefone, $email) {
    var parametros = arguments;
    this.setNome = setNome;
    this.getNome = getNome;
    this.setTelefone = setTelefone;
    this.getTelefone = getTelefone;
    this.setEmail = setEmail;
    this.getEmail = getEmail;

    var nome = parametros[0];
    var telefone = parametros[1];
    var email = parametros[2];

    function setNome($nome) {
        nome = $nome;
    }

    function getNome() {
        return nome;
    }

    function setTelefone($telefone) {
        telefone = $telefone;
    }

    function getTelefone() {
        return telefone;
    }

    function setEmail($email) {
        email = $email;
    }

    function getEmail() {
        return email;
    }
    
}

function $GET($URL, $callBackSuccess, $callBackError) {
    var xhttp;
    if (window.XMLHttpRequest) {
        //code for Modern browsers
        xhttp = new XMLHttpRequest();
    } else {
        //code for old IE browsers
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.onprogress = function(oEvent) {
        console.log("Aguarde, carregando...");
        console.log(oEvent.loaded);
    }

    xhttp.onerror = function() {
        $callBackError(this.response);
    }

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            switch (this.status) {
                case 200:
                    $callBackSuccess(this.response);
                    break;
                case 404:
                    $callBackError(this.response);
                    break;
                default:
                    break;
            }
        }
    };

    xhttp.open("GET", $URL, true);
    xhttp.send();
}

$GET(conts.base + "/usuario", 
    function($retorno){
        var json = JSON.parse($retorno);
        var user_list = [];
        for (var i=0; i<json.length; i++) {
            var usuario = new Usuario(json[i].nome, json[i].telefone, json[i].email);
            user_list.push(usuario);
        } 
        montaTabela(user_list);
    }, function($retorno) {
        alert("Não foi possível buscar os dados.");
        console.error($retorno);
    });

function montaTabela(listaUsuarios) {
    var tabela = document.querySelector("#table-usuarios");
    for (var i=0; i<listaUsuarios.length; i++) {
        var tbody = document.createElement("tbody");
        var linha = document.createElement("tr");
        var tdNome = document.createElement("td");
        tdNome.textContent = listaUsuarios[i].getNome();
        var tdTelefone = document.createElement("td");
        tdTelefone.textContent = listaUsuarios[i].getTelefone();
        var tdEmail = document.createElement("td");
        tdEmail.textContent = listaUsuarios[i].getEmail();
        linha.appendChild(tdNome);
        linha.appendChild(tdTelefone);
        linha.appendChild(tdEmail);
        tbody.appendChild(linha)
        tabela.appendChild(tbody);
    }
}
