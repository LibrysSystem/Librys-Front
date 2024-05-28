import { Funcionario, Livro, Cliente } from "../Classes/FLC.js"

class AbaDados{

    static abaAtual = " "

    static async mudarAba(qualaba){

        let qualnome = qualaba.split("_")
        qualnome = qualnome[2]

        switch (qualnome) {
        case "livro":
            document.getElementById("h1_main").innerHTML = `LIVROS`
            this.abaAtual = "livros"

            // fetch('Read_Livros')
            // .then(resp=>resp.json())
            // .then(rest=>{
                
            // })

            break;  
        case "funcionario":
            document.getElementById("h1_main").innerHTML = `FUNCIONÁRIOS`
            this.abaAtual = "funcionarios"


            // fetch('Read_Funcionarios')
            // .then(resp=>resp.json())
            // .then(rest=>{
                  
            // })

            break;
        case "cliente":
            document.getElementById("h1_main").innerHTML = `CLIENTES`
            this.abaAtual = "clientes"


            // fetch('Read_Clientes')
            // .then(resp=>resp.json())
            // .then(rest=>{
                  
            // })

            break;  
        default:
            break;
    }}

}

 async function pesquisar(oquePesquisar, submit){ 

    let aondePesquisar
    switch (AbaDados.abaAtual) {
        case 'livros':
            aondePesquisar = "endpoit_readLivros"

            break;

        case 'clientes':
            aondePesquisar = "endpoit_readClientes"
        
            break;

        case 'funcionarios':
            aondePesquisar = "endpoit_readFuncionarios"

            break; 

        default:
            break;
    }
    
    fetch(aondePesquisar, {
        method: 'GET'
    })
    .then(resp=>resp.json())
    .then(async rest=>{

        const dados =  rest
        if(submit){
            await mostrarDados(dados, AbaDados.abaAtual)
        }else{
            document.getElementById("opcoesDados").innerHTML = ""
            const titulos = dados.map(livro => livro.titulo)
            titulos.map((el)=>{
                const opcao = document.createElement("option")
                opcao.innerHTML=el
                document.getElementById("opcoesDados").appendChild(opcao)
            })
        }
    })
}
 async function mostrarDados(dados, tipo){
    //pego a lista de objetos e transformo cada 1 em um modulo de mostar bonitinho e adiciono no DADOS conforme o tipo (cliente, livro, funcionario)
}

// async function criarCartao(){

// }
async function criarJSONObject(quemEnviar) {
    let objJSON = {};
    const todosinputs = [...document.querySelectorAll(quemEnviar)];

    await Promise.all(todosinputs.map(async (el) => {
        if (el.type === "file") {

            if (el.files.length > 0) {

                const fileContents = await readFile(el.files[0]);
                objJSON[el.name] = fileContents;
            } else {
                objJSON[el.name] = null;
            }
        }else if(el.type === "radio"){
            objJSON[el.name] = el.checked;

        }else {
            objJSON[el.name] = el.value;
        }
    }));

    return objJSON;
}

async function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

 async function validarInputs(id, enviar, Quais){
    let ok = true

    if(!enviar){
        document.getElementById(id).nextElementSibling.innerHTML = " "

        if(!document.getElementById(id).checkValidity()){
            document.getElementById(id).nextElementSibling.innerHTML = `* ${document.getElementById(id).validationMessage}`
        }
    }else {
        const todosinputs = [...document.querySelectorAll(Quais)]
        todosinputs.map((el)=>{
            ok = (ok)&&(el.checkValidity())
        
        })
        if(ok){
            return "ok"
        }else{
            return "erro"
        }
        
    }
}

async function popUp(titulo, mensagem, escurecer){
    const telaEscura = document.createElement("div")
    telaEscura.setAttribute("id", "divEscura")

    const popUp = document.createElement("div")
    popUp.setAttribute("id", "caixaPopUp")

    const h1Tilulo = document.createElement("h1")
    h1Tilulo.innerHTML = titulo
    popUp.appendChild(h1Tilulo)

    const msg = document.createElement("div")
    msg.innerHTML = mensagem
    popUp.appendChild(msg)

    const btnOkPopUp = document.createElement("button")
    btnOkPopUp.innerHTML = "OK"
    btnOkPopUp.addEventListener("click", ()=>{
        telaEscura.remove()
    })
    popUp.appendChild(btnOkPopUp)
    telaEscura.appendChild(popUp)

    document.querySelector("body").prepend(telaEscura)

}
async function pegarIdDe(qualInput){
    let response
    response = await fetch(`http://localhost:8080/clientes/por-cpf?cpf=${document.getElementById(qualInput).value}`, {
    method: "GET"});

    console.log(response)

    if(!(response.ok)){
        document.getElementById(qualInput).parentElement.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML = responseData.detalhe
        return null

    }else{
        const responseData = await response.json();
        return responseData[0].id;

    }

}




export{AbaDados, pesquisar, validarInputs, criarJSONObject, popUp, pegarIdDe}

