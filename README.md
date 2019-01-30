# iCal Processor

## What? 

iCal Processor (ical-proc) is a small JavaScript based application to process a single iCal web feed in a manner determined by you.
It has been designed to be invoked like a CGI script on DoC user home directories.
The filter was designed primarily for deployment within Imperial College London and for the rest of this README we'll assume that you have access to a DoC home directory.

## Installation Instructions

To run this application you'll need a NodeJS version that supports arrow functions ( the  => kind ). At the time of writing the DoC machines have a very old version of NodeJS so we will need to fix this.

### Step 1 - Creating the right directories

SSH into a DoC machine and navigate to the `public_html` directory.

Clone this repository into a directory called `cal`, and change directory to it.

```sh
git clone https://github.com/nvgrw/ical-proc.git cal && cd cal
```

### Step 2 - Installing NodeJS

Download the Linux 64-bit binaries for NodeJS from <https://nodejs.org/en/download/current/> and extract the tarball.

Rename the extracted directory to `node` so that the NodeJS binary is located here `~/public_html/cal/node/bin/node`.

### Step 3 - Installing the dependencies

Install the dependencies using `npm`. With your working directory set to `~/public_html/cal` you can install the dependencies like so:

```sh
./node/bin/npm install
```

### Step 4 - Configuration

Use your favourite text editor to edit `.htaccess` and change the line `require user nv516` to reference your college username.

Edit `config.json` to set the `calendarUrl` to the URL of the original calendar feed. Make sure that this is an `https://` URL. If CELCAT gives you a `webcal://` URL then just replace `webcal` with `https`.

Set up your filters by editing `filters.js`. Many examples are already included from my configuration so you can base yours off of this. Filter paths are specified in JSONPath format, documented [here](https://github.com/dchester/jsonpath).

Also make sure to modify the `ical-proc.cgi` bash script to use the version of NodeJS that you just installed. For me the binary is located at `./node/bin/node`, so my script looks like this:

```sh
#!/bin/bash
./node/bin/node index.js
exit 0
```

## Using the filtered calendar

Point your browser to `https://www.doc.ic.ac.uk/~{{your DoC username}}/cal/ical-proc.cgi`. If an iCal file is displayed or downloaded after you authenticate, the setup was successful. Now you can use the same URL in your favourite calendar application to add the calendar. Set a low refresh time if you would like your filter changes to reflect faster.

For filter debugging purposes it might be useful to modify the `index.js` script to output the JSON format directly or to change the MIME type of the response to `text/text` (from `text/calendar`) to view its contents in your browser.

## But Caching?

Caching? What's that?