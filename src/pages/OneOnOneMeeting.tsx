import { EuiFlexGroup, EuiForm, EuiSpacer } from '@elastic/eui'
import React, { useState } from 'react'
import Header from '../components/Header'

import MeetingNameField from '../components/FormComponents/MeetingNameField'
import MeetingUsersField from '../components/FormComponents/MeetingUsersField'
import useAuth from '../hooks/useAuth'
import useFetchUsers from '../hooks/useFetchUsers'
import moment from 'moment'
import MeetingDateField from '../components/FormComponents/MeetingDateField'
import CreateMeetingButtons from '../components/FormComponents/CreateMeetingButtons'
import { FieldErrorType, UserType } from '../utils/Types'
import { addDoc } from 'firebase/firestore'
import { meetingsRef } from '../utils/FirebaseConfig'
import { generateMeetingId } from '../utils/generateMeetingId'
import { useAppSelector } from '../app/hooks'
import { useNavigate } from 'react-router-dom'
import useToast from '../hooks/useToast'

const OneOnOneMeeting = () => {

    useAuth();
    const users=useFetchUsers();
    const [createToast]=useToast();
   const uid=useAppSelector((zoom)=>zoom.auth.userInfo?.uid);
   const navigate=useNavigate();
    const [meetingName,setMeetingName]=useState("")
    const [selectedUsers,setSelectedUsers]=useState<Array<UserType>>([])
    const [startDate,setStartDate]=useState(moment());
    // const [endDate,setEndDate]=useState(moment().add(1,"hours"));
    // const [meetingLink,setMeetingLink]=useState("");

    const [showErrors,setShowErrors]=useState<{
      meetingName:FieldErrorType;
      meetingUser:FieldErrorType;
    }>({
      meetingName:{
        show:false,
        message:[],
      },
      meetingUser:{
        show:false,
        message:[],
      }
      

    })
    const onUserChange=(selectedOptions:any)=>{
        setSelectedUsers(selectedOptions);
    }

    const validateForm=()=>{
      let errors=false;
      const clonedShowErrors ={...showErrors}
      if(!meetingName.length)
      {
        clonedShowErrors.meetingName.show=true;
        clonedShowErrors.meetingName.message=["Please Enter Meeting Name"];
        errors=true;

      }
      else{
        clonedShowErrors.meetingName.show=false;
        clonedShowErrors.meetingName.message=[];
      }
      if(!selectedUsers.length)
      {
        clonedShowErrors.meetingUser.show=true;
        clonedShowErrors.meetingUser.message=["Please Select a User"];
      }
      else{
        clonedShowErrors.meetingUser.show=false;
        clonedShowErrors.meetingUser.message=[];

      }
      setShowErrors(clonedShowErrors);
      return errors;
    }


    const createMeeting = async () => {
      if (!validateForm()) {
        if (!selectedUsers || selectedUsers.length === 0 || !selectedUsers[0].uid) {
          console.error("No user selected or UID missing");
          return;
        }
    
        const meetingId = generateMeetingId();
        await addDoc(meetingsRef, {
          createdBy: uid,
          meetingId,
          meetingName,
          meetingType: "1-on-1",
          invitedUsers: [selectedUsers[0].uid],
          meetingDate: startDate.format("L"),
          maxUsers: 1,
          status: true,
        });
        createToast({
          title:"One on One Meeting Created Successfully.",
          type:"success",
        });
        navigate("/")
      }
    };
    



  return (
    <div style={{display:"flex",height:"100vh",flexDirection:"column"}}>
        <Header/>
      <EuiFlexGroup justifyContent="center" alignItems="center" >
        <EuiForm> <MeetingNameField 
        label="Meeting Name"
        placeholder="Meeting Name"
        value={meetingName}
        setMeetingName={setMeetingName}
        isInvalid={showErrors.meetingName.show}
        error={showErrors.meetingName.message}
        />
        <MeetingUsersField label="Invite User" options={users} onChange={onUserChange} selectedOptions={selectedUsers} singleSelection={{asPlainText:true}} isClearable={false} placeholder='Select a user ' isInvalid={showErrors.meetingUser.show}
        error={showErrors.meetingUser.message}/>
        <MeetingDateField 
          selected={startDate}
          setStartDate={setStartDate} 
        />
        <EuiSpacer/>
        <CreateMeetingButtons createMeeting={createMeeting} />
        </EuiForm>
      
      </EuiFlexGroup>
    </div>
  )
}


export default OneOnOneMeeting
