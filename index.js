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

    buildAccount()
}

function buildAccount(){
    inquirer.prompt([{
        name: 'accountName',
        message: 'Digite um nome para sua conta:'
    }]).then((result) => {
        const accountName = result['accountName']
        console.info(accountName)

        //criando o diretorio de contas
        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }

        //verifica se a conta ja existe
        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black('Esta conta já existe, escolha outro nome'))
            buildAccount()
            return
        }

        fs.writeFileSync(
            `accounts/${accountName}.json`,
            `{"balance": 0}`,
            function(err){
                console.log(err)
            }
        )

        console.log(chalk.green('Conta criada com sucesso'))
        operation()
    }).catch((err) => {
        
    });
}