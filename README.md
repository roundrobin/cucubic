cucubic OLAP interface
======================

### Enviroment ###

#### Server-side ####


- MySQL Community Server
(Current Generally Available Release: 5.5.19)

- JRuby 1.6.5
- Gems: sinatra
        haml
        json
        mysql
        mondrian-olap (JRuby specific)
  
#### Fronend-side ####

- three.js (r46)
- jquery 1.7.1
- tween.js
- 

### Usage ###

1. Install MySQL
1. Create your star schema with SQL
   Tip: Have look on the example schema
2. Import schema
3. Create a mapping definition according to your star schema
   Tip: Hava a look on the mondrian-olap gem README docs

4. Install JRuby 1.6.5
5. Run "gem install bundler"
6. Run "bundle install"

