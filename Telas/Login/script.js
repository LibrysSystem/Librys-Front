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

document.getElementById("esqueci").addEventListener("click", (qmfoi)=>{
    popUp("ESQUECI A SENHA", "Para recuperar ou alterar  sua senha, entre em contato com Usuário Suporte\nEmail: bibliotecalibrys@gmail.com")
})
