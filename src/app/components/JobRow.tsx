'use client';
import {JobModel, type Job} from "@/models/Job";
import { faHeart as fasHeart} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TimeAgo from "./TimeAgo";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";




export default function JobRow({jobDoc, userId, initialFavorited = false}: {jobDoc:Job, userId?:string, initialFavorited?: boolean}){

    const [isFavorited, setIsFavorited] = useState(initialFavorited);
    useEffect(() => {
        setIsFavorited(initialFavorited);
      }, [initialFavorited]);

    const handleToggleFavorite = async () => {
        if (!userId) {
            alert("You must be logged in to favorite jobs.");
            return;
          }
        try {
            if (isFavorited){
                await axios.post('/api/removeFavorite', { jobId: jobDoc._id, userId });
                setIsFavorited(false);
            } else {
                await axios.post('/api/addFavorite', { jobId: jobDoc._id, userId: userId });
                setIsFavorited(true);
            }
        } catch (error) {
          console.error("Error adding to favorites:", error);
          alert("Failed to add to favorites.");
        }
    };

    return(
        <>
            <div className="bg-white p-4 rounded-lg shadow-sm relative">
                <div className="absolute cursor-pointer top-4 right-4">
                    <button type="button" onClick={handleToggleFavorite}>
                        <FontAwesomeIcon className="size-4 text-red-500 " icon={isFavorited ? fasHeart : farHeart}/>
                    </button>
                </div>
                <div className="flex gap-4">
                    <div className="content-center">
                       <Image alt="" className="size-12" width="256" height="256" src={jobDoc.jobIcon || "/default-job-icon.png"}></Image>
                </div>
                <div className="grow sm:flex">
                    <div className="grow">
                        <div>
                            <Link href={`/jobs/${jobDoc.orgId}`} className="hover:underline block text-gray-500 text-sm">{jobDoc.orgName || '?'}</Link>
                        </div>
                        <div className="font-bold mb-1">
                            <Link className="hover:underline" href={`/show/${jobDoc._id}`}>{jobDoc.title}</Link>
                        </div>
                        <div className="text-gray-400 text-sm">{jobDoc.model || ''} &middot; {jobDoc.city ? (jobDoc.city + ', '):<></> || ''} {jobDoc.country} &middot; {jobDoc.type}
                        {' '}
                        {jobDoc.isAdmin ? (<>
                            {' '}&middot;{' '}
                            <Link href={'/jobs/edit/'+jobDoc._id}>Edit</Link>
                            {' '}&middot;{' '}
                            <button className="hover:background-color-gray-800" type="button" 
                            onClick={async () => {
                                await axios.delete('/api/jobs?id='+jobDoc._id);
                                window.location.reload();
                                }} >Delete</button>
                        </>
                        ):<></>}

                        </div>
                    </div>
                    {jobDoc.createdAt ? (
                        <div className="content-end text-gray-500 text-sm">
                            <TimeAgo createdAt={jobDoc.createdAt} />
                        </div>
                    ):<></>}
                </div>
                </div>
            </div>
        </>
    );
}