import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import createSubGreddit_service from "../../Service/createSubGredditService";

export default function CreateSubGreddit() {
    const navigate = useNavigate();
    const [Name, setName] = useState('');
    const [Description, setDescription] = useState('');
    const [Tags, setTags] = useState('');
    const [BannedKeywords, setBannedKeywords] = useState('');

    const handleSubmit = async (e) => {
        console.log('hi')
        e.preventDefault();
        const tags_array = (Tags.split(",").map(str => str.trim())).filter(str => str !== "");
        const bannedkeywords_array = (BannedKeywords.split(",").map(str => str.trim())).filter(str => str !== "");


        const gredditdata = {
            username: (JSON.parse(localStorage.getItem('user'))).username,
            id: (JSON.parse(localStorage.getItem('user')))._id,
            token: (JSON.parse(localStorage.getItem('user'))).token,
            Name,
            Description,
            Tags: tags_array,
            BannedKeywords: bannedkeywords_array
        }

        console.log(gredditdata)
        const result = await createSubGreddit_service(gredditdata)
        console.log('result: ', result)
        if (result === 201) {
            console.log("registration complete - redirecting to mySubGreddits")
            navigate('/mySubGreddits')
        }
        if (result === 403) {
            window.alert("Subgreddit with similar name exists. Try another one.")
        }
    }

    return (
        <>
            <section className='heading'>
                <p>Create a new SubGreddit</p>
            </section>

            <section className='form'>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control'
                            id='name'
                            name='name'
                            value={Name}
                            placeholder='Subgreddit Name'
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control'
                            id='description'
                            name='description'
                            value={Description}
                            placeholder='Enter SubGreddit Description'
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control'
                            id='tags'
                            name='tags'
                            value={Tags}
                            placeholder='Enter Tags seperated with commas'
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </div>

                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control'
                            id='banned_keywords'
                            name='banned_keywords'
                            value={BannedKeywords}
                            placeholder='Enter Keywords seperated with commas'
                            onChange={(e) => setBannedKeywords(e.target.value)}
                        />
                    </div>

                    {(Name && Description) && <div div className='form-group'>
                        <button type='submit' className='btn btn-block'>
                            Create
                        </button>
                    </div>}
                </form>
            </section>
        </>
    )

}