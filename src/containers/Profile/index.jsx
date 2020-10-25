import React from 'react';

import Navbar from '../../components/Nav';
import Footer from '../../components/Footer';

import Button from '../../components/Button';

import Icon from '../../components/Icon';

import styled from 'styled-components';

import * as bulmaToast from 'bulma-toast';

import firebase, { auth, storage } from '../../firebase';

import { DateTime as DT } from 'luxon';

const Div1 = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 2rem;
`;

const Div2 = styled.div`
    @media (max-width: 650px) {
        width: 100% !important;
        padding: 0rem 1rem;
    }
`;

const Card = styled.div`
    margin-top: 6rem;
    width: 400px;
    padding: 1rem;
    box-shadow: 0px 0px 3px -1px rgb(170 9 9 / 50%);
    border: 1px solid #77112557;
    position: relative;

    @media (max-width: 650px) {
        width: 100% !important;
    }
`;

const Image = styled.img`
    position: absolute;
    width: 100px;
    border-radius: 50%;
    height: 100px;
    top: -70px;
    right: 50%;
    transform: translateX(50%);
    box-shadow: 0px 0px 5px -1px rgba(0,0,0,0.5);
    background: #eee;
    border: 1px solid #77112557;
    cursor: pointer;
`;

const IconRight = styled.span`
    position: absolute;
    top: 8px;
    right: 9px;
    color: #c5c5c5;
    cursor: pointer;

    &:hover {
        color: #767676;
    }
`;

const CustomInput = styled.input`
    &:focus {
        border-color: #77112557;
    }
`;

const Line = styled.div`
    height: 0.1px;
    width: 100%;
    background: #c5c5c5;
    margin: 2rem 0rem 2rem 0rem;
`;

const Small = styled.small`
    position: absolute;
    width: 100px;
    border-radius: 50%;
    height: 100px;
    top: -70px;
    right: 50%;
    transform: translateX(50%);
    background: rgba(0,0,0,0.35);
    border: 1px solid #77112557;
    cursor: pointer;
`;

const iconStyle = {
    position: 'absolute',
    bottom: '40px',
    right: '36px',
    color: '#eee',
    fontSize: '1.2rem',
    zIndex: 10,
};

const Profile = ({ user }) => {
    const [displayName, setDisplayName] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState({ isChanged: false, url: '' });
    const [showCurrentPass, setShowCurrentPass] = React.useState(false);
    const [showNewPass, setShowNewPass] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState(null);

    const handleToggleShowCurrent = () => setShowCurrentPass(!showCurrentPass);

    const handleToggleShowNew = () => setShowNewPass(!showNewPass);

    const handleChangeName = (event) => {
        event.persist();
        setDisplayName(event.target.value);
    }

    const handlePasswordChangeCurrent = (event) => {
        event.persist();
        setPassword(event.target.value);
    }

    const handlePasswordChangeNew = (event) => {
        event.persist();
        setNewPassword(event.target.value);
    }

    
    const handleFileChange = (event) => {
        event.persist();

        const regex = new RegExp(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i);
    
        const { files } = event.target;
        
        if (!regex.test(files[0].name)) {
            const message = `<span class="icon mdi mdi-shield-alert"></span> Not an image.`
            bulmaToast.toast({
                message,
                type: 'is-grey',
                duration: 2000,
                position: 'top-center',
            })
        } else {
            const fileReader = new FileReader();

            fileReader.readAsDataURL(files[0]);
            fileReader.onloadend = (event) => {
                setImageUrl(({
                    isChanged: true,
                    url: event.target.result,
                }))
            };
            setSelectedFile(files[0]);
        }
    }

    const handleProfileUpdate = async () => {
        try {
            setIsLoading(true);
            
            if (!password && !password.length) {
                if (imageUrl.isChanged) {
                    const fileName = DT.local().toMillis();
                    const splitName = selectedFile.name.split('.');
                    const getTheLength = splitName.length;

                    const storageRef = storage.ref(`/profiles/${fileName}.${splitName[getTheLength - 1]}`);
                    const uploadTaker = storageRef.put(selectedFile);

                    uploadTaker.on(
                        'state_changed',
                        () => {},
                        () => {},
                        async () => {
                            const fileUrl = await uploadTaker.snapshot.ref.getDownloadURL().then(url => url);
                            auth.currentUser.updateProfile({
                                photoURL: fileUrl,
                            })
                        }
                    )
                }

                await auth.currentUser.updateProfile({ displayName });
                const message = `<span class="icon mdi mdi-check"></span> Updated Succesfully.`
                setPassword('');
                setNewPassword('');
                bulmaToast.toast({
                    message,
                    type: 'is-success',
                    duration: 2000,
                    position: 'top-center',
                });
                setIsLoading(false);
            } else {
                if (imageUrl.isChanged) {
                    const fileName = DT.local().toMillis;
                    const splitName = selectedFile.name.split('.');
                    const getTheLength = splitName.length;
                    const storageRef = storage.ref(`profiles/${fileName}.${splitName[getTheLength - 1]}`);
                    const uploadTaker = storageRef.put(selectedFile);

                    uploadTaker.on(
                        'state_changed',
                        () => {},
                        () => {},
                        async () => {
                            const fileUrl = await uploadTaker.snapshot.ref.getDownloadURL().then(url => url);
                            auth.currentUser.updateProfile({
                                photoURL: fileUrl,
                            })
                        }
                    )
                }

                if (password.length < 6 || newPassword.length < 6) {
                    const message = `<span class="icon mdi mdi-shield-alert"></span> Password should at least 6 characters.`
                    bulmaToast.toast({
                        message,
                        type: 'is-grey',
                        duration: 2000,
                        position: 'top-center',
                    });

                    setIsLoading(false);
                    return;
                }

                if (!newPassword) {
                    const message = `<span class="icon mdi mdi-shield-alert"></span> Please enter your new password.`
                    bulmaToast.toast({
                        message,
                        type: 'is-grey',
                        duration: 2000,
                        position: 'top-center',
                    });

                    setIsLoading(false);
                    return;
                }
                const emailCredentials = firebase.auth.EmailAuthProvider.credential(auth.currentUser.email, password);
                const response = await auth.currentUser.reauthenticateWithCredential(emailCredentials);
                
                if (response) {
                    await auth.currentUser.updateProfile({ displayName });
                    await auth.currentUser.updatePassword(newPassword);
                    setPassword('');
                    setNewPassword('');
                    const message = `<span class="icon mdi mdi-check"></span> Updated Succesfully.`
                    bulmaToast.toast({
                        message,
                        type: 'is-success',
                        duration: 2000,
                        position: 'top-center',
                    });
                    setIsLoading(false);
                }
            }
        } catch (error) {
            const message = `<span class="icon mdi mdi-shield-alert"></span> ${error.message}`
            bulmaToast.toast({
                message,
                type: 'is-grey',
                duration: 2000,
                position: 'top-center',
            });
            setIsLoading(false);
        }
    }

    React.useEffect(() => {
        if (user) {
            setDisplayName(user.displayName);
            setImageUrl(prev => ({ ...prev, url: user.photoURL }))
        } else {
            setDisplayName('')
        }
    }, [user]);

    return (
        <React.Fragment>
            <Navbar user={user} navigation={(
                <React.Fragment>
                    <Icon className="mdi-arrow-left" /> <p>GO BACK</p>
                </React.Fragment>
            )} url="/dashboard" />
            <Div1>
                <Div2>
                    <Card>
                        <div style={{ position: 'relative', marginLeft: '50%', transform: 'translateX(-50%)' }}>
                            {imageUrl.url && 
                                <React.Fragment>
                                    <Image src={imageUrl.url} />
                                    <Small onClick={() => {
                                            const file = document.getElementById('profile_img');
                                            file.click();
                                        }}>
                                        <Icon htmlFor="profile_img" className="mdi-pencil" style={iconStyle} />
                                    </Small>
                                    <input id="profile_img" type="file" style={{ display: 'none' }} onChange={handleFileChange} />
                                </React.Fragment>
                            }
                        </div>
                        <div style={{ marginTop: '3rem' }}>
                            <div className="field">
                            <label className="label">Name</label>
                                <div className="control has-icons-left has-icons-right">
                                    <div className="control">
                                        <CustomInput className="input" type="text" placeholder="Name" value={displayName} onChange={handleChangeName} />
                                    </div>
                                    <span className="icon is-small is-left">
                                        <Icon className="mdi-account"/>
                                    </span>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control has-icons-left">
                                    <div className="control">
                                        <CustomInput className="input" type="email" placeholder="Email" defaultValue={user && user.email} readOnly/>
                                    </div>
                                    <span className="icon is-small is-left">
                                        <Icon className="mdi-email"/>
                                    </span>
                                </div>
                            </div>
                            <Line />
                            <div className="field">
                                <label className="label">Current Password</label>
                                <div style={{ position: 'relative' }}>
                                    <div className="control has-icons-left has-icons-right">
                                        <div className="control">
                                            <CustomInput 
                                                className="input" 
                                                type={showCurrentPass ? 'text' : 'password'} 
                                                placeholder="Current Password" 
                                                readOnly={isLoading}
                                                value={password}
                                                onChange={handlePasswordChangeCurrent}
                                            />
                                        </div>
                                        <span className="icon is-small is-left">
                                            <Icon className="mdi-lock"/>
                                        </span>
                                    </div>
                                    <IconRight className="icon is-small is-right" onClick={handleToggleShowCurrent}>
                                        {showCurrentPass ? (
                                                <Icon className="mdi-eye"/>
                                        ): (
                                                <Icon className="mdi-eye-off"/>
                                        )}
                                    </IconRight>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">New Password</label>
                                <div style={{ position: 'relative' }}>
                                    <div className="control has-icons-left has-icons-right">
                                        <div className="control">
                                            <CustomInput 
                                                className="input" 
                                                type={showNewPass ? 'text' : 'password'} 
                                                placeholder="New Password" 
                                                readOnly={isLoading}
                                                value={newPassword}
                                                onChange={handlePasswordChangeNew}
                                            />
                                        </div>
                                        <span className="icon is-small is-left">
                                            <Icon className="mdi-lock"/>
                                        </span>
                                    </div>
                                    <IconRight className="icon is-small is-right" onClick={handleToggleShowNew}>
                                        {showNewPass ? (
                                                <Icon className="mdi-eye"/>
                                        ): (
                                                <Icon className="mdi-eye-off"/>
                                        )}
                                    </IconRight>
                                </div>
                            </div>
                            <div className="field" style={{ marginTop: '1.2rem'}}>
                                <Button className="is-fullwidth is-warning" onClick={handleProfileUpdate}>{isLoading ? 'UPDATING...' : 'UPDATE'}</Button>
                            </div>
                        </div>
                    </Card>
                </Div2>
            </Div1>
            <Footer />
        </React.Fragment>
    )
}

export default Profile;