export class ControlSettings{

    readOnly:boolean;
    hidden:boolean;
    required:boolean;
    constructor(_readOnly:boolean,_required:boolean){
        this.readOnly=_readOnly;
        this.required=_required;
    }
}