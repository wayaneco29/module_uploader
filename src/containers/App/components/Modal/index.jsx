import React from 'react';
import * as bulmaToast from 'bulma-toast';
import { useHistory } from 'react-router-dom';
import { auth } from '../../../../firebase';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Modal, { Action, Content } from '../../../../components/Modal';

const LoginModal = ({ isOpen, closeModal, ...props }) => {
    const history = useHistory();

    const [loading, setLoading] = React.useState(false);
    const [credentials, setCredentials] = React.useState({ email: '', password: '' });

    const handleOnChange = (event) => {
        event.persist();
        
        const { name, value } = event.target;

        setCredentials((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleLogin = async () => {
        try {
            setLoading(true);
            const { email, password } = credentials;
            await auth.signInWithEmailAndPassword(email, password);
            history.push('/dashboard');
            setLoading(false);
        } catch (error) {
            const message = `<span class="icon mdi mdi-close"></span> ${error.message}`
            bulmaToast.toast({
                message,
                type: 'is-danger',
                duration: 2000,
                dismissible: true,
                position: 'top-center',
            })
            setLoading(false);
        }
    }

    return (
        <React.Fragment>
            <Modal isOpen={isOpen} closeModal={closeModal} {...props}>
                <Content>
                    <Input hasIcon="mdi-teach" placeholder="Email" handleChange={handleOnChange} name="email" />
                    <Input hasIcon="mdi-lock" placeholder="Password" type="password" handleChange={handleOnChange} name="password" />
                </Content>
                <Action>
                    <Button onClick={handleLogin} className="is-warning" disabled={loading}>{loading ? 'SIGNING IN...' : 'SIGN IN'}</Button>
                    <Button onClick={closeModal} disabled={loading}>CLOSE</Button>
                </Action>
            </Modal>
        </React.Fragment>
    )
}

export default LoginModal;