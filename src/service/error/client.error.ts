class ClientError  {
    public message;
    constructor(public code: number) {
        // super('');
    }
}
export const CLIENT_NOT_FOUND = 100;

export default ClientError;
