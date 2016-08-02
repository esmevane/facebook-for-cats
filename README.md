# Catbook
## Facebook - for cats

## Installation

Before installation, make sure you have the support libraries in your global path:

```bash
npm run setup
```

After that, getting started is easy:

```bash
npm start
```

## Tmux support

If you can run Tmux, there's a handy launch script which can take care of launching ionic in a Tmuxed process for you.

```bash
npm run dev
```

Afterwards, you can connect to the tmux using:

```bash
tmux a -t catbook
```

If this is your only running tmux process, you can skip the target (`-t catbook`) call entirely:

```bash
tmux a
```

Finally, if you have iTerm2 (which natively supports Tmux):

```bash
tmux -CC a -t catbook
# or
tmux -CC a
```
