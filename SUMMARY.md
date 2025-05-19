# Dogecoin Wallet Generator - Project Summary

## File Map
- `generate_wallets.js`: Main script that generates Dogecoin wallets
- `.github/workflows/generate-wallets.yml`: GitHub workflow for automated wallet generation
- `README.md`: Instructions for using the repository
- `LICENSE.txt`: MIT license file
- `SUMMARY.md`: This project summary file

## Component Relationships
- The `generate_wallets.js` script uses bitcoinjs-lib, ecpair, and bip39 to create Dogecoin wallets
- The GitHub workflow automates the wallet generation by installing dependencies and running the script
- Generated wallets are saved to `dogecoin_wallets.json` (not checked into repository until workflow runs)

## Implementation Notes
- Converted from Solana wallet generation to Dogecoin wallet generation
- Using Dogecoin network parameters for address generation
- Each wallet includes:
  - Public address
  - Private key (hex format)
  - WIF (Wallet Import Format) key
  - 24-word mnemonic seed phrase

## Dependencies
- bip39: For mnemonic seed phrase generation
- bitcoinjs-lib: For Dogecoin address generation
- ecpair: For key pair generation

## Outstanding Issues
- None currently identified

## Test Status
- Ready for testing via GitHub Actions workflow 