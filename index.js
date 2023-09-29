import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';

function operation(){
    inquirer.prompt([{
        type:'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices:[
            'Criar conta',
            'Consultar saldo',
            'Depositar',
            'Sacar',
            'Sair'
        ]

    }]).then((result) => {
        const action = result['action']
        if(action == 'Criar conta'){
            createAccount()
        }
    }).catch((err) => {
        console.log(err)
    });
}

operation()

//criando conta
function createAccount(){
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!!'))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))
}