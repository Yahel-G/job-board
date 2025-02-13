import { JSX } from "react";
import EditJobContent from "../EditJobContent";

type PageProps = {
  params: {
    jobId: string;
  };
};

const EditJobPageWrapper = async ({ params }: PageProps): Promise<JSX.Element> => {
  // Wrap the plain params object in a Promise
  const promiseParams = Promise.resolve(params);
  return <EditJobContent params={promiseParams} />;
}

export default EditJobPageWrapper as unknown as () => Promise<JSX.Element>;
