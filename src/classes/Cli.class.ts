import * as MESSAGES from '../const/messages';
import { MessagesType } from '../enums';
import { ProjectBuilder } from './ProjectBuilder.class';
import { MsgsHandler } from './MsgsHandler.class';
import { ArgumentParser } from './ArgumentParser.class';

export class CLI {
    private projectBuilder= new ProjectBuilder();
    private msgsHandler = new MsgsHandler();
    private argParser = new ArgumentParser();

    public main() {
        this.msgsHandler.logMsg({
            type: MessagesType.SUCCESS,
            msg: MESSAGES.HELLO
        });
        this.argParser.generateProject$.subscribe(name => this.projectBuilder.buildNewProject(name));
        this.argParser.generateFile$.subscribe(name => this.projectBuilder.buildNewEntity(name));
        this.argParser.parserMessages$.subscribe(msg => this.msgsHandler.logMsg(msg));
        this.projectBuilder.fileMakerMessages$.subscribe(msg => this.msgsHandler.logMsg(msg));
        this.argParser.argParse();
    }
}
