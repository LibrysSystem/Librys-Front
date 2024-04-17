import { Funcionario, Livro, Cliente } from "../Classes/FLC.js"

class Formulario{
    static papelFormCL
    static papelFormRL
    static papelFormAL
    static papelFormDL

    static TemFormAberto = false
    

    static GetForms=()=>{
        const papelFormCL = document.getElementById("papel_cl")
        this.papelFormCL = papelFormCL
        papelFormCL.setAttribute("class", "papel disabled")
        const papelFormRL = document.getElementById("papel_rl")
        this.papelFormRL = papelFormRL
        papelFormRL.setAttribute("class", "papel disabled")
        const papelFormAL = document.getElementById("papel_al")
        this.papelFormAL = papelFormAL
        papelFormAL.setAttribute("class", "papel disabled")
        const papelFormDL = document.getElementById("papel_dl")
        this.papelFormDL = papelFormDL
        papelFormDL.setAttribute("class", "papel disabled")
    }


    static AbrirFormulario=(tipo)=>{
        if(!this.TemFormAberto){
            switch (tipo) {
            case "cl":
                this.papelFormCL.setAttribute("class", "papel")

                document.getElementById("btn_fechar_cl").addEventListener("click", (qmfoi)=>{
                    this.FecharFormulario("cl")
                })



                this.TemFormAberto = true
                break;
            case "rl":
                this.papelFormRL.setAttribute("class", "papel")

                document.getElementById("btn_fechar_rl").addEventListener("click", (qmfoi)=>{
                    this.FecharFormulario("rl")
                })



                this.TemFormAberto = true
                break;    
            case "al":
                this.papelFormAL.setAttribute("class", "papel")

                document.getElementById("btn_fechar_al").addEventListener("click", (qmfoi)=>{
                    this.FecharFormulario("al")
                })



                this.TemFormAberto = true
                break;
            case "dl":
                this.papelFormDL.setAttribute("class", "papel")

                document.getElementById("btn_fechar_dl").addEventListener("click", (qmfoi)=>{
                    this.FecharFormulario("dl")
                })



                this.TemFormAberto = true
                break;
            default:
                break;
        }}
    }


    static FecharFormulario=(tipo)=>{
        if(this.TemFormAberto){
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
                this.TemFormAberto = false

                break;
            case "rl":
                document.getElementById("i_titulo_rl").value = null
                document.getElementById("i_CodId_rl").value = null
                document.getElementById("i_motivo_rl").value = null

                this.papelFormRL.setAttribute("class", "papel disabled")
                this.TemFormAberto = false
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
                this.TemFormAberto = false
                break;
            case "dl":
                document.getElementById("i_CodId_dl").value = null
                document.getElementById("i_cpfC_dl").value = null
                document.getElementById("i_NomeC_dl").value = null
                document.getElementById("i_titulo_al").value = null
                document.getElementById("i_DataLoc_dl").value = null
                document.getElementById("i_DataDev_dl").value = null

                this.papelFormDL.setAttribute("class", "papel disabled")
                this.TemFormAberto = false
                break;
            default:
                break;
        }}
    }

    

}
export{Formulario}