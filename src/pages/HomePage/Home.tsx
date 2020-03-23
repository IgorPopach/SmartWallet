import React, { useCallback } from 'react';
import Card from './../../components/Card';
import { faChartLine, faPlusCircle, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import DateTimePicker from '../../components/DateTimePicker/DateTimePicker';
import { dateFormat } from '../../services/time';

interface DispatchProps {
    createAlert: (messageText: string, title?: string, type?: string) => void;
}

type Props = DispatchProps;

const Home = ({ createAlert }: Props) => {
    const newMessage = {
        messageText: 'this text you see in Alert',
        title: 'Title Alert',
        type: 'success',
    };

    const addMessageCallback = useCallback(
        () => createAlert('this text you see in Alert', 'Title Alert', 'success'),
        [],
    );

    const onChange = (v: number) => console.log('value', dateFormat(v, 'D, T'));

    return (
        <>
            <h2>Title Alert</h2>
            <p>{newMessage.messageText}</p>
            <button className="btn btn-danger" onClick={addMessageCallback}>
                Add this message
            </button>
            <Card icon={faChartLine} title="costs" value="33.50" />
            <Card icon={faPlusCircle} title="budget" value="127.50" />
            <Card icon={faDollarSign} title="last-costs" value="33.50" />
            <DateTimePicker {...{ onChange }} />
        </>
    );
};

export default Home;
