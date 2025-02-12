import JobForm from "@/app/components/JobForm";
import {withAuth} from "@workos-inc/authkit-nextjs";
import {WorkOS} from "@workos-inc/node";

type PageProps = {
  params: {
    orgId: string;
  }
};

export default async function NewListingForOrgPage(props:PageProps) {
  const {user} = await withAuth();
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  if (!user) {
    return 'Please log in to see this page';
  }
  const par = await props.params;
  const orgId = par.orgId;
  const oms = await workos.userManagement.listOrganizationMemberships({userId:user.id,organizationId:orgId});
  const org = await workos.organizations.getOrganization(orgId);
  const hasAccess = oms.data.length > 0;
  if (!hasAccess) {
    return 'no access'
  }

  return (
    <JobForm orgId={orgId} orgName={org.name} />
  );
}