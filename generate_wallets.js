const bip39 = require('bip39');
const { ECPair } = require('ecpair');
const { payments } = require('bitcoinjs-lib');
const fs = require('fs');

async function generateWallets(count) {
    const wallets = [];
    const dogecoinNetwork = {
        messagePrefix: '\x19Dogecoin Signed Message:\n',
        bech32: 'dc',
        bip32: {
            public: 0x02facafd,
            private: 0x02fac398
        },
        pubKeyHash: 0x1e,
        scriptHash: 0x16,
        wif: 0x9e
    };

    for (let i = 0; i < count; i++) {
        // Generate a 24-word mnemonic
        const mnemonic = bip39.generateMnemonic(256);

        // Derive a seed from the mnemonic
        const seed = await bip39.mnemonicToSeed(mnemonic);
        
        // Create key pair
        const keyPair = ECPair.fromPrivateKey(seed.slice(0, 32), { network: dogecoinNetwork });
        
        // Generate P2PKH address
        const { address } = payments.p2pkh({
            pubkey: keyPair.publicKey,
            network: dogecoinNetwork
        });

        // Save wallet info
        wallets.push({
            address: address,
            privateKey: keyPair.privateKey.toString('hex'),
            wif: keyPair.toWIF(),
            mnemonic
        });
    }

    return wallets;
}

async function main() {
    const walletCount = 50; // Number of wallets to generate
    const wallets = await generateWallets(walletCount);

    // Save wallets to a file
    const outputFileName = 'dogecoin_wallets.json';
    fs.writeFileSync(outputFileName, JSON.stringify(wallets, null, 2));

    console.log(`Generated ${walletCount} wallets and saved to ${outputFileName}`);
}

main().catch(console.error);
