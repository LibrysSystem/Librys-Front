import { Funcionario, Livro, Cliente } from "../Classes/FLC.js"

class Formulario{
    static papelFormCL
    static papelFormRL
    static papelFormAL
    static papelFormDL
    static papelFormCC
    static papelFormRC
    static papelFormCF
    static papelFormRF

    static TemFormAberto = false
    

    static GetForms=()=>{
        this.papelFormCL = document.getElementById("papel_cl")
        this.papelFormCL.setAttribute("class", "papel disabled")
        this.papelFormRL = document.getElementById("papel_rl")
        this.papelFormRL.setAttribute("class", "papel disabled")
        this.papelFormAL = document.getElementById("papel_al")
        this.papelFormAL.setAttribute("class", "papel disabled")
        this.papelFormDL = document.getElementById("papel_dl")
        this.papelFormDL.setAttribute("class", "papel disabled")
        this.papelFormCC = document.getElementById("papel_cc")
        this.papelFormCC.setAttribute("class", "papel disabled")
        this.papelFormRC = document.getElementById("papel_rc")
        this.papelFormRC.setAttribute("class", "papel disabled")
        this.papelFormCF = document.getElementById("papel_cf")
        this.papelFormCF.setAttribute("class", "papel disabled")
        this.papelFormRF = document.getElementById("papel_rf")
        this.papelFormRF.setAttribute("class", "papel disabled")
    }


    static AbrirFormulario=(tipo)=>{
        if(!this.TemFormAberto){
            this.TemFormAberto = true
            switch (tipo) {
            case "cl":
                this.papelFormCL.setAttribute("class", "papel")

                document.getElementById("btn_fechar_cl").addEventListener("click", (qmfoi)=>{
                    this.FecharFormulario("cl")
                })
                document.getElementById("file_name_cl").addEventListener("click", ()=>{
                    document.getElementById("l_capa_cl").click()
                })
                
                document.getElementById("i_capa_cl").addEventListener('change', ()=>{
                document.getElementById("file_name_cl").innerText= document.getElementById("i_capa_cl").value;
                });
                
                break;
            case "rl":
                this.papelFormRL.setAttribute("class", "papel")

                document.getElementById("btn_fechar_rl").addEventListener("click", (qmfoi)=>{
                    this.FecharFormulario("rl")
                })

                
                break;    
            case "al":
                this.papelFormAL.setAttribute("class", "papel")

                document.getElementById("btn_fechar_al").addEventListener("click", (qmfoi)=>{
                    this.FecharFormulario("al")
                })

                
                break;
            case "dl":
                this.papelFormDL.setAttribute("class", "papel")

                document.getElementById("btn_fechar_dl").addEventListener("click", (qmfoi)=>{
                    this.FecharFormulario("dl")
                })

               
                break;
            case "cc":
                this.papelFormCC.setAttribute("class", "papel")

                document.getElementById("btn_fechar_cc").addEventListener("click", (qmfoi)=>{
                    this.FecharFormulario("cc")
                })
                
                break;
            case "rc":
                this.papelFormRC.setAttribute("class", "papel")

                document.getElementById("btn_fechar_rc").addEventListener("click", (qmfoi)=>{
                    this.FecharFormulario("rc")
                })

                
                break;    
            case "cf":
                this.papelFormCF.setAttribute("class", "papel")

                document.getElementById("btn_fechar_cf").addEventListener("click", (qmfoi)=>{
                    this.FecharFormulario("cf")
                })

                
                break;
            case "rf":
                this.papelFormRF.setAttribute("class", "papel")

                document.getElementById("btn_fechar_rf").addEventListener("click", (qmfoi)=>{
                    this.FecharFormulario("rf")
                })

                
                break;
            default:
                break;
        }}else{
            alert("JA EXISTE UM FORMULÁRIO ABERTO!")
        }
    }


    static FecharFormulario=(tipo)=>{
        if(this.TemFormAberto){
            this.TemFormAberto = false
            switch (tipo) {
            case "cl":
                document.getElementById("i_titulo_cl").value = null
                document.getElementById("i_autor_cl").value = null
                document.getElementById("i_edicao_cl").value = null
                document.getElementById("i_editora_cl").value = null
                document.getElementById("i_genero_cl").value = null
                document.getElementById("i_quantidade_cl").value = null
                document.getElementById("i_CodId_cl").value = null
                document.getElementById("i_CodLoc_cl").value = null
                document.getElementById("i_capa_cl").value = null

                this.papelFormCL.setAttribute("class", "papel disabled")

                break;
            case "rl":
                document.getElementById("i_titulo_rl").value = null
                document.getElementById("i_CodId_rl").value = null
                document.getElementById("i_motivo_rl").value = null

                this.papelFormRL.setAttribute("class", "papel disabled")
                break;    
            case "al":
                document.getElementById("i_CodId_al").value = null
                document.getElementById("i_titulo_al").value = null
                document.getElementById("i_NomeC_al").value = null
                document.getElementById("i_cpfC_al").value = null
                document.getElementById("i_cpfF_al").value = null
                document.getElementById("i_DataLoc_al").value = null
                document.getElementById("i_DataDev_al").value = null

                this.papelFormAL.setAttribute("class", "papel disabled")
                break;
            case "dl":
                document.getElementById("i_CodId_dl").value = null
                document.getElementById("i_cpfC_dl").value = null
                document.getElementById("i_NomeC_dl").value = null
                document.getElementById("i_titulo_al").value = null
                document.getElementById("i_DataLoc_dl").value = null
                document.getElementById("i_DataDev_dl").value = null

                this.papelFormDL.setAttribute("class", "papel disabled")
                break;
            case "cc":
                document.getElementById("i_nome_cc").value = null
                document.getElementById("i_cpf_cc").value = null
                document.getElementById("i_DataNasc_cc").value = null
                document.getElementById("i_email_cc").value = null
                document.getElementById("i_celular_cc").value = null
                document.getElementById("i_endereco_cc").value = null
                document.getElementById("i_MenorIdade_cc").value = null

                this.papelFormCC.setAttribute("class", "papel disabled")
                break;

            case "rc":
                document.getElementById("i_nome_rc").value = null
                document.getElementById("i_cpf_rc").value = null
                document.getElementById("i_motivo_rc").value = null

                this.papelFormRC.setAttribute("class", "papel disabled")
                break;
            case "cf":
                document.getElementById("i_nome_cf").value = null
                document.getElementById("i_cpf_cf").value = null
                document.getElementById("i_DataNasc_cf").value = null
                document.getElementById("i_email_cf").value = null
                document.getElementById("i_celular_cf").value = null
                document.getElementById("i_endereco_cf").value = null
                document.getElementById("i_senha_cf").value = null
                document.getElementById("i_ConfirmaSenha_cf").value = null

                this.papelFormCF.setAttribute("class", "papel disabled")
                break;
            case "rf":
                document.getElementById("i_nome_rf").value = null
                document.getElementById("i_cpf_rf").value = null
                document.getElementById("i_motivo_rf").value = null

                this.papelFormRF.setAttribute("class", "papel disabled")
                break;
            default:
                break;
        }}
    }

    

}
export{Formulario}