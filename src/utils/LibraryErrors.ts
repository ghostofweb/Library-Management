
export class UnableToSaveError extends Error{
    constructor(message:string){
        super(message);
    }
}

export class invalidUsernameorPasswordError extends Error{
    constructor(message:string) {
        super(message);
    }
}