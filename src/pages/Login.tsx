import React, { useState, useEffect } from 'react';
import { checkUser } from '../server/app';
import { emailValidation } from '../validation/userValidation';
import { useNavigate } from 'react-router-dom';
import { gapi } from 'gapi-script';
import GoogleLoginButton from '../components/GoogleLoginButton';
// import { userAtom } from '../redux/atoms';
// import { useAtom } from 'jotai';
import { Container, Box, Typography, TextField, Button, CircularProgress, Divider } from '@mui/material';
import { purple } from '@mui/material/colors';

const Login: React.FC = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const start = () => {
            gapi.client.init({
                clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                scope: 'email',
            }).then(() => {
                console.log("GAPI client initialized.");
            }).catch((error: any) => {
                console.error("Error initializing GAPI client:", error);
            });
        };
        gapi.load('client:auth2', start);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const email = user.email;
        const password = user.password;

        if (!emailValidation.pattern.value.test(email)) {
            setError(emailValidation.pattern.message);
            setLoading(false);
            return;
        }

        try {
            const result = await checkUser({ email, password });

            if (result.exists) {
                localStorage.setItem('email', email);
                navigate('/aboutus');
            } else {
                setError('Email not found.');
            }
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                setError('Email not found.');
            } else {
                console.error('Error checking email:', error);
                setError('Failed to check email. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: `url('../../bg.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
        }}>
            <Container maxWidth="sm">
                <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 3, boxShadow: 3, width: '100%', textAlign: 'center', opacity: 0.9 }}>
                    <Typography variant="h3" fontWeight="bold" color={purple[700]} gutterBottom>
                        takeIt
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            type="email"
                            label="Email Address"
                            variant="outlined"
                            margin="normal"
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            error={!!error}
                            helperText={error}
                        />
                        <TextField
                            fullWidth
                            type="password"
                            label="Password"
                            variant="outlined"
                            margin="normal"
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2, py: 1.5, fontSize: '1rem' }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Send Verification Code'}
                        </Button>
                    </form>
                    <Divider sx={{ my: 3 }}>or</Divider>
                    <GoogleLoginButton />
                </Box>
            </Container>
        </Box>
    );
};

export default Login;
