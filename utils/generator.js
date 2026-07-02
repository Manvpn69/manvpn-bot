const fs = require("fs");

exports.generate = (name, uuid, domain) => {

    const setups = JSON.parse(fs.readFileSync("./setup.json"));

    let output = "";

    output += "━━━━━━━━━━━━━━━━━━━━━━\n";
    output += "🚀 MANVPN CONFIG\n\n";
    output += `👤 Name : ${name}\n`;
    output += `🌐 Server : ${domain}\n`;
    output += "━━━━━━━━━━━━━━━━━━━━━━\n\n";

    setups.forEach((item) => {

        let config = item.template;

        config = config.replace(/UUID/g, uuid);
        config = config.replace(/NAMA/g, name);
        config = config.replace(/DOMAIN/g, domain);

        output += `${item.name}\n\n`;
        output += "```text\n";
        output += config;
        output += "\n```\n\n";

    });

    return output;

};
