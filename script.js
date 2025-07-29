// ✅ FIXED: script.js file should NOT be loaded directly in browser as ES module unless index.html is setup for it.
// Let's rewrite your script.js for compatibility with normal HTML <script> tag.

// ✅ Include ethers via <script> tag in HTML instead of import here

let signer;
let contract;

// ✅ Replace with your deployed contract address
const contractAddress = "0xD3906A5d6B2a4912F116F5e342a8428804829871";

// ✅ Replace with your contract ABI
const abi = [
  {
    "inputs": [],
    "name": "claim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      contract = new ethers.Contract(contractAddress, abi, signer);
      alert("✅ Wallet connected!");
    } catch (err) {
      console.error(err);
      alert("❌ Wallet connection failed.");
    }
  } else {
    alert("❌ MetaMask is not installed.");
  }
}

async function claimTokens() {
  if (!contract) {
    alert("⚠️ Please connect your wallet first.");
    return;
  }

  try {
    const tx = await contract.claim({ gasLimit: 100000 });
    alert("⏳ Claim transaction sent. Waiting for confirmation...");
    await tx.wait();
    alert("✅ Tokens claimed successfully!");
  } catch (err) {
    console.error(err);
    alert("❌ Claim failed.");
  }
}

// Attach functions to buttons
document.getElementById("connectButton").addEventListener("click", connectWallet);
document.getElementById("claimButton").addEventListener("click", claimTokens);
