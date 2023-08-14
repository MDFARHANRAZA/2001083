import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NumberManagementService = () => {
    const [mergedNumbers, setMergedNumbers] = useState([]);
    const urls = [
        'http://20.244.56.144/numbers/primes',
        'http://20.244.56.144/numbers/fibo',
        'http://20.244.56.144/numbers/odd',
        'http://20.244.56.144/numbers/rand',
    ];

    const getNumbers = async () => {
        const response = urls.map(async (url) => {
            try {
                const response = await axios.get(url, { timeout: 500 });
                return response.data.numbers;
            } catch (error) {
                console.log(`Error fetching from ${url}:`, error);
                return [];
            }
        });

        const numbersArrays = await Promise.all(response);
        const mergedUniqueNumbers = Array.from(new Set(numbersArrays.flat())).sort((a, b) => a - b);

        setMergedNumbers(mergedUniqueNumbers);
    };

    useEffect(() => {
        getNumbers();
    }, []);
    return (
        <div>
            <h1>Merged Unique Numbers</h1>
            <ul>
                {mergedNumbers.map((number) => (
                    <li key={number}>{number}</li>
                ))}
            </ul>
        </div>
    );
}

export default NumberManagementService;