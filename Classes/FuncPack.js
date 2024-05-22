import { Funcionario, Livro, Cliente } from "../Classes/FLC.js"

class MudarAba{

    static abaAtual = " "

    static mudarAba = (qualaba)=>{

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

function pesquisar(oquePesquisar, submit){ 

    let aondePesquisar
    switch (MudarAba.abaAtual) {
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
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            filtro: oquePesquisar
        })
    })
    .then(resp=>resp.json())
    .then(rest=>{

        const dados =  rest
        if(submit){
            mostrarDados(dados, MudarAba.abaAtual)
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
function mostrarDados(dados, tipo){
    //pego a lista de objetos e transformo cada 1 em um modulo de mostar bonitinho e adiciono no DADOS conforme o tipo (cliente, livro, funcionario)
}

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
        } else {
            objJSON[el.name] = el.value;
        }
    }));

    return objJSON;
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}


function validarInputs(id, enviar, Quais){
    let ok = true

    if(!enviar){
        document.getElementById(id).nextSibling.nextSibling.innerHTML = " "

        if(!document.getElementById(id).checkValidity()){
            document.getElementById(id).nextSibling.nextSibling.innerHTML = `* ${document.getElementById(id).validationMessage}`
        }
    }else {
        const todosinputs = [...document.querySelectorAll(Quais)]
        todosinputs.map((el)=>{
            ok = (ok)&&(el.checkValidity())
        
        })

        if(ok){
        //TALVEZ NAO SEJA UTILIZADO MAIS

            // async function main() {
            //     const formJSON = await CriarJSONForm();

            //     console.log(formJSON);
                

            //     // fetch('endponit', {
            //     //     method: 'POST',
            //     //     headers: {
            //     //         'Content-Type': 'application/json'
            //     //     },
            //     //     body: JSON.stringify(formJSON)
            //     // })
            //     // .then(resp=>resp.json())
            //     // .then(rest=>{
            //     //     console.log(rest)
                    
            //     // })
                

            // }
            // main()

            return "ok"

        }else{
            //SAIU DAQUI
            // console.log(document.getElementById(id).parentElement.parentElement.parentElement.firstChild.nextSibling)
            // document.getElementById(id).parentElement.parentElement.parentElement.firstChild.nextSibling.innerHTML="Preencha todos os campos do formulário corretamente!"
            return "erro"
        }
        
    }
}

function popUp(titulo, mensagem, escurecer){
    const telaEscura = document.createElement("div")
    telaEscura.setAttribute("id", "divEscura")

    const popUp = document.createElement("div")
    popUp.setAttribute("id", "caixaPopUp")

    const h1Tilulo = document.createElement("h1")
    h1Tilulo.innerHTML = titulo
    popUp.appendChild(h1Tilulo)

    const msg = document.createElement("p")
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
    fetch(`${endponit}clientes/${document.getElementById(qualInput).value}`, {
    method: "GET"
})
.then(resp=>resp.json())
.then(rest=>{
    console.log(rest)
    
    return rest.id
})} 


export{MudarAba, pesquisar, validarInputs, criarJSONObject, popUp, pegarIdDe}

