import {Usuario} from "../../Classes/Usuario.js"

const btn_entrar = document.getElementById("entrar")
const i_email =document.getElementById("email")
const i_senha =document.getElementById("senha")
const err_senha =document.getElementById("err_senha")
const err_email =document.getElementById("err_email")
const err_login =document.getElementById("err_login")


btn_entrar.addEventListener("click", (qmfoi)=>{
    err_email.innerHTML = ""
    err_senha.innerHTML = ""

    if(!i_email.checkValidity() || !i_senha.checkValidity()){
        if(!i_email.checkValidity()){
            err_email.innerHTML =`* ${i_email.validationMessage}`
        }
        if(!i_senha.checkValidity()){
            err_senha.innerHTML =`* ${i_senha.validationMessage}`
        }
    }else{
        //
        // fetch('endponit', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         email: i_email.value,
        //         senha: i_senha.value,
        //     })
        // })
        // .then(resp=>resp.json())
        // .then(rest=>{
        //     console.log(rest)
        //     if(!rest){
        //         err_login.innerHTML = "* EMAIL OU SENHA INCORRETOS! *"
        //     }else{
        //         err_login.innerHTML = ""

        //         Usuario.Tipo=rest.Tipo
        //         Usuario.Nome=rest.Nome
        //         Usuario.Cpf=rest.Cpf
        //         Usuario.Email=rest.Email
        //         Usuario.Senha=rest.Senha

        //         window.open('../Main/main.html', '_self')
        //     }
        // })
        //
        err_login.innerHTML = ""
        window.open('../Main/main.html', '_self')
    }
    
})






const btn_esqueci = document.getElementById("esqueci")
btn_esqueci.addEventListener("click", (qmfoi)=>{
    const popup = document.createElement("div")
    popup.setAttribute("id", "popup")
    document.body.prepend(popup)

    const folha = document.createElement("div")
    folha.setAttribute("id", "folha")
    popup.prepend(folha)

    const btn_sair = document.createElement("button")
    btn_sair.setAttribute("id", "btn_sair")
    btn_sair.innerHTML="X"
    btn_sair.addEventListener("click", (qmfoi)=>{
        popup.remove()
    })
    folha.appendChild(btn_sair)
    const p = document.createElement("p")
    p.innerHTML="Insira um email abaixo para receber sua nova senha de acesso."
    folha.appendChild(p)
    const inputs = document.createElement("div")
    inputs.setAttribute("id", "inputs")
    const label = document.createElement("label")
    label.setAttribute("id", "esqueci_l_email")
    label.setAttribute("for", "i_esqueci_email")
    label.innerHTML = "EMAIL"
    inputs.appendChild(label)
    const i_esqueci_email =document.createElement("input")
    i_esqueci_email.setAttribute("type", "email")
    i_esqueci_email.setAttribute("id", "i_esqueci_email")
    i_esqueci_email.setAttribute("name", "email")
    i_esqueci_email.setAttribute("required", "on")
    i_esqueci_email.setAttribute("placeholder", "Digite seu email...")
    inputs.appendChild(i_esqueci_email)
    folha.appendChild(inputs)
    const err_esqueci_email = document.createElement("div")
    err_esqueci_email.setAttribute("id", "err_esqueci_email")
    folha.appendChild(err_esqueci_email)
    const btn_enviar = document.createElement("button")
    btn_enviar.setAttribute("id", "btn_enviar")
    btn_enviar.innerHTML="ENVIAR"
    btn_enviar.addEventListener("click", (qmfoi)=>{
        err_esqueci_email.innerHTML = " "
        if(!i_esqueci_email.checkValidity()){
            err_esqueci_email.innerHTML =`* ${i_esqueci_email.validationMessage}`
        }else{
            // fetch('endponit', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         email: i_esqueci_email.value,
            //     })
            // })
            // .then(resp=>resp.json())
            // .then(rest=>{
            //     console.log(rest)
                
            // })
            popup.remove()
        }
    })
    folha.appendChild(btn_enviar)
})
