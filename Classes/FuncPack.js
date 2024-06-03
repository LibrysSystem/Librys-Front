import { Formulario } from "./Formulario.js"

class AbaDados{

    static abaAtual = " "

    static async mudarAba(qualaba){

        let qualnome = qualaba.split("_")
        qualnome = qualnome[2]

        switch (qualnome) {
        case "livro":
            document.getElementById("h1_main").innerHTML = `LIVROS`
            this.abaAtual = "livros"

            const response = await fetch("http://localhost:8080/livros", {
                method: 'GET'
            })
            if(response.ok){
                const dados = await response.json()
                await mostrarDados(dados, "livros")
            }

            break;  
        case "funcionario":
            document.getElementById("h1_main").innerHTML = `FUNCIONÁRIOS`
            this.abaAtual = "funcionarios"

            const response2 = await fetch("http://localhost:8080/funcionarios", {
                method: 'GET'
            })
            if(response2.ok){
                const dados = await response2.json()
                await mostrarDados(dados, "funcionarios")
            }

            break;
        case "cliente":
            document.getElementById("h1_main").innerHTML = `CLIENTES`
            this.abaAtual = "clientes"

            const response3 = await fetch("http://localhost:8080/clientes", {
                method: 'GET'
            })
            if(response3.ok){
                const dados = await response3.json()
                await mostrarDados(dados, "clientes")
            }

            break;  
        default:
            break;
    }}

}

 async function buscar(oquePesquisar){ 

    let aondePesquisar = []
    switch (AbaDados.abaAtual) {
        case 'livros':
            aondePesquisar.push(`http://localhost:8080/livros/${oquePesquisar}`)
            aondePesquisar.push(`http://localhost:8080/livros/por-nome?nome=${oquePesquisar}`)
            aondePesquisar.push(`http://localhost:8080/livros/por-autor?autor=${oquePesquisar}`)

            break;

        case 'clientes':
            aondePesquisar.push(`http://localhost:8080/clientes/${oquePesquisar}`)
            aondePesquisar.push(`http://localhost:8080/clientes/por-nome?nome=${oquePesquisar}`)
            aondePesquisar.push(`http://localhost:8080/clientes/por-email?email=${oquePesquisar}`) 
            aondePesquisar.push(`http://localhost:8080/clientes/por-cpf?cpf=${oquePesquisar}`)        
       
            break;

        case 'funcionarios':
            aondePesquisar.push(`http://localhost:8080/funcionarios/${oquePesquisar}`)
            aondePesquisar.push(`http://localhost:8080/funcionarios/por-nome?nome=${oquePesquisar}`)
            aondePesquisar.push(`http://localhost:8080/funcionarios/por-email?email=${oquePesquisar}`) 
            aondePesquisar.push(`http://localhost:8080/funcionarios/por-cpf?cpf=${oquePesquisar}`)      
            break; 

        default:
            break;
    }
    let respostas = []

    const fechPromise = aondePesquisar.map(async (el) => {
         const response = await fetch(el, {
             method: 'GET'
         })
         if (response.ok) {
             const responseDados = await response.json()
             respostas.push(responseDados)
         }
     })

    await Promise.all(fechPromise)

    return respostas.flat();

}

async function pesquisar(dados, submit){
    if(submit){
        mostrarDados(dados, AbaDados.abaAtual)

    }else{
        document.getElementById("opcoesDados").innerHTML = ""

        const nomes = dados.map(elemento => elemento.nome)
        nomes.map(async(el)=>{

            const opcao = document.createElement("option")
            opcao.value=el
            opcao.innerHTML=el
            document.getElementById("opcoesDados").appendChild(opcao)

        })

    }

}


 async function mostrarDados(dados, tipo){
    //pego a lista de objetos e transformo cada 1 em um modulo de mostar bonitinho e adiciono no DADOS conforme o tipo (cliente, livro, funcionario)

    if(document.getElementById("dados").firstElementChild.className == "container"){
        document.getElementById("dados").firstElementChild.remove()
    }

    const container = document.createElement("div")
    container.setAttribute("id", "container_"+tipo)
    container.setAttribute("class", "container")

    switch (tipo) {
        case "livros":
            dados.map(async(item, index)=>{

                const modulo = document.createElement("div")
                modulo.setAttribute("id", "livros/"+item.id)
                modulo.setAttribute("class", "modulo_livro")

                const capa = document.createElement("img")
                capa.setAttribute("src", item.imagemUrl)
                modulo.appendChild(capa)

                const botao = document.createElement("button")
                botao.setAttribute("class", "btn_editar_isso btn_editar_livro")
                const spanImg = document.createElement("span")
                spanImg.setAttribute("class", "material-symbols-outlined")
                spanImg.innerHTML= "edit_square"
                botao.appendChild(spanImg)
                modulo.appendChild(botao)

                const detalhes = document.createElement("div")
                detalhes.setAttribute("class", "livros_detalhes")

                for(let prop in item){
                    if(item.hasOwnProperty(prop)){
                        if(prop != 'imagemUrl'){
                            const propriedade = document.createElement("p")
                            propriedade.innerHTML = `<strong>${prop.charAt(0).toUpperCase()+prop.slice(1)}:</strong> ${item[prop]}`
                            detalhes.appendChild(propriedade)
                        }}}

                modulo.appendChild(detalhes)
                container.appendChild(modulo)
            })
            
            break;
        case "clientes":
            dados.map(async(item, index)=>{

                const modulo = document.createElement("div")
                modulo.setAttribute("id", "clientes/"+item.id)
                modulo.setAttribute("class", "modulo_cliente")

                const botao = document.createElement("button")
                botao.setAttribute("class", "btn_editar_isso btn_editar_cliente")
                const spanImg = document.createElement("span")
                spanImg.setAttribute("class", "material-symbols-outlined")
                spanImg.innerHTML= "edit_square"
                botao.appendChild(spanImg)
                modulo.appendChild(botao)
    
                for(let prop in item){
                    if(item.hasOwnProperty(prop)){
                        if(item[prop] != null){
                            const propriedade = document.createElement("div")
                            propriedade.innerHTML = `<strong>${prop.charAt(0).toUpperCase()+prop.slice(1)}:</strong> ${item[prop]}`
                            modulo.appendChild(propriedade)
                        }}}
    
                container.appendChild(modulo)
            })

            break;
        case "funcionarios":
            dados.map(async(item, index)=>{

                const modulo = document.createElement("div")
                modulo.setAttribute("id","funcionarios/"+item.id)
                modulo.setAttribute("class", "modulo_funcionario")

                const botao = document.createElement("button")
                botao.setAttribute("class", "btn_editar_isso btn_editar_funcionario")
                const spanImg = document.createElement("span")
                spanImg.setAttribute("class", "material-symbols-outlined")
                spanImg.innerHTML= "edit_square"
                botao.appendChild(spanImg)
                modulo.appendChild(botao)
    
                for(let prop in item){
                    if(item.hasOwnProperty(prop)){
                        if(item[prop] != null){
                            const propriedade = document.createElement("div")
                            propriedade.innerHTML = `<strong>${prop.charAt(0).toUpperCase()+prop.slice(1)}:</strong> ${item[prop]}`
                            modulo.appendChild(propriedade)
                        }}}
    
                container.appendChild(modulo)
            })
            
            break;
        
        default:
            break;
    }
    document.getElementById("dados").prepend(container)
    editarInformacao()
}

async function editarInformacao(){
    const todosOsBtnsVisiveis = [...document.querySelectorAll(".btn_editar_isso")]

    todosOsBtnsVisiveis.map(async(item)=>{
        item.addEventListener("click", async()=>{

            switch( item.parentElement.className) {
                case "modulo_livro":
                    Formulario.abrirFormularioEdicao("cl", item.parentElement.id)
                    
                    break;
                case "modulo_cliente":
                    Formulario.abrirFormularioEdicao("cc", item.parentElement.id)
                    
                    break;
                case "modulo_funcionario":
                    Formulario.abrirFormularioEdicao("cf", item.parentElement.id)

                    break;
            
                default:
                    break;
            }
        })
    })

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
        }else if(el.type === "radio"){
            objJSON[el.name] = el.checked;

        }else if(el.name == "confirmaSenha"){
            
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
    msg.innerHTML = mensagem.replace(/\n/g, "<br>")
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
async function pegarIdDe(qualInput, tipo){
    let response
    response = await fetch(`http://localhost:8080/${tipo}/por-cpf?cpf=${document.getElementById(qualInput).value}`, {
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


export{AbaDados, buscar, validarInputs, criarJSONObject, popUp, pegarIdDe, pesquisar, editarInformacao}

