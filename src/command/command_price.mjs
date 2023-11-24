import { getAyinTokensPrice, warningAyin } from './ayin/ayin.mjs'
import { tokens } from "./ayin/tokens.mjs";
import { deleteOrSendPrice, getCoinData } from "./price/price.mjs";

export const command_price = async (ctx) => {
  let [tokenOption, ...rest] = ctx.message.text.split(" ").slice(1);
  const tokenSet = new Set(tokens.map((t) => t.symbol));
  let data;
  if (tokenOption) {
    tokenOption = tokenOption.toUpperCase();
    if (!tokenSet.has(tokenOption) && tokenOption !== "ALL") 
      data = warningAyin;
    else {
      data = await getAyinTokensPrice(
        tokenOption === "ALL" ? "all" : tokens.find((t) => t.symbol === tokenOption)
      );
    }
  } else
    data = await getCoinData();
  await deleteOrSendPrice(data, ctx);
};