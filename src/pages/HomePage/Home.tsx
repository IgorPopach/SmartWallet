import React from 'react';
import Card from './../../components/Card';
import { faChartLine, faPlusCircle, faDollarSign } from '@fortawesome/free-solid-svg-icons';

const Home = ({}) => {
    return (
        <>
            <Card icon={faChartLine} title="costs" value="33.50" />
            <Card icon={faPlusCircle} title="budget" value="127.50" />
            <Card icon={faDollarSign} title="last-costs" value="33.50" />
        </>
    );
};

export default Home;
