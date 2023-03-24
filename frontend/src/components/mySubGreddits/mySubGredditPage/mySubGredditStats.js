import React from "react";
import { useParams } from "react-router-dom";


export default function MySubGredditStats() {
    const { name } = useParams()
    return (
        <p>
            displaying reports
        </p>
    )
}