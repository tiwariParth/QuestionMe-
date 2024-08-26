import { ragChat } from "@/lib/rag-chat";
import { url } from "inspector";
import React from "react";

interface PageProps {
  params: {
    url: string | string[] | undefined;
  };
}

const reconstructURL = ({ url }: { url: string[] }) => {
  const deconstructUrl = url.map((component) => {
    decodeURIComponent(component);
  });
  return deconstructUrl.join("/");
};

const page = async ({ params }: PageProps) => {
  const reconstructUrl = reconstructURL({ url: params.url as string[] });
  await ragChat.context.add({
    type: "html",
    source: reconstructUrl,
    config: { chunkOverlap: 50, chunkSize: 200 },
  });
  return <div>page</div>;
};

export default page;
