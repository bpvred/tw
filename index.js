const {
    Client,
    GatewayIntentBits,
    REST,
    Routes,
    SlashCommandBuilder,
    ActivityType,
    EmbedBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
} = require("discord.js");


const TOKEN = process.env.TOKEN;
const CLIENT_ID = "1530235909772148867";
const GUILD_ID = "1282859172878356532";


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
    .setName("anunciar")
    .setDescription("Enviar anúncio"),


    new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bane usuário")
    .addUserOption(option =>
        option
        .setName("usuario")
        .setDescription("Usuário")
        .setRequired(true)
    )
    .addStringOption(option =>
        option
        .setName("motivo")
        .setDescription("Motivo")
        .setRequired(true)
    ),


    new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Expulsa usuário")
    .addUserOption(option =>
        option
        .setName("usuario")
        .setDescription("Usuário")
        .setRequired(true)
    ),


    new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Castiga usuário")
    .addUserOption(option =>
        option
        .setName("usuario")
        .setDescription("Usuário")
        .setRequired(true)
    )
    .addIntegerOption(option =>
        option
        .setName("minutos")
        .setDescription("Minutos")
        .setRequired(true)
    )

];



const rest = new REST({
    version:"10"
}).setToken(TOKEN);



async function registrar(){

    try{

        await rest.put(
            Routes.applicationGuildCommands(
                CLIENT_ID,
                GUILD_ID
            ),
            {
                body: commands.map(c => c.toJSON())
            }
        );

        console.log("Comandos registrados!");

    }catch(error){
        console.log(error);
    }

}



client.once("ready",()=>{

    console.log(`TW ONLINE: ${client.user.tag}`);

    client.user.setActivity(
        "Protegendo o servidor ⚡",
        {
            type: ActivityType.Watching
        }
    );

});




client.on("interactionCreate", async interaction => {



    // MODAL DO ANÚNCIO

    if(interaction.isModalSubmit()){

        if(interaction.customId === "anuncio_modal"){


            const mensagem =
            interaction.fields.getTextInputValue(
                "mensagem_anuncio"
            );


            const embed = new EmbedBuilder()
            .setColor("#ff0000")
            .setDescription(mensagem)
            .setFooter({
                text:"Anúncio oficial"
            });


            await interaction.channel.send({
                embeds:[embed]
            });


            return interaction.reply({
                content:"✅ Anúncio enviado!",
                ephemeral:true
            });

        }

    }




    if(!interaction.isChatInputCommand()) return;



    // ANUNCIAR

    if(interaction.commandName === "anunciar"){


        if(!interaction.member.permissions.has("Administrator")){

            return interaction.reply({
                content:"❌ Sem permissão",
                ephemeral:true
            });

        }



        const modal = new ModalBuilder()
        .setCustomId("anuncio_modal")
        .setTitle("Enviar anúncio");



        const mensagem = new TextInputBuilder()
        .setCustomId("mensagem_anuncio")
        .setLabel("Mensagem do anúncio")
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder("Digite o anúncio aqui...")
        .setRequired(true);



        const linha = new ActionRowBuilder()
        .addComponents(mensagem);



        modal.addComponents(linha);


        return interaction.showModal(modal);

    }





    // PING

    if(interaction.commandName === "ping"){

        return interaction.reply(
            `🏓 Pong! ${client.ws.ping}ms`
        );

    }





    // BAN

    if(interaction.commandName === "ban"){


        if(!interaction.member.permissions.has("BanMembers")){

            return interaction.reply({
                content:"❌ Sem permissão",
                ephemeral:true
            });

        }


        const user =
        interaction.options.getUser("usuario");


        const motivo =
        interaction.options.getString("motivo");


        const membro =
        await interaction.guild.members.fetch(user.id);



        await membro.ban({
            reason:motivo
        });



        return interaction.reply(
            `🔨 ${user.tag} foi banido`
        );

    }





    // KICK

    if(interaction.commandName === "kick"){


        if(!interaction.member.permissions.has("KickMembers")){

            return interaction.reply({
                content:"❌ Sem permissão",
                ephemeral:true
            });

        }


        const user =
        interaction.options.getUser("usuario");


        const membro =
        await interaction.guild.members.fetch(user.id);



        await membro.kick();



        return interaction.reply(
            `👢 ${user.tag} foi expulso`
        );

    }





    // TIMEOUT

    if(interaction.commandName === "timeout"){


        if(!interaction.member.permissions.has("ModerateMembers")){

            return interaction.reply({
                content:"❌ Sem permissão",
                ephemeral:true
            });

        }



        const membro =
        interaction.options.getMember("usuario");


        const minutos =
        interaction.options.getInteger("minutos");



        await membro.timeout(
            minutos * 60000
        );



        return interaction.reply(
            `🔇 ${membro.user.tag} tomou timeout`
        );

    }


});



registrar();


client.login(TOKEN);
