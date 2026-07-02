require("dotenv").config();

const { Telegraf } = require("telegraf");

const user = require("./handlers/user");
const admin = require("./handlers/admin");

const bot = new Telegraf(process.env.BOT_TOKEN);

global.sessions = {};

bot.start(async (ctx) => {
  sessions[ctx.from.id] = {};

  await ctx.reply(
`🚀 MANVPN CONFIG GENERATOR

Reply salah satu:

user
admin`
  );
});

bot.on("text", async (ctx) => {

  const id = ctx.from.id;

  if (!sessions[id])
      sessions[id] = {};

  const mode = sessions[id].mode;

  if (!mode) {

      const text = ctx.message.text.trim().toLowerCase();

      if (text === "user") {
          sessions[id].mode = "user";
          return user.start(ctx);
      }

      if (text === "admin") {
          sessions[id].mode = "admin";
          return admin.start(ctx);
      }

      return ctx.reply("Taip user atau admin.");
  }

  if (mode === "user")
      return user.handle(ctx);

  if (mode === "admin")
      return admin.handle(ctx);

});

bot.launch();

console.log("MANVPN BOT STARTED");
