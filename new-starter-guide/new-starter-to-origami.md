---
layout: default
title: New Origami starter guide
permalink: /new-starter-guide/
---

# New starter guide

Welcome to Origami!

## Checklist of things to do

The checklist assumes that you have done the following:

1. Visited IT Service Desk (ITSD) to get your computer account up and running.
2. Logged on your own work machine and email account.

### Admin privileges on your machine

<abbr title="IT Services Desk">ITSD</abbr> should have done admin privileges for you and your machine when they did the setup. If not, then you should [request admin access to your FT laptop via Salesforce](https://financialtimes.my.salesforce.com/home/home.jsp) to ensure it does not get revoked.

If you do not have admin privileges then email `itservicedesk@ft.com`.

Include your desk number (which is usually a label on your desk) and the machine number with the email. You also will need to say why you need admin privileges, or copy the template below and edit to suit the situation.

```
Dear IT Service Desk,

I am a new starter within the Origami team, as a <your job title>. I would like to have admin privileges on <machine number> which is at <desk number>.

I need to be able to install software like node.js, <your preferred text editor> & <add more if you like>.

I look forward to hearing back from you on this matter.

Thanks

<your name>
```

This should hurry your request for admin privileges on your machine.

### Slack

1. Install Slack (You can do this without admin privileges).
  > To install software without having admin privileges. You can access the Self Service application by finding it on your machine. Log in with your network details, and do a search for the Slack app and install. This is the same with browsers like Google Chrome or Mozilla Firefox. You will need to be on the FT LAN for this to work.

2. The Slack domain for FT is `financialtimes`. Log into the domain with your FT email address.

3. Join the `#ft-origami` channel, then ask the team to add you to the internal channels.

### Code repositories

1. The public repositories are at [GitHub/Financial-Times](https://github.com/Financial-Times) on GitHub. The private ones are at [BitBucket](http://git.svc.ft.com/). Origami repositories should be public if at all possible. We also are looking into moving all private repositories onto GitHub.

2. Ask the Origami team for access to the following:
  - The GitHub organisation Financial-Times
  - The `origami-core` & `origami-colloborators` on the GitHub organisation's teams.
  - Granted admin access to BitBucket.

3. If you haven't done so already, please set up [2-factor authentication](https://help.github.com/articles/about-two-factor-authentication/) for GitHub.

4. If you are using SSH, then don't forget to [generate new keys](https://help.github.com/articles/generating-an-ssh-key/), and add to your GitHub account.

### LastPass

Please do not just sign up on LastPass.com for a free account. You need to invited to the FT Enterprise LastPass account. Ask `itservicedesk@ft.com` to enable your LastPass account. Then ask a member of the team to add you to the Shared-origami folder as an administrator.

### Other tools

Ask the Origami team for access to:

- [Sentry](https://app.getsentry.com/auth/login/financial-times/)
- [Pingdom](https://www.pingdom.com/) (_optional_)
- [Heroku](https://www.heroku.com/)
  - Set up a Heroku account with your FT.com email address (Please enable <abbr title="Two Factor Authentication">2FA</abbr>).

### Two Factor Authentication

You will need to add <abbr title="Two Factor Authentication">2FA</abbr> for the following:

- Work email
- GitHub
- Heroku
- LastPass

It is a good idea to add an app on your phone for <abbr title="Two Factor Authentication">2FA</abbr> or configure it to send SMS messages with codes. There are options for apps like [Authy](https://www.authy.com/) ([App Store](https://itunes.apple.com/gb/app/authy/id494168017) / [Google Play](https://play.google.com/store/apps/details?id=com.authy.authy)) or Google Authenticator. ([App Store](https://itunes.apple.com/gb/app/google-authenticator/id388497605) / [Google Play](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2))

### FT.com

Check your email to see if you’ve registered for the free subscription to [ft.com](https://www.ft.com/). If not, sign-up for an account on ft.com and ask `corporate.support@ft.com` to upgrade it.

## Development tools

### Environment setup

Before anything gets installed on your machine. It is a good idea to ensure that <abbr title="Node Package Manager">npm</abbr> has permissions to install globally.

```
chown -R $USER /usr/local
```

Almost all Origami applications rely on the following tools to be installed globally on development machines. Please ensure that you install the software in your development environment first.

#### Install the following:

- [Node.js](https://nodejs.org/) - The components are supported in Node v4 or Node v5.
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

You can join all the Origami applications on Heroku by checking out this [shared Google Sheets](https://docs.google.com/a/ft.com/spreadsheets/d/1xk1tyn60ZCmLk1I39Dot-08c9pBJeeX3g9MDENDqjKk/edit?usp=drive_web). You will need one other person from the Origami team to add you.

#### Issues with installing/getting access

If you experience any problems, then please take a look at Next's troubleshooting guide. If your problem is not included in the [troubleshooting guide](http://financial-times.github.io/next/docs/developer-guide/troubleshooting/) and you manage to solve it, then add it to the list.

### Peer review and pull requests

All contributors to Origami must use Pull Requests. These should be peer-reviewed by one or more people before merging.

#### Here's how it works

1. Branch off of master: `git branch my-great-feature`
2. [some coding / committing happens in the `my-great-feature branch`]
3. Push those changes to GitHub / Stash: `git push origin my-great-feature-branch`
4. Repeat 2 and 3 as much as you like
5. When you're ready, open a pull request. Tag people you'd like to review the request.
6. Respond to review comments
7. Either a reviewer will merge your request, or they will give you a thumbs-up for you to merge.
