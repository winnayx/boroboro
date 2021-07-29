export type MintingPayload = {
  title: string;
  artist: string;
  description: string;
  year: string;
  filesUrl: string;

  creator?: string;
  publisher?: string;
  curator?: string;
  maxTokenSupply?: number;
  AP?: number; // number of editions
};
