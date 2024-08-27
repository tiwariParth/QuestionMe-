import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import React from "react";

interface PageProps {
  params: {
    url: string | string[] | undefined;
  };
}

function reconstructURL({ url }: { url: string[] }) {
  const decodeComponents = url.map((component) =>
    decodeURIComponent(component)
  );
  console.log(decodeComponents);
  return decodeComponents.join("/");
}

const page = async ({ params }: PageProps) => {
  if (!params.url || typeof params.url === "string") {
    throw new Error("Invalid URL parameter");
  }

  const isAlreadyIndexed = await redis.sismember(
    "indexed-urls",
    reconstructURL
  );
  const reconstructedUrl = reconstructURL({ url: params.url as string[] });

  if (!isAlreadyIndexed) {
    await ragChat.context.add({
      type: "html",
      source: reconstructedUrl,
      config: { chunkOverlap: 50, chunkSize: 200 },
    });
  }

  await redis.sadd("indexed-urls", reconstructedUrl);

  return <div>page</div>;
};

export default page;
