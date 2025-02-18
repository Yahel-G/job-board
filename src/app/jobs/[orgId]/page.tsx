import { JSX } from "react";
import CompanyJobContent from "../CompanyJobContent";



type PageProps = {
  params: {
    orgId: string;
  };
};

const CompanyJobPageWrapper =  async ({ params }: PageProps): Promise<JSX.Element> => {
  // Wrap params in a genuine promise
  const promiseParams = Promise.resolve(params);
  return <CompanyJobContent params={promiseParams} />;
}
  // Force the export to satisfy Next.js’s expected type signature.
  export default CompanyJobPageWrapper as unknown as () => Promise<JSX.Element>;