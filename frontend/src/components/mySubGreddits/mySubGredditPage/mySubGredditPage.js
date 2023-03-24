import React from "react";
import { useParams } from "react-router-dom";

export default function MySubGredditPage() {
    const { name } = useParams()
    return (
        <p>
            in the sub greddit page
        </p>
    )
}