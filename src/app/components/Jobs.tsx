import type { Job } from "@/models/Job";
import JobRow from "./JobRow";
import { FavoriteJobsModel } from "@/models/FavoriteJobs";

export default async function Jobs({ header, jobs, userId, favoriteJobIds = [] }: { header: string, jobs: Job[], userId: string, favoriteJobIds ?: string[] }) {
    return (
        <div className="bg-slate-200 py-6 rounded-3xl">
            <div className="container mx-auto">
                <h2 className="font-bold mb-4">{header || 'Recent jobs'}</h2>
                <div className="flex flex-col gap-4">
                    {!jobs?.length ? (
                        <div>No jobs found.</div>
                    ) : null}

                    {jobs?.map((job) => {
                        const isFav = favoriteJobIds.includes(String(job._id));
                        return (
                            <JobRow key={job._id} jobDoc={job} userId={userId} initialFavorited={isFav} />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
