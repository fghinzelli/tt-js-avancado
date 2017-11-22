"use strict";
var conts = {
    base: "http://demo9792543.mockable.io"
}

// Classe Usuario

function Usuario($nome, $telefone) {
    var parametros = arguments;
    this.setNome = setNome;
    this.getNome = getNome;
    this.setTelefone = setTelefone;
    this.getTelefone = setTelefone;

    var nome = arguments[0];
    var telefone = arguments[1];

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
}

function Request($method, $URL, $callBackSuccess) {
    var xhttp;
    if (window.XMLHttpRequest) {
        //code for Modern browsers
        xhttp = new XMLHttpRequest();
    } else {
        //code for old IE browsers
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $callBackSuccess(this.response);
        }
    };

    xhttp.open($method, $URL);
    xhttp.send();
}

Request("GET", conts.base + "/usuario", function($retorno){
    //console.log($retorno);
    var json = JSON.parse($retorno);
    var user_list = [];
    for (var i=0; i<json.length; i++) {
        var usuario = new Usuario(json[i].nome, json[i].telefone);
        user_list.push(usuario);
    } 
    return user_list;
});

