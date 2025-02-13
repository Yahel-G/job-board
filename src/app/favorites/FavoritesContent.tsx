'use server'
import Jobs from "@/app/components/Jobs";
import { Job, JobModel } from "@/models/Job";
import mongoose from "mongoose";
import { FavoriteJobsModel } from "@/models/FavoriteJobs";
import { JSX } from "react";

type FavoritesContentProps = {
  params: Promise<{ userId: string }>;
};

export default async function FavoritesContent({ params }: FavoritesContentProps): Promise<JSX.Element> {
  await mongoose.connect(process.env.MONGO_URI as string);
  
  const par = await params;
  const userId = par.userId;
  
  const favDoc = await FavoriteJobsModel.findOne({ userId });
  let favoriteJobIds: string[] = [];
  if (favDoc) {
    favoriteJobIds = favDoc.favorites;
  }
  
  let jobsDocs: Job[] = [];
  if (favoriteJobIds.length > 0) {
    jobsDocs = JSON.parse(JSON.stringify(
      await JobModel.find({ _id: { $in: favoriteJobIds } })
    ));
    
  }
  
  return (
    <div>
      <div className="container mx-auto">
        <h1 className="text-xl mb-6">Favorite Jobs</h1>
      </div>
      <Jobs jobs={jobsDocs} header="Favorite Jobs" userId={userId} />
    </div>
  );
}