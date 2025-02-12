'use server';

import { JobModel } from "@/models/Job";
import mongoose from "mongoose";
import { FavoriteJobsModel } from '@/models/FavoriteJobs';
import { revalidatePath } from "next/cache";
import { WorkOS } from "@workos-inc/node";

export async function saveJobAction(formData: FormData) {
  await mongoose.connect(process.env.MONGO_URI as string);
  const { id, ...jobData } = Object.fromEntries(formData);

  if (jobData.orgId) {
    const workos = new WorkOS(process.env.WORKOS_API_KEY as string);
    const org = await workos.organizations.getOrganization(jobData.orgId.toString());
    jobData.orgName = org.name;
  }

  const jobDoc = id
    ? await JobModel.findByIdAndUpdate(id, jobData)
    : await JobModel.create(jobData);
    
  if ('orgId' in jobData) {
    revalidatePath('/jobs/' + jobData.orgId);
  }
  return JSON.parse(JSON.stringify(jobDoc));
}

export async function addJobToFavoritesAction({jobId, userId}:{jobId:string, userId?:string}){
  if (userId && userId != '') {

    await mongoose.connect(process.env.MONGO_URI as string);
    const result = await FavoriteJobsModel.updateOne(
      { userId },
      { $addToSet: { favorites: jobId }},
      {upsert: true }
    )
    return result;
  }
}

export async function removeJobFromFavoritesAction({ jobId, userId }: { jobId: string, userId?: string }) {
  if (userId && userId !== '') {
    await mongoose.connect(process.env.MONGO_URI as string);
    const result = await FavoriteJobsModel.updateOne(
      { userId },
      { $pull: { favorites: jobId } }
    );
    return result;
  }
}
