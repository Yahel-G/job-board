import { JSX } from "react";
import NewListingContent from "../NewListingContent";

type PageProps = {
  params: {
    orgId: string;
  };
};

const NewListingPageWrapper = async ({ params }: PageProps): Promise<JSX.Element> => {
  const promiseParams: Promise<{ orgId: string }> = Promise.resolve(params);
  return Promise.resolve(<NewListingContent params={promiseParams} />);
}

export default NewListingPageWrapper as unknown as () => Promise<JSX.Element>;
