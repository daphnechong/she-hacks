she-hacks
=========

SheHacks Sydney March 2014 - a disaster relief volunteer coordination platform. It won first prize! :) 

Blog post: 
http://daphnechong.wordpress.com/2014/03/23/she-hacks-2014/

Prezi used during this hackathon:
http://prezi.com/cdnchaw40at9/shehacks-sydney-2014/


installation 
------------

1) You will need node.js (http://nodejs.org/) installed on your machine.

2) install nodemon package globally:
npm install -g nodemon

3) get the modules for this app:
npm install

4) run the app by using the command:
nodemon app.js

demo
----

To see it running in action, open two windows, and point one of them to the coordinator page, and one to the volunteer page. 

http://localhost:3000/admin (coordinator)

http://localhost:3000 (volunteer)

If you start clicking on the map in the coordinator page, it will start drawing a polygon. You are in a mode where you can map out the affected disaster area. After you're done drawing your polygon outline, click the "stop" button on the top left.  The polygon will have been udpating real-time in the volunteer's window. 

The coordinator's window will have switched to "muster point" mode, where you can drop a point on the map to indicate a muster point. It will pop up a form include a title, description and number of volunteers. When you click "OK" on the form, the muster point will be shown on the volunteer's window. 

Now, from the volunteer window you can elect to volunteer at a muster point, by clicking on a muster point and filling in the volunteer form.  (we didn't have time to fully implement this, so it has been hardcoded for demo purposes.) Once you click OK, the coordinator's window will update with a message showing that volunteers have been added to the muster point (also hardcoded).
