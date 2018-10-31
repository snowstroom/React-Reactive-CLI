import * as fs from 'fs';
import * as path from 'path';
import * as MESSAGES from '../const/messages';
import * as ERR_MESSAGES from '../const/err-messages';
import * as KEYS from '../const/keys';
import chalk from 'chalk';
import { PROJECT_STRUCT } from '../const/project-struct';
import { FsTypes, Entity } from '../enums';
import { FileDescription } from '../interfaces';
import { FileStruct } from './FileStruct.class';

const log = console.log;

export class CLI {
    private projectName: string;

    public main() {
        log(chalk.green(MESSAGES.HELLO));
        this.argParse();
    }

    private argParse() {
        switch (process.argv[2]) {
            case undefined: {
                log(chalk.red(ERR_MESSAGES.HAVE_NO_ARGUMENT));
                process.exit(1);
            }
            case KEYS.NEW_PROGECT: {
                this.generateNewProject();
                break;
            };
            case KEYS.NEW_PROGECT_SHORT: {
                this.generateNewProject();
                break;
            }
            case KEYS.GENERATE: {
                this.generateEntity();
                break;
            }
            case KEYS.GENERATE_SHORT: {
                this.generateEntity();
                break;
            }
            default: {
                log(ERR_MESSAGES.ARGUMENT_NO_CORRECT(process.argv[2]));
                process.exit(1);
            }
        }
    }

    private checkArgv(index: number) {
        if (process.argv[index]) {
            return process.argv[index];
        } else {
            log(chalk.red(ERR_MESSAGES.HAVE_NO_ARGUMENT));
            process.exit(1);
        }
    }

    private generateNewProject() {
        const arg = this.checkArgv(3);
        this.projectName = arg;
        log(chalk.green(MESSAGES.GENERATE_PROJECT(this.projectName)));
        const struct = PROJECT_STRUCT(this.projectName);
        this.buildStruct(struct, './result'); // Убрать result
    }

    private generateEntity() {
        const arg = this.checkArgv(3);
        switch (arg) {
            case undefined: {
                log(chalk.red(ERR_MESSAGES.HAVE_NO_ARGUMENT));
                process.exit(1);
            }
            case KEYS.COMPONENT: {
                this.createStruct();
                break;
            }
            case KEYS.COMPONENT_SHORT: {
                this.createStruct();
                break;
            }
            case KEYS.SERVICE: {
                this.createStruct();
                break;
            }
            case KEYS.SERVICE_SHORT: {
                this.createStruct();
                break;
            }
            default: {
                log(ERR_MESSAGES.ARGUMENT_NO_CORRECT(process.argv[3]));
                process.exit(1);
            }
        }
    }

    private createStruct() {
        const arg = this.checkArgv(4);
        const struct = new FileStruct(Entity.COMPONENT, arg);
        this.buildStruct(struct, struct.filePath);
    }

    private buildStruct(struct, dirPath) {
        const newPath = `${dirPath}/${struct.name}`;
        try {
            fs.mkdirSync(newPath);
        } catch (e) {
            log(chalk.red(ERR_MESSAGES.PROJECT_EXIST(this.projectName)));
            process.exit(1);
        }
        struct.content.forEach(childStruct => {
            switch (childStruct.type) {
                case FsTypes.FOOLDER: {
                    this.buildStruct(childStruct, newPath);
                    break;
                };
                case FsTypes.FILE: {
                    this.generateFile(childStruct, newPath);
                    break;
                }
            }
        });
    }

    private generateFile(fileDscr: FileDescription, currentPath: string) {
        const { ext, name, template } = fileDscr;
        const filePath = path.join(currentPath, `${name}.${ext}`);
        try {
            chalk.greenBright
            log(chalk.green(MESSAGES.CREATE_FILE(`${name}.${ext}`)));
            fs.writeFileSync(filePath, template);
        } catch (e) {
            log(chalk.red(ERR_MESSAGES.CREATE_FILE_ERR(`${name}.${ext}`)));
        }
    }
}