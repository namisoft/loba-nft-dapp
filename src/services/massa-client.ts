import {
    Client,
    ProviderType,
    WalletClient,
    type IClientConfig,
} from "@massalabs/massa-web3";

const DEFAULT_PUBLIC_RPC = "https://test.massa.net/api/v2:33035";
const DEFAULT_PRIVATE_RPC = "https://test.massa.net/api/v2:33034";

const WALLET_PRIVATE_KEY = "S19qCetowbFxPxkVPDoNHmgkphQTWdVnMCdk6aaabH3XELSykG7";

let client: Client | undefined = undefined;


export async function createClient(): Promise<Client> {
    if (client !== undefined) {
        return client
    }
    const providers = [
        {
            url: DEFAULT_PUBLIC_RPC,
            type: ProviderType.PUBLIC,
        },
        {
            url: DEFAULT_PRIVATE_RPC,
            type: ProviderType.PRIVATE,
        },
    ];
    const web3ClientConfig: IClientConfig = {
        providers,
        retryStrategyOn: true,
        periodOffset: 1,
    };

    client = new Client(web3ClientConfig);

    return client
}

export async function connectWallet(privateKey: string) {
    if (client === undefined) {
        return undefined
    }
    try {
        const acc = await WalletClient.getAccountFromSecretKey(privateKey);
        await client.wallet().setBaseAccount(acc);
        return { address: acc.address as string, publicKey: acc.publicKey as string }
    } catch (e) {
        alert(`Connect wallet error: ${e}`);
        return undefined
    }

}


export function getConnectedWallet() {
    if (client === undefined) {
        return undefined
    }
    const acc = client.wallet().getBaseAccount();
    if (acc && acc.address !== null) {
        return { address: acc.address as string, publicKey: acc.publicKey as string }
    } else {
        return undefined
    }
}

export function disconnectWallet() {
    if (client === undefined) {
        return
    }
    const acc = client.wallet().getBaseAccount();
    if (!acc || !acc.address) {
        return
    }
    client.wallet().removeAddressesFromWallet([acc.address as string])
}

