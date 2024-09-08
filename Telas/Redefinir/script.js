import { Usuario } from "../../Classes/Usuario.js"
import { popUp } from "../../Classes/FuncPack.js"

const err =document.getElementById("err_esqueci")
const err_senha =document.getElementById("err_senha")
const i_senha =document.getElementById("senha")
const btn_alterar = document.getElementById("alterar")

btn_alterar.addEventListener("click", async (qmfoi)=>{
    err_senha.innerHTML = ""
    if(!i_senha.checkValidity()){
        err_senha.innerHTML =`* ${i_senha.validationMessage}`
    }else{
        err_senha.innerHTML = " "
        const usuarioEsquecido = await fetch(`http://localhost:8080/funcionarios/por-email?email=${Usuario.getEmail()}`,{
                method: 'GET',
                headers: {
                    'Authorization': `Basic ${btoa(`bibliotecalibrys@gmail.com:librysbiblioteca`)}`
                }
            })
        if(usuarioEsquecido.ok){
            const user = await usuarioEsquecido.json()
            user[0].senha = i_senha.value

            const primeiraResposta = await fetch(`http://localhost:8080/usuario/login`, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${btoa(`bibliotecalibrys@gmail.com:librysbiblioteca`)}`
                }
            })
            const resposts = await primeiraResposta.json()
            Usuario.setToken(resposts.token)

            const usuarioAlterado = await fetch(`http://localhost:8080/funcionarios`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Usuario.getToken()}`
                    // 'Authorization': `Basic ${btoa(`bibliotecalibrys@gmail.com:librysbiblioteca`)}`
                },
                body: JSON.stringify(user[0])
            })
            if(usuarioAlterado.ok){
                popUp("SENHA ALTERADA COM SUCESSO!", "Sua senha ja foi redefinida. Retorne a página de login para continuar.")
            }else{
                const problema = await usuarioAlterado.json()
                err.innerHTML = problema.detalhe
            }
        }
    }
})
