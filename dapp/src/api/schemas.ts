export type MetadataSchema = {
  title: string;
  artist: string;
  description?: string;
  year: string;
  fileUrl: string;

  creator?: string;
  owner?: string;
  maxTokenSupply?: number;
  AP?: number; // number of editions
};

export type ArtworkSchema = {
  title: string;
  artist: string;
  description: string;
  year: string;
  files: File[];
  creator: string;
  owner: string;
};

export type ArtworkErrorSchema = {
  title: boolean;
  artist: boolean;
  description: boolean;
  year: boolean;
  files: boolean;
  creator: boolean;
  owner: boolean;
};

export type ArtworkCardProps = {
  tokenId: number;
  metadata: MetadataSchema;
};

export const constructMetadata = (
  artwork: any,
  fullPath: string
): MetadataSchema => {
  const { title, artist, description, year } = artwork;
  return {
    title: title,
    artist: artist,
    description: description,
    year: year,
    fileUrl: fullPath,
  };
};
