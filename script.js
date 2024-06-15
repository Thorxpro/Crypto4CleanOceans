// script.js

// Function to check if MetaMask is installed
const isMetaMaskInstalled = () => {
    return Boolean(window.ethereum && window.ethereum.isMetaMask);
};

// Function to connect wallet
const connectWallet = async () => {
    if (isMetaMaskInstalled()) {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            document.getElementById('connect-wallet').innerText = 'Wallet Connected';
            return accounts[0];
        } catch (error) {
            console.error('User denied account access');
        }
    } else {
        alert('Please install MetaMask!');
    }
};

// Function to send a donation
const sendDonation = async (account) => {
    if (isMetaMaskInstalled()) {
        const web3 = new Web3(window.ethereum);
        try {
            const transactionParameters = {
                to: '0xYourFundraiserWalletAddress', // Replace with your fundraiser's wallet address
                from: account,
                value: web3.utils.toHex(web3.utils.toWei('0.01', 'ether')), // Donation amount
            };
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
            alert('Thank you for your donation!');
        } catch (error) {
            console.error('Transaction failed', error);
        }
    } else {
        alert('Please install MetaMask!');
    }
};

// Event listeners
document.getElementById('connect-wallet').addEventListener('click', connectWallet);

document.getElementById('donate-now').addEventListener('click', async () => {
    const account = await connectWallet();
    if (account) {
        await sendDonation(account);
    }
});
