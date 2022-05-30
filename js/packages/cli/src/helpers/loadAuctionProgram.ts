import * as anchor from '@project-serum/anchor';
import { Keypair } from '@solana/web3.js';
import { AUCTION_HOUSE_PROGRAM_ID } from './constants';
import { auctionHouseIdl } from './idl';
import { getCluster } from './various';

export async function loadAuctionHouseProgram(
  walletKeyPair: Keypair,
  env: string,
  customRpcUrl?: string,
) {
  if (customRpcUrl) console.log('USING CUSTOM URL', customRpcUrl);

  // @ts-ignore
  const solConnection = new anchor.web3.Connection(
    //@ts-ignore
    customRpcUrl || getCluster(env),
  );
  const walletWrapper = new anchor.Wallet(walletKeyPair);
  const provider = new anchor.Provider(solConnection, walletWrapper, {
    preflightCommitment: 'recent',
  });

  return new anchor.Program(
    auctionHouseIdl,
    AUCTION_HOUSE_PROGRAM_ID,
    provider,
  );
}
