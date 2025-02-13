'use server';
import JobForm from "@/app/components/JobForm";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import { JSX } from "react";

type NewListingContentProps = {
  params: Promise<{ orgId: string }>;
};

export default async function NewListingContent({ params }: NewListingContentProps): Promise<JSX.Element> {
  const { orgId } = await params;
  const { user } = await withAuth();
  if (!user) {
    return <div>Please log in to see this page</div>;
  }
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  const oms = await workos.userManagement.listOrganizationMemberships({
    userId: user.id,
    organizationId: orgId,
  });
  const org = await workos.organizations.getOrganization(orgId);
  const hasAccess = oms.data.length > 0;
  if (!hasAccess) {
    return <div>No access</div>;
  }
  return <JobForm orgId={orgId} orgName={org.name} />;
}
