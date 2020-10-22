import React from 'react';
import { DateTime as DT } from 'luxon';
import firebase, { store, storage } from '../../../../firebase';
import Icon from '../../../Icon'
import Button from '../../../Button'
import Modal, { Content, Action } from '../../../Modal';
import * as bulmaToast from 'bulma-toast';

const UploadModal = ({ isOpen, closeModal, user }) => {
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [subject, setSubject] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [percentage, setPercentage] = React.useState(0);

    const handleChangeSubject = (event) => {
        event.persist();
        const { value } = event.target;
        setSubject(value)
    }
    
    React.useEffect(() => {
        return () => {
            setSubject('');
            setSelectedFile(null);
        }
    }, [isOpen])


    const handleSave = async () => {
        setLoading(true);
        const fileName = DT.local().toMillis();
        const collectionRef = store.collection(`modules/PP28US4d6VvdP16dpx7L/${subject}`).doc();
        const storageRef = storage.ref(`/modules/${fileName}`);
        const uploadTaker = storageRef.put(selectedFile);
        
        if (!subject || !selectedFile) {
            let message = '';
            if (!subject) {
                message = `<span class="icon mdi mdi-alert-circle"></span> Please select a subject.`;
            } else {
                message = `<span class="icon mdi mdi-alert-circle"></span> Please select a file to be uploaded.`;
            }
            bulmaToast.toast({
                message,
                type: 'is-grey',
                duration: 2000,
                position: 'top-center',
            });

            return;
        }
        try {
            uploadTaker.on('state_changed', (snapshot) => { 
                const { bytesTransferred, totalBytes} = snapshot;
                const totalPercentage = (bytesTransferred/totalBytes) * 100;
                setPercentage(totalPercentage);
            }, () => {},
            async () => {
                const fileUrl = await uploadTaker.snapshot.ref.getDownloadURL().then(url => url);
                await collectionRef.set({
                    url: fileUrl,
                    author: user.displayName || '',
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
        } catch (error) {
                collectionRef.delete();
                storageRef.delete();
                const message = `<span class="icon mdi mdi-alert-circle"></span> ${error.message}`;
                bulmaToast.toast({
                message,
                type: 'is-grey',
                duration: 2000,
                position: 'top-center',
            });
            setLoading(false);
        }
    }

    return (
        <Modal isOpen={isOpen} closeModal={closeModal} title="Upload a file">
            <Content>
                <div>
                    <div className="field">
                        <div className="control">
                            <div className="select is-primary" style={{ width: '100%' }}>
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
                            <input className="file-input" type="file" name="resume" 
                            onChange={(event) => {
                                event.persist();
                                console.log(event)
                                const { files } = event.target;
                                setSelectedFile(files[0]);
                            }} />
                            <span className="file-cta">
                                <Icon className="mdi-upload" />
                                UPLOAD
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
                <Button className="is-warning" onClick={handleSave} disabled={loading}>{loading ? 'UPLOADING...' : 'UPLOAD'}</Button>
                <Button onClick={closeModal} disabled={loading}>CANCEL</Button>
            </Action>
        </Modal>
    )
}

export default UploadModal;