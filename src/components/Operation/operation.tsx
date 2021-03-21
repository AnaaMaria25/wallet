import React, { Component } from 'react';
import { User } from '../../models/userModel';
import './operation.scss';

interface OperationProps {
    senderId: number;
    recipientId: number;
    users: User[];
    quantity: number;
    loggedUser: number;
}

export class Operation extends Component<OperationProps> {

    render() {
        const { senderId, recipientId, quantity, loggedUser } = this.props;
        const senderUsername = this.props.users.find((user) => user.id === senderId)?.username || '';
        const recipientUsername = this.props.users.find((user) => user.id === recipientId)?.username || '';
        return (
            <div className={senderId === recipientId ? "movement common" : "transfer common"} >
                {senderId === recipientId && <span>You  transfered {quantity} $ to your account </span>}
                {(senderId === loggedUser) && (senderId !== recipientId) && <span>You  transfered {quantity} $ to {recipientUsername} </span>}
                {(senderId !== loggedUser) && (senderId !== recipientId) && <span>{senderUsername} transfered {quantity} $ to your account </span>}
            </div>

        );
    }
}
