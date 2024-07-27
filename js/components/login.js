export class LoginController {
    constructor(){
        this.user = document.getElementById('login_user');
        this.password = document.getElementById('login_password');
    }

    toggle_login() {
        const div = document.getElementById('login');

        div.innerHTML = 
        `<h3>Digite suas credenciais:</h3>
        <form name="login">
            <label for="user">Usuário/email: </label>
            <input class=form-control placeholder='Usuário ou email:' id="login_user">
            <label for="password">Senha: </label>
            <input class=form-control placeholder="Senha:" type=password id="login_password">
            <div class="buttons">
                <button class='btn btn-primary' id=user_login>Logar</button>
                <button class='btn btn-secondary' type="reset">Limpar</button>
            </div>
        </form>`

        const newDisplayValue = div.style.display === 'block'? 'none' : 'block';
        div.style.display = newDisplayValue;
    }

    user_login(user, password) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const registros = JSON.parse(event.target.result);

            if (registros.includes(`${user.value}:${password.value}`)) {
                console.log('Usuário existe!');
            }
            else {
                window.alert('Registre-se!');
            }
        };
        reader.onerror = (error) => {
            console.error('Error reading file:', error);
            window.alert('Arquivo não encontrado!');
        };
        reader.readAsText(new File(['registro.json'], 'registro.json'));
    }

    check_login() {
        if (this.user && this.password && this.user.value && this.password.value) {
            this.user_login(this.user, this.password)
        }
        else {
            window.alert('Preencha o usuário/email e senha!');
        }
    }
}
