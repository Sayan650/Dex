import express from "express";

const app = express();
app.use(express.json());

let ETH_BALANCE = 200;
let USDC_BALANCE = 700000;
const product = ETH_BALANCE * USDC_BALANCE;


app.post("/buy-assets", (req, res) => {
    const quantity = req.body.quantity;
    const updatedEthQuantity = ETH_BALANCE - quantity;
    const updatedUsdcBalance = product / updatedEthQuantity;
    const paidAmount = updatedUsdcBalance - USDC_BALANCE;

    ETH_BALANCE = updatedEthQuantity;
    USDC_BALANCE = updatedUsdcBalance;

    res.json({
        message: `You paid ${paidAmount} USDC for ${quantity} ETH`
    });
})

app.post("/sell-assets", (req, res) => {
    const quantity = req.body.quantity;
    const updatedEthQuantity = ETH_BALANCE + quantity;
    const updatedUsdcBalance = product / updatedEthQuantity;
    const gottenUsdc = USDC_BALANCE - updatedUsdcBalance;

    ETH_BALANCE = updatedEthQuantity;
    USDC_BALANCE = updatedUsdcBalance;

    res.json({
        message: `You paid ${gottenUsdc} USDC for ${quantity} ETH`
    });
})

app.listen(3000)