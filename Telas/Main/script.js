import { Usuario } from "../../Classes/Usuario.js";
import { AbaDados, pesquisar, buscar, popUp} from "../../Classes/FuncPack.js";
import {Formulario} from "../../Classes/Formulario.js";

//INICIO
document.addEventListener("DOMContentLoaded", async (qmfoi)=>{
    await Formulario.getForms()
    document.getElementById("user_nome").innerHTML = Usuario.getNome()
    document.getElementById("user_tipo").innerHTML = Usuario.getTipo()
    if(Usuario.tipo == "Funcionario"){
        document.getElementById("funcionarios").setAttribute("class", "sec_nav disabled")
    }
    await AbaDados.mudarAba("aba_de_livro")
});

// NAVBAR
const princ_btns = [...document.querySelectorAll(".sec_btn")]
princ_btns.map(async(el)=>{
    el.addEventListener("click", async (qmfoi)=>{
        await AbaDados.mudarAba(el.nextElementSibling.firstElementChild.id)
    })
})
const navPequenosBtns = [...document.querySelectorAll(".btns button")]
navPequenosBtns.map( async (el)=>{
    el.addEventListener("click", async (qmfoi)=>{
        if(!Formulario.TemFormAberto){
            await AbaDados.mudarAba(el.id)
        }
        await Formulario.abrirFormulario(el.id)
    })
})
document.getElementById("btn_sair").addEventListener("click", async (qmfoi)=>{
    const resposta = await popUp("SAIR?", "Tem certeza que quer sair desta página e voltar para a página de login?", true)
    console.log(resposta)
    if(resposta){
        localStorage.clear()
        location.replace('../Login/login.html')
    }
})

//MAIN
document.getElementById("i_buscar").addEventListener("keyup", async (qmfoi)=>{
    await pesquisar(await buscar(document.getElementById("i_buscar").value), false)
    await pesquisar(await buscar(document.getElementById("i_buscar").value), true)
})
document.getElementById("enviar_pesquia").addEventListener("click", async ()=>{
    await pesquisar(await buscar(document.getElementById("i_buscar").value), true)
})