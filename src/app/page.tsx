import Hero from "@/app/components/Hero";
import Jobs from "./components/Jobs";
import {
  getSignInUrl,
  getSignUpUrl,
  withAuth,
  signOut,
} from '@workos-inc/authkit-nextjs';
import { addOrgAndUserData, JobModel } from "@/models/Job";
import mongoose from "mongoose";
import { FavoriteJobsModel } from "@/models/FavoriteJobs";

export default async function Home() {
  const { user } = await withAuth();
  const signInUrl = await getSignInUrl();
  const signUpUrl = await getSignUpUrl();
  await mongoose.connect(process.env.MONGO_URI as string);
  const latestJobs = await addOrgAndUserData(
    await JobModel.find({}, {}, { limit: 5, sort: '-createdAt' }),
    user
  );
  const userId = user ? user.id : '';

  const favDoc = await FavoriteJobsModel.findOne({ userId });
  let favoriteJobIds: string[] = [];
  if (favDoc) {
    favoriteJobIds = favDoc.favorites;
  }
  
  return (
    <>
    
      <Hero />
      <Jobs header={''} jobs={latestJobs} userId={userId} favoriteJobIds={favoriteJobIds} />
    </>
  );
}
