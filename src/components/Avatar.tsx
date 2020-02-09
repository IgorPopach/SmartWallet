import React from 'react';

interface OwnProps {
    imageUrl: string | undefined;
}

const Avatar = ({ imageUrl }: OwnProps) => {
    if (!imageUrl) {
        imageUrl = 'https://gravatar.com/avatar/d560435b0ef2c7e51cbd65fd6649618c?s=400&d=mp&r=x';
    }
    return <img src={imageUrl} alt="Avatar" className="avatar" />;
};

export default Avatar;
