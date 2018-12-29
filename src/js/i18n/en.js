export default {
  Nav: {
    Button: {
      Invest: 'Become banker',
      Introduction: 'How to play',
    },

    Lang: {
      zh: "简体中文",
      en: "English",
    },
  },

  Contract: {
    Info: {
      102: 'Transfer ONG to contract failed!',
      202: 'Withdraw dividend failed!',
      302: 'Withdraw earning failed!',
      603: 'Current round game ended, please wait for the starting of the next round game and try later.',
      604: 'Running pool does not have enough asset to pay the bet, please try smaller bet.',
      605: 'Bet transfer failed, please try again.',
      10002: 'Unknown error occurred',
    }
  },

  Wallet: {
    Info: {
      InstallBrowser: `Please <a target="_blank" href="https://www.google.com/chrome/">Chrome</a> and the extension <a target="_blank" href="https://chrome.google.com/webstore/detail/cyano-wallet/dkdedlpgdmmkkfjabffeganieamfklkm">Cyano wallet</a>`,
      InstallExtension: `Please install extension <a target="_blank" href="https://chrome.google.com/webstore/detail/cyano-wallet/dkdedlpgdmmkkfjabffeganieamfklkm">Cyano wallet</a> to play the game`,
      NeedLogin: `Please login Cyano wallet to play the game`,
      NeedMainNet: `ONG Roll only support ONT main net, please switch to main net in Cyano wallet`,
      LoadGameFailed: `Load game failed, please restart your browser`,
    }
  },

  Roll:{
    Title: {
      RollUnder: 'Roll under',
      Odds: 'Betting odds',
      WinningChance: 'Winning chance',
      AutoBet: 'Auto bet {state}',
      AutoBetFire: 'Betting',
    },

    Button: {
      Min: 'MIN',
      Max: 'MAX',
      Bet: 'BET',
      PlayAgain: 'PlayAgain',
    },

    Info: {
      Payout: 'You will win {willWin} ONG',
      WaitingPlayerPay: "Waiting for signature and game running",
      PlayerReject: "You reject the game",

      RoundEnded: "Current round game ended, please wait for the starting of the next round game and try later.",
      BetTransferFailed: "Bet transfer failed, please try again.",
      PoorPool: "Running pool does not have enough asset to pay the bet, please try smaller bet.",

      PlayerWin: " {result} {condition} {rollUnder}! You won {winAmount} ONG!",
      PlayerLose: "{result} {condition} {rollUnder}, you lose. ",
    }
  },

  History: {
    Title: {
      History: 'Recent game results',
      MyHistory: 'My game history',
      LastOneHours: '1 hour rank list',
      Time: 'Time',
      Player: 'Player',
      Amount: 'Amount',
      Rank: 'Rank',
      RollUnder: 'Roll under',
      BetAmount: 'Bet amount',
      Result: 'Result',
      Rewards: 'Rewards',
      RecentWithdraw: 'Recent withdraw',
      RecentInvest: 'Recent invest',

      WithdrawType: 'Withdraw type',
    }
  },

  Banker: {
    Title: {
      CurrentIncome: 'Current total income',
      DividendIncome: 'Dividend income',
      EarningIncome: 'Earning income',
      Principal: 'Principal',
      TotalAmount: 'Total available funds',
      CurrentInvest: 'Current invest',
      InvestAmount: 'Amount you want invest',

      WithdrawDividend: 'Dividend',
      WithdrawEarning: 'Earning',
      WithdrawExit: 'Exit',
    },

    Button: {
      WithdrawIncome: 'WITHDRAW',
      WithdrawAndExit: 'EXIT INVESTMENT',
      InvestIn: 'INVEST IN',
      Ok: 'OK',
    },

    Info: {
      InvestSuccess: 'Successfully invested {investAmount} ONG.',
      InvestAmountInvalid: 'Invalid invest amount',
      InvestFailed: 'Invoke invest contract failed!',
      WithdrawInfo: 'Signing and withdrawing profits',
      WithdrawSuccess: 'Successfully withdrawn {withdrawAmount} ONG !',
      WithdrawFailed: 'There is no profits that can be withdraw currently.',
      ExitSuccess: 'Successfully exited. You are no longer a banker. {all} ONG include profit and principal was transferred to your wallet',
      ExitFailed: 'You must become a banker first.',

      InvestError: 'The minimum investment is no less than 1000 ONG',
      CurrentRound: 'Current round <span>{round}</span>',
      GamePollBalance: 'Game pool balance <span>{balance}</span> ONG',
      AllInvestInfo: 'We have invested <span>{investAmount}</span> ONG in total by <span>{bankerCount}</span> bankers.',
    }
  },

  Announcement: {
    Title: 'Announcement',
    Content: 'We adjust banker incentives from 50% to 8% now.'
  },

  StepByStep: [
    'On Wontology you can play the roll game or invest some ONG to become a banker. Let us see how operations of banker first.',
    'Click "BANKER" button will lead you to banker page.',
    'Click "INVEST IN" button to invest. Min amount of investment is 1000 ONG.',
    'Click "WITHDRAW" button to withdraw your profit.',
    'Click "EXIT INVESTMENT" button to withdraw all your profit and principal. After this operation you will be no longer a banker.',
    'Now let us see how to play the game.',
    'Drag the slider to set your "number".',
    'Input how much ONG you want to bet.',
    'Click "BET" button to start game.',
    'If the random number calculated by contract is under your "number", you win!',
    'Click "HOW TO PLAY" to get more rule details of Wontology.'
  ],

  Description: {
    Title: "How to play",
    ContentMarkdown:
      `## Basic Rules

Wontology is the decentralized and trustful blockchain game based on the Ontology public chain network. The basic rules of Wontology are the followings.

1. This is a game of rolling a 'dice' that is assumed to have 100 sides and comparing the result with your guessed number.
   The result of rolling the 'dice' is determined by the current block hash of Ontology chain and the transaction hash.

2. The Wontology game is composed of the platform, the bankers and the players.

3. How to play for the bankers?

   1. The banker should invest at least 1000 ONG to become a banker.

   2. The flow of bankers' investment.

      | Service Fee | Banker Incentives  | Running Vault |
      | -------- | -------- | ------ |
      | 2%       | 8%      | 90%    |

   3. The profit of the platform will be given to all the bankers. The current round game will end until the real time running vault 
      is less than 10% of the asset that flowed into the running vault, then the rest asset in running vault will be be assigned to all the bankers.
      When the new bankers enter, the next round will start automatically.


4. How to play for the players?

   1. The player can set the amount of wager and the guessed number. The odds will change based on the guessed number, and the same for the winning chance.
      If the result of rolling the dice is **smaller** than the player's guessed number, the player will be able to win the odds times of his wager. Otherwise, he will lose his wager.

   2. The player can bet anytime and get the betting result immediately. And the profit is transferred to the player's account immediately.

   3. The dice is assumed to have 100 sides, and the number of one side is in the range of 1 to 100.

   4. The betting (guessed) number for the player is in the range of 2 to 96.

   5. The winning chance for player is the range of 1% to 95%.`,
  },

  Footer: {
    Declaration: `
<div>Please arrange your time reasonably, and do not over-indulge.</div>

<div>If you reside in a location where lottery, gambling, sports betting or betting over the internet is illegal, please do not click on anything related to these activities on this site. 
You must be 21 years of age to click on any betting or gambling related items even if it is legal to do so in your location. 
Recognising that the laws and regulations involving online gaming are different everywhere, readers are advised to check with the laws that exist within their own jurisdiction to ascertain the legality of the activities which are covered.</div>

<div>The games provided by Wontology are based on blockchain, fair and transparent. 
When you start playing these games, please note that online gambling and lottery is an entertainment vehicle and that it carries with it a certain degree of financial risk. Players should be aware of this risk, and govern themselves accordingly.</div>
    `
  }
}






















