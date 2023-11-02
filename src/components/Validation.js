import React from 'react'
import { useParams } from 'react-router-dom'

export default function Validation() {
    const {qrAddr} = useParams();
    
    return (
        <>
            <p>{`This is a Validation page for attendee ${qrAddr}`}</p>
        </>
    )
}