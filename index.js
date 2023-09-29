import inquirer from "inquirer";
import chalk, { Chalk } from "chalk";
import fs from "fs";

function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que você deseja fazer?",
        choices: [
          "Criar conta",
          "Consultar saldo",
          "Depositar",
          "Sacar",
          "Sair"
        ]
      }
    ])
    .then((result) => {
      const action = result["action"];
      if (action == "Criar conta") {
        createAccount();
      } else if (action == "Consultar saldo") {
      } else if (action == "Depositar") {
        depositar();
      } else if (action == "Sacar") {
      } else if (action == "Sair") {
        console.log(chalk.bgBlue.black("Obrigado por usar o Accounts"));
        process.exit();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

operation();

//criando conta
function createAccount() {
  console.log(chalk.bgGreen.black("Parabéns por escolher o nosso banco!!"));
  console.log(chalk.green("Defina as opções da sua conta a seguir"));

  buildAccount();
}

function buildAccount() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite um nome para sua conta:"
      }
    ])
    .then((result) => {
      const accountName = result["accountName"];
      console.info(accountName);

      //criando o diretorio de contas
      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }

      //verifica se a conta ja existe
      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black("Esta conta já existe, escolha outro nome")
        );
        buildAccount();
        return;
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        `{"balance": 0}`,
        function (err) {
          console.log(err);
        }
      );

      console.log(chalk.green("Conta criada com sucesso"));
      operation();
    })
    .catch((err) => {});
}

//adicionar um valor à conta do usuário
function depositar() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da conta?"
      }
    ])
    .then((result) => {
      const accountName = result["accountName"];

      //verificando se a conta existe
      if (!checkAccount(accountName)) {
        return depositar();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: "Quanto você deseja depositar?"
          }
        ])
        .then((result) => {
            const amount = result['amount']
            //adcionar quantia
            addAmount(accountName, amount)
            operation()
        })

        .catch((err) => {
            console.log(err)
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRed.black("Esta conta não existe, escolha outra"));
    return false;
  }

  return true;
}

function addAmount(accountName, amount){
    const accountData = getAccount(accountName)

    if(!amount){
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde'))
        return depositar()
    }
    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)
    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err){
            console.log(err)
        }
    )

    console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta`))
}

function getAccount(accountName){
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`,{
        encoding: 'utf8',
        flag: 'r'
    })

    return JSON.parse(accountJSON)
}