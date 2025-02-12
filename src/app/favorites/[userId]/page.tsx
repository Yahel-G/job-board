import FavoritesContent from "@/app/favorites/FavoritesContent";

type PageProps = {
  params: {
    userId: string;
  }
};

export default async function FavoritesPageWrapper({ params }: PageProps) {
  
  return <FavoritesContent params={params} />;
}