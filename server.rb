require File.join(File.dirname(__FILE__), "schema", "mondrian_schema")
require "java"
require "rubygems"
require 'sinatra'
require "mondrian-olap"
#require 'jdbc/mysql'
require "sinatra/reloader"
require 'haml'
require 'ruby-debug'
require "json"

  olap = Mondrian::OLAP::Connection.create(
    :driver => 'mysql',
    :host => 'localhost',
    :database => 'cucubic',
    :username => 'YOUR_USERNAME',
    :password => 'YOUR_PASSWORD',
    :schema => Schema::totalcube
  )

set :public, File.dirname(__FILE__) + '/static'

get %r{cubemanager\/(.*\/$)*} do
  @cubes = ["Calls"]
  haml :positioning
end


get '/' do
  @cubes = ["Calls"]
  haml :positioning
end
