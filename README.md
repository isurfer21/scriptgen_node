# scriptgen_node
ScriptGen is a script generator tool that simplifies the process of running scripts in any language. 

## Introduction

When a script is executed using an interpreter, the command line statement can become quite long as it includes the interpreter path, script path, and all required arguments. ScriptGen addresses this issue by consolidating the interpreter and script paths into a short command that can be easily accessed from anywhere in the system. This means that when calling the script via command, only the arguments need to be passed.

ScriptGen generates commands for all operating systems. For Windows, it generates batch and PowerShell scripts. For macOS, it generates Shell scripts and PowerShell scripts which can be used if PowerShell is installed. For Linux, it generates Shell scripts. This makes it easy to run scripts on any platform without having to manually create the appropriate command.

## Build

Clone the `scriptgen_node` repository from GitHub, navigate to the cloned repository, and build the project using Cargo.

```
git clone https://github.com/isurfer21/scriptgen_node.git
cd scriptgen_node
npm install
```

After running the appropriate commands, you should have a local copy of the _ScriptGen_ project that is ready to use.

To publish packages to [npmjs.com](https://www.npmjs.com/), run this command.

```sh
npm publish
```

## Usage

Based on the help menu of _ScriptGen_, here are all the possible commands that can be used with the tool:

Prints the help information for _ScriptGen_.
```
scriptgen -h
``` 
or 
```
scriptgen --help
```

When the above command is executed, _ScriptGen_ displays its help information. This includes a brief description of the tool, its usage instructions, and a list of available options. The help information provides an overview of how to use _ScriptGen_ and the different options that can be used to customize its behavior.

```
Usage: scriptgen [options]

Options:
  -h, --help         Show help menu                                    [boolean]
  -i, --interpreter  Interpreter to use                                 [string]
  -s, --script-path  Path to the script                                 [string]
  -v, --version      Show version information                          [boolean]

Examples:
  scriptgen -h                            View help menu
  scriptgen -v                            View version info
  scriptgen -i node -s sample.js          Using Node as the interpreter
  scriptgen -i python -s sample.py        Using Python as the interpreter
  scriptgen -i "java -jar" -s sample.jar  Using Java as the interpreter

Note: The --interpreter and --script options must be used together.
```

Prints the version information for _ScriptGen_.
```
scriptgen -v
``` 
or 
```
scriptgen --version
```

Sets the interpreter and the script path to use when generating the script.
```
scriptgen -i <INTERPRETER> -s <SCRIPT_PATH>
``` 
or 
```
scriptgen --interpreter <INTERPRETER> --script-path <SCRIPT_PATH>
```

Note that `<INTERPRETER>` and `<SCRIPT_PATH>` are placeholders for the actual values that you want to use. 

### Examples

Here are some examples of how to use `scriptgen` with different interpreters and script paths:

To generate a script using Node as the interpreter and a script named `sample.js`:
```
scriptgen -i node -s sample.js
```

To generate a script using Python as the interpreter and a script named `sample.py`:
```
scriptgen -i python -s sample.py
```

To generate a script using Java as the interpreter and a script named `sample.java`:
```
scriptgen -i "java -jar" -s sample.jar
```

In each of these examples, the `-i` option is used to specify the interpreter and the `-s` option is used to specify the script path.

## Installation

Here is a method for setting up this tool on your computer.

### Using npm

If you already have a Node.js environment set up, you can use the `npm install` command:
```
npm install -g scriptgen
```
npm will install the _ScriptGen_ package and place its binary in the global `node_modules` directory. The location of this directory depends on your operating system and npm configuration.
