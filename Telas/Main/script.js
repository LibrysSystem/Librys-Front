import { Usuario } from "../../Classes/Usuario.js";
import { AbaDados, pesquisar } from "../../Classes/FuncPack.js";
import {Formulario} from "../../Classes/Formulario.js";

//INICIO
document.addEventListener("DOMContentLoaded", async (qmfoi)=>{

    document.getElementById("user_nome").innerHTML = Usuario.Nome
    document.getElementById("user_tipo").innerHTML = Usuario.Tipo
    if(Usuario.Tipo == "Funcionario"){
        document.getElementById("funcionarios").setAttribute("class", "sec_nav disabled")
    }
    await AbaDados.mudarAba("aba_de_livro")
    await Formulario.getForms()
});

// NAVBAR

const princ_btns = [...document.querySelectorAll(".sec_btn")]
princ_btns.map((el)=>{
    el.addEventListener("click", async (qmfoi)=>{
        await AbaDados.mudarAba(el.nextElementSibling.firstElementChild.id)
    })
})

const navPequenosBtns = [...document.querySelectorAll(".btns button")]
navPequenosBtns.map((el)=>{
    el.addEventListener("click", async (qmfoi)=>{

        if(!Formulario.TemFormAberto){
            await AbaDados.mudarAba(el.id)
        }
        await Formulario.abrirFormulario(el.id)

    })
})



//MAIN
document.getElementById("i_buscar").addEventListener("keyup", async (qmfoi)=>{
    await pesquisar(document.getElementById("i_buscar").value, false)
})
document.getElementById("enviar_pesquia").addEventListener("click", async ()=>{
    await pesquisar(document.getElementById("i_buscar").value, true)
})

//FORMULARIOS




