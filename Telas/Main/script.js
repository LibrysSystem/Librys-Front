import {Formulario} from "../../Classes/Formulario.js"
import { Usuario } from "../../Classes/Usuario.js";
import { MudarAba, pesquisar } from "../../Classes/FuncPack.js";

//INICIO
document.addEventListener("DOMContentLoaded", (qmfoi)=>{

    document.getElementById("user_nome").innerHTML = Usuario.Nome
    document.getElementById("user_tipo").innerHTML = Usuario.Tipo
    if(Usuario.Tipo == "Funcionario"){
        document.getElementById("funcionarios").setAttribute("class", "sec_nav disabled")
    }
    MudarAba.mudarAba("aba_de_livro")
    Formulario.getForms()
});

// NAVBAR

const princ_btns = [...document.querySelectorAll(".sec_btn")]
princ_btns.map((el)=>{
    el.addEventListener("click", (qmfoi)=>{
        MudarAba.mudarAba(el.nextElementSibling.firstElementChild.id)
    })
})

const navPequenosBtns = [...document.querySelectorAll(".btns button")]
navPequenosBtns.map((el)=>{
    el.addEventListener("click", (qmfoi)=>{

        if(!Formulario.TemFormAberto){
            MudarAba.mudarAba(el.id)
        }
        Formulario.abrirFormulario(el.id)

    })
})



//MAIN
document.getElementById("i_buscar").addEventListener("keyup", (qmfoi)=>{
    pesquisar(document.getElementById("i_buscar").value, false)
})
document.getElementById("enviar_pesquia").addEventListener("click", ()=>{
    pesquisar(document.getElementById("i_buscar").value, true)
})

//FORMULARIOS




