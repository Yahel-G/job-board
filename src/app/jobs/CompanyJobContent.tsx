'use server'
import Jobs from "@/app/components/Jobs";
import JobForm from "@/app/components/JobForm";
import { addOrgAndUserData, Job, JobModel } from "@/models/Job";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import mongoose from "mongoose";
import { FavoriteJobsModel } from "@/models/FavoriteJobs";
import { JSX } from "react";

type CompanyJobContentProps = {
  params: Promise<{ orgId: string }>;
};

export default async function CompanyJobContent({ params }: CompanyJobContentProps): Promise<JSX.Element> {
  // Wait for the thenable params to resolve
  const resolvedParams = await params;
  const orgId = resolvedParams.orgId;
  
  await mongoose.connect(process.env.MONGO_URI as string);
  
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  const org = await workos.organizations.getOrganization(orgId);
  
  const { user } = await withAuth();
  
  let jobsDocs: Job[] = JSON.parse(JSON.stringify(
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
