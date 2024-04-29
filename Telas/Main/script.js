import {Formulario} from "../../Classes/formulario.js"
import { Usuario } from "../../Classes/Usuario.js";
import { MudarAba, Validar } from "../../Classes/FuncPack.js";

//INICIO
document.addEventListener("DOMContentLoaded", (qmfoi)=>{

    document.getElementById("user_nome").innerHTML = Usuario.Nome
    document.getElementById("user_tipo").innerHTML = Usuario.Tipo
    if(Usuario.Tipo == "Funcionario"){
        document.getElementById("funcionarios").setAttribute("class", "sec_nav disabled")
    }
    Formulario.GetForms()
});

// NAVBAR

const princ_btns = [...document.querySelectorAll(".sec_btn")]
princ_btns.map((el)=>{
    el.addEventListener("click", (qmfoi)=>{
        MudarAba(el.nextElementSibling.firstElementChild.id)
    })
})

const navPequenosBtns = [...document.querySelectorAll(".btns button")]
navPequenosBtns.map((el)=>{
    el.addEventListener("click", (qmfoi)=>{

        if(!Formulario.TemFormAberto){
            MudarAba(el.id)
        }
        Formulario.AbrirFormulario(el.id)

    })
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




