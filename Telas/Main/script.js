import {Formulario} from "../../Classes/formulario.js"
import { Usuario } from "../../Classes/Usuario.js";
import { MudarAba } from "../../Classes/FuncPack.js";

document.addEventListener("DOMContentLoaded", (qmfoi)=>{

    document.getElementById("user_nome").innerHTML = Usuario.Nome
    document.getElementById("user_tipo").innerHTML = Usuario.Tipo
    if(Usuario.Tipo == "Funcionario"){
        document.getElementById("funcionarios").setAttribute("class", "sec_nav disabled")
    }
    Formulario.GetForms()
});


document.getElementById("btn_livros_princi").addEventListener("click", (qmfoi)=>{
    MudarAba("l")
})
document.getElementById("btn_clientes_princi").addEventListener("click", (qmfoi)=>{
    MudarAba("c")
})
document.getElementById("btn_funcionarios_princi").addEventListener("click", (qmfoi)=>{
    MudarAba("f")
})



document.getElementById("btn_cadastrar_livro").addEventListener("click", ()=>{
    Formulario.AbrirFormulario("cl")
    MudarAba("l")
})
document.getElementById("btn_remover_livro").addEventListener("click", ()=>{
    Formulario.AbrirFormulario("rl")
    MudarAba("l")

})
document.getElementById("btn_alugar_livro").addEventListener("click", ()=>{
    Formulario.AbrirFormulario("al")
    MudarAba("l")

})
document.getElementById("btn_devolver_livro").addEventListener("click", ()=>{
    Formulario.AbrirFormulario("dl")
    MudarAba("l")

})
document.getElementById("btn_cadastrar_cliente").addEventListener("click", ()=>{
    Formulario.AbrirFormulario("cc")
    MudarAba("c")

})
document.getElementById("btn_remover_cliente").addEventListener("click", ()=>{
    Formulario.AbrirFormulario("rc")
    MudarAba("c")

})
document.getElementById("btn_cadastrar_funcionario").addEventListener("click", ()=>{
    Formulario.AbrirFormulario("cf")
    MudarAba("f")

})
document.getElementById("btn_remover_funcionario").addEventListener("click", ()=>{
    Formulario.AbrirFormulario("rf")
    MudarAba("f")

})