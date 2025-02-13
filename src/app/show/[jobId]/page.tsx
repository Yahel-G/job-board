import JobContent from "@/app/show/SingleJobContent";
import { JSX } from "react";

type PageProps = {
  params: {
    jobId: string;
  };
};

const SingleJobPageWrapper = async ({ params }: PageProps): Promise<JSX.Element> => {
  // Wrap the plain params object in a resolved promise
  const promiseParams: Promise<{ jobId: string }> = Promise.resolve(params);
  return Promise.resolve(<JobContent params={promiseParams} />);
}

export default SingleJobPageWrapper as unknown as () => Promise<JSX.Element>;