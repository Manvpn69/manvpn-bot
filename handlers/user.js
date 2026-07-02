const generator = require("../utils/generator");

exports.start = async (ctx) => {

    const id = ctx.from.id;

    sessions[id].step = "password";

    await ctx.reply("🔑 Enter User Password");

};

exports.handle = async (ctx) => {

    const id = ctx.from.id;
    const text = ctx.message.text.trim();

    switch (sessions[id].step) {

        case "password":

            if (text !== process.env.USER_PASSWORD)
                return ctx.reply("❌ Wrong Password");

            sessions[id].step = "name";

            return ctx.reply("👤 Enter Name");

        case "name":

            sessions[id].name = text;
            sessions[id].step = "uuid";

            return ctx.reply("🆔 Enter UUID");

        case "uuid":

            sessions[id].uuid = text;
            sessions[id].step = "server";

            return ctx.reply(
`🌍 Select Server

1
Shinjiru

2
SGMY

Reply:
1
or
2`
            );

        case "server":

            if (text == "1")
                sessions[id].domain = "shin.manvpn.qzz.io";

            else if (text == "2")
                sessions[id].domain = "sgmy.manvpn.qzz.io";

            else
                return ctx.reply("Reply 1 or 2");

            const output = generator.generate(
                sessions[id].name,
                sessions[id].uuid,
                sessions[id].domain
            );

            sessions[id] = {
                mode: "user"
            };

            return ctx.reply(output);

        default:

            sessions[id].step = "password";

            return ctx.reply("Restarting...");
    }

};
