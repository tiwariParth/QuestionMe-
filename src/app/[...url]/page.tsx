import { ragChat } from "@/lib/rag-chat";
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
  console.log(params);

  const reconstructedUrl = reconstructURL({ url: params.url as string[] });

  await ragChat.context.add({
    type: "html",
    source: reconstructedUrl,
    config: { chunkOverlap: 50, chunkSize: 200 },
  });

  return <div>page</div>;
};

export default page;
