'use server';
import JobForm from "@/app/components/JobForm";
import { JobModel } from "@/models/Job";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import mongoose from "mongoose";
import { JSX } from "react";

type EditJobContentProps = {
  params: Promise<{ jobId: string }>;
};

export default async function EditJobContent({ params }: EditJobContentProps): Promise<JSX.Element> {
  // Await the thenable params to extract the jobId
  const resolvedParams = await params;
  const jobId = resolvedParams.jobId;
  
  await mongoose.connect(process.env.MONGO_URI as string);
  
  // Retrieve the job document
  const jobDoc = JSON.parse(JSON.stringify(await JobModel.findById(jobId)));
  if (!jobDoc) {
    return <div>Not found</div>;
  }
  
  // Get the authenticated user
  const { user } = await withAuth();
  if (!user) {
    return <div>You need to log in to see this page</div>;
  }
  
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  const oms = await workos.userManagement.listOrganizationMemberships({
    userId: user.id,
    organizationId: jobDoc.orgId,
  });
  if (oms.data.length === 0) {
    return <div>Access denied</div>;
  }
  
  // Fetch organization details
  const org = await workos.organizations.getOrganization(jobDoc.orgId);
  
  return (
    <div>
      <JobForm orgId={jobDoc.orgId} jDoc={jobDoc} orgName={org.name} />
    </div>
  );
}
