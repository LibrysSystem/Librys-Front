import {Formulario} from "../../Classes/formulario.js"
import { Usuario } from "../../Classes/Usuario.js";

document.addEventListener("DOMContentLoaded", (qmfoi)=>{

    document.getElementById("user_nome").innerHTML = Usuario.Nome
    document.getElementById("user_tipo").innerHTML = Usuario.Tipo
    if(Usuario.Tipo == "Funcionario"){
        document.getElementById("funcionarios").setAttribute("class", "sec_nav disabled")
    }
    Formulario.GetForms()
});


document.getElementById("btn_livros_princi").addEventListener("click", (qmfoi)=>{
    //criar func mudar de aba
    document.getElementById("h1_main").innerHTML = "LIVROS"
})
document.getElementById("btn_clientes_princi").addEventListener("click", (qmfoi)=>{
    document.getElementById("h1_main").innerHTML = "CLIENTES"
})
document.getElementById("btn_funcionarios_princi").addEventListener("click", (qmfoi)=>{
    document.getElementById("h1_main").innerHTML = "FUNCIONÁRIOS"
})


const btn_cadastrar_livro = document.getElementById("btn_cadastrar_livro")
btn_cadastrar_livro.addEventListener("click", ()=>{
    Formulario.AbrirFormulario("cl")
})
const btn_remover_livro = document.getElementById("btn_remover_livro")
btn_remover_livro.addEventListener("click", ()=>{
    Formulario.AbrirFormulario("rl")
})
const btn_alugar_livro = document.getElementById("btn_alugar_livro")
btn_alugar_livro.addEventListener("click", ()=>{
    Formulario.AbrirFormulario("al")
})
const btn_devolver_livro = document.getElementById("btn_devolver_livro")
btn_devolver_livro.addEventListener("click", ()=>{
    Formulario.AbrirFormulario("dl")
})