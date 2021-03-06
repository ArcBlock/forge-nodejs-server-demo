const ForgeSDK = require('@arcblock/forge-sdk');
const env = require('../libs/env');

module.exports = {
  init(app) {
    app.get('/api/did/session', async (req, res) => {
      const { getForgeState: data } = await ForgeSDK.doRawQuery(`{
          getForgeState {
            code
            state {
              token {
                decimal
                description
                icon
                inflationRate
                initialSupply
                name
                symbol
                totalSupply
                unit
              }
              txConfig {
                poke {
                  amount
                }
              }
            }
          }
        }`);
      res.json({ user: req.user, token: data.state.token, poke: data.state.txConfig.poke });
    });

    app.post('/api/did/logout', (req, res) => {
      req.user = null;
      res.json({ user: null });
    });

    app.get('/api/env', (req, res) => {
      res.type('script');
      res.send(`window.env = ${JSON.stringify(env, null, 2)}`);
    });
  },
};
