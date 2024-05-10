import { Funcionario, Livro, Cliente } from "../Classes/FLC.js"
import { Validar, CriarJSONForm, popUp } from "../Classes/FuncPack.js";


class Formulario{

    static TemFormAberto = false
    static oLivroExiste = false
    
    static GetForms=()=>{

        const papeis = [...document.querySelectorAll(".papel")]
        papeis.map((el)=>{
            el.setAttribute("class", "papel disabled")
        })
    }


    static AbrirFormulario=async (tipo)=>{
        if(!this.TemFormAberto){
            this.TemFormAberto = true

            let ids = tipo.split("_")
            const qualFormAbrir = ids[1].charAt(0) + ids[2].charAt(0)

            document.getElementById(`papel_${qualFormAbrir}`).setAttribute("class", "papel")
            this.Avaliar(false, ".papel:not(.disabled) .input_form")

            document.getElementById(`btn_fechar_${qualFormAbrir}`).addEventListener("click", (qmfoi)=>{
                this.FecharFormulario(qualFormAbrir)
                if(qualFormAbrir == "cc"){
                    this.FecharFormulario("ccm")
                }
            }) 

            if((qualFormAbrir != "cc") && (qualFormAbrir != "al")){
                document.getElementById(`btn_salvar_${qualFormAbrir}`).addEventListener("click", async ()=>{
                    const okkk = this.Avaliar(true, ".papel:not(.disabled) .input_form")
                    if(okkk == "ok"){
                        // const resposta = await this.Enviar(qualFormAbrir)
                        // if(resposta.status == 404){
                        //     document.querySelector(".papel:not(.disabled) .err_geral_form").innerHTML = resposta.detalhe
                        // }else{
                            this.FecharFormulario(qualFormAbrir)
                        //}
                    }  
                })
            }
            
            switch (qualFormAbrir) {
                case "cl":
                    document.getElementById("file_name_cl").addEventListener("click", ()=>{
                        document.getElementById("l_capa_cl").click()
                    })
                    
                    document.getElementById("i_capa_cl").addEventListener('change', ()=>{
                    document.getElementById("file_name_cl").innerText = document.getElementById("i_capa_cl").value;
                    })                    
                    
                    break;
                case "al":
                    document.getElementById("btn_renovar_al").addEventListener("click", async ()=>{
                        const okkk = this.Avaliar(true, ".papel:not(.disabled) .input_form")
                        if(okkk == "ok"){
        
                            // fetch('read_livro', {
                            //     method: 'GET',
                            //     headers: {
                            //         'Content-Type': 'application/json'
                            //     },
                            //     body: document.getElementById("i_CodId_al").value
                            // })
                            // .then(resp=>resp.json())
                            // .then(rest=>{
                            //     console.log(rest)
                            //     this.oLivroExiste = rest                        
        
                            // })
        
                            // if(this.oLivroExiste.status!= 404){
                            //     if(this.oLivroExiste.alugado == true){
                            //         const resposta = await this.Enviar(qualFormAbrir)
                            //         if(resposta.status == 404){
                            //             document.getElementById(".papel:not(.disabled) .err_geral_form").innerHTML = resposta.detalhe
                            //         }else{
                                        this.FecharFormulario(qualFormAbrir)
                            //         }
                            //     }else{
                            //         document.getElementById(".papel:not(.disabled) .err_geral_form").innerHTML = "O livro ainda não foi alugado."
                            //     }    
                            // }else{
                            //     document.getElementById(".papel:not(.disabled) .err_geral_form").innerHTML = this.oLivroExiste.detalhe
                            // }
                        }                      
                    })
                    document.getElementById("btn_alugar_al").addEventListener("click", async ()=>{
                        const okkk = this.Avaliar(true, ".papel:not(.disabled) .input_form")
                        if(okkk == "ok"){
        
                            // fetch('read_livro', {
                            //     method: 'GET',
                            //     headers: {
                            //         'Content-Type': 'application/json'
                            //     },
                            //     body: document.getElementById("i_CodId_al").value
                            // })
                            // .then(resp=>resp.json())
                            // .then(rest=>{
                            //     console.log(rest)
                            //     this.oLivroExiste = rest                        
        
                            // })
        
                            // if(this.oLivroExiste.status!= 404){
                            //     if(this.oLivroExiste.alugado == false){
                            //         const resposta = await this.Enviar(qualFormAbrir)
                            //         if(resposta.status == 404){
                            //             document.getElementById(".papel:not(.disabled) .err_geral_form").innerHTML = resposta.detalhe
                            //         }else{
                                        this.FecharFormulario(qualFormAbrir)
                            //         }
                            //     }else{
                            //         document.getElementById(".papel:not(.disabled) .err_geral_form").innerHTML = "O livro ja foi foi alugado."
                            //     }    
                            // }else{
                            //     document.getElementById(".papel:not(.disabled) .err_geral_form").innerHTML = this.oLivroExiste.detalhe
                            // }
                        }    
                    })
                    break;                   
                case 'cc':
                    document.getElementById("btn_salvar_cc_E_menor").addEventListener("click", async ()=>{
                        const okkk = this.Avaliar(true, ".papel:not(.disabled) .input_form")
                        if(okkk == "ok"){
                            const dataNasc = new Date(document.getElementById("i_DataNasc_cc").value)
                            const dataAtual = new Date()

                            if(((dataAtual-dataNasc)/(31557600000)) < 18){
                                document.getElementById("i_MenorIdade_cc").checked = true
                                this.abrirFormMenor()
                            }
                            else{
                                // const resposta = await this.Enviar(qualFormAbrir)
                                // if(resposta.status == 404){
                                //     document.getElementById(".papel:not(.disabled) .err_geral_form").innerHTML = resposta.detalhe
                                // }else{
                                    this.FecharFormulario(qualFormAbrir)
                                    this.FecharFormulario("ccm")
                                //}
                            }
                        } 
                    })
                    break;
                default:
                    break;
            }

        }else{
            popUp("FORMULÁRIO ABERTO", "Já existe em formulário em execução. Porfavor, complete-o ou feche-o antes de abrir um novo formulário.")
        }
    }


    static FecharFormulario=(tipo)=>{

        let quaisInputs = ".papel:not(.disabled) .input_form"
        if(tipo == "ccm"){quaisInputs = ".papel_especial .input_form"}

        if(this.TemFormAberto || tipo=="ccm"){
            this.TemFormAberto = false

            const inputs = [...document.querySelectorAll(quaisInputs)]
            inputs.map((el)=>{
                el.value = null
            })
            if(tipo == "ccm"){
                document.getElementById("papel_ccm").setAttribute("class", "papel_especial disabled")
            }else{
                document.getElementById(`papel_${tipo}`).setAttribute("class", "papel disabled")
                
            }
        }

    }
    static Avaliar=(enviar, quais)=>{

        const inputs = [...document.querySelectorAll(quais)]
        if(!enviar){
            inputs.map((el)=>{
                
                el.addEventListener("click",(qmfoi)=>{
                    Validar(el.id, false, quais)
                })
                el.addEventListener("keyup",(qmfoi)=>{
                    Validar(el.id, false, quais)
                })
            })
        }else{
            const okay =  Validar(false, true, quais)
            if(okay == "erro"){
                document.querySelector(".papel:not(.disabled) .err_geral_form").innerHTML ="*PREENCHA TODOS OS CAMPOS DO FORMULÁRIO CORRETAMENTE!"
                document.querySelector(".papel_especial:not(.disabled) .err_geral_form").innerHTML ="*PREENCHA TODOS OS CAMPOS DO FORMULÁRIO CORRETAMENTE!"
            }
            return okay

        }

    }
    static async abrirFormMenor(){

        document.getElementById("papel_ccm").setAttribute("class", "papel_especial")
        this.Avaliar(false, "#papel_ccm .input_form")
        
        document.getElementById("btn_salvar_ccm").addEventListener("click", async ()=>{
            const okkk = this.Avaliar(true, ".papel:not(.disabled) .input_form, #papel_ccm .input_form")
            if(okkk == "ok"){
                const resposta = await this.Enviar("ccm")
                // if(resposta.status == 404){
                //     document.getElementById(".papel:not(.disabled) .err_geral_form").innerHTML = resposta.detalhe
                // }else{
                    this.FecharFormulario("cc")
                    this.FecharFormulario("ccm")
                //}
            }  
        })


    }

    static async Enviar(defEnd){
        let endponit
        let metodo
        let quemEnviar = ".papel:not(.disabled) .input_form"


        switch (defEnd) {
            case "cl":
                endponit = "Criar_Livro"
                metodo = "POST"
                
                break;
            case "rl":
                endponit = "Delete_Livro"
                metodo = "DELETE"
                
                break;
            case "al":
                endponit = "Update_Livro"
                metodo = "PATCH"
            
            break;
            case "dl":
                endponit = "Update_Livro"
                metodo = "PATCH"
            
            break;
            case "cc":
                endponit = "Criar_Cliente"
                metodo = "POST"
                
                break;
            case "rc":
                endponit = "Delete_Cliente"
                metodo = "DELETE"
                
                break;
            case "cf":
                endponit = "Criar_Funcionario"
                metodo = "POST"
            
            break;
            case "rf":
                endponit = "Delete_Funcionario"
                metodo = "DELETE"
            
            break;
            case "ac":
                endponit = "Update_Cliente"
                metodo = "PATCH"
                
                break;
            case "af":
                endponit = "Update_Funcionario"
                metodo = "PATCH"
            
            break;
            case "ccm": 
                endponit = "Criar_Cliente"
                metodo = "POST"  
                quemEnviar = ".papel:not(.disabled) .input_form, #papel_ccm .input_form"  

                break;
            default:
                break;
        }

        async function main() {
            const formJSON = await CriarJSONForm(quemEnviar);

            // fetch(endponit, {
            //     method: metodo,
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(formJSON)
            // })
            // .then(resp=>resp.json())
            // .then(rest=>{
            //     console.log(rest)

            //     return rest
            // })
        }
        return await main()
    }

    

}
export{Formulario}