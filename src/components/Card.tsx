import React from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    icon: IconDefinition;
    title: string;
    value: string;
}

const Card = ({ icon, title, value }: Props) => {
    return (
        <div className="card card-component">
            <div className="card-body">
                <FontAwesomeIcon {...{ icon }} className="card-icon" />
                <div className="card-info">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-value">{value}</p>
                </div>
            </div>
            <div className="card-footer text-muted">footer</div>
        </div>
    );
};

export default Card;
