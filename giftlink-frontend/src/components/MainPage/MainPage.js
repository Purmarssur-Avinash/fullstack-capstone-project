import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';

function MainPage() {
    const [gifts, setGifts] = useState([]);
    const navigate = useNavigate();

    // Task 1: Write async fetch operation
    useEffect(() => {
        const fetchGifts = async () => {
            try {
                const url = `${urlConfig.backendUrl}/api/gifts`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                const data = await response.json();
                setGifts(data);
            } catch (error) {
                console.error('Fetch error:', error.message);
            }
        };

        fetchGifts();
    }, []);

    // Task 2: Navigate to details page
    const goToDetailsPage = (productId) => {
        navigate(`/app/product/${productId}`);
    };

    // Task 3: Format timestamp
    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000); // assuming UNIX timestamp in seconds
        return date.toLocaleDateString('default', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getConditionClass = (condition) => {
        return condition === "New" ? "list-group-item-success" : "list-group-item-warning";
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {gifts.map((gift) => (
                    <div key={gift.id || gift._id} className="col-md-4 mb-4">
                        <div className="card product-card">

                            {/* Task 4: Display gift image or placeholder */}
                            <div className="image-placeholder">
                                {gift.image ? (
                                    <img src={gift.image} alt={gift.name} className="card-img-top" />
                                ) : (
                                    <div className="no-image-available p-4 text-muted text-center">
                                        No Image Available
                                    </div>
                                )}
                            </div>

                            <div className="card-body">
                                {/* Task 5: Display gift name */}
                                <h5 className="card-title">{gift.name}</h5>

                                {/* Task 6: Display date added */}
                                <p className="card-text date-added">
                                    Added on: {formatDate(gift.date_added)}
                                </p>

                                <p className={`card-text ${getConditionClass(gift.condition)}`}>
                                    {gift.condition}
                                </p>

                                <button onClick={() => goToDetailsPage(gift.id || gift._id)} className="btn btn-primary w-100">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MainPage;
