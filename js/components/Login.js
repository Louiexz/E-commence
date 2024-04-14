export class LoginController {
    constructor(){
        this.user = document.getElementById('login_user');
        this.password = document.getElementById('login_password');
    }

    toggle_login() {
        const div = document.getElementById('login');

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
