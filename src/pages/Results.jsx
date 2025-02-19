import React, { useState, useEffect } from 'react';
import { getResults } from '../../backend/indexedDB';
import '../styles/Results.css'


const Results = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            const temp = await getResults();
            const sortedResults = temp.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Ensure correct sorting
            setResults(sortedResults);
        };

        fetchResults();
    }, []);



    return (
        <div className="results-container">
            <h1>Results</h1>
            {results.length === 0 ? (
                <h2>No tests attempted until now</h2>
            ) : (
                <ul className="results-list">
                    {results.map((res, index) => (
                        <li key={index}>
                            <span>Score:</span> {res.score} |
                            <span> Time:</span> {new Date(res.timestamp).toLocaleString()}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Results;
