
function MudarAba(qualaba){
    switch (qualaba) {
        case "l":
            document.getElementById("h1_main").innerHTML = "LIVROS"

            break;

        case "c":
            document.getElementById("h1_main").innerHTML = "CLIENTES"

            break;

        case "f":
            document.getElementById("h1_main").innerHTML = "FUNCIONÁRIOS"

            break;
    
        default:
            break;
    }
}

function MostrarDados(){

}

function CriarJSONForm(){
    let objJASON
    const todosinputs = [...document.querySelectorAll(".papel:not(.disabled) .input_form")]
        todosinputs.map((el)=>{
            objJASON += `${el.name}: ${el.value}`
        })
    return objJASON
}

function Validar(id, enviar){
    let ok = null

    if(!enviar){
        document.getElementById(id).nextSibling.nextSibling.innerHTML = " "

        if(!document.getElementById(id).checkValidity()){
            document.getElementById(id).nextSibling.nextSibling.innerHTML = `* ${document.getElementById(id).validationMessage}`
        }
    }else if(enviar){
        const todosinputs = [...document.querySelectorAll(".papel:not(.disabled) .input_form")]
        todosinputs.map((el)=>{
            ok = el.checkValidity()
        })

        if(ok){
            const formSON = CriarJSONForm()
            console.log(formSON)

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
            return "ok"

        }else{
            alert("Preencha todos os campos do formulário corretamente!")
        }
        
    }
}

export{MudarAba, MostrarDados, Validar}

