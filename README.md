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
used in this project is [Threejs](https://github.com/mrdoob/three.js/) of the incredible Mr.Doob.

======================

### 1. Enviroment ###

#### 1.1 Server-side ####


- MySQL Community Server
(Current Generally Available Release: 5.5.19)

- JRuby 1.6.5
- Gems: sinatra,
        haml,
        json,
        mysql,
        bundler,
        mondrian-olap (JRuby specific)
  
#### 1.2 Fronend-side ####

- three.js (r46)
- jquery 1.7.1
- tween.js
- DAT.GUI.min.js

### 2. Usage ###

1. Install MySQL
1. Create your star schema with SQL
   Tip: Have look on the example schema
2. Import schema
3. Create a mapping definition according to your star schema
   Tip: Hava a look on the mondrian-olap gem README docs

4. Install JRuby 1.6.5
5. Run "gem install bundler"
6. Run "bundle install"

