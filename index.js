const {
Client,
GatewayIntentBits,
REST,
Routes,
SlashCommandBuilder,
ActivityType
} = require("discord.js");

const TOKEN = "const {
Client,
GatewayIntentBits,
REST,
Routes,
SlashCommandBuilder,
ActivityType
} = require("discord.js");

const TOKEN = "COLOQUE_SEU_TOKEN";
const CLIENT_ID = "ID_DO_SEU_BOT";
const GUILD_ID = "ID_DO_SERVIDOR";


const client = new Client({
intents:[
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMembers
]
});



const commands = [

new SlashCommandBuilder()
.setName("ping")
.setDescription("Mostra o ping do bot"),


new SlashCommandBuilder()
.setName("ban")
.setDescription("Bane um usuário")
.addUserOption(o =>
o.setName("usuario")
.setDescription("Usuário")
.setRequired(true))
.addStringOption(o =>
o.setName("motivo")
.setDescription("Motivo")
.setRequired(true)),


new SlashCommandBuilder()
.setName("kick")
.setDescription("Expulsa um usuário")
.addUserOption(o =>
o.setName("usuario")
.setDescription("Usuário")
.setRequired(true))
.addStringOption(o =>
o.setName("motivo")
.setDescription("Motivo")
.setRequired(true)),


new SlashCommandBuilder()
.setName("timeout")
.setDescription("Castiga um usuário")
.addUserOption(o =>
o.setName("usuario")
.setDescription("Usuário")
.setRequired(true))
.addIntegerOption(o =>
o.setName("minutos")
.setDescription("Tempo")
.setRequired(true))
.addStringOption(o =>
o.setName("motivo")
.setDescription("Motivo")
.setRequired(true))

];



const rest = new REST({
version:"10"
}).setToken(TOKEN);



async function registrar(){

await rest.put(
Routes.applicationGuildCommands(
CLIENT_ID,
GUILD_ID
),
{
body: commands
}
);

console.log("Comandos registrados!");

}


client.once("ready",()=>{

console.log(`TW ONLINE: ${client.user.tag}`);


client.user.setActivity(
"Protegendo o servidor ⚡",
{
type:ActivityType.Watching
});



});



client.on("interactionCreate", async interaction=>{


if(!interaction.isChatInputCommand()) return;



if(interaction.commandName==="ping"){

return interaction.reply(
`🏓 Pong! ${client.ws.ping}ms`
);

}



if(interaction.commandName==="ban"){


if(!interaction.member.permissions.has("BanMembers"))
return interaction.reply({
content:"❌ Sem permissão",
ephemeral:true
});


const user = interaction.options.getUser("usuario");
const motivo = interaction.options.getString("motivo");


const membro =
await interaction.guild.members.fetch(user.id);


await membro.ban({
reason:motivo
});


interaction.reply(
`🔨 ${user.tag} foi banido\n📄 Motivo: ${motivo}`
);


}




if(interaction.commandName==="kick"){


if(!interaction.member.permissions.has("KickMembers"))
return interaction.reply({
content:"❌ Sem permissão",
ephemeral:true
});


const user = interaction.options.getUser("usuario");
const motivo = interaction.options.getString("motivo");


const membro =
await interaction.guild.members.fetch(user.id);


await membro.kick(motivo);


interaction.reply(
`👢 ${user.tag} foi expulso\n📄 Motivo: ${motivo}`
);


}




if(interaction.commandName==="timeout"){


if(!interaction.member.permissions.has("ModerateMembers"))
return interaction.reply({
content:"❌ Sem permissão",
ephemeral:true
});


const membro =
interaction.options.getMember("usuario");


const minutos =
interaction.options.getInteger("minutos");


const motivo =
interaction.options.getString("motivo");


await membro.timeout(
minutos * 60000,
motivo
);


interaction.reply(
`🔇 ${membro.user.tag} tomou castigo por ${minutos} minutos`
);


}


});



registrar();


client.login(TOKEN);";
const CLIENT_ID = "ID_DO_SEU_BOT";
const GUILD_ID = "ID_DO_SERVIDOR";


const client = new Client({
intents:[
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMembers
]
});



const commands = [

new SlashCommandBuilder()
.setName("ping")
.setDescription("Mostra o ping do bot"),


new SlashCommandBuilder()
.setName("ban")
.setDescription("Bane um usuário")
.addUserOption(o =>
o.setName("usuario")
.setDescription("Usuário")
.setRequired(true))
.addStringOption(o =>
o.setName("motivo")
.setDescription("Motivo")
.setRequired(true)),


new SlashCommandBuilder()
.setName("kick")
.setDescription("Expulsa um usuário")
.addUserOption(o =>
o.setName("usuario")
.setDescription("Usuário")
.setRequired(true))
.addStringOption(o =>
o.setName("motivo")
.setDescription("Motivo")
.setRequired(true)),


new SlashCommandBuilder()
.setName("timeout")
.setDescription("Castiga um usuário")
.addUserOption(o =>
o.setName("usuario")
.setDescription("Usuário")
.setRequired(true))
.addIntegerOption(o =>
o.setName("minutos")
.setDescription("Tempo")
.setRequired(true))
.addStringOption(o =>
o.setName("motivo")
.setDescription("Motivo")
.setRequired(true))

];



const rest = new REST({
version:"10"
}).setToken(TOKEN);



async function registrar(){

await rest.put(
Routes.applicationGuildCommands(
CLIENT_ID,
GUILD_ID
),
{
body: commands
}
);

console.log("Comandos registrados!");

}


client.once("ready",()=>{

console.log(`TW ONLINE: ${client.user.tag}`);


client.user.setActivity(
"Protegendo o servidor ⚡",
{
type:ActivityType.Watching
});



});



client.on("interactionCreate", async interaction=>{


if(!interaction.isChatInputCommand()) return;



if(interaction.commandName==="ping"){

return interaction.reply(
`🏓 Pong! ${client.ws.ping}ms`
);

}



if(interaction.commandName==="ban"){


if(!interaction.member.permissions.has("BanMembers"))
return interaction.reply({
content:"❌ Sem permissão",
ephemeral:true
});


const user = interaction.options.getUser("usuario");
const motivo = interaction.options.getString("motivo");


const membro =
await interaction.guild.members.fetch(user.id);


await membro.ban({
reason:motivo
});


interaction.reply(
`🔨 ${user.tag} foi banido\n📄 Motivo: ${motivo}`
);


}




if(interaction.commandName==="kick"){


if(!interaction.member.permissions.has("KickMembers"))
return interaction.reply({
content:"❌ Sem permissão",
ephemeral:true
});


const user = interaction.options.getUser("usuario");
const motivo = interaction.options.getString("motivo");


const membro =
await interaction.guild.members.fetch(user.id);


await membro.kick(motivo);


interaction.reply(
`👢 ${user.tag} foi expulso\n📄 Motivo: ${motivo}`
);


}




if(interaction.commandName==="timeout"){


if(!interaction.member.permissions.has("ModerateMembers"))
return interaction.reply({
content:"❌ Sem permissão",
ephemeral:true
});


const membro =
interaction.options.getMember("usuario");


const minutos =
interaction.options.getInteger("minutos");


const motivo =
interaction.options.getString("motivo");


await membro.timeout(
minutos * 60000,
motivo
);


interaction.reply(
`🔇 ${membro.user.tag} tomou castigo por ${minutos} minutos`
);


}


});



registrar();


client.login(TOKEN);