"use client";
import React from "react";
import { updateImage } from "@/lib/action";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/button";
import type {upload} from "@prisma/client";

const EditForm = ({data}: {data: upload}) => {
    const [state, formAction] = useFormState(updateImage.bind(null, data.id), 
    null);

    return(
        <form action={formAction}>
            <div className="mb-4 pt-2">
                <input 
                    type="text" 
                    name="title" 
                    className="py-2.5 px-4 rounded-lg border border-gray-200 w-full text-sm sm:text-base" 
                    placeholder="Title"
                    defaultValue={data.title}/>
                <div aria-live="polite" aria-atomic="true">
                    <p className="text-sm text-red-500 mt-2">{state?.error?.title}</p>
                </div>
            </div>
            <div className="mb-4 pt-2">
                <input 
                    type="file" 
                    name="Image" 
                    className="file:py-2.5 file:px-4 file:mr-4 rounded-lg file:rounded-lg  file:bg-gray-100 hover:file:bg-gray-300 file:cursor-pointer border border-gray-200 w-full text-sm" />
                <div aria-live="polite" aria-atomic="true">
                    <p className="text-sm text-red-500 mt-2">{state?.error?.Image}</p>
                </div>
            </div>
            <div className="mb-4 pt-5">
                <SubmitButton label="update" />
            </div>
        </form>
    );
};

export default EditForm;