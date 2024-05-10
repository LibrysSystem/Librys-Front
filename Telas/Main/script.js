import {Formulario} from "../../Classes/formulario.js"
import { Usuario } from "../../Classes/Usuario.js";
import { MudarAba, Pesquisar } from "../../Classes/FuncPack.js";

//INICIO
document.addEventListener("DOMContentLoaded", (qmfoi)=>{

    document.getElementById("user_nome").innerHTML = Usuario.Nome
    document.getElementById("user_tipo").innerHTML = Usuario.Tipo
    if(Usuario.Tipo == "Funcionario"){
        document.getElementById("funcionarios").setAttribute("class", "sec_nav disabled")
    }
    MudarAba.mudarAba("aba_de_livro")
    Formulario.GetForms()
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
        Formulario.AbrirFormulario(el.id)

    })
})



//MAIN
document.getElementById("i_buscar").addEventListener("keyup", (qmfoi)=>{
    Pesquisar(document.getElementById("i_buscar").value, false)
})
document.getElementById("enviar_pesquia").addEventListener("click", ()=>{
    Pesquisar(document.getElementById("i_buscar").value, true)
})

//FORMULARIOS




