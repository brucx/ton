import { Cell } from "../..";
import { ContractSource } from "./ContractSource";

export class WalletV1R3Source implements ContractSource {

    static create(opts: { publicKey: Buffer, workchain: number }) {
        // Resolve parameters
        let publicKey = opts.publicKey;
        let workchain = opts.workchain;

        // Build initial code and data
        let initialCode = Cell.fromBoc('B5EE9C7241010101005F0000BAFF0020DD2082014C97BA218201339CBAB19C71B0ED44D0D31FD70BFFE304E0A4F260810200D71820D70B1FED44D0D31FD3FFD15112BAF2A122F901541044F910F2A2F80001D31F3120D74A96D307D402FB00DED1A4C8CB1FCBFFC9ED54B5B86E42')[0];
        let initialData = new Cell();
        initialData.bits.writeUint(0, 32); // SeqNo
        initialData.bits.writeBuffer(publicKey); // Public key

        return new WalletV1R3Source({ publicKey, initialCode, initialData, workchain });
    }

    readonly publicKey: Buffer;
    readonly initialCode: Cell;
    readonly initialData: Cell;
    readonly workchain: number;
    readonly type = 'org.ton.wallets.simple.r3';

    private constructor(opts: { publicKey: Buffer, initialCode: Cell, initialData: Cell, workchain: number }) {
        this.publicKey = opts.publicKey;
        this.initialCode = opts.initialCode;
        this.initialData = opts.initialData;
        this.workchain = opts.workchain;
        Object.freeze(this);
    }
}