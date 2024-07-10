import { validarInputs, criarJSONObject, popUp, pegarIdDe} from "./FuncPack.js";

class Formulario{
    static TemFormAberto = false
    
    static getForms=async()=>{
        const papeis = [...document.querySelectorAll(".papel")]
        papeis.map((el)=>{
            el.setAttribute("class", "papel disabled")
        })}

    static abrirFormulario=async (tipo)=>{
        if(!this.TemFormAberto){
            this.TemFormAberto = true
            let ids = tipo.split("_")
            const qualFormAbrir = ids[1].charAt(0) + ids[2].charAt(0)

            document.getElementById(`papel_${qualFormAbrir}`).setAttribute("class", "papel")
            this.avaliarFormulario(false, ".papel:not(.disabled) .input_form")

            document.getElementById(`btn_fechar_${qualFormAbrir}`).addEventListener("click", async (qmfoi)=>{
                this.fecharFormulario(qualFormAbrir)
                if(qualFormAbrir == "cc"){
                    this.fecharFormulario("ccm")
                }})
            
            this.preencherInformacoes(qualFormAbrir)
            if((qualFormAbrir != "cc") && (qualFormAbrir != "al") && (qualFormAbrir != "cf")){
                document.getElementById(`btn_salvar_${qualFormAbrir}`).addEventListener("click", async ()=>{
                    const okkk = await this.avaliarFormulario(true, ".papel:not(.disabled) .input_form")
                    if(okkk == "ok"){
                        await this.terminarFormulario(await this.enviarFormulario(qualFormAbrir), qualFormAbrir)
                    }})}
            switch (qualFormAbrir) {
                case "al":
                    document.getElementById("btn_renovar_al").addEventListener("click", async ()=>{
                        document.getElementById("i_CodTrans_al").setAttribute("required", "true")
                        const okkk = await this.avaliarFormulario(true, ".papel:not(.disabled) .input_form")
                        if(okkk == "ok"){
                            await this.terminarFormulario(await this.enviarFormulario("rnl"), qualFormAbrir)
                        }})
                    document.getElementById("btn_alugar_al").addEventListener("click", async ()=>{
                        const okkk = await this.avaliarFormulario(true, ".papel:not(.disabled) .input_form")
                        if(okkk == "ok"){
                            await this.terminarFormulario(await this.enviarFormulario("al"), qualFormAbrir)
                        }})
                    break;                   
                case 'cc':
                    document.getElementById("btn_salvar_cc_E_menor").addEventListener("click", async ()=>{
                        const okkk = await this.avaliarFormulario(true, ".papel:not(.disabled) .input_form")
                        if(okkk == "ok"){
                            const dataNasc = new Date(document.getElementById("i_DataNasc_cc").value)
                            const dataAtual = new Date()

                            if(((dataAtual-dataNasc)/(31557600000)) < 18){
                                document.getElementById("i_MenorIdade_cc").checked = true
                                await this.abrirFormMenor()
                            }else{
                                await this.terminarFormulario(await this.enviarFormulario(qualFormAbrir), qualFormAbrir)   
                            }}})
                    break;
                case 'cf':
                    document.getElementById(`btn_salvar_${qualFormAbrir}`).addEventListener("click", async ()=>{
                        const okkk = await this.avaliarFormulario(true, ".papel:not(.disabled) .input_form")
                        if(okkk == "ok"){

                            if(document.getElementById("i_senha_cf").value != document.getElementById("i_ConfirmaSenha_cf").value){
                                document.querySelector(".papel:not(.disabled) .err_geral_form").innerHTML ="AS SENHAS NÃO COINCIDEM"
                            }else{
                                await this.terminarFormulario(await this.enviarFormulario(qualFormAbrir), qualFormAbrir)                                
                            }}})                    
                    break;
                default:
                    break;
            }
        }else{
            await popUp("FORMULÁRIO ABERTO", "Já existe em formulário em execução. Porfavor, complete-o ou feche-o antes de abrir um novo formulário.")
        }}

    static async abrirFormularioEdicao(qualForm, quem){
        const endpoit = "http://localhost:8080/"
        if(!this.TemFormAberto){
        document.getElementById(`papel_${qualForm}`).setAttribute("class", "papel")

        const primeiraResposta = await fetch(`${endpoit}${quem}`,{
            method: 'GET',
            headers: {
                'Authorization': `Basic ${btoa(`bibliotecalibrys@gmail.com:librysbiblioteca`)}`
            }
        })
        if(primeiraResposta.ok){
            const dadosDoItem = await primeiraResposta.json()
            switch (qualForm) {
                case 'cl':
                    document.getElementById("i_titulo_cl").value = dadosDoItem.nome
                    document.getElementById("i_autor_cl").value = dadosDoItem.autor
                    document.getElementById("i_edicao_cl").value = dadosDoItem.edicao
                    document.getElementById("i_editora_cl").value = dadosDoItem.editora
                    document.getElementById("i_CodLoc_cl").value = dadosDoItem.codigoLocalizacao
                    document.getElementById("i_capa_cl").value = dadosDoItem.imagemUrl
                    document.getElementById("i_genero_cl").value = dadosDoItem.generoLiterario
                    break;
                case 'cc':
                    document.getElementById("i_nome_cc").value = dadosDoItem.nome
                    document.getElementById("i_cpf_cc").value = dadosDoItem.cpf
                    document.getElementById("i_celular_cc").value = dadosDoItem.celular
                    document.getElementById("i_endereco_cc").value = dadosDoItem.endereco
                    document.getElementById("i_DataNasc_cc").value = dadosDoItem.dataNascimento
                    document.getElementById("i_email_cc").value = dadosDoItem.email
                    break;
                case 'cf':
                    document.getElementById("i_nome_cf").value = dadosDoItem.nome
                    document.getElementById("i_cpf_cf").value = dadosDoItem.cpf
                    document.getElementById("i_celular_cf").value = dadosDoItem.celular
                    document.getElementById("i_endereco_cf").value = dadosDoItem.endereco
                    document.getElementById("i_DataNasc_cf").value = dadosDoItem.dataNascimento
                    document.getElementById("i_email_cf").value = dadosDoItem.email  
                    document.getElementById("i_senha_cf").value = dadosDoItem.senha                  
                    break;
                default:
                    break;
            }
            document.getElementById(`btn_fechar_${qualForm}`).addEventListener("click", async (qmfoi)=>{
                this.fecharFormulario(qualForm)
                if(qualForm == "cc"){
                    this.fecharFormulario("ccm")
                }})}
        switch (qualForm) {
            case "cf":
                document.getElementById(`btn_salvar_${qualForm}`).addEventListener("click", async ()=>{
                    const okkk = await this.avaliarFormulario(true, ".papel:not(.disabled) .input_form")
                    if(okkk == "ok"){
                        if(document.getElementById("i_senha_cf").value != document.getElementById("i_ConfirmaSenha_cf").value){
                            document.querySelector(".papel:not(.disabled) .err_geral_form").innerHTML ="AS SENHAS NÃO COINCIDEM"
                        }else{
                            await this.terminarFormulario(await this.enviarFormulario("ef", quem), qualForm)                                
                        }}})  
                break;
            case 'cc':
                document.getElementById("btn_salvar_cc_E_menor").addEventListener("click", async ()=>{
                    const okkk = await this.avaliarFormulario(true, ".papel:not(.disabled) .input_form")
                    if(okkk == "ok"){
                        const dataNasc = new Date(document.getElementById("i_DataNasc_cc").value)
                        const dataAtual = new Date()

                        if(((dataAtual-dataNasc)/(31557600000)) < 18){
                            document.getElementById("i_MenorIdade_cc").checked = true
                            await this.abrirFormMenor(true)
                        }else{
                            await this.terminarFormulario(await this.enviarFormulario("ec", quem), qualForm)                            
                        }}})
                break;
            case 'cl':
                document.getElementById(`btn_salvar_cl`).addEventListener("click", async ()=>{
                    const okkk = await this.avaliarFormulario(true, ".papel:not(.disabled) .input_form")
                    if(okkk == "ok"){
                        await this.terminarFormulario(await this.enviarFormulario("el", quem), qualForm)
                    }})
                break;
            default:
                break;
        }
        this.avaliarFormulario(false, ".papel:not(.disabled) .input_form")
        }else{
            await popUp("FORMULÁRIO ABERTO", "Já existe em formulário em execução. Porfavor, complete-o ou feche-o antes de abrir um novo formulário.")}}

    static async fecharFormulario(tipo){

        let quaisInputs = ".papel:not(.disabled) .input_form"
        if(tipo == "ccm"){quaisInputs = ".papel_especial .input_form"}
            this.TemFormAberto = false

            const inputs = [...document.querySelectorAll(quaisInputs)]
            inputs.map( async (el)=>{
                el.value = null
            })
            const erros = [...document.querySelectorAll(".err_geral_form")]
            erros.map((el)=>{
                el.innerHTML = " "
            })
            if(tipo == "ccm"){
                document.getElementById("papel_ccm").setAttribute("class", "papel_especial disabled")
            }else{
                document.getElementById(`papel_${tipo}`).setAttribute("class", "papel disabled")    
            }}

    static async avaliarFormulario(enviar, quais){
        const inputs = [...document.querySelectorAll(quais)]
        if(!enviar){
            inputs.map(async (el)=>{
                el.addEventListener("click",async (qmfoi)=>{
                    await validarInputs(el.id, false, quais)
                })
                el.addEventListener("keyup",async (qmfoi)=>{
                    await validarInputs(el.id, false, quais)
                })})
        }else{
            const okay =  await validarInputs(false, true, quais)
            if(okay == "erro"){
                document.querySelector(".papel:not(.disabled) .err_geral_form").innerHTML ="*PREENCHA TODOS OS CAMPOS DO FORMULÁRIO CORRETAMENTE!"
                document.querySelector(".papel_especial:not(.disabled) .err_geral_form").innerHTML ="*PREENCHA TODOS OS CAMPOS DO FORMULÁRIO CORRETAMENTE!"
            }
            return okay
        }}

    static async abrirFormMenor(editar){

        document.getElementById("papel_ccm").setAttribute("class", "papel_especial")
        await this.avaliarFormulario(false, "#papel_ccm .input_form")
        
        document.getElementById("btn_salvar_ccm").addEventListener("click", async ()=>{
            const okkk = await this.avaliarFormulario(true, ".papel:not(.disabled) .input_form, #papel_ccm .input_form")
            if(okkk == "ok"){
                if(editar){
                    await this.terminarFormulario(await this.enviarFormulario("ecm"), 'cc')
                    await this.fecharFormulario("ccm")
                }else{
                    await this.terminarFormulario(await this.enviarFormulario("ccm"), 'cc')
                    await this.fecharFormulario("ccm")
                }   
            }})}

    static async enviarFormulario(defEnd, finalDoPoint){
        let endponit = `http://localhost:8080/`
        let metodo
        let quemEnviar = ".papel:not(.disabled) .input_form"
        let objetoAEnviar = null

        switch (defEnd) {
            case "cl":
                endponit += `livros`
                metodo = "POST"
                objetoAEnviar = await criarJSONObject(quemEnviar);
                break;
            case "rl":
                endponit += `livros/${document.getElementById("i_CodId_rl").value}`
                metodo = "DELETE"
                break;
            case "al":
                endponit += "gerencia-livro/alugar"
                metodo = "POST"
                objetoAEnviar = {
                    "livroId": parseInt(document.getElementById("i_CodId_al").value, 10),
                    "clienteId": await pegarIdDe("i_cpfC_al",'clientes')
                }
                break;
            case "rnl":
                endponit += `gerencia-livro/renovar/${document.getElementById("i_CodTrans_al").value}`
                metodo = "PUT"
                break;
            case "dl":
                endponit += `gerencia-livro/devolver/${document.getElementById("i_codTrans_dl").value}`
                metodo = "DELETE"
                const respostaaas = await fetch(`http://localhost:8080/gerencia-livro/${document.getElementById("i_codTrans_dl").value}`,{
                    method: 'GET',
                    headers: {
                        'Authorization': `Basic ${btoa(`bibliotecalibrys@gmail.com:librysbiblioteca`)}`
                    }
                })
                if(respostaaas.ok){
                    const resp = await respostaaas.json()
                    let dataDev = new Date(resp.dataDevolucao)
                    let dataAtual = new Date()
                    if(dataDev < dataAtual){
                        popUp("LIVRO ATRASADO", `O livro a ser devolvido está atrasdo!\nCertifique-se que a multa referente ao(s) ${Math.floor((dataAtual-dataDev)/(1000*60*60*24))} dias de atraso foi paga, antes de efetuar a devolução!`)
                    }}
                break;
            case "cc":
                console.log("entrou no cc")
                endponit += "clientes"
                metodo = "POST"
                objetoAEnviar = await criarJSONObject(quemEnviar) 
                break;
            case "rc":
                endponit = (await pegarIdDe("i_cpf_rc", "clientes") ? `http://localhost:8080/clientes/${await pegarIdDe("i_cpf_rc", "clientes")}` : " ")
                metodo = "DELETE"
                break;
            case "cf":
                endponit += "funcionarios"
                metodo = "POST"
                objetoAEnviar = await criarJSONObject(quemEnviar)
                break;
            case "rf":                
                endponit += `funcionarios/${await pegarIdDe("i_cpf_rf", "funcionarios")}`
                metodo = "DELETE"
                break;
            case "ec":
                endponit += `${finalDoPoint}`
                metodo = "PUT"
                objetoAEnviar = await criarJSONObject(quemEnviar)
                objetoAEnviar['id'] = finalDoPoint.split('/')[1]
                break;
            case "ef":
                endponit += `${finalDoPoint}`
                metodo = "PUT"
                objetoAEnviar = await criarJSONObject(quemEnviar)
                objetoAEnviar['id'] = finalDoPoint.split('/')[1]
                break;
            case "el":
                endponit += `${finalDoPoint}`
                metodo = "PUT"
                objetoAEnviar = await criarJSONObject(quemEnviar)
                objetoAEnviar['id'] = finalDoPoint.split('/')[1]
                break;                
            case "ccm": 
                endponit += "clientes"
                metodo = "POST"  
                quemEnviar = ".papel:not(.disabled) .input_form, #papel_ccm .input_form" 
                objetoAEnviar = await criarJSONObject(quemEnviar) 
                break;
            case "ecm":
                endponit += `clientes/${await pegarIdDe("i_cpf_cc", "clientes")}`
                metodo = "PUT"
                quemEnviar = ".papel:not(.disabled) .input_form, #papel_ccm .input_form" 
                objetoAEnviar = await criarJSONObject(quemEnviar)
                break;            
            default:
                break;
        }
        let response;
        if (objetoAEnviar != null) {
            response = await fetch(endponit, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${btoa(`bibliotecalibrys@gmail.com:librysbiblioteca`)}`
                },
                body: JSON.stringify(objetoAEnviar)
            });
        } else {
            response = await fetch(endponit, {
                method: metodo
            });
        }
        return response
    }

    static async terminarFormulario(resposta, qualFormu){
        document.querySelector(".papel:not(.disabled) .err_geral_form").innerHTML = ""

        if ( !(resposta.ok)){
            const resppp = await resposta.json()

            document.querySelector(".papel:not(.disabled) .err_geral_form").innerHTML = resppp.detalhe
        }else{
            let resp
            if(qualFormu != 'dl' && qualFormu != 'rc' && qualFormu != 'rl' && qualFormu != 'rf'){
                resp = await resposta.json()
            }else{
                resp = resposta
            }
            this.fecharFormulario(qualFormu)
            switch (qualFormu) {
                case 'al':
                    await popUp("LIVRO ALUGADO/RENOVADO COM SUCESSO", `Código da transação: ${resp.id}\nData da locação: ${resp.dataLocacao}\nData de devolução: ${resp.dataDevolucao}`)
                    break;
                case 'rcm':
                case 'rc':
                    await popUp("CLIENTE REMOVIDO", "O cliente foi removido com sucesso!")
                    break;
                case 'ccm':
                case 'cc':
                    await popUp("CLIENTE CADASTRADO", "O cliente foi cadastrado com sucesso!")
                    break;
                case 'cl':
                    await popUp("LIVRO CADASTRADO", `O livro foi cadastrado com sucesso!\nO código de identificação é: ${resp.id}`)
                    break;
                case 'rl':
                    await popUp("LIVRO REMOVIDO", "O livro foi removido com sucesso!")
                    break;
                case 'cf':
                    await popUp("FUNCIONÁRIO CADASTRADO", "O funcionário foi cadastrado com sucesso!")
                    break;
                case 'rf':
                    await popUp("FUNCIONÁRIO REMOVIDO", "O funcionário foi removido com sucesso!")
                    break;
                case 'dl':
                    await popUp("LIVRO DEVOLVIDO", "O livro foi devolvido com sucesso!")
                    break;                                          
                default:
                    break;
            }}}

    static async preencherInformacoes(qualForm){
        let endponit = `http://localhost:8080/`

        let respostaaas
        switch (qualForm) {
            case 'rl':
                document.getElementById("i_CodId_rl").addEventListener("keyup", async(qmfoi)=>{
                    respostaaas = await fetch(`${endponit}livros/${qmfoi.target.value}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Basic ${btoa(`bibliotecalibrys@gmail.com:librysbiblioteca`)}`
                        }
                    })
                    const responseData = await respostaaas.json()
                    document.getElementById("i_titulo_rl").value = responseData.nome
                })
                break;
            case 'rc':
                document.getElementById("i_cpf_rc").addEventListener("keyup", async(qmfoi)=>{
                    respostaaas = await fetch(`${endponit}clientes/por-cpf?cpf=${qmfoi.target.value}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Basic ${btoa(`bibliotecalibrys@gmail.com:librysbiblioteca`)}`
                        }
                    })
                    const responseData = await respostaaas.json()
                    document.getElementById("i_nome_rc").value = responseData[0].nome
                })
                break; 
            case 'al':
                document.getElementById("i_CodTrans_al").addEventListener("keyup", async(oinput)=>{
                    respostaaas = await fetch(`${endponit}gerencia-livro/${oinput.target.value}`,{
                        method: 'GET',
                        headers: {
                            'Authorization': `Basic ${btoa(`bibliotecalibrys@gmail.com:librysbiblioteca`)}`
                        }
                    })
                    const responseData = await respostaaas.json()
                    document.getElementById("i_CodId_al").value =responseData.livro.id
                    document.getElementById("i_titulo_al").value =responseData.livro.nome

                    document.getElementById("i_NomeC_al").value =responseData.cliente.nome
                    document.getElementById("i_cpfC_al").value =responseData.cliente.cpf
                })

                document.getElementById("i_CodId_al").addEventListener("keyup", async(oinput)=>{
                    respostaaas = await fetch(`${endponit}livros/${oinput.target.value}`,{
                        method: 'GET',
                        headers: {
                            'Authorization': `Basic ${btoa(`bibliotecalibrys@gmail.com:librysbiblioteca`)}`
                        }
                    })
                    const responseData2 = await respostaaas.json()
                    document.getElementById("i_titulo_al").value =responseData2.nome
                })
                document.getElementById("i_cpfC_al").addEventListener("keyup", async(oinput)=>{
                    respostaaas = await fetch(`${endponit}clientes/por-cpf?cpf=${oinput.target.value}`,{
                        method: 'GET',
                        headers: {
                            'Authorization': `Basic ${btoa(`bibliotecalibrys@gmail.com:librysbiblioteca`)}`
                        }
                    })
                    const responseData3 = await respostaaas.json()
                    document.getElementById("i_NomeC_al").value =responseData3[0].nome
                })
                break;               
            case 'dl':
                document.getElementById("i_codTrans_dl").addEventListener("keyup", async (oinput)=>{
                    respostaaas = await fetch(`${endponit}gerencia-livro/${oinput.target.value}`,{
                        method: 'GET',
                        headers: {
                            'Authorization': `Basic ${btoa(`bibliotecalibrys@gmail.com:librysbiblioteca`)}`
                        }
                    })
                const responseData = await respostaaas.json()
                document.getElementById("i_CodId_dl").value =responseData.livro.id
                document.getElementById("i_titulo_dl").value =responseData.livro.nome
                document.getElementById("i_NomeC_dl").value =responseData.cliente.nome
                document.getElementById("i_cpfC_dl").value =responseData.cliente.cpf                    
                })
                break;
            case 'rf':
                document.getElementById("i_cpf_rf").addEventListener("keyup", async(qmfoi)=>{
                    respostaaas = await fetch(`${endponit}funcionarios/por-cpf?cpf=${qmfoi.target.value}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Basic ${btoa(`bibliotecalibrys@gmail.com:librysbiblioteca`)}`
                        }
                    })
                    const responseData = await respostaaas.json()
                    document.getElementById("i_nome_rf").value = responseData[0].nome
                })
                break;
            default:
                break;
        }}}
export {Formulario}