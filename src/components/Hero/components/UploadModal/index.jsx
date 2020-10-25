import React from 'react';
import { DateTime as DT } from 'luxon';
import { store, storage } from '../../../../firebase';
import Icon from '../../../Icon'
import Input from '../../../Input'
import Button from '../../../Button'
import Modal, { Content, Action } from '../../../Modal';
import * as bulmaToast from 'bulma-toast';
import styled from 'styled-components';

const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    & > .button {
        width: 48%;
    }
`;

const UploadModal = ({ isOpen, closeModal, user }) => {
    const [moduleName, setModuleName] = React.useState('');
    const [selectedFile, setSelectedFile] = React.useState('');
    const [subject, setSubject] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [percentage, setPercentage] = React.useState(0);

    const handleChangeSubject = (event) => {
        event.persist();
        const { value } = event.target;
        setSubject(value)
    }
    
    console.log(selectedFile)
    React.useEffect(() => {
        return () => {
            setSubject('');
            setModuleName('');
            setSelectedFile();
        }
    }, [isOpen])

    const handleModuleChange = (event) => {
        event.persist();
        const { value } = event.target;
        setModuleName(value)
    }

    const handleSave = () => {
        if (!moduleName || !moduleName.length) {
            let message = `<span class="icon mdi mdi-shield-alert"></span> Please enter the file name.`;
            bulmaToast.toast({
                message,
                type: 'is-grey',
                duration: 2000,
                position: 'top-center',
            });
            return;
        }
        
        if (!subject || !selectedFile) {
            let message = '';

            if (!subject) {
                message = `<span class="icon mdi mdi-shield-alert"></span> Please select a subject.`;
            } else {
                message = `<span class="icon mdi mdi-shield-alert"></span> Please select a file to be uploaded.`;
            }
            
            bulmaToast.toast({
                message,
                type: 'is-grey',
                duration: 2000,
                position: 'top-center',
            });

            return;
        }

        setLoading(true);

        const splitName = selectedFile.name.split('.');
        const getTheLength = splitName.length;

        const fileName = DT.local().toMillis();
        const collectionRef = store.collection(`modules/PP28US4d6VvdP16dpx7L/${subject}`).doc();
        const storageRef = storage.ref(`/modules/${fileName}.${splitName[getTheLength - 1]}`);
        const uploadTaker = storageRef.put(selectedFile);

        uploadTaker.on(
        'state_changed',
        (snapshot) => { 
            const { bytesTransferred, totalBytes} = snapshot;
            const totalPercentage = (bytesTransferred/totalBytes) * 100;
            setPercentage(totalPercentage);
        },
        (error) => {
            const message = `<span class="icon mdi mdi-shield-alert"></span> ${error.message}`;

            collectionRef.delete();
            storageRef.delete();

            bulmaToast.toast({
                message,
                type: 'is-grey',
                duration: 2000,
                position: 'top-center',
            });

            setLoading(false);
        },
        async () => {
            const fileUrl = await uploadTaker.snapshot.ref.getDownloadURL().then(url => url);
            await collectionRef.set({
                url: fileUrl,
                author: user.displayName || '',
                name: moduleName,
                type: splitName[getTheLength - 1],
                date_uploaded: DT.local().toUTC().toISO(),
            }, { merge: true });

            const message = `<span class="icon mdi mdi-check"></span> Successfuly uploaded file.`
            bulmaToast.toast({
                message,
                type: 'is-success',
                duration: 2000,
                position: 'top-center',
            });
            setLoading(false)
            closeModal();
        })
    }

    return (
        <Modal isOpen={isOpen} closeModal={closeModal} title="Upload a file">
            <Content>
                <div>
                    <Input placeholder="File Name" value={moduleName} onChange={handleModuleChange} />
                    <div className="field">
                        <div className="control">
                            <div className="select" style={{ width: '100%' }}>
                                <select style={{ width: '100%' }} onChange={handleChangeSubject} value={subject}>
                                    <option>Select Subject</option>
                                    <option value="english">English</option>
                                    <option value="filipino">Filipino</option>
                                    <option value="mathematics">Mathematics</option>
                                    <option value="science">Science</option>
                                    <option value="araling_panliputan">Araling Panlipunan</option>
                                    <option value="epp">Edukasyong Pagpapahalaga</option>
                                    <option value="mapeh">MAPEH</option>
                                    <option value="tle">TLE</option>
                                </select>
                            </div>
                        </div>
                    </div> 
                    <div className="file has-name"> 
                        <label className="file-label" style={{ width: '100%' }}>
                            <input 
                                className="file-input" 
                                type="file" 
                                name="resume"
                                onChange={(event) => {
                                    event.persist();
                                    const { files } = event.target;
                                    setSelectedFile(files[0]);
                                }} 
                            />
                            <span className="file-cta">
                                <Icon className="mdi-upload" />
                                {window.innerWidth < 481 ? '' : 'UPLOAD'}
                            </span>
                            <span className="file-name" style={{ width: '100%' }}>
                                {!selectedFile ? 'Choose a file…' : selectedFile.name }
                            </span>
                        </label>
                    </div>
                    {loading && <progress className="progress is-primary" value={percentage} max="100" style={{ marginTop: '10px' }}>{percentage + '%'}</progress>}
                </div>
            </Content>
            <Action>
                <ButtonContainer>
                    <Button className="is-warning" onClick={handleSave} disabled={loading}>{loading ? 'UPLOADING...' : 'UPLOAD'}</Button>
                    <Button onClick={closeModal} disabled={loading}>CANCEL</Button>
                </ButtonContainer>
            </Action>
        </Modal>
    )
}

export default UploadModal;