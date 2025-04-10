Hi, welcome to 2hadbase.

to run the 2hadbase website locally:
- Download and install Python3: https://www.python.org/downloads/ (Or use any web server you want)
- Ensure python3 is in your systen path: https://realpython.com/add-python-to-path/
- Download images from: https://n9.cl/yh5t6 (shortened link with captcha to stop bots)
- With your unzip software just unzip the first .001 file and it will see the .002 and .003 files automatically, you **do not** need to unzip all three files, if you are unsure it has worked correctly check the unzipped folder size should be roughly 4.7gb
- Clone this repository in cmd/terminal: `git clone https://github.com/2hadbase-inc/2hadbase-python.git`
- Move all the content year folders (2011...2020) and place them in the 2hadbase-python directory with all the other files
- Open Cmd/Terminal in 2hadbase-python directory and run
  - linux: `sudo python3 -m http.server 80`
  - windows (run cmd as admin): `python3 -m http.server 80`
- Go to `localhost` in your browser.
- Enjoy

If you have any issues installing please create an [Issue](https://github.com/2hadbase-inc/2hadbase-python/issues/new).

For devs:
Note this is a static production release and not reccomended for developing with. The full website source code will be released soon.

To do:
- Figure out CORS not working with file:// api so the website can be used actually statically
