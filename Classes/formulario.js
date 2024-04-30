import { Funcionario, Livro, Cliente } from "../Classes/FLC.js"
import { MudarAba, Validar, CriarJSONForm } from "../Classes/FuncPack.js";


class Formulario{

    static TemFormAberto = false
    
    static GetForms=()=>{

        const papeis = [...document.querySelectorAll(".papel")]
        papeis.map((el)=>{
            el.setAttribute("class", "papel disabled")
        })
    }


    static AbrirFormulario=(tipo)=>{
        if(!this.TemFormAberto){
            this.TemFormAberto = true

            let ids = tipo.split("_")
            const qualFormAbrir = ids[1].charAt(0) + ids[2].charAt(0)

            document.getElementById(`papel_${qualFormAbrir}`).setAttribute("class", "papel")
            this.Avaliar(false)

            document.getElementById(`btn_fechar_${qualFormAbrir}`).addEventListener("click", (qmfoi)=>{
                this.FecharFormulario(qualFormAbrir)
            }) 

            document.getElementById(`btn_salvar_${qualFormAbrir}`).addEventListener("click", async ()=>{
                const okkk = this.Avaliar(true)
                if(okkk == "ok"){
                    const resposta = await this.Enviar(qualFormAbrir)
                    if(resposta.status == 404){
                        document.getElementById(".papel:not(.disabled) .err_geral_form").innerHTML = resposta.detalhe
                    }else{
                        this.FecharFormulario(qualFormAbrir)
                    }
                }
            })
            
            switch (qualFormAbrir) {
                case "cl":
                    document.getElementById("file_name_cl").addEventListener("click", ()=>{
                        document.getElementById("l_capa_cl").click()
                    })
                    
                    document.getElementById("i_capa_cl").addEventListener('change', ()=>{
                    document.getElementById("file_name_cl").innerText = document.getElementById("i_capa_cl").value;
                    })                    
                    
                    break;
                case "al":{
                    document.getElementById("btn_renovar_al")
                    document.getElementById("btn_alugar_al")

                }
            
                default:
                    break;
            }

        }else{
            alert("JA EXISTE UM FORMULÁRIO ABERTO!")
        }
    }


    static FecharFormulario=(tipo)=>{
        if(this.TemFormAberto){
            this.TemFormAberto = false

            const inputs = [...document.querySelectorAll(".papel:not(.disabled) .input_form")]
            inputs.map((el)=>{
                el.value = null
            })
            document.getElementById(`papel_${tipo}`).setAttribute("class", "papel disabled")
        }
    }
    static Avaliar=(enviar)=>{

        if(!enviar){
            const inputs = [...document.querySelectorAll(".papel:not(.disabled) .input_form")]
            inputs.map((el)=>{
                
                el.addEventListener("click",(qmfoi)=>{
                    Validar(el.id, false)
                })
                el.addEventListener("keyup",(qmfoi)=>{
                    Validar(el.id, false)
                })
            })
        }else{
            const okay =  Validar(false, true)
            return okay

        }

    }

    static async Enviar(defEnd){
        let endponit
        let metodo

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
        
            default:
                break;
        }

        async function main() {
            const formJSON = await CriarJSONForm();
            console.log(formJSON);

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