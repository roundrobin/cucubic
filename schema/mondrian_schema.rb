module Schema
  def self.example_schema
    Mondrian::OLAP::Schema.define do
       cube 'Calls' do
        table 'facts'
    
         dimension 'Customers', :foreign_key => 'customer_id' do
           hierarchy :has_all => true, :all_member_name => 'All customers', :primary_key => 'id' do
            table 'customer'
            level 'State', :column => 'state', :unique_members => true
            level 'Customer Number', :column => 'kdnr', :unique_members => true
           end
         end
         
        dimension 'ServiceProvider', :foreign_key => 'service_provider_id' do
           hierarchy :has_all => true, :all_member_name => 'All service provider', :primary_key => 'id' do
            table 'service_provider'
            level 'Name', :column => 'name', :unique_members => true
           end
         end
        
        dimension 'CallInputChannel', :foreign_key => 'call_input_channel_id' do
           hierarchy :has_all => true, :all_member_name => 'All Call input channels', :primary_key => 'id' do
            table 'call_input_channel'
            level 'Name', :column => 'name', :unique_members => true
           end
         end
       
        dimension 'OrderType', :foreign_key => 'order_type_id' do
           hierarchy :has_all => true, :all_member_name => 'All order types', :primary_key => 'id' do
            table 'order_type'
            level 'Name', :column => 'name', :unique_members => true
           end
         end
         
         dimension 'Urgency', :foreign_key => 'urgency_id' do
           hierarchy :has_all => true, :all_member_name => 'All urgencies', :primary_key => 'id' do
            table 'urgency'
            level 'Level', :column => 'level', :unique_members => true
           end
         end
         
         dimension 'SLA', :foreign_key => 'sla_id' do
           hierarchy :has_all => true, :all_member_name => 'All SLAs', :primary_key => 'id' do
            table    'sla'
            level    'Name', :column => 'name', :unique_members => true
           end
         end
 
        dimension 'Time', :foreign_key => 'time_id', :type => 'TimeDimension' do
          hierarchy :has_all => false, :primary_key => 'id' do
            table 'time'
            level 'Year', :column => 'year', :type => 'Numeric', :unique_members => true, :level_type => 'TimeYears'
            level 'Month', :column => 'month', :type => 'Numeric', :unique_members => false, :level_type => 'TimeMonths'
          end

          hierarchy 'Weekly', :has_all => false, :primary_key => 'id' do
            table 'time'
            level 'Year', :column => 'year', :type => 'Numeric', :unique_members => true, :level_type => 'TimeYears'
            level 'Week', :column => 'cw', :type => 'Numeric', :unique_members => false, :level_type => 'TimeWeeks'
          end

        end
         
    
         dimension 'CustomCluster1', :foreign_key => 'custom_cluster_1_id' do
           hierarchy :has_all => true, :all_member_name => 'All cluster1 members', :primary_key => 'id' do
            table    'custom_cluster_1'
            level    'Name', :column => 'name', :unique_members => true
           end
         end
         
         dimension 'CustomCluster2', :foreign_key => 'custom_cluster_2_id' do
           hierarchy :has_all => true, :all_member_name => 'All cluster2 members', :primary_key => 'id' do
            table    'custom_cluster_2'
            level    'Name', :column => 'name', :unique_members => true
           end
         end
    
         dimension 'Device', :foreign_key => 'device_id' do
           hierarchy :has_all => true, :all_member_name => 'All devices', :primary_key => 'id' do
            table    'device'
            level    'Class', :column => 'class', :unique_members => true
            level    'Materialtext', :column => 'materialtext', :unique_members => true
           end
         end
    
    
         
         dimension 'Location', :foreign_key => 'location_id' do
           hierarchy :has_all => true, :all_member_name => 'All locations', :primary_key => 'id' do
            table 'location'
            level 'Country', :column => 'country', :unique_members => true
            level 'State', :column => 'state',  :unique_members => true
            level 'City', :column => 'city', :unique_members => false
            level 'Street', :column => 'street', :unique_members => true
           end
         end 
         
     
         
        
        measure 'Count', :column => 'request_number', :aggregator => 'count', :format_string => "#,###"
        end
    end
  end
end