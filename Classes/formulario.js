import { Funcionario, Livro, Cliente } from "../Classes/FLC.js"
import { MudarAba, Validar } from "../Classes/FuncPack.js";


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

            document.getElementById(`btn_salvar_${qualFormAbrir}`).addEventListener("click", ()=>{
                const okkk = this.Avaliar(true)
                if(okkk == "ok"){this.FecharFormulario(qualFormAbrir)}
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
    static Avaliar(enviar) {

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

    

}
export{Formulario}