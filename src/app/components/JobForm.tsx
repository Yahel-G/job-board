'use client';

import { faEnvelope, faPhone, faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, RadioGroup, TextArea, TextField, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { useState } from "react";
import {CitySelect, CountrySelect, StateSelect} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import ImageUpload from "./ImageUpload";
import { redirect } from "next/navigation";
import { saveJobAction } from "../actions/jobActions";
import { Job } from "@/models/Job";
import { processDescriptionWithChatGPT } from "../actions/chatgptHelper";

export default function JobForm({orgId,jDoc,orgName}:{orgId:string,jDoc?:Job,orgName:string}) {
    const [countryId, setCountryId] = useState(jDoc ? jDoc.countryId : 0);
    const [stateId, setStateId] = useState(jDoc ? jDoc.stateId : 0);
    const [cityId, setCityId] = useState(jDoc ? jDoc.cityId : 0);
    const [country, setCountryName] = useState(jDoc ? jDoc.country : '');
    const [state, setStateName] = useState(jDoc ? jDoc.state : '');
    const [city, setCityName] = useState(jDoc ? jDoc.city : '');
    const [isSubmitting, setIsSubmitting] = useState(false); // State to prevent multiple submissions
    const [shouldProcessDescription, setShouldProcessDescription] = useState(true); // Toggle add special requirements



    async function handleSaveJob(data:FormData) {
        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            if (jDoc){
                data.set('id', jDoc._id);
            }
            data.set('country', country);
            data.set('state', state);
            data.set('city', city);
            data.set('countryId', countryId.toString());
            data.set('stateId', stateId.toString());
            data.set('cityId', cityId.toString());
            data.set('orgId', orgId);
            data.set('orgName', orgName);

            if (shouldProcessDescription) {
                const processedDescription = await processDescriptionWithChatGPT(data.get("description") as string);
                if (processedDescription !== "Error") {
                  data.set('description', processedDescription);
                }
              }
            const jobDoc = await saveJobAction(data);
            redirect(`/jobs/${jobDoc.orgId}`)
        } catch (error: unknown) {
            // NEXT_REDIRECT is thrown intentionally by Next.js, throwing it back for processing.
            if (error instanceof Error && error.message === "NEXT_REDIRECT") {
                throw error;
            }
            console.error("Error saving job:", error);
            const note = " Note: auto-complete data from your browser may not save properly.";
            if (error instanceof Error) {
              alert(`Error saving job: ${error.message}${note}`);
            } else {
              alert(`Error saving job: ${JSON.stringify(error)}${note}`);
            }
          } finally {
            setIsSubmitting(false);
        }
    }

    return(
        <Theme>
            <form action={handleSaveJob} className="container mt-6 flex flex-col gap-3 mx-auto">
                <TextField.Root name="title" placeholder="Job Title" defaultValue={jDoc?.title || ''}/>
                
                <div className="grid sm:grid-cols-3 gap-6">
                    <div>
                        Employment Scope
                        <RadioGroup.Root defaultValue={jDoc?.type || 'Full-time'} name="type">
                            <RadioGroup.Item value="Full-time">Full-time</RadioGroup.Item>
                            <RadioGroup.Item value="Part-time">Part-time</RadioGroup.Item>
                            <RadioGroup.Item value="Project">Project</RadioGroup.Item>
                        </RadioGroup.Root>
                    </div>
                    <div>
                        Employment Model
                        <RadioGroup.Root defaultValue={jDoc?.model || 'Hybrid'} name="model">
                            <RadioGroup.Item value="Full-time">On-site</RadioGroup.Item>
                            <RadioGroup.Item value="Hybrid">Hybrid-remote</RadioGroup.Item>
                            <RadioGroup.Item value="Remote">Fully remote</RadioGroup.Item>
                        </RadioGroup.Root>
                    </div>
                    <div>
                        Salary
                        <TextField.Root defaultValue={jDoc?.salary ? jDoc.salary : ''} name="salary">
                            <TextField.Slot>$</TextField.Slot>
                            <TextField.Slot>k/year</TextField.Slot>
                        </TextField.Root>

                    </div>
                </div>
                <div>
                    Location
                        <div className="flex flex-col sm:flex-row gap-4 *:grow">
                        <CountrySelect defaultValue={countryId ? ({ id: countryId, name: country } as any) : undefined} onChange={(e: any) => { setCountryId(e.id); setCountryName(e.name); }} placeHolder="Select country" />
                        <StateSelect defaultValue={stateId ? ({id:stateId, name:state} as any) : undefined} countryid={countryId} onChange={(e:any) => {setStateId(e.id); setStateName(e.name);}} placeHolder="Select state/district" />
                            <CitySelect defaultValue={cityId ? ({id:cityId, name:city} as any) : undefined} countryid={countryId} stateid={stateId} onChange={(e:any) => {setCityId(e.id); setCityName(e.name);}} placeHolder="Select city" />
                        </div>                    
                    </div>
                    <div className="sm:flex">
                        <div className="w-1/3">
                            <h3>Job icon</h3>                           
                            <ImageUpload icon={faStar} name="jobIcon" defaultValue={jDoc?.jobIcon || ''} />
                        </div>
                        <div className="grow">
                            <h3>Contact person</h3>
                            <div className="flex gap-2">

                                <div className="">
                                    <ImageUpload icon={faUser} name="contactPhoto" defaultValue={jDoc?.contactPhoto || '/defaultContactPhoto.png'} />
                                </div>
                                <div className="grow flex flex-col gap-1"> 
                                    <TextField.Root placeholder="J. Doe" name="contactName" defaultValue={jDoc?.contactName || ''}> 
                                    <TextField.Slot>
                                            <FontAwesomeIcon icon={faUser}/>
                                        </TextField.Slot>
                                    </TextField.Root>
                                    <TextField.Root placeholder="Phone" type="tel" name="contactPhone" defaultValue={jDoc?.contactPhone || ''}>
                                        <TextField.Slot>
                                            <FontAwesomeIcon icon={faPhone}/>
                                        </TextField.Slot>
                                    </TextField.Root>
                                    <TextField.Root placeholder="Email" type="email" name="contactEmail" defaultValue={jDoc?.contactEmail || ''}>
                                        <TextField.Slot>
                                            <FontAwesomeIcon icon={faEnvelope}/>
                                        </TextField.Slot>
                                    </TextField.Root>

                                </div>
                            </div>
                        </div>
                </div>
                <TextArea placeholder="Job description" resize={"vertical"} name="description" defaultValue={jDoc?.description || ''} />
                <div className="flex items-center mt-4">
                    <input
                        type="checkbox"
                        id="processDescription"
                        checked={shouldProcessDescription}
                        onChange={(e) => setShouldProcessDescription(e.target.checked)}
                    />
                    <label htmlFor="processDescription" className="ml-2 text-sm text-gray-700">
                        Support the developer of this page (it's free!)
                    </label>
                </div>
                <div className="flex justify-center">
                    <Button size="3" disabled={isSubmitting}>
                        <span className="px-8">Save</span>
                    </Button>
                </div>
            </form>
        </Theme>
    );
}