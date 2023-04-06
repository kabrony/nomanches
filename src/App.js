// src/App.js
import React, { useState } from 'react';
import { useEthereumConnection } from './useEthereumConnection';
import { Container, Box, Button, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import TokenBalance from './TokenBalance';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#F7F8FA',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
});

function App() {
  const classes = useStyles();
  const { ens, web3Provider, connectWallet } = useEthereumConnection();
  const [userAddress, setUserAddress] = useState('');
  const [ensName, setEnsName] = useState('');
  const [resolvedAddress, setResolvedAddress] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');

  const fetchUserAddress = async () => {
    if (!web3Provider) return;
    const signer = web3Provider.getSigner();
    const address = await signer.getAddress();
    setUserAddress(address);
  };

  const resolveENS = async () => {
    if (!ens || !ensName) return;
    const resolved = await ens.name(ensName).getAddress();
    setResolvedAddress(resolved);
  };

  const handleENSNameChange = (e) => {
    setEnsName(e.target.value);
  };

  const handleTokenAddressChange = (e) => {
    setTokenAddress(e.target.value);
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Box className={classes.form}>
        <Button variant="contained" color="primary" onClick={connectWallet}>
          Connect Wallet
        </Button>
        {web3Provider && (
          <>
            <Button variant="contained" color="secondary" onClick={fetchUserAddress}>
              Get User Address
            </Button>
            {userAddress && <Typography>User address: {userAddress}</Typography>}
          </>
        )}
      </Box>
      <Box className={classes.form}>
        <TextField
          label="Enter ENS name"
          variant="outlined"
          value={ensName}
          onChange={handleENSNameChange}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={resolveENS}>
          Resolve ENS
        </Button>
      </Box>
      {resolvedAddress && <Typography>Resolved address: {resolvedAddress}</Typography>}
      <Box className={classes.form}>
        <TextField
          label="Enter Token Address"
          variant="outlined"
          value={tokenAddress}
          onChange={handleTokenAddressChange}
          fullWidth
        />
      </Box>
      {userAddress && tokenAddress && (
        <TokenBalance provider={web3Provider} userAddress={userAddress} tokenAddress={tokenAddress} />
      )}
    </Container>
  );
}

export default App;
