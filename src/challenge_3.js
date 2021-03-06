class User {
    constructor(name) {
        this.#name = name;
        this.#loggedIn = false;
        this.lastLoggedInDate = null;
    }

    #name;
    #loggedIn;

    getName() {
        return this.#name;
    }
    setName(name) {
        this.#name = name;
    }

    logIn() {
        this.#loggedIn = true;
        this.lastLoggedInDate = new Date();  
    }

    isLoggedIn() {
        return this.#loggedIn;
    }

    logOut() {
        this.#loggedIn = false;
    }

    getLastLoggedInAt() {
        return this.lastLoggedInDate;
    }

    canEdit(comment) {
        if(comment.author === this) {
            return true;
        }
        else {
            return false;
        }
    }

    canDelete(comment) {
        if(comment.author === this) {
            return false;
        }
        else {
            return false;
        }
    }

}

class Moderator extends User {

    canEdit(comment) {
        if(comment.author === this) {
            return true;
        }

        else {
            return false;
        }
    }

    canDelete(comment) {
        if(comment.author === this) {
            return true;
        }
        else {
            return true;
        }
    }

}

class Admin extends Moderator {
    canEdit(comment) {
        if(comment.author === this) {
            return true;
        }
        else {
            return true;
        }
    }

    canDelete(comment) {
        if(comment.author === this) {
            return true;
        }
        else {
            return true;
        }
    }
}

class Comment {
    constructor(author, commentary, reply) {
        this.#message = commentary;
        this.reply = reply;
        this.createdAt = new Date();
        this.author = author;
    }

    #message;

    getAuthor() {
        return this.author;
    }

    getCreatedAt() {
        return this.createdAt;
    }

    getMessage() {
        return this.#message;
    }
    
    setMessage(message) {
        this.#message = message;
    }

    getRepliedTo() {
        if(!this.reply) {
            return undefined;
        }
        else {
            return this.reply;
        }
    }

    toString() {
        let comment = this.#message + ' by ' + this.author.getName();
        if(this.reply) {
            comment = comment + ' ' + '(replied to ' + this.reply.author.getName() + ')';
        }
        return comment;
    }
}

let user1, user2, mod, admin, user1Comment, user2Comment, modComment;

//Inst??ncia de User, Moderator, Admin e Comment
user1 = new User('User 1');
user2 = new User('User 2');
mod = new Moderator('Moderadtor');
admin = new Admin('Admin');
user1Comment = new Comment(user1, 'hello');
user2Comment = new Comment(user2, 'hi', user1Comment);
modComment = new Comment(mod, 'moderator', user2Comment);

//Primeiro Teste "should handle instantiation"

//Retorno deve ser igual a 'User 1'
console.log(user1.getName());

//Retorno deve ser igual a 'User 2'
console.log(user2.getName());

//Retorno deve ser uma inst??ncia de Date! obs: o  typeof do Javascript apenas retorna um tipo object.
console.log(user1Comment.getCreatedAt() instanceof Date);

//Retorno deve ser uma inst??ncia de User, sendo o user1
console.log(user1Comment.getAuthor());

//Retorno deve ser uma inst??ncia de User, sendo o user2
console.log(user2Comment.getAuthor());

//Retorno deve ser uma inst??ncia de Moderator, sendo o mod
console.log(modComment.getAuthor());


//Segundo Teste 'should handle login methods'


//Retorno deve ser um boolean 'false', pois o usu??rio por padr??o come??a deslogado.
console.log(user1.isLoggedIn());

//Retorno deve ser nulo, pois o registro de ??ltimo login do usu??rio deve ser nulo por padr??o.
console.log(user1.getLastLoggedInAt());

//Efetuando primeiro login do User 1
user1.logIn();

//Retorno deve ser true, pois o User 1 est?? logado no sistema.
console.log(user1.isLoggedIn());

//Retorno deve ser uma data, pois o registro de login do User 1 foi criado ?? partir do seu login.
console.log(user1.getLastLoggedInAt())

//Vari??vel sera utilizada para compara????o de datas do login
let lastLoggedInDate = user1.getLastLoggedInAt();

//User 1 efetua log out do sistema.
user1.logOut();

//Retorno deve ser um boolean de 'false', pois o User 1 efetuou log out do sistema.
console.log(user1.isLoggedIn());

//Retorno deve ser um boolean de 'true', o retorno da fun????o ser?? comparado com a vari??vel criada acima
//O ??ltimo registro de login deve ser registrado apenas no login, mas deve ser mantido no log out.

console.log(lastLoggedInDate === user1.getLastLoggedInAt());

//Terceiro Teste 'should handle inheritance'

//Retorno deve ser 'User' ou true, pois o User 1 ?? um usu??rio.
//obs: O JavaScript n??o retorna o tipo espec??fico de uma inst??ncia, sendo o retorno apenas de um boolean
console.log(user1 instanceof User);

//Retorno deve ser false, pois o User 1 n??o ?? um Moderador.
console.log(user1 instanceof Moderator);

//retorno deve ser false, pois o User 1 n??o ?? um Administrador.
console.log(user1 instanceof Admin);

//retorno deve ser true, pois o Moderador ?? um usu??rio.
console.log(mod instanceof User);

//retorno deve ser true, pois o Moderador ?? um Moderador.
console.log(mod instanceof Moderator);

//retorno deve ser false, pois o Moderador n??o ?? um Administrador.
console.log(mod instanceof Admin);

//retorno deve ser true, pois o Admin ?? um usu??rio.
console.log(admin instanceof User);

//retorno deve ser true, pois o Admin ?? um Moderador.
console.log(admin instanceof Moderator);

//retorno deve ser true, pois o Admin ?? um Administrador.
console.log(admin instanceof Admin);

//Quarto Teste 'should handle method overriding';

//Retorno deve ser true, pois o usu??rio pode editar o pr??prio coment??rio.
console.log(user1.canEdit(user1Comment));

//Retorno deve ser false, pois o usu??rio n??o pode editar o coment??rio de outros usu??rios.
console.log(user1.canEdit(user2Comment));

//Retorno deve ser false, pois o usu??rio n??o pode apagar o pr??prio coment??rio.
console.log(user1.canDelete(user1Comment));

//Retorno deve ser false, pois o usu??rio n??o pode apagr o coment??rio de outros usu??rios.
console.log(user1.canDelete(user2Comment));

//Retorno deve ser true, pois o Moderador pode editar o pr??prio coment??rio.
console.log(mod.canEdit(modComment));

//Retorno deve ser false, pois o Moderador n??o pode editar o coment??rio de outros usu??rios.
console.log(mod.canEdit(user1Comment));

//Retorno deve ser true, pois o Moderador pode apagar o pr??prio coment??rio.
console.log(mod.canDelete(user1Comment));

//Retorno deve ser true, pois o Moderador pode apagar coment??rios de outros usu??rios.
console.log(mod.canDelete(user1Comment));

//Retorno deve ser true, pois o Administrador pode editar o coment??rio de outros usu??rios.
console.log(admin.canEdit(user1Comment));

//Retorno deve ser true, pois o Administrador pode apagar o coment??rio de outros usu??rios.
console.log(admin.canDelete(user1Comment));

//Quinto Teste 'should handle function overloading'

//Retorno deve ser um 'undefined', pois o primeiro coment??rio n??o foi uma resposta direta a outro.
console.log(user1Comment.getRepliedTo());

//Retorno deve ser o objeto user1Comment, pois o user2Comment ?? uma resposta do coment??rio.
console.log(user2Comment.getRepliedTo());

//Sexto Teste 'should handle User encapsulation'

//Retorno deve ser 'User 1' e a propriedade ?? private
console.log(user1.getName());

//Setando o nome de user1 de 'User 1' para 'User 1 updated';
user1.setName('User 1 updated');

//Retorno deve ser 'User 1 updated', j?? que o mesmo foi editado para tal nome.
console.log(user1.getName());

//Retorno deve ser undefined, pois a propriedade ?? private e n??o pode ser acessada diretamente.
console.log(user1.name);

//Retorno deve ser undefined, pois a propriedade ?? private e n??o pode ser acessada diretamente.
console.log(user1.loggedIn);

//S??timo Teste 'should handle Comment encapsulation'

//Retorno deve ser mensagem 'hello'
console.log(user1Comment.getMessage());

//Setando mensagem para 'howdy'
user1Comment.setMessage('howdy');

//Retorno deve ser 'howdy', pois o mesmo foi editado para tal.
console.log(user1Comment.getMessage());

//Retorno deve ser undefined, pois a propriedade ?? private e n??o pode ser acessada diretamente.
console.log(user1Comment.message);

//Oitavo Teste 'should handle composition'

//Retorno deve ser user1Comment, pois ?? o coment??rio correspondente.
//As rela????es dos coment??rios foram mantidas.
console.log(user2Comment.getRepliedTo());

//Retorno deve ser user2Comment, pois ?? o coment??rio correspondente.
//As rela????es dos coment??rios foram mantidas.
console.log(modComment.getRepliedTo());

//Nono Teste 'should handle toString'

//Retorno deve ser 'howdy by User 1 updated'
console.log(user1Comment.toString());

//Retorno deve ser 'hi by User 2 (replied to User 1)'
console.log(user2Comment.toString());

//Retorno deve ser 'moderator by Moderator (replied to User 2)'
console.log(modComment.toString());

//Setando nome de user1 para 'User One'
user1.setName('User One');

//Setando nome de user2 para 'User Two'
user2.setName('User Two');

//Retorno deve ser 'howdy by User One'
//A ref??rencia de usu??rio continuar?? a mesma durante a mudan??a de nome
console.log(user1Comment.toString());

//Retorno deve ser 'hi by User Two (replied to User One)'
//A ref??rencia de usu??rio continuar?? a mesma durante a mudan??a de nome
console.log(user2Comment.toString());








