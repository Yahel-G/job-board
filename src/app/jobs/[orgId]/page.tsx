// src/app/jobs/[orgId]/page.tsx
import Jobs from "@/app/components/Jobs";
import JobForm from "@/app/components/JobForm";
import { addOrgAndUserData, Job, JobModel } from "@/models/Job";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import mongoose from "mongoose";
import { FavoriteJobsModel } from "@/models/FavoriteJobs";

type PageProps = {
  params: {
    orgId: string;
  }
};

export default async function CompanyJobsPage(props: PageProps) {
  await mongoose.connect(process.env.MONGO_URI as string);
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  const { orgId } = await props.params;
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
