import { withAuth } from '@workos-inc/authkit-nextjs';
import { AutoPaginatable, OrganizationMembership, User, WorkOS } from '@workos-inc/node';
import mongoose from 'mongoose';
import {model, models, Schema} from 'mongoose';

export type Job = {
    _id: string;
    title: string;
    orgName?: string;
    model: string;
    type: string;
    salary: number;
    country: string;
    state: string;
    city: string;
    countryId: number,
    stateId: number,
    cityId: number,
    jobIcon: string;
    orgId: string;
    contactPhoto: string;
    contactName: string;
    contactPhone: string;
    contactEmail: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    isAdmin?: boolean;
};


const JobSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    type: {type: String, required: true},
    model: {type: String, required: true},
    salary: {type: Number},
    country: {type: String, required: true},
    state: {type: String},
    city: {type: String},
    countryId: {type: Number, required: true},
    stateId: {type: Number, required: true},
    cityId: {type: Number, required: true},
    jobIcon: {type: String, required: true},
    contactPhoto: {type: String},
    contactName: {type: String, required: true},
    contactPhone: {type: String, required: true},
    contactEmail: {type: String, required: true},
    orgId: {type: String, required: true},
    orgName: { type: String },
  }, {
    timestamps: true,
  });

  export async function addOrgAndUserData(jobsDocs:Job[], user:User|null){
    jobsDocs = JSON.parse(JSON.stringify(jobsDocs));
    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    await mongoose.connect(process.env.MONGO_URI as string);
    let oms:AutoPaginatable<OrganizationMembership>|null = null;
    if (user){
        oms = await workos.userManagement.listOrganizationMemberships({
            userId: user?.id,
        });
    }
    for (const job of jobsDocs){
        const orgn = await workos.organizations.getOrganization(job.orgId);
        job.orgName = orgn.name;
        if (oms && oms.data?.length > 0){
            job.isAdmin = !!oms.data.find(om => om.organizationId == job.orgId);
        }
    }
    return jobsDocs;
  }


export const JobModel = models?.Job || model('Job', JobSchema);
