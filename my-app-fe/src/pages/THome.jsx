import { useState } from 'react';
import { Homeworks } from '../components/Homeworks';
import { SavedHomeworks } from '../components/SavedHomeworks';
import { PublishedHomeworks } from '../components/PublishedHomeworks';

function THome(props) {
    const [showSaved, setShowSaved] = useState(false);
    const [showPublished, setShowPublished] = useState(false);
    const [savedHomeworks, setSavedHomeworks] = useState([]);
    const [publishedHomeworks, setPublishedHomeworks] = useState([]);

    const toggleSaved = () => setShowSaved(!showSaved);
    const togglePublished = () => setShowPublished(!showPublished);

    return (
        <div className="add-homeworks">
            <Homeworks publishedHomeworks={publishedHomeworks}
                        savedHomeworks={savedHomeworks}
                        setSavedHomeworks={setSavedHomeworks}
                        setPublishedHomeworks={setPublishedHomeworks}/>

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
                        publishedHomeworks={publishedHomeworks}
                        savedHomeworks={savedHomeworks}
                        setSavedHomeworks={setSavedHomeworks}
                        setPublishedHomeworks={setPublishedHomeworks}
                    />
                </>
            )}

            {showPublished && (
                <>
                    <h5>Published Homeworks:</h5>
                    <PublishedHomeworks publishedHomeworks={publishedHomeworks}
                        setPublishedHomeworks={setPublishedHomeworks}/>
                </>
            )}
        </div>
    );
}

export { THome };