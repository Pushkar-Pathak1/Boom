import React from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setToasts } from '../app/slices/MeetingSlice';

const useToast = () => {
    const toasts=useAppSelector(zoom=>zoom.meetings.toasts);
    const dispatch=useAppDispatch();
    const createToast=({title,type}:{title:string,type:any})=>{
        dispatch(setToasts(toasts.concat({
            id:new Date().toISOString(),
            title,color:type,
        })))
    }

  return [createToast];
}

export default useToast
