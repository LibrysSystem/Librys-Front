import {Formulario} from "../../Classes/formulario.js"
import { Usuario } from "../../Classes/Usuario.js";
import { MudarAba, Validar } from "../../Classes/FuncPack.js";

//INICIOoooooooooooooooooooo
document.addEventListener("DOMContentLoaded", (qmfoi)=>{

    document.getElementById("user_nome").innerHTML = Usuario.Nome
    document.getElementById("user_tipo").innerHTML = Usuario.Tipo
    if(Usuario.Tipo == "Funcionario"){
        document.getElementById("funcionarios").setAttribute("class", "sec_nav disabled")
    }
    Formulario.GetForms()
});

// NAVBAR
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
    if(!Formulario.TemFormAberto){
        MudarAba("l")
    }
        Formulario.AbrirFormulario("cl")

    
})
document.getElementById("btn_remover_livro").addEventListener("click", ()=>{
    if(!Formulario.TemFormAberto){
        MudarAba("l")
    }
    Formulario.AbrirFormulario("rl")

})
document.getElementById("btn_alugar_livro").addEventListener("click", ()=>{
    if(!Formulario.TemFormAberto){
        MudarAba("l")
    }
    Formulario.AbrirFormulario("al")

})
document.getElementById("btn_devolver_livro").addEventListener("click", ()=>{
    if(!Formulario.TemFormAberto){
        MudarAba("l")
    }
    Formulario.AbrirFormulario("dl")

})
document.getElementById("btn_cadastrar_cliente").addEventListener("click", ()=>{
    if(!Formulario.TemFormAberto){
        MudarAba("c")
    }
    Formulario.AbrirFormulario("cc")

})
document.getElementById("btn_remover_cliente").addEventListener("click", ()=>{
    if(!Formulario.TemFormAberto){
        MudarAba("c")
    }
    Formulario.AbrirFormulario("rc")

})
document.getElementById("btn_cadastrar_funcionario").addEventListener("click", ()=>{
    if(!Formulario.TemFormAberto){
        MudarAba("f")
    }
    Formulario.AbrirFormulario("cf")

})
document.getElementById("btn_remover_funcionario").addEventListener("click", ()=>{
    if(!Formulario.TemFormAberto){
        MudarAba("f")
    }    
    Formulario.AbrirFormulario("rf")

})


//MAIN
document.getElementById("enviar_pesquia").addEventListener("click", (qmfoi)=>{
    const pesquisa = document.getElementById("buscar").value
    // fetch('endponit', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         pesquisar: pesquisa, 
    //     })
    // })
    // .then(resp=>resp.json())
    // .then(rest=>{
    //     console.log(rest)
        
    // })
})

//FORMULARIOS




