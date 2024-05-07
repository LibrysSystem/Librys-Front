import { Funcionario, Livro, Cliente } from "../Classes/FLC.js"

function MudarAba(qualaba){

    let qualnome = qualaba.split("_")
    qualnome = qualnome[2]

    switch (qualnome) {
        case "livro":
            document.getElementById("h1_main").innerHTML = `LIVROS`

            // fetch('Read_Livros')
            // .then(resp=>resp.json())
            // .then(rest=>{
                
            // })

            break;  
        case "funcionario":
            document.getElementById("h1_main").innerHTML = `FUNCIONÁRIOS`

            // fetch('Read_Funcionarios')
            // .then(resp=>resp.json())
            // .then(rest=>{
                  
            // })

            break;
        case "cliente":
            document.getElementById("h1_main").innerHTML = `CLIENTES`

            // fetch('Read_Clientes')
            // .then(resp=>resp.json())
            // .then(rest=>{
                  
            // })

            break;  
        default:
            break;
    }

}

function MostrarDados(){

}

async function CriarJSONForm(quemEnviar) {
    let objJSON = {};
    const todosinputs = [...document.querySelectorAll(quemEnviar)];

    await Promise.all(todosinputs.map(async (el) => {
        if (el.type === "file") {

            if (el.files.length > 0) {

                const fileContents = await readFile(el.files[0]);
                objJSON[el.name] = fileContents;
            } else {
                objJSON[el.name] = null;
            }
        } else {
            objJSON[el.name] = el.value;
        }
    }));

    return objJSON;
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}


function Validar(id, enviar, Quais){
    let ok = true

    if(!enviar){
        document.getElementById(id).nextSibling.nextSibling.innerHTML = " "

        if(!document.getElementById(id).checkValidity()){
            document.getElementById(id).nextSibling.nextSibling.innerHTML = `* ${document.getElementById(id).validationMessage}`
        }
    }else {
        const todosinputs = [...document.querySelectorAll(Quais)]
        todosinputs.map((el)=>{
            ok = (ok)&&(el.checkValidity())
        
        })

        if(ok){
        //TALVEZ NAO SEJA UTILIZADO MAIS

            // async function main() {
            //     const formJSON = await CriarJSONForm();

            //     console.log(formJSON);
                

            //     // fetch('endponit', {
            //     //     method: 'POST',
            //     //     headers: {
            //     //         'Content-Type': 'application/json'
            //     //     },
            //     //     body: JSON.stringify(formJSON)
            //     // })
            //     // .then(resp=>resp.json())
            //     // .then(rest=>{
            //     //     console.log(rest)
                    
            //     // })
                

            // }
            // main()

            return "ok"

        }else{
            alert("Preencha todos os campos do formulário corretamente!")
            return "erro"
        }
        
    }
}

export{MudarAba, MostrarDados, Validar, CriarJSONForm}

