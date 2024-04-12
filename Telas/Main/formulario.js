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

    static AbrirFormulario=(tipo)=>{

        this.Tipo = tipo
        this.Dados = document.getElementById("dados")
        
        const papel = document.createElement("div")
        papel.setAttribute("id", "formularioCL")
        papel.setAttribute("class", "formulario")
        this.Dados.prepend(papel)

        const cabecalho = document.createElement("div")
        cabecalho.setAttribute("id", "form_CabeCL")
        cabecalho.setAttribute("class", "form_cabe")
        papel.appendChild(cabecalho)

        const butao_sair = document.createElement("button")
        const span = document.createElement("span")
        span.setAttribute("class", "material-symbols-outlined")
        span.innerHTML ="close"
        butao_sair.appendChild(span)
        butao_sair.addEventListener("click", (qmfoi)=>{
            papel.remove()
        })
        cabecalho.appendChild(butao_sair)

        if(this.Tipo == "CL"){

            const titulo = document.createElement("h1")
            titulo.innerHTML = "CADASTRO DE LIVRO"
            cabecalho.prepend(titulo)

            const form = document.createElement("form")
            form.setAttribute("id", "form_CL")
            form.setAttribute("class", "form_cabe")
            form.setAttribute("action", "actions.js")
            form.setAttribute("method", "post")
            papel.appendChild(form)

            const label_titulo = document.createElement("label")
            label_titulo.setAttribute("for", "titulo")
            label_titulo.innerHTML= "TITULO"
            form.appendChild(label_titulo)

            const i_titulo = document.createElement("input")
            i_titulo.setAttribute("type", "text")
            i_titulo.setAttribute("name", "titulo")
            i_titulo.setAttribute("id", "titulo")
            i_titulo.setAttribute("required", "on")
            form.appendChild(i_titulo)

            const label_autor = document.createElement("label")
            label_autor.setAttribute("for", "autor")
            label_autor.innerHTML= "AUTOR(A)"
            form.appendChild(label_autor)

            const i_autor = document.createElement("input")
            i_autor.setAttribute("type", "text")
            i_autor.setAttribute("name", "autor")
            i_autor.setAttribute("id", "autor")
            i_autor.setAttribute("required", "on")
            form.appendChild(i_autor)

            const label_edicao = document.createElement("label")
            label_edicao.setAttribute("for", "edicao")
            label_edicao.innerHTML= "EDIÇÃO"
            form.appendChild(label_edicao)

            const i_edicao = document.createElement("input")
            i_edicao.setAttribute("type", "number")
            i_edicao.setAttribute("name", "edicao")
            i_edicao.setAttribute("id", "edicao")
            i_edicao.setAttribute("required", "on")
            form.appendChild(i_edicao)

            const label_editora = document.createElement("label")
            label_editora.setAttribute("for", "editora")
            label_editora.innerHTML= "EDITORA"
            form.appendChild(label_editora)

            const i_editora = document.createElement("input")
            i_editora.setAttribute("type", "text")
            i_editora.setAttribute("name", "editora")
            i_editora.setAttribute("id", "editora")
            i_editora.setAttribute("required", "on")
            form.appendChild(i_editora)

            const label_genero = document.createElement("label")
            label_genero.setAttribute("for", "genero")
            label_genero.innerHTML= "GÊNERO LITERÁRIO"
            form.appendChild(label_genero)

            const i_genero = document.createElement("input")
            i_genero.setAttribute("type", "text")
            i_genero.setAttribute("name", "genero")
            i_genero.setAttribute("id", "genero")
            i_genero.setAttribute("required", "on")
            form.appendChild(i_genero)

            const label_quantidade = document.createElement("label")
            label_quantidade.setAttribute("for", "quantidade")
            label_quantidade.innerHTML= "QUANTIDADE"
            form.appendChild(label_quantidade)

            const i_quantidade = document.createElement("input")
            i_quantidade.setAttribute("type", "number")
            i_quantidade.setAttribute("name", "quantidade")
            i_quantidade.setAttribute("id", "quantidade")
            i_quantidade.setAttribute("required", "on")
            form.appendChild(i_quantidade)

            const label_cod_id = document.createElement("label")
            label_cod_id.setAttribute("for", "cod_id")
            label_cod_id.innerHTML= "CÓDIGO DE IDENTIFICAÇÃO"
            form.appendChild(label_cod_id)

            const i_cod_id = document.createElement("input")
            i_cod_id.setAttribute("type", "number")
            i_cod_id.setAttribute("name", "cod_id")
            i_cod_id.setAttribute("id", "cod_id")
            i_cod_id.setAttribute("required", "on")
            form.appendChild(i_cod_id)

            const label_cod_local = document.createElement("label")
            label_cod_local.setAttribute("for", "cod_local")
            label_cod_local.innerHTML= "CÓDIGO DE LOCALIZAÇÃO"
            form.appendChild(label_cod_local)

            const i_cod_local = document.createElement("input")
            i_cod_id.setAttribute("type", "number")
            i_cod_id.setAttribute("name", "cod_local")
            i_cod_id.setAttribute("id", "cod_local")
            i_cod_local.setAttribute("required", "on")
            form.appendChild(i_cod_local)

            const btn_enviar = document.createElement("button")
            btn_enviar.setAttribute("id", "btn_salvar")
            btn_enviar.setAttribute("class", "btn_salvar")
            btn_enviar.setAttribute("type", "subimt")
            btn_enviar.innerHTML = "SALVAR"
            btn_enviar.addEventListener("submit", (qmfoi)=>{
                console.log("valeu")
            })
            form.appendChild(btn_enviar)

        }
    }

    

}
export{Formulario}