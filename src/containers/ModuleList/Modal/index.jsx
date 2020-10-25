import React from 'react';

import styled from 'styled-components';

import Button from '../../../components/Button';

import { store, storage } from '../../../firebase';

import Modal, { Content, Action } from '../../../components/Modal'

import * as bulmaToast from 'bulma-toast';

const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    & > .button {
        width: 48%;
    }
`;

const DeleteModal = ({ 
        isOpen, 
        closeModal, 
        selectedModule, 
        setSelectedModule,
        subject,
        modules,
        setModules,
    }) => {
    const [loading, setLoading] = React.useState(false);

    const handleDeleteModule = async () => {
        try {
            setLoading(true)
            const firstSplit = selectedModule.url.split('%2F')[1];
            const fileUrl = firstSplit.split('?alt')[0]
            const documentRef = store.doc(`modules/PP28US4d6VvdP16dpx7L/${subject}/${selectedModule.id}`);
            const storageRef = storage.ref(`/modules/${fileUrl}`);

            await documentRef.delete();
            await storageRef.delete();

            const message = `<span class="icon mdi mdi-check"></span> Deleted Successfully.`;
            const newList = modules.filter(module => module.id !== selectedModule.id);
            setModules(newList);
            bulmaToast.toast({
                message,
                type: 'is-success',
                duration: 2000,
                position: 'top-center',
            })
            closeModal();
            setLoading(false);
        } catch (error) {
            const message = `<span class="icon mdi mdi-shield-alert"></span> ${error.message}`;

            bulmaToast.toast({
                message,
                type: 'is-grey',
                duration: 2000,
                position: 'top-center',
            })
            setLoading(false);
        }
    }

    return (
        <Modal title="Are you sure to delete ?" isOpen={isOpen} closeModal={() => {
            if (!loading) {
                closeModal();
            }
        }} >
            <Content>
                <h1>Delete <strong>{selectedModule.name}</strong> ?</h1>
            </Content>
            <Action>
                <ButtonContainer>
                    <Button onClick={handleDeleteModule} className="is-warning" disabled={loading}>{loading ? 'DELETING...' : 'DELETE'}</Button>
                    <Button onClick={closeModal} disabled={loading}>CANCEL</Button>
                </ButtonContainer>
            </Action>
        </Modal>
    )
}

export default DeleteModal;