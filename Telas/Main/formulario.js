class Formulario{
    Tipo = null
    Dados = null

    // Tipos: 
    // - CL
    // - RL
    // - AL
    // - DL
    // - CC
    // - RC
    // - CF
    // - RF

    AbrirFormulario=(tipo)=>{
        this.tipo = tipo
        this.Dados = document.getElementById("dados")
        

        if(tipo=="CL"){
            const papel = document.createElement("div")
            papel.setAttribute("id", "formularioCL")
            papel.setAttribute("class", "formulario")
            this.Dados.prepend(papel)

            const cabecalho = document.createElement("div")
            cabecalho.setAttribute("id", "form_CabeCL")
            cabecalho.setAttribute("class", "form_cabe")
            papel.appendChild(cabecalho)

            const titulo = document.createElement("h1")
            titulo.innerHTML = "CADASTRO DE LIVRO"
            cabecalho.appendChild(titulo)

            const butao_editar = document.createElement("button")
            const span = document.createElement("span")
            span.setAttribute("class", "material-symbols-outlinedclose")
            butao_editar.appendChild(span)
            cabecalho.appendChild(butao_editar)

        }
    }

}
export{Formulario}