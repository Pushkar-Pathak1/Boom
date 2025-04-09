import { EuiComboBox, EuiFormRow } from '@elastic/eui'
import React from 'react'

const MeetingUsersField = ({label,options,onChange,selectedOptions,isClearable,placeholder,singleSelection=false,isInvalid,error}:{label:string;options:any;onChange:any;selectedOptions:any;isClearable:boolean;placeholder:string;singleSelection:any;isInvalid:boolean;error:Array<string>}) => {
  return (
   <EuiFormRow label={label}  isInvalid={isInvalid} error={error}>
    <EuiComboBox
    options={options}

    selectedOptions={selectedOptions}
    onChange={onChange}
    isClearable={isClearable}
    placeholder={placeholder}
    singleSelection={singleSelection}
    isInvalid={isInvalid}
    

    />
   </EuiFormRow>
  )
}

export default MeetingUsersField
