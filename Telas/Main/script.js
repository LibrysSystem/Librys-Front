import {Formulario} from "../../Classes/formulario.js"

const btn_cadastrar_livro = document.getElementById("btn_cadastrar_livro")






btn_cadastrar_livro.addEventListener("click", ()=>{
    Formulario.AbrirFormulario("CL")
})