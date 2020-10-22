import React from 'react';
import { DateTime as DT } from 'luxon';
import firebase, { store, storage } from '../../../../firebase';
import Icon from '../../../Icon'
import Button from '../../../Button'
import Modal, { Content, Action } from '../../../Modal';

const UploadModal = ({ title, isOpen, closeModal, handleSubmit}) => {
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const handleSelectFile = (event) => {
        event.persist();
        const { files } = event.target;
        setSelectedFile(files[0]);
    }
    
    React.useEffect(() => {
        return () => {
            setSelectedFile(null);
        }
    }, [isOpen])

    const handleSave = async () => {
        const storageRef = storage.ref();
        const uploadTaker = storageRef.child(`modules/files`).put(selectedFile);
        
    }

    return (
        <Modal isOpen={isOpen} closeModal={closeModal} title="Upload a file">
            <Content>
                <div>
                    <div className="field">
                        <div className="control">
                            <div className="select is-primary" style={{ width: '100%' }}>
                                <select style={{ width: '100%' }}>
                                    <option>Select Subject</option>
                                    <option value="english">English</option>
                                    <option value="filipino">Filipino</option>
                                    <option value="math">Math</option>
                                    <option value="science">Science</option>
                                    <option value="mapeh">MAPEH</option>
                                    <option value="tle">TLE</option>
                                </select>
                            </div>
                        </div>
                    </div> 
                    <div className="file has-name"> 
                        <label className="file-label" style={{ width: '100%' }}>
                            <input className="file-input" type="file" name="resume" onChange={handleSelectFile} />
                            <span className="file-cta">
                                <Icon className="mdi-upload" />
                                UPLOAD
                            </span>
                            <span className="file-name" style={{ width: '100%' }}>
                                {!selectedFile ? 'Choose a file…' : selectedFile.name }
                            </span>
                        </label>
                    </div>
                </div>
            </Content>
            <Action>
                <Button className="is-warning" onClick={handleSave}>UPLOAD</Button>
                <Button onClick={closeModal}>CANCEL</Button>
            </Action>
        </Modal>
    )
}

export default UploadModal;