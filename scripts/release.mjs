import inquirer from 'inquirer'
import shell from 'shelljs'

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git')
  shell.exit(1)
}

const getVersion = async () => {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'version',
          choices: ['patch', 'minor', 'major'],
          message: 'please choose argument [major|minor|patch]: '
        }
      ])
      .then((answer) => {
        resolve(answer.version)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const main = async () => {
  const version = await getVersion()
  await shell.exec(`standard-version --release-as ${version} --dry-run`)
  await shell.exec('pnpm run changelog')
  // await shell.exec('git push --follow-tags origin master')

  // await shell.exec('git add -A')
  // await shell.exec(`git commit -m "docs(build): changelog"`)
  // await shell.exec('git push')
}

main()
