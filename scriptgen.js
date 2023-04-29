#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yargs = require('yargs');

const argv = yargs
  .usage('Usage: scriptgen [options]')
  .example('scriptgen -h', 'View help menu')
  .example('scriptgen -v', 'View version info')
  .example('scriptgen -i node -s sample.js', 'Using Node as the interpreter')
  .example('scriptgen -i python -s sample.py', 'Using Python as the interpreter')
  .example('scriptgen -i "java -jar" -s sample.jar', 'Using Java as the interpreter')
  .option('interpreter', {
    alias: 'i',
    type: 'string',
    description: 'Interpreter to use'
  })
  .option('script-path', {
    alias: 's',
    type: 'string',
    description: 'Path to the script'
  })
  .version(false)
  .option('version', {
    alias: 'v',
    type: 'boolean',
    description: 'Show version information'
  })
  .option('help', {
    alias: 'h',
    type: 'boolean',
    description: 'Show help menu'
  })
  .epilogue('Note: The --interpreter and --script options must be used together.')
  .argv;

if (argv.help) {
  yargs.showHelp();
} else if (argv.version) {
  console.log('Version 1.0.0');
} else if (argv.interpreter && argv.scriptPath) {
  const scriptName = path.basename(argv.scriptPath, path.extname(argv.scriptPath));
  const cmdContent = `@ECHO off
SETLOCAL
SET dp0=%~dp0

SET "_prog=${argv.interpreter}"
SET PATHEXT=%PATHEXT:;.${argv.interpreter};=;%

ENDLOCAL & GOTO #_undefined_# 2>NUL || title %COMSPEC% & "%_prog%"  "%dp0%\\${argv.scriptPath}" %*`;
  const ps1Content = `#!/usr/bin/env pwsh
$basedir=Split-Path $MyInvocation.MyCommand.Definition -Parent

$exe=""
if ($PSVersionTable.PSVersion -lt "6.0" -or $IsWindows) {
  # Fix case when both the Windows and Linux builds of Node
  # are installed in the same directory
  $exe=".exe"
}
$ret=0

# Support pipeline input
if ($MyInvocation.ExpectingInput) {
  $input | & "${argv.interpreter}$exe"  "$basedir/${argv.scriptPath}" $args
} else {
  & "${argv.interpreter}$exe"  "$basedir/${argv.scriptPath}" $args
}
$ret=$LASTEXITCODE

exit $ret
`;
  const shContent = `#!/bin/sh
basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")

case \`uname\` in
    *CYGWIN*|*MINGW*|*MSYS*) basedir=\`cygpath -w "$basedir"\`;;
esac

exec ${argv.interpreter}  "$basedir/${argv.scriptPath}" "$@"
`;

  fs.writeFileSync(`${scriptName}.cmd`, cmdContent);
  fs.writeFileSync(`${scriptName}.ps1`, ps1Content);
  fs.writeFileSync(`${scriptName}.sh`, shContent);
} else {
  console.log('Error: Invalid options or arguments.');
}