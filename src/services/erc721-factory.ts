import { Args } from "@massalabs/massa-web3";
import { createClient } from "./massa-client";

const ERC721_FACTORY_ADDRESS = "A16gXC1LKF5ojVEX4qrJsnAqywiq3k6iy7LRgeQd1SmUtdoPtFk";

const CONTRACT_OWNER = "A1RrTFcNzLBtj85ofzEPDviA8QoFm756WzYMnEtuLrFEQwY99Tc";

export async function createErc71Contract(
    info: {
        nftName: string,
        nftSymbol: string,
        tokenMaxSupply: number,
        baseURI: string,
        dropLat: number,
        dropLong: number,
        dropZoneRadius: number,
        mintPrice: number
    }
) {
    const web3Client = await createClient();
    const r = await web3Client.smartContracts().callSmartContract({
        /// storage fee for taking place in books
        fee: 0,
        /// The maximum amount of gas that the execution of the contract is allowed to cost.
        maxGas: 70000000,
        /// Extra coins that are spent from the caller's balance and transferred to the target
        coins: 5_000_000_000,
        /// Target smart contract address
        targetAddress: ERC721_FACTORY_ADDRESS,
        /// Target function name. No function is called if empty.
        functionName: "initialize",
        /// Parameter to pass to the target function
        parameter: new Args()
            .addString(CONTRACT_OWNER)
            .addString(info.nftName)
            .addString(info.nftSymbol)
            .addU64(BigInt(info.tokenMaxSupply))
            .addString(info.baseURI)
            .addF32(info.dropLat)
            .addF32(info.dropLong)
            .addF32(info.dropZoneRadius)
            .addU64(BigInt(info.mintPrice))
            .serialize(),
    });

    console.log(r)

}