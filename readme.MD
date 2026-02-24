# Smart Pomodoro Timer

A lightweight browser-based Pomodoro timer built with vanilla JavaScript and Tailwind CSS.

## Features

- Custom focus duration input (default flow uses 25 minutes)
- One-click mode buttons: `Focus`, `Short Break`, `Long Break`
- Automatic session flow with alerts:
  - Focus -> Short Break
  - Long Break after 4 focus sessions
- Built-in alarm sound (`done.mp3`) on transitions/completion
- `Stop Sound` control to silence the alarm immediately

## Tech Stack

- HTML5
- Vanilla JavaScript
- Tailwind CSS (CDN)

## Project Structure

```text
project14/
|- index.html
|- script.js
|- done.mp3
|- readme.MD
```

## How to Run

Live link:

## Usage

1. Enter a focus time in minutes (optional) and click `Start`.
2. Use `Short Break` or `Long Break` for manual mode switching.
3. Let the timer cycle automatically between sessions.
4. Click `Stop Sound` if the alarm is playing.

## Notes

- Keep `done.mp3` in the same folder so alarm playback works.
- The latest valid focus input is reused as the default focus duration.
