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
        var usuario = new Usuario(json[i].nome, json[i].telefone, json[i].email);
        user_list.push(usuario);
    } 
    montaLista(user_list);
});

function montaLista(listaUsuarios) {
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
