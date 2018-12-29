export default {
  Nav: {
    Button: {
      Invest: '我要做庄',
      Introduction: '游戏介绍',
    },

    Lang: {
      zh: "简体中文",
      en: "English",
    },
  },

  Contract: {
    Info: {
      102: '转入ONG失败，请调整投资金额！',
      202: '提取分红收益失败！',
      302: '提取运营收益失败！',
      603: '本轮游戏结束，请等待下一轮游戏开始再进行投注。',
      604: '运行池没有足够的资产支付给您，无法进行游戏，请尝试更小的赌注。',
      605: '投注交易失败，请重新尝试。',
      10002: '未知错误',
    }
  },

  Wallet: {
    Info: {
      InstallBrowser: `请安装<a target="_blank" href="https://www.google.com/chrome/">Chrome</a>，并安装浏览器钱包插件<a target="_blank" href="https://chrome.google.com/webstore/detail/cyano-wallet/dkdedlpgdmmkkfjabffeganieamfklkm">Cyano wallet</a>以进行游戏`,
      InstallExtension: `请安装<a target="_blank" href="https://chrome.google.com/webstore/detail/cyano-wallet/dkdedlpgdmmkkfjabffeganieamfklkm">Cyano wallet</a>钱包插件以进行游戏`,
      NeedLogin: `请登录Cyano wallet钱包以进行游戏`,
      NeedMainNet: `ONG Roll 目前仅支持主网游戏，请在浏览器插件Cyano wallet中切换到主网以进行游戏`,
      LoadGameFailed: `载入游戏环境失败，请重启浏览器`,
    }
  },

  Roll:{
    Title: {
      RollUnder: '小于该数获胜',
      Odds: '赔率',
      WinningChance: '获奖概率',
      AutoBet: '自动投注 {state}',
      AutoBetFire: '投注中',
    },

    Button: {
      Min: '最小',
      Max: '最大',
      Bet: '下注',
      PlayAgain: '再玩一次',
    },

    Info: {
      Payout: '你将赢得 {willWin} ONG',
      WaitingPlayerPay: "等待签名和游戏执行",
      PlayerReject: "您拒绝了此次游戏",

      RoundEnded: "本轮游戏结束，请等待下一轮游戏开始再进行投注。",
      BetTransferFailed: "投注交易失败，请重新尝试。",
      PoorPool: "运行池没有足够的资产支付给您，无法进行游戏，请尝试更小的赌注。",

      PlayerWin: " {result} {condition} {rollUnder}。你赢了 {winAmount} ONG！",
      PlayerLose: "{result} {condition} {rollUnder}，你输了。 ",
    }
  },

  History: {
    Title: {
      History: '最近游戏结果',
      MyHistory: '我的游戏历史',
      LastOneHours: '1小时排行榜',
      Time: '时间',
      Player: '玩家',
      Amount: '数额',
      Rank: '排名',
      RollUnder: '小于此数获胜',
      BetAmount: '投注 ONG 数额',
      Result: '结果',
      Rewards: '获得奖励',
      RecentWithdraw: '最近收益提取',
      RecentInvest: '最近投资记录',

      WithdrawType: '提现类型',
    }
  },

  Banker: {
    Title: {
      CurrentIncome: '当前收益总额',
      DividendIncome: '分红收益',
      EarningIncome: '运营收益',
      Principal: '运营本金',
      TotalAmount: '可提取资金合计',
      CurrentInvest: '当前投资',
      InvestAmount: '投资金额',

      WithdrawDividend: '分红收益',
      WithdrawEarning: '运营收益',
      WithdrawExit: '退庄',
    },

    Button: {
      WithdrawIncome: '提取收益',
      WithdrawAndExit: '我要退庄',
      InvestIn: '进行投资',
      Ok: '确定',
    },

    Info: {
      InvestSuccess: '您成功投资了 {investAmount} ONG',
      InvestAmountInvalid: '无效的数字',
      InvestFailed: '调用合约失败!',
      WithdrawInfo: '签名并提取收益。',
      WithdrawSuccess: '您成功提取了 {withdrawAmount} ONG !',
      WithdrawFailed: '暂时没有可以提取的收益!',
      ExitSuccess: '退庄成功！已提取投资本金收益合计 {all} ONG！',
      ExitFailed: '您尚未投资以成为庄家',

      InvestError: '最低投资不能少于 1000 ONG',
      CurrentRound: '正在进行第 <span>{round}</span> 轮游戏',
      GamePollBalance: '游戏运营池余额 <span>{balance}</span> ONG',
      AllInvestInfo: '当前轮有<span>{bankerCount}</span> 位庄家共投资了 <span>{investAmount}</span> ONG',
    }
  },

  Announcement: {
    Title: '公告',
    Content: '我们现在将庄家分红奖励从50%调整到了8%。'
  },

  StepByStep: [
    '在Wontology平台上，您可以直接玩儿roll游戏或者投资一些ONG成为庄家。我们先来看看庄家的相关操作。',
    '点击"我要做庄"按钮可以跳转到庄家页面。',
    '点击"进行投资"按钮，可以投资ONG成为庄家。最低投资额为1000ONG。',
    '点击"提取收益"按钮，可以将您当前的收益提取到您的钱包。',
    '点击"我要退庄"按钮，会将您所有的收益和本金提取到您的钱包。完成这个操作之后，您将不在是庄家。',
    '现在我们看一下如何进行游戏。',
    '拖动滑块设置您下注的数字。',
    '输入您的下注金额。',
    '点击"下注"就可以进行一次游戏了。',
    '如果合约计算的随机数比您下注的数字小，您就赢了！',
    '更详细的规则请点击"游戏介绍"。',
  ],

  Description: {
    Title: "怎么玩",
    ContentMarkdown:
      `## 基本规则

Ong Bet是运行在Ontology公链上的去中心化、可信的区块链游戏。Ong Bet的基本规则如下：

1. 这是一个“摇骰子”比大小的游戏，骰子点数根据下注当时Ontology主链当前区块hash生成；

2. 游戏由平台运营、游戏庄家、游戏玩家组成；

3. 庄家玩法

   1. 庄家投资坐庄。

   2. 投资逻辑

      | 运营成本 | 庄家激励  |游戏运营池|
      | -------- | -------- | ------ |
      | 2%       | 8%      | 90%    |

   3. 庄家投资的2%将作为运营成本。
   4. 庄家投资的8%将分给之前所有的庄家作为庄家激励，鼓励庄家尽早坐庄。
   5. 庄家投资的90%将用作游戏运营。游戏运营的利润立即分给所有庄家，直至当前游戏运营池小于所有庄家投资进入游戏运营池总额的10%，则本轮游戏结束，同时游戏运营池的剩余资金将按比例分给所有庄家。
   当有新庄进入游戏坐庄时，游戏进入下一轮。

4. 玩家玩法

   1. 玩家选择金额和数字下注，下注根据当轮区块hash所生成的“骰子”数 **小于** 玩家数字即根据下注金额获得对应赔率的回报；

   2. 游戏玩家随时下注，即时（当轮出块区块）获得当轮骰子结果，即时获得回报；

   3. 骰子点数范围1-100；

   4. 下注范围2-96；

   5. 中奖（获胜）概率1%-95%。`,
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






















