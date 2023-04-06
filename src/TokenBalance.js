// src/TokenBalance.js
import React, { useState, useEffect } from 'react';
import { ethers, Contract } from 'ethers';
import { Box, Typography } from '@mui/material';

const ERC20_ABI = [
  // Some methods from the ERC20 ABI
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
];

function TokenBalance({ provider, userAddress, tokenAddress }) {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchTokenBalance = async () => {
      if (!provider || !userAddress || !tokenAddress) return;

      const contract = new Contract(tokenAddress, ERC20_ABI, provider);
      const userBalance = await contract.balanceOf(userAddress);
      setBalance(ethers.utils.formatEther(userBalance));
    };

    fetchTokenBalance();
  }, [provider, userAddress, tokenAddress]);

  if (balance === null) {
    return <Typography>Loading balance...</Typography>;
  }

  return (
    <Box>
      <Typography>Token balance: {balance}</Typography>
    </Box>
  );
}

export default TokenBalance;
