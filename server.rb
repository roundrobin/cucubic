require File.join(File.dirname(__FILE__), "schema", "mondrian_schema")
require "java"
require "rubygems"
require 'sinatra'
require "mondrian-olap"
require 'jdbc/mysql'
require "sinatra/reloader"
require 'haml'
require 'ruby-debug'
require "json"

  olap = Mondrian::OLAP::Connection.create(
    :driver => 'mysql',
    :host => 'localhost',
    :database => 'cucubic',
    :username => 'deploy',
    :password => 'EOoXDc0FRm',
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


get '/getDimensions/:cube' do
  @cube = params[:cube]
   cube = olap.cube(@cube)
   cubeHash = {}
   cube.dimensions.each do |dim|

         if dim.name == "Measures"
           hierarchyArray = []
           dim.hierarchies.each do |hierarchy|
                  levelNames = []
                  hierarchy.levels.each do |level|
                        levelNames.concat( level.members.map(&:name))
                  end
                  hierarchyArray << {:hierarchy => hierarchy.name, :level => levelNames}
                end
                cubeHash[dim.name] = hierarchyArray

         else
                hierarchyArray = []
                dim.hierarchies.each do |hierarchy|
                  hierarchyArray << {:hierarchy => hierarchy.name, :level => hierarchy.level_names}
                end
                cubeHash[dim.name] = hierarchyArray
         end
   end
   cubeHash.to_json
end


get '/testwiese' do
  haml :testwiese
end

get '/cube' do
  @cubes = ["Sales1", "Calls", "HRM"]  
  haml :cube
end

def allDimensionsEqual(queryObject, dimensions, eingabefeld )
        puts dimensions.inspect
        arguments = dimensions.map do |elemente| 
                if elemente[2] == "(All)"
                        "[#{elemente[:dimension]}].[#{cube.dimension(elemente[:dimension]).hierarchy.all_member_name }]" 
                else
                        "[#{elemente[:hierarchy]}].[#{elemente[:hierarchy]}].[#{elemente[:level]}].Members"
                end
        end
        puts arguments.inspect
        puts "-------"
        return queryObject.send(eingabefeld.to_sym,*arguments) #Dynamischer Funktionsaufruf am OLAP-Objekt (Mögliche Methode: Row, Column, Page)                
end


def notAllDimensionsEqual(queryObject, dimensions, eingabefeld )

end


def buildQueryPerAxis(cube, queryObject, dimensions, eingabefeld)
        if(dimensions.all?{|dimensionHash| dimensionHash[:dimension] == dimensions.first[:dimension] })
                return allDimensionsEqual(queryObject, dimensions, eingabefeld) 
        end
        return notAllDimensionsEqual(queryObject, dimensions, eingabefeld)
end


get '/getResults' do
  cube = olap.cube(params[:cube])
  #begin    
                allLevelsAsHash = ServerHelpers.extractDimensionsHierarchy(params)
                puts allLevelsAsHash.inspect
                start = olap.from("Calls")

                start = buildQueryPerAxis(cube,start,allLevelsAsHash[:colLevels],:columns)  unless allLevelsAsHash[:colLevels].nil?
                start = buildQueryPerAxis(cube,start,allLevelsAsHash[:rowLevels],:rows)     unless allLevelsAsHash [:rowLevels].nil?
                start = buildQueryPerAxis(cube,start,allLevelsAsHash[:pageLevels],:pages)   unless allLevelsAsHash[:pageLevels].nil?

                result = start.execute #Evaluiert den Query

                values =  ServerHelpers.recursiveClean(result.values) #Überarbeitet die Werte aus dem Array
                json = {:valid =>  true, :message => "Query erfolgreich", :values => values, :columnNames => result.column_names,:rowNames => result.row_names,:pageNames => result.page_names }.to_json
                return "#{json}"

        #rescue Exception
        #	   valid   = false
        #       json = {:valid =>  valid, :message => "Ungültige Eingabe. Bitte wählen Sie eine gültige Abfrage-Kombination." }.to_json  
        #       puts json
        #       return json
        #end
end




class ServerHelpers
        def self.extractDimensionsHierarchy(params = [])
                allLevels = {}
                [:colLevels,:rowLevels,:pageLevels].each do |eingabefeld|        
                        unless params[eingabefeld].nil?
                                trippel = []
                                (params[eingabefeld].size).times do |index|
                                                index = index.to_s
                                                dimension = params[eingabefeld][index]["dimension"] 
                                                hierarchy = params[eingabefeld][index]["hierarchy"]
                                                level     = params[eingabefeld][index]["name"]
                                                trippel << {:dimension => dimension, :hierarchy => hierarchy, :level => level}
                                end
                                allLevels[eingabefeld] = trippel
                        end
                end
                return allLevels
        end

        def self.recursiveClean(aar)
          if aar.kind_of? Array
                return aar.map{ |elem| recursiveClean(elem) }
          else
                if aar.nil?
                  return 0
                else
                  return aar;  
                end
          end
          return 0;
        end
end