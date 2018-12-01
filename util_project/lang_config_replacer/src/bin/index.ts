import * as commander from 'commander'
import chalk from 'chalk'
import * as inquirer from 'inquirer'

import { LangInfo } from '@app/excel';

commander
    .version('1.0.0')
    .description('lang_config_replacer')

commander
    .command('run')
    .alias('l')
    .description('run test')
    .action(() => {
		console.log(new LangInfo());
        console.log(chalk.yellow('=========*** run ***=========='))

	let testInput: Array<Object> = [
		{
			type: 'input',
			name: 'test1',
			message: 'Enter the test1'
		},
		{
			type: 'input',
			name: 'test2',
			message: 'Enter the test2'
		},
	]
		inquirer.prompt(testInput).then((answers) => console.log(answers))
		inquirer.prompt(testInput).then((answers) => console.log(answers))
    })


console.log('helloworld');
if(!process.argv.slice(2).length/* || !/[arudl]/.test(process.argv.slice(2))*/) {
    commander.outputHelp()
    process.exit()
}
commander.parse(process.argv)
