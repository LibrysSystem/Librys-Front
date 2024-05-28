import { Funcionario, Livro, Cliente } from "./FLC.js"
import { validarInputs, criarJSONObject, popUp, pegarIdDe} from "./FuncPack.js";


class Formulario{

    static TemFormAberto = false
    static oLivroExiste = false
    
    static getForms=async()=>{

        const papeis = [...document.querySelectorAll(".papel")]
        papeis.map((el)=>{
            el.setAttribute("class", "papel disabled")
        })
    }


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
                }
            }) 
            
            this.preencherInformacoes(qualFormAbrir)
            if((qualFormAbrir != "cc") && (qualFormAbrir != "al") && (qualFormAbrir != "cf")){
                document.getElementById(`btn_salvar_${qualFormAbrir}`).addEventListener("click", async ()=>{
                    const okkk = await this.avaliarFormulario(true, ".papel:not(.disabled) .input_form")
                    if(okkk == "ok"){
                        // const resposta = await this.enviarFormulario(qualFormAbrir)
                        await this.terminarFormulario(await this.enviarFormulario(qualFormAbrir), qualFormAbrir)
                    }  
                })
            }
            
            switch (qualFormAbrir) {
                // case "cl":
                //     document.getElementById("file_name_cl").addEventListener("click", ()=>{
                //         document.getElementById("l_capa_cl").click()
                //     })
                    
                //     document.getElementById("i_capa_cl").addEventListener('change', ()=>{
                //     document.getElementById("file_name_cl").innerText = document.getElementById("i_capa_cl").value;
                //     })                    
                    
                //     break;
                case "al":
                    document.getElementById("btn_renovar_al").addEventListener("click", async ()=>{
                        document.getElementById("i_CodTrans_al").setAttribute("required", "true")
                        const okkk = await this.avaliarFormulario(true, ".papel:not(.disabled) .input_form")
                        if(okkk == "ok"){
                            //const resposta = await this.enviarFormulario("rnl")
                            await this.terminarFormulario(await this.enviarFormulario("rnl"), qualFormAbrir)
                        }                      
                    })

                    document.getElementById("btn_alugar_al").addEventListener("click", async ()=>{
                        const okkk = await this.avaliarFormulario(true, ".papel:not(.disabled) .input_form")
                        if(okkk == "ok"){
                            //const resposta = await this.enviarFormulario("al")
                            await this.terminarFormulario(await this.enviarFormulario("al"), qualFormAbrir)
                        }    
                    })
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
                            }
                            else{
                                //const resposta = await this.enviarFormulario(qualFormAbrir)
                                await this.terminarFormulario(await this.enviarFormulario(qualFormAbrir), qualFormAbrir)
                                //this.fecharFormulario("ccm")
                                
                            }
                        } 
                    })
                    break;
                case 'cf':
                    document.getElementById(`btn_salvar_${qualFormAbrir}`).addEventListener("click", async ()=>{
                        const okkk = await this.avaliarFormulario(true, ".papel:not(.disabled) .input_form")
                        if(okkk == "ok"){

                            if(document.getElementById("i_senha_cf").value != document.getElementById("i_ConfirmaSenha_cf").value){
                                document.querySelector(".papel:not(.disabled) .err_geral_form").innerHTML ="AS SENHAS NÃO COINCIDEM"
                            }else{
                                //const resposta = await this.enviarFormulario(qualFormAbrir)
                                await this.terminarFormulario(await this.enviarFormulario(qualFormAbrir), qualFormAbrir)                                
                            }
                        }  
                    })                    
                    break;
                default:
                    break;
            }

        }else{
            await popUp("FORMULÁRIO ABERTO", "Já existe em formulário em execução. Porfavor, complete-o ou feche-o antes de abrir um novo formulário.")
        }
    }


    static async fecharFormulario(tipo){

        let quaisInputs = ".papel:not(.disabled) .input_form"
        if(tipo == "ccm"){quaisInputs = ".papel_especial .input_form"}

        //if(this.TemFormAberto || tipo=="ccm"){
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
                
            }
        //}

    }
    static async avaliarFormulario(enviar, quais){

        const inputs = [...document.querySelectorAll(quais)]
        if(!enviar){
            inputs.map(async (el)=>{
                
                el.addEventListener("click",async (qmfoi)=>{
                    await validarInputs(el.id, false, quais)
                })
                el.addEventListener("keyup",async (qmfoi)=>{
                    await validarInputs(el.id, false, quais)
                })
            })
        }else{
            const okay =  await validarInputs(false, true, quais)
            if(okay == "erro"){
                document.querySelector(".papel:not(.disabled) .err_geral_form").innerHTML ="*PREENCHA TODOS OS CAMPOS DO FORMULÁRIO CORRETAMENTE!"
                document.querySelector(".papel_especial:not(.disabled) .err_geral_form").innerHTML ="*PREENCHA TODOS OS CAMPOS DO FORMULÁRIO CORRETAMENTE!"
            }
            return okay

        }

    }
    static async abrirFormMenor(){

        document.getElementById("papel_ccm").setAttribute("class", "papel_especial")
        await this.avaliarFormulario(false, "#papel_ccm .input_form")
        
        document.getElementById("btn_salvar_ccm").addEventListener("click", async ()=>{
            const okkk = await this.avaliarFormulario(true, ".papel:not(.disabled) .input_form, #papel_ccm .input_form")
            if(okkk == "ok"){

                //const resposta = await this.enviarFormulario("ccm")
                await this.terminarFormulario(await this.enviarFormulario("ccm"), 'cc')
                await this.fecharFormulario("ccm")
                
            }  
        })


    }

    static async enviarFormulario(defEnd){
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
                    "clienteId": await pegarIdDe("i_cpfC_al")
                }
            
                break;
            case "rnl":

                endponit += `gerencia-livro/renovar/${document.getElementById("i_CodTrans_al").value}`
                metodo = "PUT"
                // objetoAEnviar = {
                //     "livro": {
                //         "id": `${document.getElementById("i_CodId_al").value}`
                //     },
                //     "cliente": {
                //         "id": `${await pegarIdDe("i_cpfC_al")}`
                //     }
                // }

                break;
            case "dl":
                endponit += `gerencia-livro/devolver/${document.getElementById("i_codTrans_dl").value}`
                metodo = "DELETE"
            
                break;
            case "cc":
                endponit += "clientes"
                metodo = "POST"
                objetoAEnviar = await criarJSONObject(quemEnviar)
                
                break;
            case "rc":
                //(await pegarIdDe("i_cpf_rc") ? await pegarIdDe("i_cpf_rc") : "")
                endponit = (await pegarIdDe("i_cpf_rc") ? `http://localhost:8080/clientes/${await pegarIdDe("i_cpf_rc")}` : " ")
                metodo = "DELETE"
                
                break;
            case "cf":
                endponit += "funcionarios"
                metodo = "POST"
                objetoAEnviar = await criarJSONObject(quemEnviar)
            
                break;
            case "rf":                

                endponit += `clientes/${await pegarIdDe("i_cpf_rf")}`
                metodo = "DELETE"
            
                break;
            case "ac":
                endponit += `clientes/${await pegarIdDe("i_cpf_cc")}`
                metodo = "PUT"
                objetoAEnviar = await criarJSONObject(quemEnviar)
                
                break;
            case "af":
                endponit += `funcionarios/${await pegarIdDe("i_cpf_cf")}`
                metodo = "PUT"
                objetoAEnviar = await criarJSONObject(quemEnviar)
            
                break;
            case "ccm": 
                endponit += "clientes"
                metodo = "POST"  
                quemEnviar = ".papel:not(.disabled) .input_form, #papel_ccm .input_form" 
                objetoAEnviar = await criarJSONObject(quemEnviar) 
                break;
            case "acm":
                endponit += `clientes/${await pegarIdDe("i_cpf_cc")}`
                metodo = "PUT"
                quemEnviar = ".papel:not(.disabled) .input_form, #papel_ccm .input_form" 
                objetoAEnviar = await criarJSONObject(quemEnviar)
                
                break;            
            default:
                break;
        }
        // async function main()
        console.log('O objeto q eu enviei')
        console.log(objetoAEnviar)
        console.log('O endpoit q eu enviei')
        console.log(endponit)

 
        let response;
        if (objetoAEnviar != null) {
            response = await fetch(endponit, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objetoAEnviar)
            });
        } else {
            response = await fetch(endponit, {
                method: metodo
            });
        }

        console.log("A RESPOSTA DA REQUISIÇAO")
        console.log(response)
        // if(!(response.ok)){
        //     console.log("entrou no if")
            return response
        //}
        // const responseData = await response.json();
        // console.log("deu responseData")
        // console.log(responseData)
        // return responseData;
    }

    //     return await main()
    // }


    static async terminarFormulario(resposta, qualFormu){
        document.querySelector(".papel:not(.disabled) .err_geral_form").innerHTML = ""
        console.log("resp")

        if ( !(resposta.ok)){
            const resppp = await resposta.json()
            document.querySelector(".papel:not(.disabled) .err_geral_form").innerHTML = resppp.detalhe
            // if(resppp.status === 409 && qualFormu == 'al'){
            //     document.querySelector(".papel:not(.disabled) .err_geral_form").innerHTML = "*ESTE LIVRO JA ESTÁ ALUGADO!*"

            // }
        }else{

            let resp
            if(qualFormu != 'dl' && qualFormu != 'rc' && qualFormu != 'rl'){
                resp = await resposta.json()
            }else{
                resp = resposta
            }
            console.log('PASSOU NO OK DO ELSE')
            console.log(resp)

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
            }
        }

    }
    static async preencherInformacoes(qualForm){
        let endponit = `http://localhost:8080/`

        let respostaaas
        switch (qualForm) {
            case 'rl':
                document.getElementById("i_CodId_rl").addEventListener("keyup", async(qmfoi)=>{
                    respostaaas = await fetch(`http://localhost:8080/livros/${qmfoi.target.value}`, {
                        method: 'GET'
                    })
                    const responseData = await respostaaas.json()
                    document.getElementById("i_titulo_rl").value = responseData.nome

                })
                break;
            case 'rc':
                document.getElementById("i_cpf_rc").addEventListener("keyup", async(qmfoi)=>{
                    respostaaas = await fetch(`http://localhost:8080/clientes/por-cpf?cpf=${qmfoi.target.value}`, {
                        method: 'GET'
                    })
                    const responseData = await respostaaas.json()
                    document.getElementById("i_nome_rc").value = responseData[0].nome

                })
                break; 
            case 'al':
                document.getElementById("i_CodTrans_al").addEventListener("keyup", async(oinput)=>{
                    respostaaas = await fetch(`http://localhost:8080/gerencia-livro/${oinput.target.value}`,{
                        method: 'GET'
                    })
                    const responseData = await respostaaas.json()
                    document.getElementById("i_CodId_al").value =responseData.livro.id
                    document.getElementById("i_titulo_al").value =responseData.livro.nome

                    document.getElementById("i_NomeC_al").value =responseData.cliente.nome
                    document.getElementById("i_cpfC_al").value =responseData.cliente.cpf

                })

                document.getElementById("i_CodId_al").addEventListener("keyup", async(oinput)=>{
                    respostaaas = await fetch(`http://localhost:8080/livros/${oinput.target.value}`,{
                        method: 'GET'
                    })
                    const responseData2 = await respostaaas.json()
                    document.getElementById("i_titulo_al").value =responseData2.nome

                })
                document.getElementById("i_cpfC_al").addEventListener("keyup", async(oinput)=>{
                    respostaaas = await fetch(`http://localhost:8080/clientes/por-cpf?cpf=${oinput.target.value}`,{
                        method: 'GET'
                    })
                    const responseData3 = await respostaaas.json()
                    document.getElementById("i_NomeC_al").value =responseData3[0].nome

                })
                break;               
            case 'dl':
                document.getElementById("i_codTrans_dl").addEventListener("keyup", async (oinput)=>{
                    respostaaas = await fetch(`http://localhost:8080/gerencia-livro/${oinput.target.value}`,{
                        method: 'GET'
                    })
                const responseData = await respostaaas.json()
                document.getElementById("i_CodId_dl").value =responseData.livro.id
                document.getElementById("i_titulo_dl").value =responseData.livro.nome

                document.getElementById("i_NomeC_dl").value =responseData.cliente.nome
                document.getElementById("i_cpfC_dl").value =responseData.cliente.cpf                    
                })


                break;
            default:
                break;
        }

    }

}


export{Formulario};