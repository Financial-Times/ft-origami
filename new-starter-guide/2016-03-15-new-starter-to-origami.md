# New starter guide

Welcome to Origami!

## Checklist of things to do

The checklist assumes that you have done the following:

1. Visit IT Service Desk to get your computer account up and running.
2. Logged on your own work machine and email account.

### Admin privileges on your machine

IT Services should have enabled admin privileges when they have set up your machine but you should [request admin access to your FT laptop via Salesforce](https://financialtimes.my.salesforce.com/home/home.jsp) to ensure it does not get revoked.

If you do not have admin privileges then email `itservicedesk@ft.com`. Include your desk number (which is usually a label on the front of your desk) and the machine number with the email. You also will need to say why you need admin privileges, or alternatively copy the template below and edit accordingly.

```
Dear IT Service Desk,

I am a new starter within the Origami team, as a <your job title>. I would like to have admin privileges on <machine number> which is at <desk number>.

The reasons for needing access to admin privileges is so that I can install software such as node.js, <your preferred text editor>, <add more if you like> and etc.

I look forward to hearing back from you on this matter.

Regards

<your name>
```

This should expedite your request for admin privileges on your machine.


### Slack

1. Install Slack (This can be done without admin privileges).
  > To install certain apps without admin privileges, you can access the Self Service app facility by finding it on your machine via Spotlight (under the assumption it's a Mac) Log in with your network details, and do a search for the Slack app and install. This is the same with browsers like Google Chrome or Mozilla Firefox.

2. The Slack domain for FT is `financialtimes`. Log into the domain with your FT email address.

3. Join the `#ft-origami` channel and ask for invites to the internal channels from the Origami team.


### Code repositories

1. The public repositories are found at [GitHub/Financial-Times](https://github.com/Financial-Times) on GitHub. The private ones are found at [BitBucket](http://git.svc.ft.com/). The Origami repositories should be public if at all possible.

2. Ask the Origami team for access to the following:
  - To be added to the GitHub organisation Financial-Times
  - To be added to the `origami-core` & `origami-colloborators` on the GitHub organisation's teams.
  - Granted admin access to BitBucket.

3. If you are using SSH, then don't forget to [generate new keys](https://help.github.com/articles/generating-an-ssh-key/), and add to your GitHub account if you haven't done so already.

### LastPass

Please do not just sign up on LastPass.com for a free account. You need to invited to the FT Enterprise LastPass account. To do this, ask `itservicedesk@ft.com` for your LastPass account to be enabled and, once this has been done, ask in the internal Origami channel on Slack to be added to the Labs team shared LastPass folder as an administrator.

### Other tools

Ask the Origami team to be added to:

- [Sentry](https://app.getsentry.com/auth/login/financial-times/)
- [Pingdom](https://www.pingdom.com/) (_optional_)
- [Heroku](https://www.heroku.com/)
  - You will need to set up a Heroku account with your FT.com email address (Please enable <abbr title="Two Factor Authentication">2FA</abbr>).

### Two Factor Authentication

You will be asked to add <abbr title="Two Factor Authentication">2FA</abbr> for the following:

- Work email
- Heroku
- LastPass

It is a good idea to add an app on your phone for <abbr title="Two Factor Authentication">2FA</abbr> or configure it to send SMS messages with codes. There are options for apps like [Authy](https://www.authy.com/) ([App Store](https://itunes.apple.com/gb/app/authy/id494168017) / [Google Play](https://play.google.com/store/apps/details?id=com.authy.authy)) or Google Authenticator. ([App Store](https://itunes.apple.com/gb/app/google-authenticator/id388497605) / [Google Play](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2))

### FT.com

Check your email to see if you’ve already been registered for the free subscription to the [ft.com](https://www.ft.com/). If not, sign-up for an account on ft.com then ask `corporate.support@ft.com` to upgrade it to a free subscription.

## Development tools

### Environment setup

Before you start installing anything, it is a good idea to do this (with admin privileges) to ensure that <abbr title="Node Package Manager">npm</abbr> is given permissions to install globally on your machine.

```
chown -R $USER /usr/local
```

Almost all Origami applications rely on the following tools to be installed globally on development machines. Please ensure both of these are installed successfully onto your development environment first.

#### Install the following:

- [Node.js](https://nodejs.org/)
  - We recommend installing a [Node Version Manager](https://github.com/creationix/nvm) to manage different local node versions.
- [Git](https://git-scm.com/)
- [Heroku Toolbelt](https://toolbelt.heroku.com/)
- [Bower](http://bower.io/)
- [Ruby](http://www.ruby-lang.org/)
  - We recommend installing a Ruby Version Manager to manage different ruby versions. There are two choices here. You can go either [Ruby Version Manager](https://rvm.io/) or [Rbenv](https://github.com/rbenv/rbenv).
  - This is for the Ruby SCSS-Lint gem which is a part of <abbr title="Origami Build Tools">OBT</abbr>.

#### Work with our ecosystem of components

You will need to point Bower at the Origami registry. Running the following in a <abbr title="Command Line Interface">CLI</abbr> will do this for you.

```
[ -e ~/.bowerrc ] || echo '{ "registry": { "search": [ "http://registry.origami.ft.com", "https://bower.herokuapp.com" ] } }' > ~/.bowerrc
```

You can join all the Origami applications on Heroku by checking out this [shared Google Sheets](https://docs.google.com/a/ft.com/spreadsheets/d/1xk1tyn60ZCmLk1I39Dot-08c9pBJeeX3g9MDENDqjKk/edit?usp=drive_web).


#### Issues with installing/getting access

If you experience any problems, then please take a look at Next's [troubleshooting guide](http://financial-times.github.io/next/docs/developer-guide/troubleshooting/). If your problem is not included in the troubleshooting list and you manage to solve it, then please add it to the list.

### Peer review and pull requests

1. For more significant changes always ask for a peer review by posting a link on the relevant channel on slack or cc-ing one or more developers in GitHub.

2. **If no-one reviews your code after a while**
  - Go and ask somebody directly to do so.
  - Stand next to them tutting and checking your watch if necessary.
  - Review it yourself - the time spent waiting will have given you fresh eyes. If you feel confident everything’s OK go ahead and merge.

3. It’s more important to verify your code works in the wild after deploying than it is to get the code approved by somebody before deploying.
  - A thumbs up does not mean your code actually works so if releasing a change to an app keep an eye on it and check Sentry (The changes take about 10 minutes to show up due to Heroku preboot).
  - Take all the above with a pinch of salt and trust your judgement.

4. Our test coverage varies from one app to another but in general tests are a valuable thing. If the repo you’re working on is already well covered by tests add some to cover your changes too. If its test coverage is poor/non-existent don’t let that stop you from making a start by adding some to cover your new code.
