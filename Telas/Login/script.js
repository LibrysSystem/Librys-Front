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
    label.setAttribute("for", "esqueci_email")
    label.innerHTML = "EMAIL"
    inputs.appendChild(label)
    const input =document.createElement("input")
    input.setAttribute("type", "email")
    input.setAttribute("id", "esqueci_email")
    input.setAttribute("name", "email")
    input.setAttribute("requires", "on")
    input.setAttribute("placeholder", "Digite seu email...")
    inputs.appendChild(input)
    folha.appendChild(inputs)
    const btn_enviar = document.createElement("button")
    btn_enviar.setAttribute("id", "btn_enviar")
    btn_enviar.innerHTML="ENVIAR"
    folha.appendChild(btn_enviar)


})