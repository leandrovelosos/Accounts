import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';

function operation(){
    inquirer.prompt([{
        type:'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices:[
            'Cria conta',
            'Consultar saldo',
            'Depositar',
            'Sacar',
            'Sair'
        ]

    }]).then((result) => {
        const action = result['action']
        console.log(action)
    }).catch((err) => {
        console.log(err)
    });
}

operation()