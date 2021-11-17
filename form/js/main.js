let validator = {
    handleSubmit:(e)=>{
        //parar o evento de submit
        e.preventDefault();

        //processo de validação
        let send = true;

        let inputs = form.querySelectorAll('input');

        //limpar os erros 
        validator.clearErrors();

        //fazer um loop em cada um dos campos e verificar individualmente
        for (let i=0; i<inputs.length; i++) {
            let input = inputs[i];

            //função para verificar se eles tem data rules
             let check = validator.checkInput(input);
             if (check !== true) {
                 send = false;

                 //função que exibe o erro
                 validator.showError(input, check);
             }
        }

        

        if(send) {
            form.submit();
        }
    },
    //função vai verificar cada uma das regras expecificas 
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');

        if(rules !== null) {
            rules = rules.split('|');


            //dar um for em cada uma das regras para verificar cada uma delas
            for(let k in rules) {
                let rDetails = rules[k].split('=');

                //Aqui é onde podemos criar as regras
                switch (rDetails [0]) {
                    case 'required'://serve pra ver se tem alguma coisa preenchida ou não
                    if(input.value == '') {
                        return 'Campo não pode ser vazio.'
                    }
                    break;
                    case 'min':
                        if(input.value.length < rDetails[1]) {
                            return `Campo precisa ter pelo menos ${rDetails[1]}`;
                        }
                    break;
                    case 'email':
                        if(input.value !== ''){
                            //vamos usar expressão regular para validar email 
                            let regex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
                            if(!regex.test(input.value.toLowerCase())) {
                                return 'E-mail digitado não é valido'
                            }
                        }

                    break;
                }
            }
        }

        return true;
    },
    //criar o showError()
    showError:(input, error )=> {

        //trocar a cor da borda do campo
        input.style.borderColor = '#ff0000';

        //exibir texto de erro
        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },

    //função para limpar os erros 
    clearErrors:() => {

        //alem de remover os erros vamos nos campos e remover o style 
        let inputs = form.querySelectorAll('input');
        for(let i=0; i<inputs.length;i++) {
            inputs[i].style = '';
        }




        let errorElements = document.querySelectorAll('.error');
        for(let i=0; i<errorElements.length;i++) {
            errorElements[i].remove();
        }
    }
};

//pegar o formulario que tem a class que precisamos 
let form = document.querySelector('.validator');

//agora vamos fazer um bloqueio no envio
form.addEventListener('submit', validator.handleSubmit);