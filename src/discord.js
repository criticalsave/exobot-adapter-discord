import Discord from 'discord.js';

import { Adapter, User } from '@exoplay/exobot';

export const EVENTS = {
  ready: 'discordReady',
  message: 'discordMessage',
  //presence: 'discordPresence',
  disconnected: 'discordDisconnected',
};

export const DISCORD_MENTION_REGEX = /<@!(\d+)>/i;

export class DiscordAdapter extends Adapter {
  channels = {}

  constructor ({ token, botId, username }) {
    super(...arguments);

    this.botId = botId;
    this.username = username;
    this.token = token;
  }

  register (bot) {
    super.register(...arguments);

    const { token, botId, username } = this;

    if (!token || !botId || !username) {
      this.status = Adapter.STATUS.ERROR;
      bot.log.error('token, botId, and username are required to connect to discord.');
      return;
    }

    this.client = new Discord.Client({
      autoReconnect: true,

    });

    Object.keys(EVENTS).forEach(discordEvent => {
      const mappedFn = this[EVENTS[discordEvent]];
      this.client.on(discordEvent, (...args) => mappedFn.bind(this)(...args));
      this.client.on(discordEvent, (...args) => {
        this.bot.emitter.emit(`discord-${discordEvent}`, ...args);
      });
    });

    this.client.loginWithToken(token);
  }

  send (message) {
    this.bot.log.debug(`Sending ${message.text} to ${message.channel}`);

    this.client.sendMessage(
      message.channel,
      message.text
    );
  }

  getUserIdByUserName (name) {
    try {
      return this.client.users.get('username', new RegExp(name, 'i')).id;
    } catch (e) { }
  }

  discordReady = () => {
    this.status = Adapter.STATUS.CONNECTED;

    this.bot.emitter.emit('connected', this.id);
    this.bot.log.notice('Connected to Discord.');
    this.client.setPlayingGame('Exobotting');

    this.client.servers.forEach(s => {
      this.client.setNickname(s, this.bot.name);
    });
  }

  discordDisconnected = () => {
    this.status = Adapter.STATUS.DISCONNECTED;
    this.bot.log.critical('Disconnected from Discord.');
  }

  discordMessage ({ channel, server, author, cleanContent }) {
    if (author.username === this.username) { return; }
    console.log(cleanContent);

    const user = new User(author.username, author.id);

    // if it's a whisper, the channel is in directMessages
    if (channel instanceof Discord.PMChannel) {
      return super.receiveWhisper({ user, text: cleanContent, channel });
    }

    this.receive({ user, text: cleanContent, channel });
  }

  /*
  discordPresence (username, userId, status, gameName, rawEvent) {
    if (userId !== this.botId) {
      const user = new User(username, userId);

      if (status === 'online') {
        return super.enter({ user, channel: rawEvent.d.channel_id });
      } else if (status === 'offline') {
        return super.leave({ user, channel: rawEvent.d.channel_id });
      }
    }
  }
  */
}
