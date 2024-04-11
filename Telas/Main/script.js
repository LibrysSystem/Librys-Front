import {Formulario} from "./formulario.js"
const formulario = new Formulario()

const btn_cadastrar_livro = document.getElementById("btn_cadastrar_livro")






btn_cadastrar_livro.addEventListener("click", ()=>{
    formulario.AbrirFormulario("CL")
})