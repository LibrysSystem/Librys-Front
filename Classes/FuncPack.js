
function MudarAba(qualaba){

    let qualnome = qualaba.split("_")
    qualnome = qualnome[2]

    if(qualnome=="funcionario"){
        document.getElementById("h1_main").innerHTML = `FUNCIONÁRIOS`

    }else{
        document.getElementById("h1_main").innerHTML = `${qualnome.toUpperCase()}S`
    }
}

function MostrarDados(){

}

async function CriarJSONForm() {
    let objJSON = {};
    const todosinputs = [...document.querySelectorAll(".papel:not(.disabled) .input_form")];

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


function Validar(id, enviar){
    let ok = true

    if(!enviar){
        document.getElementById(id).nextSibling.nextSibling.innerHTML = " "

        if(!document.getElementById(id).checkValidity()){
            document.getElementById(id).nextSibling.nextSibling.innerHTML = `* ${document.getElementById(id).validationMessage}`
        }
    }else {
        const todosinputs = [...document.querySelectorAll(".papel:not(.disabled) .input_form")]
        todosinputs.map((el)=>{
            ok = (ok)&&(el.checkValidity())
        
        })

        if(ok){
            async function main() {
                const formJSON = await CriarJSONForm();

                console.log(formJSON);

                // fetch('endponit', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify(formJSON)
                // })
                // .then(resp=>resp.json())
                // .then(rest=>{
                //     console.log(rest)
                    
                // })

            }
            
            main()

            return "ok"

        }else{
            alert("Preencha todos os campos do formulário corretamente!")
        }
        
    }
}

export{MudarAba, MostrarDados, Validar}

