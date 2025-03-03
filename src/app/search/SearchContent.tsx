'use server'
import Jobs from "@/app/components/Jobs";
import { addOrgAndUserData, Job, JobModel } from "@/models/Job";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import mongoose from "mongoose";
import { FavoriteJobsModel } from "@/models/FavoriteJobs";
import { JSX } from "react";

type SearchContentProps = {
  params: Promise<{ input: string }>;
};

export default async function SearchContent({ params }: SearchContentProps): Promise<JSX.Element> {
  const resolvedParams = await params;
  const input = resolvedParams.input;
  
  await mongoose.connect(process.env.MONGO_URI as string);
  
  const { user } = await withAuth();
  
  
  let jobsDocs: Job[] = JSON.parse(JSON.stringify(
    await JobModel.find({
      $or: [
        { orgName: { $regex: new RegExp(input, 'i') } },
        { title: { $regex: new RegExp(input, 'i') } }
      ]
    })
  ));
  
  jobsDocs = await addOrgAndUserData(jobsDocs, user);
  
  const userId = user ? user.id : '';
  
  // This is just to mark the heart icons in case a job is already favorited
  const favDoc = await FavoriteJobsModel.findOne({ userId });
  let favoriteJobIds: string[] = [];
  if (favDoc) {
    favoriteJobIds = favDoc.favorites;
  }
  
  return (
    <div>
      <div className="container mx-auto">
        <h1 className="text-xl mb-6">Search results</h1>
      </div>
      <Jobs jobs={jobsDocs} header={"Showing results for " + input} userId={userId} favoriteJobIds={favoriteJobIds} />
    </div>
  );
}
