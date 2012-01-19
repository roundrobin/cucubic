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

#### Configuration start ####
  
  olap = Mondrian::OLAP::Connection.create(
    :driver => 'mysql',
    :host => 'localhost',
    :database => 'dwh',
    :username => 'root',
    :password => '',
    :schema => Schema::example_schema
  )

#### Configuration end ####



set :public, File.dirname(__FILE__) + '/static'

get "/" do
  redirect "/cubemanager/"
end

get %r{cubemanager\/(.*\/$)*} do
  @availableCubes = ["Calls"]
  haml :index
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


get '/cube' do
  @cubes = ["Sales", "Calls", "HRM"]  
  haml :cube
end


get '/' do
   cube = olap.cube('Calls')

   @result = olap.execute <<-MDX
     SELECT  {[Measures].[Dauer], [Measures].[Anzahl]} ON COLUMNS,
          {[Urgency].[All urgencies]} ON ROWS
      FROM [Calls]
   MDX

  @axesCount   = @result.axes_count # => 2
  @columnNames = @result.column_names       # => ["Unit Sales", "Store Sales"]  
  @rowNames    = @result.row_names
  @values      = @result.values           # => [[..., ...], [..., ...], [..., ...]] 
  #@values      = @values.map{|elem| elem.map { |e| e.nil? ? 0 : e }}
  @dimensions  = cube.dimensions
  @measure     = cube.dimension('Measures').hierarchy.levels.each do |level|
    level.members.each do |member|
      puts member.name
    end
  end

  haml :testing
end





get '/getResults' do
  #content_type :json
  cubeName = params[:cube]


  @valid = false;
        cube = olap.cube(params[:cube])
   begin    
        allLevels = []
        [:colLevels,:rowLevels,:pageLevels].each do |queryBox|        
            if !params[queryBox].nil?
                trippel = []
                if(params[queryBox]["0"])
                    dimension = params[queryBox]["0"]["dimension"] 
                    hierarchy = params[queryBox]["0"]["hierarchy"]
                    levelx = params[queryBox]["0"]["name"]
                    level1 = [dimension,hierarchy,levelx]
                    trippel << level1
                end

                if(params[queryBox]["1"])
                    dimension = params[queryBox]["1"]["dimension"] 
                    hierarchy = params[queryBox]["1"]["hierarchy"]
                    levely = params[queryBox]["1"]["name"]
                    level2 = [dimension,hierarchy,levely]
                    trippel << level2
                end

                if(params[queryBox]["2"])
                    dimension = params[queryBox]["2"]["dimension"] 
                    hierarchy = params[queryBox]["2"]["hierarchy"]
                    levelz = params[queryBox]["2"]["name"]
                    level3 = [dimension,hierarchy,levelz]
                    trippel << level3
                end
                allLevels << trippel
            else
                allLevels << []
            end
        end

        start = olap.from("Calls")

        if( !allLevels[0].empty?)
            #puts "Es gibt Column Eintraege"
            start = checkQuery(cube,start,allLevels[0],:columns)
        end
        if( !allLevels[1].empty?)
            #puts "Es gibt Row Eintraege"
            start = checkQuery(cube,start,allLevels[1],:rows)
        end
        if( !allLevels[2].empty?)
            #puts "Es gibt Page Eintraege"
            start = checkQuery(cube,start,allLevels[2], :pages)
        end
        result = start.execute
        @column_names =  result.column_names
        @row_names =  result.row_names
        @page_names =  result.page_names
        values = result.values
        #puts values.inspect
        @valid = true;
        @message = "Query erfolgreich"
        #@values = recursive(values) 
        #puts @values.inspect
        x =  recursive(values)
        values = []
         json = {:valid =>  @valid, :message => @message, :values => x, :columnNames => @column_names,:rowNames => @row_names,:pageNames => @page_names }.to_json
         return "#{json}"

     rescue Exception
            @message = "Ungueltige Eingabe. Bitte waehlen Sie eine gueltige Abfrage-Kombination."
            @valid   = false
            json = {:valid =>  @valid, :message => @message }.to_json  
            puts json
            return json
     end
end



get '/query/:col/:row/:page/:coldimension/:rowdimension/:pagedimension' do
  col  = params[:col]
  row  = params[:row]
  page = params[:page]

  colDimension  = params[:coldimension]
  rowDimension  = params[:rowdimension]
  pageDimension = params[:pagedimension]

   cube = olap.cube('Calls')

   @result = olap.execute <<-MDX
     SELECT  {[#{colDimension}].[#{col}]} ON COLUMNS,
          {[#{rowDimension}].children} ON ROWS
      FROM [Calls]
   MDX

  @columnNames = @result.column_names       # => ["Unit Sales", "Store Sales"]  
  @rowNames    = @result.row_names          # => e.g. ["Drink", "Food", "Non-Consumable"]
  @values      = @result.values           # => [[..., ...], [..., ...], [..., ...]] 
  @values      = @values.map{|elem| elem.map { |e| e.nil? ? 0 : e }}

  result = { :columnNames => @columnNames, :rowNames => @rowNames, :values => @values}.to_json

  "#{result}"
end

get '/complexQuery' do
   cube = olap.cube('Calls')

   @result = olap.execute <<-MDX
     SELECT  {[SLA].children} ON COLUMNS,
          {[Urgency].children,[Urgency].children} ON ROWS,
        {[CallInputChannel].children} ON PAGES
      FROM [Calls]
      WHERE [Measures].[Anzahl]
   MDX

  @columnNames = @result.column_names       # => ["Unit Sales", "Store Sales"]  
  @rowNames    = @result.row_names          # => e.g. ["Drink", "Food", "Non-Consumable"]
  @values      = @result.values           # => [[..., ...], [..., ...], [..., ...]] 
  @values      = @values.map{|elem| elem.map { |e| e.nil? ? 0 : e }}

  result = { :columnNames => @columnNames, :rowNames => @rowNames, :values => @values}.to_json

  "#{result}"
end

get '/cube' do
   cube = olap.cube('Calls')

   @result = olap.execute <<-MDX
     SELECT  {[Measures].[Dauer], [Measures].[Anzahl],[Measures].[Anzahl]} ON COLUMNS,
          {[Urgency].children} ON ROWS
      FROM [Calls]
   MDX

  @axesCount   = @result.axes_count # => 2
  @columnNames = @result.column_names       # => ["Unit Sales", "Store Sales"]  
  @rowNames    = @result.row_names          # => e.g. ["Drink", "Food", "Non-Consumable"]
  @values      = @result.values           # => [[..., ...], [..., ...], [..., ...]] 
  @values      = @values.map{|elem| elem.map { |e| e.nil? ? 0 : e }}
  @dimensions  = cube.dimensions

  haml :index
end