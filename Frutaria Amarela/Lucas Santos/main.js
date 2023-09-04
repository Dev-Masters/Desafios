const readlineSync = require('readline-sync')
const password = 'frutariaamarela'
const fruits = [[1, 'Abacaxi', 4.99], [2, 'Amendoin', 11.99], [3, 'Tomate', 3.99], [4, 'Batata Escovada', 1.79], [5, 'Laranja', 2.49], [6, 'Morango Bandeja', 2.99]]

let app = true
let list  = []
let total = 0

// console.table(fruits)

function Login(){
    let count = 3
    while (count > 0){
        console.log('\n === FRUTARIA AMARELA ===\n -- Seja bem vindo(a)! --')
        let login = readlineSync.question("Digite a senha de acesso: \n>> ")
        
        if (login == password){
            return true
        }
        else{
            console.clear()
            console.log('\nSenha incorreta!')
            count--
            console.log(`Restam ${count} Tentativas`)
        }
    }
    if (count == 0){
        console.log('\nNÚMEROS DE TENTATIVAS ATINGIDAS\n')
        app = false

    }
}

function Menu(){
    //console.clear()
    console.log('\n  -- CAIXA --\nLista de produtos\n')

    for (i = 0; i < fruits.length; i++){
        console.log(`${fruits[i][0]} = ${fruits[i][1]}`)
    }
    console.log(`\nX para SAIR do sistema\n`)

    let choice = readlineSync.question("Digite a opcao desejada: ")

    if (choice == "X" || choice == "x"){
        return 0
    } else{
        return choice
    }
}

function Sale(choice){
    let option = parseInt(choice)

    if (option == 0){
        console.log("Até mais!!")
        app = false
    }
    else{
        for (i = 0; i < fruits.length; i++){
            if (fruits[i][0] == option){
                console.log(`\n${fruits[i][1]} = ${fruits[i][2]}`)
                console.log(`Ótimo, qual a quantidade de ${fruits[i][1]} deseja comprar?`)
                
                let amount = parseInt(readlineSync.question(">> "))
                let sum = (fruits[i][2] * amount)
    
                total += sum
    
                console.log(`O total do item comprado é: R$ ${sum.toFixed(2)}`)
                console.log(`O total no carrinho é: R$ ${total.toFixed(2)}\n`)
                
                list.push(`Item: ${fruits[i][1]}\nPreço unitário: R$${fruits[i][2]} | Quantidade: ${amount}\n`)
            }
        }

        console.log('1 - CONTINUAR COMPRA\n2 - FINALIZAR COMPRA')
        let op = parseInt(readlineSync.question("Escolha uma opcao:\n>> "))
        if (op == 1){
            console.log('')
        }
        else if(op == 2){
            Discount()
        }
        else{
            console.log('\nOpção inválida!\n')
        }
    }

}

function Invoice(){
    console.clear()
    console.log(' -- Lista de Compras -- ')
    for (i = 0; i < list.length; i++){
        console.log(list[i])
    }
    console.log(`TOTAL R$ ${total.toFixed(2)}\n\n`)

}

function Discount(){
    let discount = 0

    Invoice()
    console.log(' -- Pagamento --')
    console.log(`O total da compra R$ ${total.toFixed(2)}`)

    if (total > 20){
        console.log('\nPARABÉNS!!\nNos 5 anos da Frutaria Amarela, quem ganha o presente é você!\nVOCÊ ACABA DE GANHAR 5% DE DESCONTO!\n')
        
        discount = total*0.05
        total = total - discount
        
        console.log(`Valor total com desconto R$ ${total.toFixed(2)}`)
        Payment()
    }
    else {
        console.log(`Valor Total a pagar: R$ ${total.toFixed(2)}`)
        Payment()
    }
}

function Payment(){
    let change = 0
    let money = parseFloat(readlineSync.question('Por favor, digite o valor do pagamento:\n>>'))

    if (money == total){
        console.log('Pagamento efetuado!')
        app = false
    }
    else if (money > total){
        change = money - total
        console.log(`Troco: ${change.toFixed(2)}\nPagamento efetuado!`)
        app = false
    }
    else {
        console.log('Valor insuficiente!\n')
        Payment()
    }

}

Login()

while (app){
    Sale(Menu())
}

// console.log('\nObrigado!')
