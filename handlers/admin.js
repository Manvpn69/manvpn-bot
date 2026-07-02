const fs = require("fs");

exports.start = async (ctx) => {

    const id = ctx.from.id;

    sessions[id].step = "admin_password";

    await ctx.reply("🔑 Enter Admin Password");

};

exports.handle = async (ctx) => {

    const id = ctx.from.id;
    const text = ctx.message.text.trim();

    switch (sessions[id].step) {

        case "admin_password":

            if (text !== process.env.ADMIN_PASSWORD)
                return ctx.reply("❌ Wrong Password");

            sessions[id].step = "menu";

            return ctx.reply(
`ADMIN PANEL

/list
/add
/delete`
            );

        case "menu":

            if (text == "/list") {

                const data = JSON.parse(fs.readFileSync("./setup.json"));

                let msg = "";

                data.forEach((x,i)=>{

                    msg += `${i+1}. ${x.name}\n`;

                });

                return ctx.reply(msg);

            }

            return ctx.reply("Coming Soon");

    }

};
