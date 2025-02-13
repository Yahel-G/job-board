import { JSX } from "react";
import FavoritesContent from "@/app/favorites/FavoritesContent";

type PageProps = {
  params: {
    userId: string;
  };
};

const FavoritesPageWrapper = async ({ params }: PageProps): Promise<JSX.Element> => {
  // Wrap params in a genuine promise
  const promiseParams = Promise.resolve(params);
  return <FavoritesContent params={promiseParams} />;
};

// Force the export to satisfy Next.js’s expected type signature.
export default FavoritesPageWrapper as unknown as () => Promise<JSX.Element>;


