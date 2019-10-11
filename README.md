# cBot
cBot Discord Bot Documentation and Information

# COMMANDS:
!help: Lists commands\n!test: Makes cBot send a message to test if it's online
!correct [statement]: The main function of cBot, replaces all iterations of "ck" in [statement] with "cc",
                      thereby making it automatically hilarious
!fix [statement]: Alias for !correct [statement]

# INFORMATION:
index.js base taken with permission from Jack Malcom at github.com/Dizeeee/UAbot as a starting point, and
edited beyond recognition by Deuce Black to its current functionality.
Most recent edit: October 11, 2019
Reliances: node.js, discord.js

# HOW TO USE:
Note: I used Ubuntu for all of this so that's the terminal I'll be using to describe how to start it up.
Put index.js and package.json in some folder. Navigate to that folder in the terminal. Run the command
"npm start", which will generate a config.json file on first use. Use a text editor to insert your desired
Discord server's token and change the command prefix if you wish. Save the config.json file, run "npm
start" again, and go "fix some grammar mistakes" in your Discord server. Have fun!
