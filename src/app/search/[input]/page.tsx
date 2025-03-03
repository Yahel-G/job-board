import { JSX } from "react";
import SearchContent from "../SearchContent";



type PageProps = {
  params: {
    input: string;
  };
};

const SearchPageWrapper =  async ({ params }: PageProps): Promise<JSX.Element> => {

  const promiseParams = Promise.resolve(params);
  return <SearchContent params={promiseParams} />;
}
  // Force the export to satisfy Next.js’s expected type signature.
  export default SearchPageWrapper as unknown as () => Promise<JSX.Element>;