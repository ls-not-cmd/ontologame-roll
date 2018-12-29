import {gNamespace} from "./namespace";
import Roll from "../page/games/roll";
import Banker from "../page/bankers/banker";

const gRouters = [
  {path: gNamespace.GAMES.ROLL.uri, name:gNamespace.GAMES.ROLL.name, component: Roll},
  {path: gNamespace.BANKER.uri, name:gNamespace.BANKER.name, component: Banker},
]

export {
  gRouters
}