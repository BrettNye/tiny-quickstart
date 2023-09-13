require("dotenv").config();
const express = require('express');
const router = express.Router();
const session = require("express-session");

router.use(session({secret: process.env.SUPER_SECRET_HASH_KEY, saveUninitialized:true, resave:true}))

const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
const plaidConfig = {
    basePath: PlaidEnvironments[process.env.PLAID_ENV],
    baseOptions: {
      headers: {
        "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
        "PLAID-SECRET": process.env.PLAID_SECRET,
        "Plaid-Version": "2020-09-14",
      },
    }   
}

const client = new PlaidApi(plaidConfig);

//Create Link Token
router.get("/create_link_token", async (req, res, next) => {
    const tokenResponse = await client.linkTokenCreate({
      user: { client_user_id: req.sessionID },
      client_name: "Plaid's Tiny Quickstart",
      language: "en",
      products: ["auth"],
      country_codes: ["US"],
      redirect_uri: process.env.PLAID_SANDBOX_REDIRECT_URI,
    });

    res.json(tokenResponse.data);
  });

  //Balance Data
  router.get("/balance", async (req, res, next) => {
    const access_token = req.session.access_token;
    const balanceResponse = await client.accountsBalanceGet({ access_token });
    res.json({
      Balance: balanceResponse.data,
    });
  }); 

  // Checks whether the user's account is connected, called
  // in index.html when redirected from oauth.html
  router.get("/api/is_account_connected", async (req, res, next) => {
    return (req.session.access_token ? res.json({ status: true }) : res.json({ status: false}));
  });


//Exchange Link Token
router.post("/exchange_public_token", async (req, res, next) => {
  console.log(req.body.metadata)
  const exchangeResponse = await client.itemPublicTokenExchange({
    public_token: req.body.public_token,
  });

  // FOR DEMO PURPOSES ONLY
  // Store access_token in DB instead of session storage
  req.session.other_info = req.body.metadata
  req.session.access_token = exchangeResponse.data.access_token;
  res.json(true);
});

module.exports = router;