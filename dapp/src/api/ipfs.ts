import { create } from "ipfs-http-client";
import { MetadataSchema } from "./schemas";

export const host = "ipfs.infura.io";
export const client = create({
  host,
  port: 5001,
  protocol: "https",
});

async function uploadToIPFS(data: any) {
  const { path } = await client.add(data);
  return {
    fullPath: `https://${host}/ipfs/${path}`,
    path,
  };
}

export const uploadFileToIPFS = async (
  file: File
): Promise<{
  fullPath: string;
  path: string;
}> => {
  const reader = new FileReader();

  reader.readAsArrayBuffer(file);

  const buffer = await new Promise<string | ArrayBuffer>((resolve) => {
    reader.onloadend = async () => {
      resolve(reader.result as string);
    };
  });

  return uploadToIPFS(buffer);
};

export const uploadMetadata: (metadata: MetadataSchema) => Promise<{
  fullPath: string;
  path: string;
}> = async (metadata) => {
  return uploadToIPFS(Buffer.from(JSON.stringify(metadata)));
};
