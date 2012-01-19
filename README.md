cucubic
=======

DESCRIPTION
-----------

This project examines the prototypical development of a browser-based user interface
for the OLAP server [Mondrian](http://mondrian.pentaho.com) with the aid of modern web technologies like HTML5 and
WebGL. With the development of the system could be demonstrated that a browser-based
interface can be extended to three-dimensional aspects without relinquish common patterns
of interaction in the context of OLAP. The three-dimensional arrangement of the data in the
form of a cube and the implementation of OLAP operators such as slice, dice and pivoting are
useful illustrations of future user interfaces in the field of business applications. The WebGL engine
used in this project is [three.js](https://github.com/mrdoob/three.js/) of the incredible Mr.Doob. Besides thats,
credits to Raimonds Simanovskis the creator of the amazing [mondrian-olap jruby](https://github.com/rsim/mondrian-olap) wrapper, which i used.

======================

<div>
<a style="float:right" href="http://twitpic.com/88vmxy" title="Interface on Twitpic"><img src="http://twitpic.com/show/thumb/88vmxy.png" width="150" height="150" alt="Interface on Twitpic"></a>
<a style="float:right" href="http://twitpic.com/88vnro" title="View on Twitpic"><img src="http://twitpic.com/show/thumb/88vnro.png" width="150" height="150" alt="View on Twitpic"></a>
<a href="http://twitpic.com/88voi3" title="View on Twitpic"><img src="http://twitpic.com/show/thumb/88voi3.png" width="150" height="150" alt="View on Twitpic"></a>
</div>
### 1. Environment ###

#### Server-side ####


- MySQL Community Server
(Current Generally Available Release: 5.5.19)

- JRuby 1.6.5
- Gems: sinatra,
        haml,
        json,
        mysql,
        bundler,
        mondrian-olap (JRuby specific)
  
#### Frontend-side ####

- [three.js](https://github.com/mrdoob/three.js/) (r46) - WebGL Engine
- [jquery 1.7.1](http://jquery.com/) - Frontend Scripting
- [tween.js](https://github.com/sole/tween.js/) - Javascript Tweening Engine
- [DAT.GUI.min.js](http://code.google.com/p/dat-gui/) - A lightweight controller library for JavaScript

### 2. Usage ###

1. Install MySQL
1. Create your star schema with SQL<br>
   Tip: [Have look on the example schema](https://github.com/roundrobin/cucubic/blob/master/SQL.txt)<br>
   To test cucubic you can use the example schema
2. Import the SQL schema into your MySQL Server<BR>
   ```
     mysql -u USERNAME -p -h DBSERVER DBNAME < YOUR_STATEMENT_FILE.sql 
   ```
3. Create a mapping definition according to your SQL star schema<br>
   Put the mapping file in the "schema" folder<br>
   Tip: [Hava a look on the mondrian-olap gem README docs](https://github.com/rsim/mondrian-olap/blob/master/README.md)

4. Install JRuby 1.6.5
5. Run
   ```
   gem install bundler
   ```
6. Run
   ```
   bundle install
   ```
7. Change Mondrian-olap configuration in server.rb<br>
   This regards the name, user and passwort of the database<br>
   Additional you set the path to the schema definition (See point 3.)

8. Start the server
   ```
   ruby -S server.rb
   ```   

