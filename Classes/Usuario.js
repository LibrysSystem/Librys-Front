
class Usuario {
    static setTipo(novoTipo) {
        localStorage.setItem('tipo', novoTipo);
    }
    static getTipo() {
        return localStorage.getItem('tipo');
    }
    static setNome(nomeNovo) {
        localStorage.setItem('nome', nomeNovo);
    }
    static getNome() {
        return localStorage.getItem('nome');
    }
    static setCpf(cpfNovo) {
        localStorage.setItem('cpf', cpfNovo);
    }
    static getCpf() {
        return localStorage.getItem('cpf');
    }
    static setEmail(emailNovo) {
        localStorage.setItem('email', emailNovo);
    }
    static getEmail() {
        return localStorage.getItem('email');
    }
    static setSenha(novoSenha) {
        localStorage.setItem('senha', novoSenha);
    }
    static getSenha() {
        return localStorage.getItem('senha');
    }
}

export { Usuario }