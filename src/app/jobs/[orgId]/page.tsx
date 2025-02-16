import Jobs from "@/app/components/Jobs";
import JobForm from "@/app/components/JobForm";
import { addOrgAndUserData, Job, JobModel } from "@/models/Job";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import mongoose from "mongoose";
import { FavoriteJobsModel } from "@/models/FavoriteJobs";
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
/*
  await mongoose.connect(process.env.MONGO_URI as string);
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  const { orgId } = await params.orgId;
  const org = await workos.organizations.getOrganization(orgId);
  const { user } = await withAuth();

  let jobsDocs = JSON.parse(JSON.stringify(
    await JobModel.find({
      orgName: { $regex: new RegExp(org.name, 'i') }
    })
  ));
  jobsDocs = await addOrgAndUserData(jobsDocs, user);
  const userId = user ? user.id : '';

  const favDoc = await FavoriteJobsModel.findOne({ userId });
  let favoriteJobIds: string[] = [];
  if (favDoc) {
    favoriteJobIds = favDoc.favorites;
  }
  
  return (
    <div>
      <div className="container mx-auto">
        <h1 className="text-xl mb-6">{org.name} Jobs</h1>
      </div>
      <Jobs jobs={jobsDocs} header={"Jobs posted by " + org.name} userId={userId} favoriteJobIds={favoriteJobIds} />
    </div>
  );
}
*/