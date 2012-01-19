Module Helpers

    def changeNilWithZero(aar)
        return aar.map{ |elem| recursive(elem) } if aar.kind_of? Array
        if aar.nil?
            return 0
        else
            return aar;  
        end
        return 0;
    end

    def checkQuery(cube, start, queryDim, method)

        dimension = queryDim.first[0]

        if(queryDim.all?{|levels| levels[0] == dimension })
            #puts "\t\tAlle gleich"
            args = queryDim.map do |boxElem|
                if boxElem[2] == "(All)"
                    boxElem[2] = cube.dimension(boxElem[0]).hierarchy.all_member_name 
                    "[#{boxElem[1]}].[#{boxElem[2]}]"
                else
                    "[#{boxElem[1]}].[#{boxElem[2]}].Members"
                end

            end

            symb  = method.to_sym
            start = start.send(symb,*args)   

        else
            erster, zweiter, dritter  = queryDim
            erstSn, zweitSn, drittSn  = [""] * 3

            [[erstSn, erster], [zweitSn, zweiter], [drittSn, dritter]].each do |entry|
                if !entry[1].nil? && entry[1][2] == "(All)"
                    entry[2] = cube.dimension(entry[0]).hierarchy.all_member_name
                else
                    entry[0] << ".Members"
                end
            end 


            start = start.send(method.to_sym,"[#{erster[1]}].[#{erster[2]}]#{erstSn}") if(erster[0] != zweiter[0])
                
            if(!dritter.nil? && zweiter[0] == dritter[0])

                start = start.crossjoin("[#{zweiter[1]}].[#{zweiter[2]}]#{zweitSn}","[#{dritter[1]}].[#{dritter[2]}]#{drittSn}").hierarchize

            elsif(!dritter.nil? && zweiter[0] != dritter[0])

            start = start.send(method.to_sym,"[#{erster[1]}].[#{erster[2]}]#{erstSn}").hierarchize
            start = start.crossjoin("[#{zweiter[1]}].[#{zweiter[2]}]#{zweitSn}").hierarchize.crossjoin("[#{dritter[1]}].[#{dritter[2]}]#{drittSn}").hierarchize

            else
            start = start.send(method.to_sym,"[#{erster[1]}].[#{erster[2]}]#{erstSn}").hierarchize.crossjoin("[#{zweiter[1]}].[#{zweiter[2]}]#{zweitSn}")
            end


            end
        end
        return  start
    end


end