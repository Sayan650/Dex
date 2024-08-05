"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
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
});
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
});
app.listen(3000);
