import { useState } from 'react';
import { Homeworks } from '../components/Homeworks';
import { SavedHomeworks } from '../components/SavedHomeworks';
import { PublishedHomeworks } from '../components/PublishedHomeworks';
import { Subjects } from '../components/Subjects';

function THome(props) {
    const [showSaved, setShowSaved] = useState(true);
    const [showPublished, setShowPublished] = useState(true);

    const toggleSaved = () => setShowSaved(!showSaved);
    const togglePublished = () => setShowPublished(!showPublished);

    return (
        <div className="add-homeworks">
            <Homeworks />

            <div className="my-3">
                <button className="btn btn-secondary me-2" onClick={toggleSaved}>
                    {showSaved ? "Hide Drafts" : "Show Drafts"}
                </button>
                <button className="btn btn-secondary" onClick={togglePublished}>
                    {showPublished ? "Hide Published Homeworks" : "Show Published Homeworks"}
                </button>
            </div>

            {showSaved && (
                <>
                    <h5>Drafts:</h5>
                    <SavedHomeworks
                        error={props.error}
                        setError={props.setError}
                        authStatus={props.authStatus}
                        setAuthStatus={props.setAuthStatus}
                    />
                </>
            )}

            {showPublished && (
                <>
                    <h5>Published Homeworks:</h5>
                    <PublishedHomeworks />
                </>
            )}

            <Subjects />
        </div>
    );
}

export { THome };