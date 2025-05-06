import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { addHomework, getHomeworks, updateHomework } from '../services/homeworkService'
import { Homeworks } from '../components/Homeworks';
import { SavedHomeworks } from '../components/SavedHomeworks';
import { PublishedHomeworks } from '../components/PublishedHomeworks';
import {Subjects} from '../components/Subjects'
function THome(props) {

    const [displayedHomeworks, setDisplayedHomeworks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    let handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery("");
    }

    return (
        <div className="add-homeworks">
            <Homeworks></Homeworks>
            Drafts:
            <SavedHomeworks></SavedHomeworks>
            Published homeworks:
            <PublishedHomeworks></PublishedHomeworks>
            <Subjects></Subjects>
        </div>
    );
}

export { THome }
