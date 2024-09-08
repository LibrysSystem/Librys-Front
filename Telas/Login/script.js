import { Usuario } from "../../Classes/Usuario.js"
import { popUp } from "../../Classes/FuncPack.js"

const btn_entrar = document.getElementById("entrar")
const i_email =document.getElementById("email")
const i_senha =document.getElementById("senha")
const err_senha =document.getElementById("err_senha")
const err_email =document.getElementById("err_email")
const err_login =document.getElementById("err_login")

btn_entrar.addEventListener("click", async (qmfoi)=>{
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
        const login = btoa(`${i_email.value}:${i_senha.value}`)
        const primeiraResposta = await fetch(`http://localhost:8080/usuario/login`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${login}`
            }
        })
        if(primeiraResposta.ok){

            const resposts = await primeiraResposta.json()
            err_login.innerHTML = " "
            Usuario.setToken(await resposts.token)

            if(await resposts.role == 'SUPORTE'){
                Usuario.setTipo("Suporte")
                Usuario.setNome("Usuário Suporte")
                Usuario.setEmail("bibliotecalibrys@gmail.com")
                Usuario.setSenha("librysbiblioteca")

                location.replace('../Main/main.html')
            }else{
            const dadosDoFuncionario = await fetch(`http://localhost:8080/funcionarios/por-email?email=${i_email.value}`,{
                    method: 'GET',
                    headers: {
                        'Authorization': `Basic ${btoa(`bibliotecalibrys@gmail.com:librysbiblioteca`)}`
                    }
                })
            if(dadosDoFuncionario.ok){
                let dadosDoUsuario = await dadosDoFuncionario.json()
                dadosDoUsuario = dadosDoUsuario[0]

                Usuario.setTipo("Funcionário")
                Usuario.setNome(dadosDoUsuario.nome)
                Usuario.setCpf(dadosDoUsuario.cpf)
                Usuario.setEmail(dadosDoUsuario.email)
                Usuario.setSenha(dadosDoUsuario.senha)

                location.replace('../Main/main.html')

            }}
        }else{
            err_login.innerHTML = "EMAIL OU SENHA INCORRETOS!"
        }
    }}
)

document.getElementById("esqueci").addEventListener("click", async (qmfoi)=>{
    // console.log()
    // popUp("ESQUECI A SENHA", "Para recuperar ou alterar  sua senha, entre em contato com Usuário Suporte\nEmail: bibliotecalibrys@gmail.com")

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
    p.innerHTML="Insira um email no qual receberá um link para redefinir sua senha."
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

    btn_enviar.addEventListener("click", async (qmfoi)=>{
        err_esqueci_email.innerHTML = " "
        if(!i_esqueci_email.checkValidity()){
            err_esqueci_email.innerHTML =`* ${i_esqueci_email.validationMessage}`
        }else{
            Usuario.setEmail(i_esqueci_email.value)
            console.log(i_esqueci_email.value)
            const login = btoa(`bibliotecalibrys@gmail.com:librysbiblioteca`)
            const primeiraResposta = await fetch(`http://localhost:8080/usuario/redefinir-senha`, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${login}`
                },
                body: `${i_esqueci_email.value}`
            })
            console.log( primeiraResposta)
            if(primeiraResposta.ok){
                popup.remove()
                popUp("EMAIL ENVIADO!", "Um email lhe foi enviado com o link de redefinição de senha. Por favor verifique sua caixa de entrada.")
            }else{
                const resp = await primeiraResposta.json()
                err_esqueci_email.innerHTML = resp.detalhe
            }
        }
    })
    folha.appendChild(btn_enviar)
})
